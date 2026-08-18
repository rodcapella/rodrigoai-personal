import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
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

const markdownRewrites = vercelConfig.rewrites.filter((rewrite) =>
  rewrite.has?.some(
    (condition) =>
      condition.type === "header" &&
      condition.key.toLowerCase() === "accept" &&
      condition.value.includes("text/markdown"),
  ),
);
if (markdownRewrites.length < requiredRoutes.length) {
  fail("not all public routes declare Markdown negotiation rewrites");
}

console.log(
  `Validated ${requiredRoutes.length} static pages, Markdown negotiation, llms.txt, agent manifest and real 404 routing.`,
);
