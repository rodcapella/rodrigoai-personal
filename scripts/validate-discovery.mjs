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

const pageTitles = new Map();
const pageDescriptions = new Map();
const validateSearchPage = (route, html) => {
  const title = html
    .match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
    ?.replace(/\s+/g, " ")
    .trim();
  if (!title || title.length > 70) {
    fail(`missing or overly long title for ${route}`);
  }
  if (pageTitles.has(title)) {
    fail(`duplicate title on ${route} and ${pageTitles.get(title)}`);
  }
  pageTitles.set(title, route);

  const description = html.match(
    /<meta[^>]+name="description"[^>]+content="([^"]+)"/i,
  )?.[1];
  if (!description || description.length > 160) {
    fail(`missing or oversized meta description for ${route}`);
  }
  if (pageDescriptions.has(description)) {
    fail(
      `duplicate meta description on ${route} and ${pageDescriptions.get(description)}`,
    );
  }
  pageDescriptions.set(description, route);

  const expectedCanonical = `${baseUrl}${route === "/" ? "/" : route}`;
  const canonicalLinks = [...html.matchAll(
    /<link[^>]+rel="canonical"[^>]+href="([^"]+)"[^>]*>/gi,
  )];
  if (
    canonicalLinks.length !== 1 ||
    canonicalLinks[0][1] !== expectedCanonical
  ) {
    fail(`missing, duplicate or incorrect canonical URL for ${route}`);
  }

  if ((html.match(/<h1\b/gi) ?? []).length !== 1) {
    fail(`${route} must contain exactly one h1 heading`);
  }

  const imagesWithoutAlt = [...html.matchAll(/<img\b[^>]*>/gi)].filter(
    ([image]) => !/\salt=(?:"[^"]*"|'[^']*')/i.test(image),
  );
  if (imagesWithoutAlt.length) {
    fail(`${route} contains images without alt attributes`);
  }
};

requireFile(path.join(dist, "llms.txt"));
requireFile(path.join(dist, "llms-full.txt"));
requireFile(path.join(dist, "ai.json"));
requireFile(path.join(dist, ".well-known", "agent.json"));
requireFile(path.join(dist, "robots.txt"));

const robots = fs.readFileSync(path.join(dist, "robots.txt"), "utf8");
const supportedRobotsFields = new Set([
  "user-agent",
  "allow",
  "disallow",
  "sitemap",
]);
const unsupportedRobotsLines = robots
  .split(/\r?\n/)
  .map((line, index) => ({ line: line.trim(), number: index + 1 }))
  .filter(({ line }) => line && !line.startsWith("#"))
  .filter(({ line }) => {
    const separator = line.indexOf(":");
    if (separator === -1) return true;
    return !supportedRobotsFields.has(
      line.slice(0, separator).trim().toLowerCase(),
    );
  });

if (unsupportedRobotsLines.length) {
  fail(
    `robots.txt contains unsupported fields on lines ${unsupportedRobotsLines
      .map(({ number }) => number)
      .join(", ")}`,
  );
}

if (!robots.includes(`Sitemap: ${baseUrl}/sitemaps/sitemap-index.xml`)) {
  fail("robots.txt does not reference the sitemap index");
}

const sitemapFiles = fs
  .readdirSync(path.join(dist, "sitemaps"))
  .filter((file) => file.endsWith(".xml"))
  .sort();
const expectedSitemapFiles = ["sitemap-index.xml", "sitemap-pages.xml"];
if (JSON.stringify(sitemapFiles) !== JSON.stringify(expectedSitemapFiles)) {
  fail(
    `unexpected sitemap files: expected ${expectedSitemapFiles.join(", ")}, found ${sitemapFiles.join(", ")}`,
  );
}

