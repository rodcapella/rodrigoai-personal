import fs from "node:fs";

const projects = [
  // coloca aqui os teus paths
  "/side-projects",
  "/side-projects/project-1",
  "/side-projects/project-2",
];

const urls = projects
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

fs.writeFileSync("dist/sitemap-projects.xml", sitemap, "utf8");

console.log("sitemap-projects.xml generated");