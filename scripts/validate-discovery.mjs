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
const profilePageRoutes = new Set(["/professional", "/why-me"]);

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

  const schemas = [...html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )].flatMap((match) => {
    const schema = JSON.parse(match[1]);
    return Array.isArray(schema) ? schema : [schema];
  });
  const breadcrumb = schemas.find(
    (schema) => schema?.["@type"] === "BreadcrumbList",
  );
  const profilePage = schemas.find(
    (schema) => schema?.["@type"] === "ProfilePage",
  );

  if (profilePageRoutes.has(route)) {
    const person = profilePage?.mainEntity;
    const createdAt = Date.parse(profilePage?.dateCreated);
    const modifiedAt = Date.parse(profilePage?.dateModified);

    if (
      profilePage?.["@id"] !== `${baseUrl}${route}#profile-page` ||
      profilePage.url !== `${baseUrl}${route}` ||
      profilePage.inLanguage !== "en" ||
      !Number.isFinite(createdAt) ||
      !Number.isFinite(modifiedAt) ||
      modifiedAt < createdAt
    ) {
      fail(`invalid ProfilePage metadata for ${route}`);
    }

    if (
      person?.["@type"] !== "Person" ||
      person?.["@id"] !== `${baseUrl}/#person` ||
      person.name !== "Rodrigo Póvoa" ||
      person.url !== `${baseUrl}/professional` ||
      typeof person.description !== "string" ||
      !person.description.trim() ||
      !String(person.image).startsWith(`${baseUrl}/`) ||
      !Array.isArray(person.sameAs) ||
      person.sameAs.length < 2
    ) {
      fail(`invalid ProfilePage mainEntity for ${route}`);
    }
  } else if (profilePage) {
    fail(`ProfilePage must only appear on a person-focused page, found on ${route}`);
  }

  if (route === "/") {
    if (breadcrumb) fail("the home page must not publish a one-level breadcrumb");
    continue;
  }

  const breadcrumbItems = breadcrumb?.itemListElement;
  if (!Array.isArray(breadcrumbItems) || breadcrumbItems.length < 2) {
    fail(`missing a BreadcrumbList with at least two items for ${route}`);
  }

  breadcrumbItems.forEach((item, index) => {
    if (
      item?.["@type"] !== "ListItem" ||
      item.position !== index + 1 ||
      typeof item.name !== "string" ||
      !item.name.trim()
    ) {
      fail(`invalid breadcrumb item ${index + 1} for ${route}`);
    }
    if (index < breadcrumbItems.length - 1 && !item.item) {
      fail(`breadcrumb item ${index + 1} has no destination for ${route}`);
    }
  });
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
  `Validated ${requiredRoutes.length} static pages, breadcrumbs, ProfilePage data, SEO metadata, Markdown negotiation, llms.txt, agent manifest and real 404 routing.`,
);
