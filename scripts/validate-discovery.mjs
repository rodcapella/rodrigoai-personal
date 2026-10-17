import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import markdownMiddleware from "../middleware.js";

const root = process.cwd();
const dist = path.join(root, "dist");
const baseUrl = "https://www.rpovoadata.tech";
const requiredRoutes = [
  "/",
  "/about",
  "/professional",
  "/personal",
  "/side-projects",
  "/blog",
  "/privacy",
  "/contact",
];
const profilePageRoutes = new Set(["/about", "/professional"]);

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

const accessibleText = (element) =>
  element.textContent?.replace(/\s+/g, " ").trim() ?? "";

const validateAccessibilitySemantics = (route, html) => {
  const document = new JSDOM(html).window.document;
  const ids = [...document.querySelectorAll("[id]")].map(({ id }) => id);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) {
    fail(`${route} contains duplicate IDs: ${duplicateIds.join(", ")}`);
  }

  if (!document.documentElement.lang) {
    fail(`${route} is missing a valid HTML language declaration`);
  }
  if (!document.querySelector("main")) {
    fail(`${route} is missing its main landmark`);
  }
  const skipLink = document.querySelector('a[href="#main-content"]');
  if (!skipLink || skipLink.getAttribute("tabindex") === "-1") {
    fail(`${route} is missing a focusable skip link`);
  }

  for (const image of document.querySelectorAll("img")) {
    if (!image.hasAttribute("alt")) {
      fail(`${route} contains an image without an alt attribute`);
    }
  }
  for (const heading of document.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
    if (!accessibleText(heading)) {
      fail(`${route} contains an empty heading`);
    }
  }
  for (const button of document.querySelectorAll("button")) {
    if (
      !accessibleText(button) &&
      !button.getAttribute("aria-label") &&
      !button.getAttribute("aria-labelledby")
    ) {
      fail(`${route} contains a button without an accessible name`);
    }
  }
  for (const link of document.querySelectorAll("a[href]")) {
    const namedImage = link.querySelector('img[alt]:not([alt=""])');
    if (
      !accessibleText(link) &&
      !link.getAttribute("aria-label") &&
      !link.getAttribute("aria-labelledby") &&
      !namedImage
    ) {
      fail(`${route} contains a link without an accessible name`);
    }
  }
  for (const control of document.querySelectorAll("input, textarea, select")) {
    if (
      control.getAttribute("type") === "hidden" ||
      control.getAttribute("aria-hidden") === "true"
    ) {
      continue;
    }
    const id = control.id;
    const associatedLabel = id
      ? [...document.querySelectorAll("label[for]")].some(
          (label) => label.getAttribute("for") === id,
        )
      : false;
    if (
      !associatedLabel &&
      !control.getAttribute("aria-label") &&
      !control.getAttribute("aria-labelledby")
    ) {
      fail(`${route} contains a form control without an accessible label`);
    }
  }
  for (const frame of document.querySelectorAll("iframe")) {
    if (!frame.getAttribute("title")) {
      fail(`${route} contains an iframe without a title`);
    }
  }
  for (const list of document.querySelectorAll("ul, ol")) {
    const invalidChild = [...list.children].find(
      ({ tagName }) => !["LI", "SCRIPT", "TEMPLATE"].includes(tagName),
    );
    if (invalidChild) {
      fail(`${route} contains invalid direct children in a list`);
    }
  }
};

const notFoundFile = path.join(dist, "404.html");
requireFile(notFoundFile);
const notFoundHtml = fs.readFileSync(notFoundFile, "utf8");
if (!/<title[^>]*>Page Not Found \| Rodrigo Póvoa<\/title>/i.test(notFoundHtml)) {
  fail("custom 404 page is missing its descriptive title");
}
if (!/<meta[^>]+name="robots"[^>]+content="noindex, nofollow"/i.test(notFoundHtml)) {
  fail("custom 404 page must be excluded from search indexing");
}
if (!/The route[\s\S]*\/__404-not-found[\s\S]*could not be found/i.test(notFoundHtml)) {
  fail("custom 404 page content was not prerendered");
}

