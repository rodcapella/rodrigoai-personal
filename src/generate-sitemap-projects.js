// src/generate-sitemap-projects.js
const fs = require("fs");

const projects = [
  "/side-projects/project-1",
  "/side-projects/project-2",
  "/side-projects/project-3",
  // Adicione todos os projetos
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${projects.map(p => `<url><loc>https://www.rpovoadata.tech${p}</loc></url>`).join("\n")}
</urlset>`;

fs.writeFileSync("dist/sitemap-projects.xml", sitemap);
console.log("Project sitemap generated!");