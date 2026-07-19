import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const distDirectory = path.join(root, "dist");
const baseUrl = "https://www.rpovoadata.tech";
const originalConsoleError = console.error.bind(console);
console.error = (message, ...details) => {
  if (String(message).includes("useLayoutEffect does nothing on the server")) return;
  originalConsoleError(message, ...details);
};
const vite = await createServer({
  root,
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
  ssr: { noExternal: ["react-helmet-async"] },
});

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

try {
  const [{ render }, { blogPosts }] = await Promise.all([
    vite.ssrLoadModule("/src/entry-server.tsx"),
    vite.ssrLoadModule("/src/data/blogPosts.ts"),
  ]);
  const template = await fs.readFile(path.join(distDirectory, "index.html"), "utf8");
  const prerenderRoutes = ["/blog", ...blogPosts.map((post) => `/blog/${post.slug}`)];

  for (const route of prerenderRoutes) {
    const { appHtml, head, htmlAttributes } = await render(route);
    const html = template
      .replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
      .replace(/\s*<title>.*?<\/title>/s, "")
      .replace("</head>", `  ${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    const outputDirectory = path.join(distDirectory, route.replace(/^\//, ""));
    await fs.mkdir(outputDirectory, { recursive: true });
    await fs.writeFile(path.join(outputDirectory, "index.html"), html, "utf8");
  }

  const staticPages = [
    "/",
    "/why-me",
    "/professional",
    "/personal",
    "/side-projects",
    "/blog",
    "/privacy",
    "/contact",
  ];
  const blogLastModified = blogPosts
    .map((post) => post.updatedAt || post.publishedAt)
    .sort()
    .at(-1);
  const sitemapEntries = [
    ...staticPages.map((page) => ({
      path: page,
      ...(page === "/blog" && blogLastModified
        ? { lastModified: blogLastModified }
        : {}),
    })),
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt,
      image: post.image,
      imageTitle: post.title,
      imageCaption: post.imageAlt,
    })),
  ];
  const sitemapUrls = sitemapEntries
    .map((entry) => {
      const lastModified = entry.lastModified
        ? `\n    <lastmod>${escapeXml(entry.lastModified)}</lastmod>`
        : "";
      const image = entry.image
        ? `\n    <image:image>\n      <image:loc>${escapeXml(`${baseUrl}${entry.image}`)}</image:loc>\n      <image:title>${escapeXml(entry.imageTitle)}</image:title>\n      <image:caption>${escapeXml(entry.imageCaption)}</image:caption>\n    </image:image>`
        : "";
      return `  <url>\n    <loc>${escapeXml(`${baseUrl}${entry.path}`)}</loc>${lastModified}${image}\n  </url>`;
    })
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${sitemapUrls}\n</urlset>\n`;
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${baseUrl}/sitemap-pages.xml</loc>\n    <lastmod>${escapeXml(blogLastModified)}</lastmod>\n  </sitemap>\n</sitemapindex>\n`;

  await Promise.all([
    fs.writeFile(path.join(distDirectory, "sitemap-pages.xml"), sitemap, "utf8"),
    fs.writeFile(path.join(distDirectory, "sitemap-index.xml"), sitemapIndex, "utf8"),
    fs.writeFile(path.join(distDirectory, "sitemap.xml"), sitemapIndex, "utf8"),
  ]);
  console.log(`Prerendered ${prerenderRoutes.length} blog routes and generated SEO sitemaps.`);
} finally {
  console.error = originalConsoleError;
  await vite.close();
}