const validateSearchPage = (route, html) => {
  validateAccessibilitySemantics(route, html);
  if (!/<meta\s+charset=["']?utf-8["']?\s*\/?>/i.test(html)) {
    fail(`${route} does not declare UTF-8 encoding`);
  }
  if (/Ã.|Â.|â€|ï¿½/.test(html)) {
    fail(`${route} contains possible mojibake characters`);
  }
  if (
    !/<html[^>]+lang="(?:en|en-GB)"[^>]+data-developer="Sapiente AI"[^>]+data-developer-url="https:\/\/www\.sapienteai\.com\/en"/i.test(
      html,
    )
  ) {
    fail(`${route} does not declare the expected language and developer metadata`);
  }
  for (const metadataName of ["author", "creator", "publisher"]) {
    if (
      !new RegExp(
        `<meta[^>]+name=["']${metadataName}["'][^>]+content=["']Sapiente AI["']`,
        "i",
      ).test(html)
    ) {
      fail(`${route} is missing the Sapiente AI ${metadataName} metadata`);
    }
  }
  if (
    !/<link[^>]+rel="author"[^>]+href="https:\/\/www\.sapienteai\.com\/en"[^>]*>/i.test(
      html,
    )
  ) {
    fail(`${route} is missing the Sapiente AI author link`);
  }

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

  const requiredOpenGraphProperties = [
    "og:type",
    "og:title",
    "og:description",
    "og:url",
    "og:site_name",
    "og:image",
    "og:image:secure_url",
    "og:image:type",
    "og:image:alt",
    "og:image:width",
    "og:image:height",
    "og:locale",
  ];
  for (const property of requiredOpenGraphProperties) {
    const value = html.match(
      new RegExp(
        `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`,
        "i",
      ),
    )?.[1];
    if (!value) fail(`${route} is missing ${property}`);
  }

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

  const imagesWithoutDescriptiveAlt = [...html.matchAll(/<img\b[^>]*>/gi)].filter(
    ([image]) =>
      !/\saria-hidden=(?:"true"|'true')/i.test(image) &&
      !/\salt=(?:"[^"]+"|'[^']+')/i.test(image),
  );
  if (imagesWithoutDescriptiveAlt.length) {
    fail(`${route} contains images without descriptive alt text`);
  }

  if (
    !/<link[^>]+rel=["']stylesheet["'][^>]+href=["'][^"']+\.css[^"']*["'][^>]*>/i.test(html)
  ) {
    fail(`${route} is missing the render-blocking application stylesheet`);
  }

  const applicationEntry = html.match(
    /<script[^>]+data-app-entry=["']([^"']+)["'][^>]*>/i,
  )?.[1];
  if (!/^\/assets\/app-[A-Za-z0-9_-]+\.js$/.test(applicationEntry ?? "")) {
    fail(`${route} does not use a content-hashed application entry file`);
  }
  if (/\/assets\/app\.js(?:[?"'])/i.test(html)) {
    fail(`${route} still references the legacy unversioned application entry`);
  }
};

requireFile(path.join(dist, "llms.txt"));
requireFile(path.join(dist, "llms-full.txt"));
requireFile(path.join(dist, "ai.json"));
requireFile(path.join(dist, "ai-catalog.json"));
requireFile(path.join(dist, ".well-known", "agent.json"));
requireFile(path.join(dist, "humans.txt"));
requireFile(path.join(dist, "site.webmanifest"));
requireFile(path.join(dist, ".well-known", "security.txt"));
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
  const website = schemas.find((schema) => schema?.["@type"] === "WebSite");
  const blogPosting = schemas.find(
    (schema) => schema?.["@type"] === "BlogPosting",
  );
  const personEntity = schemas.find((schema) => schema?.["@type"] === "Person");
  const profilePage = schemas.find(
    (schema) => schema?.["@type"] === "ProfilePage",
  );
  const aboutPage = schemas.find(
    (schema) => schema?.["@type"] === "AboutPage",
  );
  const contactPage = schemas.find(
    (schema) => schema?.["@type"] === "ContactPage",
  );
  const faqPage = schemas.find(
    (schema) => schema?.["@type"] === "FAQPage",
  );

  const openGraphValue = (property) =>
    html.match(
      new RegExp(
        `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`,
        "i",
      ),
    )?.[1];
  const ogImage = openGraphValue("og:image");
  const ogImageWidth = Number(openGraphValue("og:image:width"));
  const ogImageHeight = Number(openGraphValue("og:image:height"));
  const structuredImage = blogPosting?.image || website?.image;
  const structuredImageUrl =
    typeof structuredImage === "string"
      ? structuredImage
      : structuredImage?.url || structuredImage?.contentUrl;
  if (
    !ogImage ||
    structuredImageUrl !== ogImage ||
    !Number.isFinite(ogImageWidth) ||
    !Number.isFinite(ogImageHeight) ||
    Math.abs(ogImageWidth / ogImageHeight - 16 / 9) > 0.01
  ) {
    fail(`Open Graph and structured visual metadata are not aligned for ${route}`);
  }

  if (
    website?.["@id"] !== `${baseUrl}/#website` ||
    website.url !== baseUrl ||
    website.inLanguage !== "en-GB" ||
    website.author?.["@id"] !== `${baseUrl}/#person` ||
    website.creator?.["@type"] !== "Organization" ||
    website.creator?.["@id"] !== "https://www.sapienteai.com/#organization" ||
    website.creator?.name !== "Sapiente AI" ||
    website.creator?.url !== "https://www.sapienteai.com/en" ||
    website.creator?.logo?.["@type"] !== "ImageObject" ||
    website.creator?.logo?.url !==
      `${baseUrl}/logos/logo_sapiente_transparente.webp` ||
    website.publisher?.["@id"] !==
      "https://www.sapienteai.com/#organization" ||
    website.publisher?.["@type"] !== "Organization" ||
    website.publisher?.name !== "Sapiente AI" ||
    !website.creator?.sameAs?.includes("https://x.com/SapienteAI") ||
    website.creator?.founder?.["@id"] !== `${baseUrl}/#person`
  ) {
    fail(`invalid WebSite creator metadata for ${route}`);
  }
  const expectedInstitutionalParts = [
    `${baseUrl}/about#about-page`,
    `${baseUrl}/professional#profile-page`,
    `${baseUrl}/side-projects#side-projects`,
    `${baseUrl}/blog#blog`,
    `${baseUrl}/contact#contact-page`,
  ];
  const websitePartIds = Array.isArray(website?.hasPart)
    ? website.hasPart.map((part) => part?.["@id"])
    : [];
  if (expectedInstitutionalParts.some((id) => !websitePartIds.includes(id))) {
    fail(`WebSite hasPart is missing an institutional page for ${route}`);
  }
  if (
    route === "/about" &&
    (aboutPage?.["@id"] !== `${baseUrl}/about#about-page` ||
      aboutPage.mainEntity?.["@id"] !== `${baseUrl}/#person` ||
      aboutPage.isPartOf?.["@id"] !== `${baseUrl}/#website` ||
      aboutPage.breadcrumb?.["@id"] !== `${baseUrl}/about#breadcrumb`)
  ) {
    fail("invalid AboutPage institutional relationship");
  }
  if (
    route === "/contact" &&
    (contactPage?.["@id"] !== `${baseUrl}/contact#contact-page` ||
      contactPage.mainEntity?.["@id"] !== `${baseUrl}/#person` ||
      contactPage.isPartOf?.["@id"] !== `${baseUrl}/#website` ||
      contactPage.breadcrumb?.["@id"] !== `${baseUrl}/contact#breadcrumb`)
  ) {
    fail("invalid ContactPage institutional relationship");
  }
  if (route === "/blog") {
    const blog = schemas.find((schema) => schema?.["@type"] === "Blog");
    const articleList = schemas.find((schema) => schema?.["@type"] === "ItemList");
    const articles = blog?.blogPost;
    const visibleModifiedDate = html.match(
      /Last updated:(?:<!-- -->)?\s*<time[^>]+dateTime=["']([^"']+)["']/i,
    )?.[1];
    if (
      blog?.publisher?.["@id"] !== `${baseUrl}/#person` ||
      blog?.publisher?.name !== "Rodrigo Póvoa" ||
      blog?.author?.["@id"] !== `${baseUrl}/#person` ||
      blog?.author?.name !== "Rodrigo Póvoa" ||
      blog?.author?.url !== `${baseUrl}/about` ||
      !Array.isArray(blog?.author?.sameAs) ||
      blog.author.sameAs.length < 2 ||
      blog?.editor?.["@id"] !== `${baseUrl}/#person` ||
      blog?.accountablePerson?.["@id"] !== `${baseUrl}/#person` ||
      !Number.isFinite(Date.parse(blog?.dateModified)) ||
      visibleModifiedDate !== blog.dateModified ||
      !Array.isArray(articles) || !articles.length ||
      articles.some((article) =>
        !article.headline ||
        !article.author?.["@id"] && !article.author?.name ||
        !Number.isFinite(Date.parse(article.datePublished)) ||
        !(typeof article.image === "string" ? article.image : article.image?.url)
      ) ||
      articles.some((article) => article.author?.["@id"] !== `${baseUrl}/#person` ||
        article.author?.name !== "Rodrigo Póvoa") ||
      !articleList?.name || articleList.numberOfItems !== articles.length ||
      articleList.itemListElement?.length !== articles.length ||
      articleList.itemListElement.some((entry, index) => entry.item?.["@id"] !== articles[index]["@id"])
    ) {
      fail("invalid Blog publisher, freshness date, article authors or descriptive ItemList");
    }
    if (
      !/Written and maintained by Rodrigo Póvoa/i.test(html) ||
      !/<a[^>]+rel=["']author["'][^>]+href=["']\/about["']/i.test(html) ||
      !/Original publication sources,[\s\S]*references,[\s\S]*publication dates/i.test(html)
    ) {
      fail("the Blog page is missing visible authorship or editorial transparency");
    }
  }
  if (route === "/") {
    const questions = faqPage?.mainEntity;
    if (!Array.isArray(questions) || questions.length !== 6) {
      fail("FAQPage must contain the six visible recruiter questions");
    }
    for (const question of questions) {
      const answerText = String(question?.acceptedAnswer?.text || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const answerWordCount = answerText ? answerText.split(" ").length : 0;
      if (
        question?.["@type"] !== "Question" ||
        !question.name ||
        question.acceptedAnswer?.["@type"] !== "Answer" ||
        answerWordCount < 30 ||
        answerWordCount > 60
      ) {
        fail(`FAQ answer must contain 30 to 60 words: ${question?.name || "unnamed question"}`);
      }
    }
  }
  if (
    personEntity?.["@id"] !== `${baseUrl}/#person` ||
    personEntity?.worksFor?.["@id"] !==
      "https://www.sapienteai.com/#organization"
  ) {
    fail(`invalid Person and Sapiente AI relationship for ${route}`);
  }

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
      person.url !== `${baseUrl}/about` ||
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
if (agentManifest.endpoints?.ai_catalog !== `${baseUrl}/ai-catalog.json`) {
  fail("agent manifest does not reference ai-catalog.json");
}
if (agentManifest.endpoints?.humans !== `${baseUrl}/humans.txt`) {
  fail("agent manifest does not reference humans.txt");
}
if (
  agentManifest.endpoints?.security !==
  `${baseUrl}/.well-known/security.txt`
) {
  fail("agent manifest does not reference security.txt");
}

const llms = fs.readFileSync(path.join(dist, "llms.txt"), "utf8");
for (const endpoint of [
  "/llms-full.txt",
  "/ai.json",
  "/ai-catalog.json",
  "/humans.txt",
  "/.well-known/security.txt",
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
for (const provenanceLine of [
  "## Provenance",
  "Website design, technical architecture and development: Sapiente AI",
  "Official developer website: https://www.sapienteai.com/en",
  "Developer entity: https://www.sapienteai.com/#organization",
]) {
  if (!llms.includes(provenanceLine)) {
    fail(`llms.txt is missing provenance: ${provenanceLine}`);
  }
}

const humans = fs.readFileSync(path.join(dist, "humans.txt"), "utf8");
for (const requiredCredit of [
  "/* TEAM */",
  "Developer: Sapiente AI",
  "Website: https://www.sapienteai.com/pt",
  "Twitter: https://x.com/SapienteAI",
  "/* SITE */",
  "Name: Rodrigo Póvoa — Personal Portfolio",
  `Website: ${baseUrl}/`,
  "Language: en-GB",
  "Location: Aveiro, Portugal",
]) {
  if (!humans.includes(requiredCredit)) {
    fail(`humans.txt is missing: ${requiredCredit}`);
  }
}

const webManifest = JSON.parse(
  fs.readFileSync(path.join(dist, "site.webmanifest"), "utf8"),
);
if (
  webManifest.name !==
    "Rodrigo Póvoa | End-to-End Data Leader & Data Analytics Engineer" ||
  webManifest.short_name !== "Rodrigo Póvoa" ||
  webManifest.developer?.name !== "Sapiente AI" ||
  webManifest.developer?.url !== "https://www.sapienteai.com/en" ||
  webManifest.start_url !== "/" ||
  webManifest.scope !== "/" ||
  webManifest.display !== "standalone" ||
  webManifest.theme_color !== "#0f172a" ||
  webManifest.background_color !== "#0b0f14" ||
  !Array.isArray(webManifest.icons) ||
  webManifest.icons.length < 2 ||
  webManifest.icons.some(
    (icon) =>
      !String(icon.src).startsWith("/logos/") ||
      typeof icon.sizes !== "string" ||
      icon.type !== "image/webp",
  )
) {
  fail("site.webmanifest is incomplete or inconsistent with the site identity");
}

const securityTxt = fs.readFileSync(
  path.join(dist, ".well-known", "security.txt"),
  "utf8",
);
for (const requiredSecurityField of [
  "Contact: mailto:contacto@sapienteai.com",
  "Expires: 2027-09-22T00:00:00Z",
  "Preferred-Languages: pt, en",
  "Policy: https://www.sapienteai.com/pt",
  `Canonical: ${baseUrl}/.well-known/security.txt`,
]) {
  if (!securityTxt.includes(requiredSecurityField)) {
    fail(`security.txt is missing: ${requiredSecurityField}`);
  }
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
if (
  !llmsFull.includes("## Provenance") ||
  !llmsFull.includes(
    "Website design, technical architecture and development: Sapiente AI",
  ) ||
  !llmsFull.includes("https://www.sapienteai.com/#organization")
) {
  fail("llms-full.txt does not include the Sapiente AI provenance statement");
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
  aiManifest.provenance?.websiteDeveloper?.id !==
    "https://www.sapienteai.com/#organization" ||
  aiManifest.provenance?.websiteDeveloper?.name !== "Sapiente AI" ||
  aiManifest.provenance?.websiteDeveloper?.url !==
    "https://www.sapienteai.com/en" ||
  !Array.isArray(aiManifest.content) ||
  aiManifest.content.length !== pageTitles.size
) {
  fail("ai.json is incomplete or inconsistent with the published site");
}

const aiCatalog = JSON.parse(
  fs.readFileSync(path.join(dist, "ai-catalog.json"), "utf8"),
);
if (
  aiCatalog.specVersion !== "1.0" ||
  aiCatalog.host !== "www.rpovoadata.tech" ||
  aiCatalog.publisher?.name !== "Sapiente AI" ||
  aiCatalog.publisher?.url !== "https://www.sapienteai.com/pt" ||
  aiCatalog.publisher?.contact !== "contacto@sapienteai.com" ||
  aiCatalog.trustManifest !== "verified-creator" ||
  !Array.isArray(aiCatalog.entries) ||
  aiCatalog.entries.length < 3 ||
  aiCatalog.entries.some(
    (entry) =>
      typeof entry.identifier !== "string" ||
      !entry.identifier.startsWith("urn:ai:rpovoadata:") ||
      typeof entry.displayName !== "string" ||
      typeof entry.description !== "string" ||
      !Array.isArray(entry.tags) ||
      !entry.tags.length ||
      !Array.isArray(entry.capabilities) ||
      !entry.capabilities.length ||
      !String(entry.endpoint).startsWith(`${baseUrl}/`) ||
      !Array.isArray(entry.representativeQueries) ||
      !entry.representativeQueries.length,
  )
) {
  fail("ai-catalog.json is incomplete or inconsistent with the published site");
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
const globalHeaders = Object.fromEntries(
  (vercelConfig.headers.find((rule) => rule.source === "/(.*)")?.headers ?? []).map(
    (header) => [header.key.toLowerCase(), header.value],
  ),
);
for (const [headerName, expectedValue] of [
  ["x-built-by", "Sapiente AI"],
  ["x-developer", "Sapiente AI"],
  ["x-developer-url", "https://www.sapienteai.com/en"],
]) {
  if (globalHeaders[headerName] !== expectedValue) {
    fail(`${headerName} attribution header is missing or incorrect`);
  }
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
  `Validated ${pageTitles.size} search pages, accessibility semantics, one canonical sitemap index, Google-compatible robots.txt, titles, canonicals, image alt text, breadcrumbs, ProfilePage data, SEO metadata, Markdown negotiation, ai.json, ai-catalog.json, llms.txt, llms-full.txt, humans.txt, security.txt, site.webmanifest, agent manifest and real 404 routing.`,
);
