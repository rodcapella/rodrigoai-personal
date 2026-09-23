const configuredBaseUrl = process.env.SITE_URL || "https://www.rpovoadata.tech";
const baseUrl = new URL(configuredBaseUrl).origin;
const retryDelays = [0, 2_000, 5_000, 10_000];

const fail = (message) => {
  throw new Error(`Production validation failed: ${message}`);
};

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const fetchWithRetry = async (pathname, options = {}) => {
  const url = new URL(pathname, baseUrl);
  let lastError;

  for (const delay of retryDelays) {
    if (delay) await wait(delay);

    try {
      const response = await fetch(url, {
        redirect: "follow",
        cache: "no-store",
        ...options,
        headers: {
          "cache-control": "no-cache",
          ...(options.headers || {}),
        },
      });

      if (response.status >= 500) {
        lastError = new Error(`${response.status} returned by ${url}`);
        continue;
      }

      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error(`Unable to request ${url}`);
};

const contentType = (response) =>
  response.headers.get("content-type")?.toLowerCase() || "";

const requireStatusAndMime = (response, status, mime, pathname) => {
  if (response.status !== status) {
    fail(`${pathname} returned ${response.status}; expected ${status}`);
  }
  if (!contentType(response).includes(mime)) {
    fail(`${pathname} returned ${contentType(response) || "no MIME type"}; expected ${mime}`);
  }
};

const extractAttribute = (tag, name) =>
  tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, "i"))?.[1];

const extractCanonical = (html) => {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  return tags
    .filter((tag) =>
      (extractAttribute(tag, "rel") || "")
        .toLowerCase()
        .split(/\s+/)
        .includes("canonical"),
    )
    .map((tag) => extractAttribute(tag, "href"))
    .filter(Boolean);
};

const collectSchemaTypes = (value, types = new Set()) => {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, types));
    return types;
  }
  if (!value || typeof value !== "object") return types;

  const type = value["@type"];
  if (Array.isArray(type)) type.forEach((item) => types.add(item));
  else if (typeof type === "string") types.add(type);

  if (Array.isArray(value["@graph"])) {
    value["@graph"].forEach((item) => collectSchemaTypes(item, types));
  }
  return types;
};

const extractSchemaTypes = (html, pathname) => {
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  if (!scripts.length) fail(`${pathname} has no JSON-LD`);

  const types = new Set();
  for (const script of scripts) {
    try {
      collectSchemaTypes(JSON.parse(script[1]), types);
    } catch {
      fail(`${pathname} contains malformed JSON-LD`);
    }
  }
  return types;
};

const requireSchemaTypes = (types, required, pathname) => {
  for (const type of required) {
    if (!types.has(type)) fail(`${pathname} is missing ${type} structured data`);
  }
};

const expectedSchemas = (pathname) => {
  const required = ["WebSite", "Person"];
  if (pathname === "/") required.push("FAQPage");
  else required.push("BreadcrumbList");

  if (pathname === "/professional" || pathname === "/why-me") {
    required.push("ProfilePage");
  }
  if (pathname === "/blog") required.push("Blog", "ItemList");
  if (pathname.startsWith("/blog/")) required.push("BlogPosting");
  return required;
};

const extractLocations = (xml) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim());

const sitemapIndexResponse = await fetchWithRetry("/sitemaps/sitemap-index.xml");
requireStatusAndMime(
  sitemapIndexResponse,
  200,
  "xml",
  "/sitemaps/sitemap-index.xml",
);
const sitemapIndex = await sitemapIndexResponse.text();
const sitemapUrls = extractLocations(sitemapIndex);
if (!sitemapUrls.length) fail("sitemap index contains no child sitemaps");

const pageUrls = new Set();
for (const sitemapUrl of sitemapUrls) {
  const parsedSitemapUrl = new URL(sitemapUrl);
  if (parsedSitemapUrl.origin !== baseUrl) {
    fail(`sitemap points to an unexpected origin: ${sitemapUrl}`);
  }

  const response = await fetchWithRetry(parsedSitemapUrl.pathname);
  requireStatusAndMime(response, 200, "xml", parsedSitemapUrl.pathname);
  const xml = await response.text();
  extractLocations(xml).forEach((url) => pageUrls.add(url));
}

if (pageUrls.size < 8) fail(`only ${pageUrls.size} public pages were discovered`);