for (const route of requiredRoutes) {
  const htmlFile =
    route === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, route.replace(/^\//, ""), "index.html");
  requireFile(htmlFile);
  requireFile(markdownFile(route));

  const html = fs.readFileSync(htmlFile, "utf8");
  validateSearchPage(route, html);
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

const blogDirectory = path.join(dist, "blog");
for (const entry of fs.readdirSync(blogDirectory, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const route = `/blog/${entry.name}`;
  const htmlFile = path.join(blogDirectory, entry.name, "index.html");
  if (!fs.existsSync(htmlFile)) continue;
  validateSearchPage(route, fs.readFileSync(htmlFile, "utf8"));
}

const agentManifest = JSON.parse(
  fs.readFileSync(path.join(dist, ".well-known", "agent.json"), "utf8"),
);
if (agentManifest.content_negotiation?.alternate !== "text/markdown") {
  fail("agent manifest does not declare Markdown negotiation");
}
if (agentManifest.endpoints?.ai_json !== `${baseUrl}/ai.json`) {
  fail("agent manifest does not reference ai.json");
}

const llms = fs.readFileSync(path.join(dist, "llms.txt"), "utf8");
for (const endpoint of [
  "/llms-full.txt",
  "/ai.json",
  "/sitemaps/sitemap-index.xml",
  "/.well-known/agent.json",
]) {
  if (!llms.includes(endpoint)) fail(`llms.txt does not reference ${endpoint}`);
}
if (!llms.startsWith("# Rodrigo Póvoa\n\n> ") || /<[^>]+>/.test(llms)) {
  fail("llms.txt is not clean Markdown with the expected identity summary");
}
if (!/^## Optional$/m.test(llms)) {
  fail("llms.txt does not include an Optional section");
}

const llmsFull = fs.readFileSync(path.join(dist, "llms-full.txt"), "utf8");
if (/\]\(\//.test(llmsFull) || /!\[[^\]]*\]\(\//.test(llmsFull)) {
  fail("llms-full.txt contains relative content URLs");
}
for (const route of pageTitles.values()) {
  const canonical = `${baseUrl}${route === "/" ? "/" : route}`;
  if (!llmsFull.includes(`Source: ${canonical}`)) {
    fail(`llms-full.txt does not include ${canonical}`);
  }
}

const aiManifest = JSON.parse(
  fs.readFileSync(path.join(dist, "ai.json"), "utf8"),
);
if (
  aiManifest.$schema !==
    "https://www.ai-visibility.org.uk/specifications/ai-json/v1/ai-json.schema.json" ||
  aiManifest.name !== "Rodrigo Póvoa" ||
  aiManifest.url !== baseUrl ||
  !Array.isArray(aiManifest.permissions) ||
  !aiManifest.permissions.length ||
  !Array.isArray(aiManifest.restrictions) ||
  !aiManifest.restrictions.some(
    (restriction) =>
      restriction.action === "ai-training" &&
      restriction.severity === "must-not",
  ) ||
  aiManifest.licensing?.aiTrainingAllowed !== false ||
  aiManifest.resources?.llms !== `${baseUrl}/llms.txt` ||
  aiManifest.resources?.llmsFull !== `${baseUrl}/llms-full.txt` ||
  !Array.isArray(aiManifest.content) ||
  aiManifest.content.length !== pageTitles.size
) {
  fail("ai.json is incomplete or inconsistent with the published site");
}

const vercelConfig = JSON.parse(
  fs.readFileSync(path.join(root, "vercel.json"), "utf8"),
);
const contentSignalHeader = vercelConfig.headers
  ?.flatMap((rule) => rule.headers ?? [])
  .find((header) => header.key.toLowerCase() === "content-signal");
if (
  contentSignalHeader?.value !== "ai-train=no, search=yes, ai-input=yes"
) {
  fail("Content-Signal preferences are missing from the HTTP headers");
}
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
  `Validated ${pageTitles.size} search pages, one canonical sitemap index, Google-compatible robots.txt, titles, canonicals, image alt text, breadcrumbs, ProfilePage data, SEO metadata, Markdown negotiation, ai.json, llms.txt, llms-full.txt, agent manifest and real 404 routing.`,
);
