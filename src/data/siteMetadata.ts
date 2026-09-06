export const siteBaseUrl = "https://www.rpovoadata.tech";

export const staticPageMetadata: Record<
  string,
  { dateCreated?: string; lastModified: string }
> = {
  "/": { lastModified: __PAGE_LAST_MODIFIED__["/"] },
  "/why-me": {
    dateCreated: "2026-03-10T07:48:32-04:00",
    lastModified: __PAGE_LAST_MODIFIED__["/why-me"],
  },
  "/professional": {
    dateCreated: "2026-03-02T05:45:09-05:00",
    lastModified: __PAGE_LAST_MODIFIED__["/professional"],
  },
  "/personal": { lastModified: __PAGE_LAST_MODIFIED__["/personal"] },
  "/side-projects": { lastModified: __PAGE_LAST_MODIFIED__["/side-projects"] },
  "/blog": { lastModified: __PAGE_LAST_MODIFIED__["/blog"] },
  "/privacy": { lastModified: __PAGE_LAST_MODIFIED__["/privacy"] },
  "/contact": { lastModified: __PAGE_LAST_MODIFIED__["/contact"] },
};

export const blogPostTemplateLastModified =
  __PAGE_LAST_MODIFIED__["/blog/:slug"];