for (const pageUrl of [...pageUrls].sort()) {
  const parsedPageUrl = new URL(pageUrl);
  if (parsedPageUrl.origin !== baseUrl) {
    fail(`page sitemap points to an unexpected origin: ${pageUrl}`);
  }

  const pathname = parsedPageUrl.pathname;
  const expectedCanonical = `${baseUrl}${pathname}`;
  const htmlResponse = await fetchWithRetry(pathname, {
    headers: { Accept: "text/html" },
  });
  requireStatusAndMime(htmlResponse, 200, "text/html", pathname);
  if (!contentType(htmlResponse).includes("charset=utf-8")) {
    fail(`${pathname} HTML response does not declare charset=utf-8`);
  }
  const html = await htmlResponse.text();
  if (!/<meta\s+charset=["']?utf-8["']?\s*\/?>/i.test(html)) {
    fail(`${pathname} does not declare UTF-8 encoding`);
  }
  if (/Ã.|Â.|â€|ï¿½/.test(html)) {
    fail(`${pathname} contains possible mojibake characters`);
  }

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
    "og:locale",
  ];
  for (const property of requiredOpenGraphProperties) {
    const value = html.match(
      new RegExp(
        `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`,
        "i",
      ),
    )?.[1];
    if (!value) fail(`${pathname} is missing ${property}`);
  }

  const canonicals = extractCanonical(html);
  if (canonicals.length !== 1 || canonicals[0] !== expectedCanonical) {
    fail(`${pathname} canonical is ${canonicals.join(", ") || "missing"}; expected ${expectedCanonical}`);
  }

  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  if (h1Count !== 1) fail(`${pathname} contains ${h1Count} H1 elements`);

  const imagesWithoutDescriptiveAlt = [...html.matchAll(/<img\b[^>]*>/gi)].filter(
    ([image]) => !/\salt=(?:"[^"]+"|'[^']+')/i.test(image),
  );
  if (imagesWithoutDescriptiveAlt.length) {
    fail(
      `${pathname} contains ${imagesWithoutDescriptiveAlt.length} image(s) without descriptive alt text`,
    );
  }

  const schemaTypes = extractSchemaTypes(html, pathname);
  requireSchemaTypes(schemaTypes, expectedSchemas(pathname), pathname);

  const markdownResponse = await fetchWithRetry(pathname, {
    headers: { Accept: "text/markdown, text/html;q=0.9" },
  });
  requireStatusAndMime(markdownResponse, 200, "text/markdown", pathname);
  if (!(markdownResponse.headers.get("vary") || "").includes("Accept")) {
    fail(`${pathname} Markdown response does not vary by Accept`);
  }
  const markdown = await markdownResponse.text();
  if (
    !markdown.startsWith("---\n") ||
    /<!doctype html>|<html\b/i.test(markdown) ||
    !markdown.includes(`canonical: ${JSON.stringify(expectedCanonical)}`)
  ) {
    fail(`${pathname} did not return the expected Markdown document`);
  }
}

const discoveryResources = [
  ["/llms.txt", "text/markdown"],
  ["/llms-full.txt", "text/markdown"],
  ["/ai.json", "application/json"],
  ["/ai-catalog.json", "application/json"],
  ["/.well-known/agent.json", "application/json"],
  ["/humans.txt", "text/plain"],
  ["/site.webmanifest", "application/manifest+json"],
  ["/.well-known/security.txt", "text/plain"],
  ["/robots.txt", "text/plain"],
  ["/271842674a05455d886613c136dd5333.txt", "text/plain"],
];

for (const [pathname, mime] of discoveryResources) {
  const response = await fetchWithRetry(pathname);
  requireStatusAndMime(response, 200, mime, pathname);
  const body = await response.text();
  if (!body.trim()) fail(`${pathname} is empty`);
  if (
    pathname === "/271842674a05455d886613c136dd5333.txt" &&
    body.trim() !== "271842674a05455d886613c136dd5333"
  ) {
    fail(`${pathname} contains an unexpected IndexNow key`);
  }
  if (mime === "application/json") {
    try {
      JSON.parse(body);
    } catch {
      fail(`${pathname} contains invalid JSON`);
    }
  }
}

const rootResponse = await fetchWithRetry("/");
const linkHeader = rootResponse.headers.get("link") || "";
for (const endpoint of [
  "/llms.txt",
  "/ai.json",
  "/ai-catalog.json",
  "/.well-known/agent.json",
]) {
  if (!linkHeader.includes(endpoint)) fail(`root Link header is missing ${endpoint}`);
}
for (const [headerName, expectedValue] of [
  ["x-built-by", "Sapiente.AI"],
  ["x-developer", "Sapiente.AI"],
  ["x-developer-url", "https://www.sapienteai.com/en"],
]) {
  if (rootResponse.headers.get(headerName) !== expectedValue) {
    fail(`${headerName} response header is missing or incorrect`);
  }
}

const missingPath = `/__post-deploy-404-${Date.now()}`;
const missingResponse = await fetchWithRetry(missingPath);
if (missingResponse.status !== 404) {
  fail(`${missingPath} returned ${missingResponse.status}; expected a real 404`);
}

console.log(
  `Validated ${pageUrls.size} production pages, HTML and Markdown MIME types, canonicals, structured data, discovery resources, Link headers and real 404 routing at ${baseUrl}.`,
);
