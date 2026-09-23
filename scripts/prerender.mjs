import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";
import { JSDOM } from "jsdom";

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

const markdownEscape = (value) => value.replaceAll("|", "\\|");
const latestTimestamp = (...timestamps) =>
  timestamps.filter(Boolean).sort().at(-1);
const absoluteContentUrl = (value) => {
  if (!value || !value.startsWith("/")) return value;
  return new URL(value, baseUrl).href;
};

const htmlToMarkdown = (html) => {
  const document = new JSDOM(html).window.document;
  const main = document.querySelector("main") || document.body;

  main
    .querySelectorAll(
      "script, style, svg, form, button, noscript, [aria-hidden='true']",
    )
    .forEach((element) => element.remove());

  const renderChildren = (node) =>
    [...node.childNodes].map((child) => renderNode(child)).join("");

  const renderNode = (node) => {
    if (node.nodeType === node.TEXT_NODE) {
      return node.textContent.replace(/\s+/g, " ");
    }

    if (node.nodeType !== node.ELEMENT_NODE) return "";

    const tag = node.tagName.toLowerCase();
    const content = renderChildren(node).trim();

    if (/^h[1-6]$/.test(tag)) {
      return `\n\n${"#".repeat(Number(tag[1]))} ${content}\n\n`;
    }

    if (tag === "p") return content ? `\n\n${content}\n\n` : "";
    if (tag === "br") return "  \n";
    if (tag === "span") return content ? `${content} ` : "";
    if (tag === "strong" || tag === "b") return content ? `**${content}**` : "";
    if (tag === "em" || tag === "i") return content ? `*${content}*` : "";
    if (tag === "code") return content ? `\`${content}\`` : "";
    if (tag === "pre") return content ? `\n\n\`\`\`\n${content}\n\`\`\`\n\n` : "";

    if (tag === "a") {
      const href = node.getAttribute("href");
      return href && content
        ? `[${content}](${absoluteContentUrl(href)})`
        : content;
    }

    if (tag === "img") {
      const source = node.getAttribute("src");
      const alt = node.getAttribute("alt") || "";
      return source
        ? `\n\n![${alt}](${absoluteContentUrl(source)})\n\n`
        : "";
    }

    if (tag === "blockquote") {
      return content
        ? `\n\n${content
            .split("\n")
            .map((line) => `> ${line}`)
            .join("\n")}\n\n`
        : "";
    }

    if (tag === "ul" || tag === "ol") {
      const items = [...node.children]
        .filter((child) => child.tagName.toLowerCase() === "li")
        .map((child, index) => {
          const marker = tag === "ol" ? `${index + 1}.` : "-";
          return `${marker} ${renderChildren(child).trim()}`;
        })
        .filter(Boolean);
      return items.length ? `\n\n${items.join("\n")}\n\n` : "";
    }

    if (tag === "table") {
      const rows = [...node.querySelectorAll("tr")].map((row) =>
        [...row.querySelectorAll(":scope > th, :scope > td")].map((cell) =>
          markdownEscape(renderChildren(cell).trim()),
        ),
      );
      if (!rows.length) return "";
      const width = Math.max(...rows.map((row) => row.length));
      const header = rows[0];
      const divider = Array.from({ length: width }, () => "---");
      const body = rows.slice(1);
      return `\n\n${[header, divider, ...body]
        .map((row) => `| ${row.join(" | ")} |`)
        .join("\n")}\n\n`;
    }

    if (
      [
        "main",
        "section",
        "article",
        "div",
        "header",
        "footer",
        "nav",
        "aside",
        "details",
        "summary",
      ].includes(tag)
    ) {
      return content ? `\n\n${content}\n\n` : "";
    }

    return content;
  };

  return renderChildren(main)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const getHeadMetadata = (head) => {
  const document = new JSDOM(
    `<!doctype html><html><head>${head}</head><body></body></html>`,
  ).window.document;

  return {
    title: document.querySelector("title")?.textContent?.trim() || "Rodrigo Póvoa",
    description:
      document.querySelector('meta[name="description"]')?.getAttribute("content") ||
      "",
    canonical:
      document.querySelector('link[rel="canonical"]')?.getAttribute("href") ||
      baseUrl,
    schemas: [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => script.textContent?.trim())
      .filter(Boolean),
  };
};

const markdownPathForRoute = (route) =>
  route === "/"
    ? path.join(distDirectory, "markdown", "index.md")
    : path.join(distDirectory, "markdown", `${route.replace(/^\//, "")}.md`);

const createMarkdownDocument = ({
  route,
  appHtml,
  head,
  language,
  lastModified,
}) => {
  const metadata = getHeadMetadata(head);
  const body = htmlToMarkdown(appHtml);
  const schemaAppendix = metadata.schemas.length
    ? `\n\n## Structured data\n\n${metadata.schemas
        .map((schema) => `\`\`\`json\n${schema}\n\`\`\``)
        .join("\n\n")}`
    : "";
  const markdownBody = `${body}${schemaAppendix}`.trim();
  const estimatedTokens = Math.ceil(markdownBody.length / 4);
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(metadata.title)}`,
    `description: ${JSON.stringify(metadata.description)}`,
    `canonical: ${JSON.stringify(metadata.canonical)}`,
    `language: ${JSON.stringify(language)}`,
    `last_modified: ${JSON.stringify(lastModified)}`,
    `estimated_tokens: ${estimatedTokens}`,
    "content_signal: ai-train=no, search=yes, ai-input=yes",
    "---",
  ].join("\n");

  return {
    route,
    title: metadata.title,
    description: metadata.description,
    canonical: metadata.canonical,
    language,
    lastModified,
    estimatedTokens,
    body: markdownBody,
    content: `${frontmatter}\n\n${markdownBody}\n`,
  };
};

