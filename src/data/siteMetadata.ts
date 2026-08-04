export const siteBaseUrl = "https://www.rpovoadata.tech";

export const staticPageMetadata: Record<
  string,
  { lastModified: string }
> = {
  "/": { lastModified: __PAGE_LAST_MODIFIED__["/"] },
  "/why-me": { lastModified: __PAGE_LAST_MODIFIED__["/why-me"] },
  "/professional": { lastModified: __PAGE_LAST_MODIFIED__["/professional"] },
  "/personal": { lastModified: __PAGE_LAST_MODIFIED__["/personal"] },
  "/side-projects": { lastModified: __PAGE_LAST_MODIFIED__["/side-projects"] },
  "/blog": { lastModified: __PAGE_LAST_MODIFIED__["/blog"] },
  "/privacy": { lastModified: __PAGE_LAST_MODIFIED__["/privacy"] },
  "/contact": { lastModified: __PAGE_LAST_MODIFIED__["/contact"] },
};

export const blogPostTemplateLastModified =
  __PAGE_LAST_MODIFIED__["/blog/:slug"];
