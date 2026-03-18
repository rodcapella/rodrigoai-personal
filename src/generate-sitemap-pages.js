import fs from "fs";
import { execSync } from "child_process";

const lastCommitDate = execSync("git log -1 --format=%cI").toString().trim();

const pages = [
  { url: "/", priority: 1.0, freq: "weekly" },
  { url: "/professional", priority: 0.9, freq: "monthly" },
  { url: "/personal", priority: 0.8, freq: "monthly" },
  { url: "/why-me", priority: 0.8, freq: "monthly" },
  { url: "/side-projects", priority: 0.8, freq: "monthly" },
  { url: "/contact", priority: 0.6, freq: "monthly" }
];

const urls = pages.map(p => `
  <url>
    <loc>https://www.rpovoadata.tech${p.url}</loc>
    <lastmod>${lastCommitDate}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>
`).join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

fs.writeFileSync("./dist/sitemap-pages.xml", sitemap);