try {
  const [
    { render },
    { blogPosts },
    { blogPostTemplateLastModified, staticPageMetadata },
  ] = await Promise.all([
    vite.ssrLoadModule("/src/entry-server.tsx"),
    vite.ssrLoadModule("/src/data/blogPosts.ts"),
    vite.ssrLoadModule("/src/data/siteMetadata.ts"),
  ]);
  const template = await fs.readFile(path.join(distDirectory, "index.html"), "utf8");
  const sitemapDirectory = path.join(distDirectory, "sitemaps");
  const staticPages = Object.keys(staticPageMetadata);
  const blogLastModified = blogPosts
    .map((post) => post.updatedAt || post.publishedAt)
    .sort()
    .at(-1);
  const prerenderRoutes = [
    ...staticPages,
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ];
  const markdownDocuments = [];

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

    const post = route.startsWith("/blog/")
      ? blogPosts.find((item) => `/blog/${item.slug}` === route)
      : undefined;
    const lastModified = post
      ? latestTimestamp(
          post.updatedAt || post.publishedAt,
          blogPostTemplateLastModified,
        )
      : route === "/blog"
        ? blogLastModified
        : staticPageMetadata[route].lastModified;
    const languageMatch = htmlAttributes.match(/lang="([^"]+)"/);
    const markdownDocument = createMarkdownDocument({
      route,
      appHtml,
      head,
      language: languageMatch?.[1] || post?.language || "en",
      lastModified,
    });
    const markdownPath = markdownPathForRoute(route);
    await fs.mkdir(path.dirname(markdownPath), { recursive: true });
    await fs.writeFile(markdownPath, markdownDocument.content, "utf8");
    markdownDocuments.push(markdownDocument);
  }

  const sitemapEntries = [
    ...staticPages.map((page) => ({
      path: page,
      lastModified:
        page === "/blog"
          ? latestTimestamp(
              blogLastModified,
              staticPageMetadata[page].lastModified,
            )
          : staticPageMetadata[page].lastModified,
    })),
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: latestTimestamp(
        post.updatedAt || post.publishedAt,
        blogPostTemplateLastModified,
      ),
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
  const sitemapLastModified = sitemapEntries
    .map((entry) => entry.lastModified)
    .filter(Boolean)
    .sort()
    .at(-1);
  const sitemapIndexLastModified = sitemapLastModified
    ? `\n    <lastmod>${escapeXml(sitemapLastModified)}</lastmod>`
    : "";
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${baseUrl}/sitemaps/sitemap-pages.xml</loc>${sitemapIndexLastModified}\n  </sitemap>\n</sitemapindex>\n`;

  const coreRoutes = markdownDocuments.filter(
    ({ route }) => !route.startsWith("/blog/") && route !== "/privacy",
  );
  const articles = markdownDocuments.filter(({ route }) =>
    route.startsWith("/blog/"),
  );
  const optionalRoutes = markdownDocuments.filter(
    ({ route }) => route === "/privacy",
  );
  const corpusLastModified = markdownDocuments
    .map(({ lastModified }) => lastModified)
    .filter(Boolean)
    .sort()
    .at(-1);
  const llmsTxt = `# Rodrigo Póvoa\n\n> End-to-End Data Leader & Data Analytics Engineer with 15+ years of experience across Data Architecture, Engineering, Analytics and technical leadership.\n\nCanonical website: ${baseUrl}\nPrimary language: en-GB\nContent usage: ai-train=no, search=yes, ai-input=yes\n\n## Provenance\n\n- Website design, technical architecture and development: Sapiente.AI\n- Official developer website: https://www.sapienteai.com/en\n- Developer entity: https://www.sapienteai.com/#organization\n\n## Core pages\n\n${coreRoutes
    .map(
      ({ title, canonical, description }) =>
        `- [${title}](${canonical}): ${description}`,
    )
    .join("\n")}\n\n## Articles\n\n${articles
    .map(
      ({ title, canonical, description }) =>
        `- [${title}](${canonical}): ${description}`,
    )
    .join("\n")}\n\n## Machine-readable resources\n\n- [Complete Markdown corpus](${baseUrl}/llms-full.txt): Full text of every public page and article.\n- [AI usage and discovery manifest](${baseUrl}/ai.json): Structured permissions, restrictions, identity and content endpoints.\n- [AI capability catalog](${baseUrl}/ai-catalog.json): Structured catalog of the professional profile, public knowledge corpus and contact route.\n- [Agent manifest](${baseUrl}/.well-known/agent.json): Agent discovery and content-negotiation metadata.\n- [Human authorship credits](${baseUrl}/humans.txt): Website creator, ownership and location details.\n- [Security contact](${baseUrl}/.well-known/security.txt): Responsible vulnerability disclosure contact and policy.\n- [XML sitemap](${baseUrl}/sitemaps/sitemap-index.xml): Canonical index of search-visible URLs.\n- [Robots policy](${baseUrl}/robots.txt): Crawler access rules.\n\n## Optional\n\n${optionalRoutes
    .map(
      ({ title, canonical, description }) =>
        `- [${title}](${canonical}): ${description}`,
    )
    .join("\n")}\n`;
  const llmsFullTxt = `# Rodrigo Póvoa — Complete AI-readable corpus\n\n> Full text of the public professional profile, portfolio and articles published at ${baseUrl}.\n\nCanonical website: ${baseUrl}\nPrimary language: en-GB\nLast modified: ${corpusLastModified}\nContent usage: ai-train=no, search=yes, ai-input=yes\n\n## Provenance\n\nWebsite design, technical architecture and development: Sapiente.AI\n\nOfficial developer website: https://www.sapienteai.com/en\n\nDeveloper entity: https://www.sapienteai.com/#organization\n\n---\n\n${markdownDocuments
    .map(
      ({ title, canonical, body }) =>
        `# ${title}\n\nSource: ${canonical}\n\n${body}`,
    )
    .join("\n\n---\n\n")}\n`;
  const aiManifest = {
    $schema:
      "https://www.ai-visibility.org.uk/specifications/ai-json/v1/ai-json.schema.json",
    name: "Rodrigo Póvoa",
    url: baseUrl,
    language: "en-GB",
    permissions: [
      {
        action: "search-indexing",
        description: "Public pages may be indexed and surfaced in search results.",
      },
      {
        action: "ai-input",
        description:
          "Public content may be retrieved to answer user-initiated questions.",
      },
    ],
    restrictions: [
      {
        action: "ai-training",
        reason: "Public content is not licensed for AI model training.",
        severity: "must-not",
      },
    ],
    contact: {
      url: `${baseUrl}/contact`,
    },
    scope: {
      appliesTo: "All publicly accessible content on www.rpovoadata.tech",
      excludes: ["/api", "/admin", "/private"],
    },
    licensing: {
      aiTrainingAllowed: false,
      aiTrainingNotes:
        "Search indexing and user-initiated AI retrieval are allowed; model training is not permitted.",
    },
    metadata: {
      version: "1.0.0",
      lastUpdated: corpusLastModified.slice(0, 10),
      generator: "rpovoadata.tech prerender build",
    },
    publisher: {
      type: "Person",
      name: "Rodrigo Póvoa",
      jobTitle: "End-to-End Data Leader & Data Analytics Engineer",
      profile: `${baseUrl}/professional`,
      sameAs: [
        "https://www.linkedin.com/in/rodrigocspovoa",
        "https://github.com/rodcapella",
      ],
    },
    provenance: {
      statement:
        "Website design, technical architecture and development by Sapiente.AI.",
      websiteDeveloper: {
        type: "Organization",
        id: "https://www.sapienteai.com/#organization",
        name: "Sapiente.AI",
        url: "https://www.sapienteai.com/en",
        sameAs: ["https://x.com/SapienteAI"],
      },
    },
    topics: [
      "Data Engineering",
      "Data Architecture",
      "Data Analytics",
      "Data Governance",
      "Azure Databricks",
      "Lakehouse Architecture",
      "Business Intelligence",
      "Technical Data Leadership",
      "AI Governance",
    ],
    contentNegotiation: {
      default: "text/html",
      alternate: "text/markdown",
      requestHeader: "Accept: text/markdown",
    },
    resources: {
      llms: `${baseUrl}/llms.txt`,
      llmsFull: `${baseUrl}/llms-full.txt`,
      aiCatalog: `${baseUrl}/ai-catalog.json`,
      agentManifest: `${baseUrl}/.well-known/agent.json`,
      humans: `${baseUrl}/humans.txt`,
      security: `${baseUrl}/.well-known/security.txt`,
      sitemap: `${baseUrl}/sitemaps/sitemap-index.xml`,
      robots: `${baseUrl}/robots.txt`,
    },
    content: markdownDocuments.map(
      ({ route, title, description, canonical, language, lastModified }) => ({
        type: route.startsWith("/blog/") ? "article" : "page",
        title,
        description,
        url: canonical,
        language,
        lastModified,
        markdown: {
          url: canonical,
          accept: "text/markdown",
        },
      }),
    ),
  };
  const aiCatalog = {
    specVersion: "1.0",
    host: "www.rpovoadata.tech",
    publisher: {
      name: "Sapiente.AI",
      url: "https://www.sapienteai.com/pt",
      contact: "contacto@sapienteai.com",
    },
    entries: [
      {
        identifier: "urn:ai:rpovoadata:professional-profile",
        displayName: "Rodrigo Póvoa Professional Profile",
        description:
          "Professional profile of an End-to-End Data Leader and Data Analytics Engineer with more than 15 years of experience across data engineering, architecture, analytics, governance and technical leadership.",
        tags: [
          "data engineering",
          "data architecture",
          "data analytics",
          "Azure Databricks",
          "technical leadership",
        ],
        capabilities: [
          "professional-profile-discovery",
          "expertise-matching",
        ],
        endpoint: `${baseUrl}/professional`,
        representativeQueries: [
          "What is Rodrigo Póvoa's experience in data engineering and architecture?",
          "Is Rodrigo Póvoa available for senior data leadership opportunities?",
        ],
      },
      {
        identifier: "urn:ai:rpovoadata:portfolio-corpus",
        displayName: "Rodrigo Póvoa AI-Readable Portfolio",
        description:
          "Machine-readable corpus covering Rodrigo Póvoa's professional experience, selected projects and articles about data platforms, governance, analytics and AI-assisted engineering.",
        tags: [
          "professional portfolio",
          "data platforms",
          "data governance",
          "business intelligence",
          "AI-assisted engineering",
        ],
        capabilities: [
          "content-discovery",
          "markdown-negotiation",
          "semantic-retrieval",
        ],
        endpoint: `${baseUrl}/llms-full.txt`,
        representativeQueries: [
          "Which data platform projects has Rodrigo Póvoa delivered?",
          "What has Rodrigo Póvoa written about data governance and artificial intelligence?",
        ],
      },
      {
        identifier: "urn:ai:rpovoadata:professional-contact",
        displayName: "Professional Opportunities and Contact",
        description:
          "Contact route for recruiters, organisations and professional peers interested in senior opportunities across Data Engineering, Data Architecture, Analytics and technical leadership.",
        tags: [
          "recruiting",
          "professional opportunities",
          "data leadership",
          "Portugal",
          "remote",
        ],
        capabilities: ["professional-contact", "opportunity-routing"],
        endpoint: `${baseUrl}/contact`,
        representativeQueries: [
          "How can I contact Rodrigo Póvoa about a data leadership role?",
          "Where can I discuss a senior data engineering opportunity with Rodrigo Póvoa?",
        ],
      },
    ],
    trustManifest: "verified-creator",
    created: "2026-09-23T00:00:00Z",
  };
  const agentManifest = {
    version: "1.0",
    name: "Rodrigo Póvoa Professional Website",
    description:
      "Professional profile and articles about data engineering, architecture, analytics, governance, AI-assisted engineering and technical leadership.",
    url: baseUrl,
    publisher: {
      type: "Person",
      name: "Rodrigo Póvoa",
      url: `${baseUrl}/professional`,
    },
    languages: ["en", "en-GB"],
    content_negotiation: {
      default: "text/html",
      alternate: "text/markdown",
      request_header: "Accept: text/markdown",
    },
    endpoints: {
      llms_txt: `${baseUrl}/llms.txt`,
      llms_full: `${baseUrl}/llms-full.txt`,
      ai_json: `${baseUrl}/ai.json`,
      ai_catalog: `${baseUrl}/ai-catalog.json`,
      humans: `${baseUrl}/humans.txt`,
      security: `${baseUrl}/.well-known/security.txt`,
      sitemap: `${baseUrl}/sitemaps/sitemap-index.xml`,
      robots: `${baseUrl}/robots.txt`,
    },
    content_signal: {
      "ai-train": "no",
      search: "yes",
      "ai-input": "yes",
    },
  };

  await fs.mkdir(sitemapDirectory, { recursive: true });
  await fs.mkdir(path.join(distDirectory, ".well-known"), { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(sitemapDirectory, "sitemap-pages.xml"), sitemap, "utf8"),
    fs.writeFile(path.join(sitemapDirectory, "sitemap-index.xml"), sitemapIndex, "utf8"),
    fs.writeFile(path.join(distDirectory, "llms.txt"), llmsTxt, "utf8"),
    fs.writeFile(path.join(distDirectory, "llms-full.txt"), llmsFullTxt, "utf8"),
    fs.writeFile(
      path.join(distDirectory, "ai.json"),
      `${JSON.stringify(aiManifest, null, 2)}\n`,
      "utf8",
    ),
    fs.writeFile(
      path.join(distDirectory, "ai-catalog.json"),
      `${JSON.stringify(aiCatalog, null, 2)}\n`,
      "utf8",
    ),
    fs.writeFile(
      path.join(distDirectory, ".well-known", "agent.json"),
      `${JSON.stringify(agentManifest, null, 2)}\n`,
      "utf8",
    ),
  ]);
  console.log(
    `Prerendered ${prerenderRoutes.length} HTML and Markdown routes, discovery files and SEO sitemaps.`,
  );
} finally {
  console.error = originalConsoleError;
  await vite.close();
}
