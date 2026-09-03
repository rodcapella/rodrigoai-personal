import fs from "node:fs";
import path from "node:path";
import markdownMiddleware from "../middleware.js";

const root = process.cwd();
const dist = path.join(root, "dist");
const baseUrl = "https://www.rpovoadata.tech";
const requiredRoutes = [
  "/",
  "/why-me",
  "/professional",
  "/personal",
  "/side-projects",
  "/blog",
  "/privacy",
  "/contact",
];

const fail = (message) => {
  throw new Error(`Agent discovery validation failed: ${message}`);
};

const requireFile = (file) => {
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
    fail(`missing or empty file ${path.relative(root, file)}`);
  }
};

const markdownFile = (route) =>
  route === "/"
    ? path.join(dist, "markdown", "index.md")
    : path.join(dist, "markdown", `${route.replace(/^\//, "")}.md`);

requireFile(path.join(dist, "llms.txt"));
requireFile(path.join(dist, "llms-full.txt"));
requireFile(path.join(dist, ".well-known", "agent.json"));

for (const route of requiredRoutes) {
  const htmlFile =
    route === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, route.replace(/^\//, ""), "index.html");
  requireFile(htmlFile);
  requireFile(markdownFile(route));

  const html = fs.readFileSync(htmlFile, "utf8");
  if (!html.includes('rel="alternate" type="text/markdown"')) {
    fail(`missing Markdown alternate link for ${route}`);
  }

  for (const hreflang of ["en-GB", "x-default"]) {
    const alternatePattern = new RegExp(
      `<link[^>]+rel="alternate"[^>]+hreflang="${hreflang}"[^>]*>`,
      "i",
    );
    if (!alternatePattern.test(html)) {
      fail(`missing ${hreflang} hreflang alternate link for ${route}`);
    }
  }

  const description = html.match(
    /<meta[^>]+name="description"[^>]+content="([^"]+)"/i,
  )?.[1];
  if (!description || description.length > 160) {
    fail(`missing or oversized meta description for ${route}`);
  }
}

const agentManifest = JSON.parse(
  fs.readFileSync(path.join(dist, ".well-known", "agent.json"), "utf8"),
);
if (agentManifest.content_negotiation?.alternate !== "text/markdown") {
  fail("agent manifest does not declare Markdown negotiation");
}

const llms = fs.readFileSync(path.join(dist, "llms.txt"), "utf8");
for (const endpoint of [
  "/llms-full.txt",
  "/sitemaps/sitemap-index.xml",
  "/.well-known/agent.json",
]) {
  if (!llms.includes(endpoint)) fail(`llms.txt does not reference ${endpoint}`);
}

const vercelConfig = JSON.parse(
  fs.readFileSync(path.join(root, "vercel.json"), "utf8"),
);
if (
  vercelConfig.rewrites.some(
    (rewrite) => rewrite.source === "/((?!api/).*)",
  )
) {
  fail("catch-all SPA rewrite would create soft 404 responses");
}

const markdownDestinations = {
  "/": "/markdown/index.md",
  ...Object.fromEntries(
    requiredRoutes
      .filter((route) => route !== "/")
      .map((route) => [route, `/markdown${route}.md`]),
  ),
};

for (const [route, destination] of Object.entries(markdownDestinations)) {
  const markdownResponse = markdownMiddleware(
    new Request(`${baseUrl}${route}`, {
      headers: { Accept: "text/markdown, text/html;q=0.9" },
    }),
  );
  const rewriteDestination = markdownResponse.headers.get(
    "x-middleware-rewrite",
  );

  if (rewriteDestination !== `${baseUrl}${destination}`) {
    fail(`Markdown middleware does not rewrite ${route} to ${destination}`);
  }
  if (
    markdownResponse.headers.get("content-type") !==
    "text/markdown; charset=utf-8"
  ) {
    fail(`Markdown middleware does not set the correct content type for ${route}`);
  }
  if (markdownResponse.headers.get("vary") !== "Accept") {
    fail(`Markdown middleware does not vary ${route} by Accept`);
  }

  const htmlResponse = markdownMiddleware(
    new Request(`${baseUrl}${route}`, { headers: { Accept: "text/html" } }),
  );
  if (htmlResponse.headers.get("x-middleware-next") !== "1") {
    fail(`HTML request does not continue to the regular route for ${route}`);
  }
}

console.log(
  `Validated ${requiredRoutes.length} static pages, SEO metadata, Markdown negotiation, llms.txt, agent manifest and real 404 routing.`,
);
