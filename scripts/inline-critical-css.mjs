import fs from "node:fs/promises";
import path from "node:path";
import Beasties from "beasties";

const distDirectory = path.resolve("dist");

const findHtmlFiles = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? findHtmlFiles(entryPath) : [entryPath];
    }),
  );

  return files.flat().filter((file) => file.endsWith("index.html"));
};

const htmlFiles = await findHtmlFiles(distDirectory);

for (const htmlFile of htmlFiles) {
  const html = await fs.readFile(htmlFile, "utf8");
  const stylesheetLink = html.match(
    /<link\s+rel=["']stylesheet["'][^>]*href=["'][^"']+\.css[^"']*["'][^>]*>/i,
  )?.[0];

  if (!stylesheetLink) {
    throw new Error(`Could not find the application stylesheet in ${htmlFile}.`);
  }

  const beasties = new Beasties({
    path: distDirectory,
    publicPath: "/",
    pruneSource: false,
    fonts: false,
    logLevel: "silent",
    allowRules: [/^:root/, /^html/, /^body/, /^\.light/],
  });
  // Beasties parses and serializes the entire document. Its serialized body can
  // normalize React's hydration markers and whitespace, so use it only to
  // calculate the critical CSS and keep the prerendered application HTML intact.
  const beastiesHtml = await beasties.process(html);
  const criticalStyle = beastiesHtml.match(
    /<style(?:\s[^>]*)?>[\s\S]*?<\/style>/i,
  )?.[0];

  if (!criticalStyle) {
    throw new Error(`Could not extract critical CSS for ${htmlFile}.`);
  }

  const stylesheetPreload = stylesheetLink
    .replace(/rel=["']stylesheet["']/i, 'rel="preload"')
    .replace(/>$/, ' as="style">');
  const withCriticalStyles = html.replace(
    stylesheetLink,
    `${criticalStyle}\n${stylesheetPreload}`,
  );
  const optimizedHtml = withCriticalStyles.replace(
    "</body>",
    `${stylesheetLink}\n</body>`,
  );
  await fs.writeFile(htmlFile, optimizedHtml, "utf8");
}

console.log(`Inlined critical CSS for ${htmlFiles.length} prerendered pages.`);
