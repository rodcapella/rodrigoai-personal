import fs from "node:fs";

const sitemapDirectory = "dist/sitemaps";
const pages = [
  "/",
  "/why-me",
  "/professional",
  "/personal",
  "/side-projects",
  "/blog",
  "/blog/sem-dados-de-qualidade-nao-ha-ia-que-salve-o-negocio",
  "/privacy",
  "/contact",
];

const urls = pages
  .map(
    (path) => `
  <url>
    <loc>https://www.rpovoadata.tech${path}</loc>
  </url>`
  )
  .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`;

fs.mkdirSync(sitemapDirectory, { recursive: true });
fs.writeFileSync(`${sitemapDirectory}/sitemap-pages.xml`, sitemap, "utf8");

console.log("sitemap-pages.xml generated");
