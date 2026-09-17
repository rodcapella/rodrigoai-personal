const configuredBaseUrl = process.env.SITE_URL || "https://www.rpovoadata.tech";
const baseUrl = new URL(configuredBaseUrl).origin;
const indexNowKey = "271842674a05455d886613c136dd5333";
const keyLocation = `${baseUrl}/${indexNowKey}.txt`;

const requireSuccessfulResponse = async (response, resource) => {
  if (response.ok) return response;

  const details = (await response.text()).trim();
  throw new Error(
    `${resource} returned ${response.status}${details ? `: ${details}` : ""}`,
  );
};

const extractLocations = (xml) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim());

const sitemapIndexResponse = await requireSuccessfulResponse(
  await fetch(`${baseUrl}/sitemaps/sitemap-index.xml`, { cache: "no-store" }),
  "Sitemap index",
);
const sitemapUrls = extractLocations(await sitemapIndexResponse.text());

if (!sitemapUrls.length) {
  throw new Error("The sitemap index contains no child sitemaps.");
}

const publicUrls = new Set();
for (const sitemapUrl of sitemapUrls) {
  const parsedSitemapUrl = new URL(sitemapUrl);
  if (parsedSitemapUrl.origin !== baseUrl) {
    throw new Error(`Unexpected sitemap origin: ${sitemapUrl}`);
  }

  const sitemapResponse = await requireSuccessfulResponse(
    await fetch(sitemapUrl, { cache: "no-store" }),
    sitemapUrl,
  );
  extractLocations(await sitemapResponse.text()).forEach((url) => {
    const parsedUrl = new URL(url);
    if (parsedUrl.origin !== baseUrl) {
      throw new Error(`Unexpected page origin: ${url}`);
    }
    publicUrls.add(parsedUrl.href);
  });
}

if (!publicUrls.size) {
  throw new Error("No public URLs were found for IndexNow submission.");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(baseUrl).hostname,
    key: indexNowKey,
    keyLocation,
    urlList: [...publicUrls].sort(),
  }),
});

if (![200, 202].includes(response.status)) {
  const details = (await response.text()).trim();
  throw new Error(
    `IndexNow returned ${response.status}${details ? `: ${details}` : ""}`,
  );
}

console.log(
  `Submitted ${publicUrls.size} URLs to IndexNow with status ${response.status}.`,
);
