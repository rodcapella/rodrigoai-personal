import { execSync } from "child_process";
import fs from "fs";

const lastCommitDate = execSync("git log -1 --format=%cI").toString().trim();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.rpovoadata.tech/</loc>
    <lastmod>${lastCommitDate}</lastmod>
  </url>
</urlset>
`;

fs.writeFileSync("./dist/sitemap.xml", sitemap);