import { next, rewrite } from "@vercel/functions";

const markdownRoutes = new Map([
  ["/", "/markdown/index.md"],
  ["/why-me", "/markdown/why-me.md"],
  ["/professional", "/markdown/professional.md"],
  ["/personal", "/markdown/personal.md"],
  ["/side-projects", "/markdown/side-projects.md"],
  ["/blog", "/markdown/blog.md"],
  ["/privacy", "/markdown/privacy.md"],
  ["/contact", "/markdown/contact.md"],
]);

const markdownPathFor = (pathname) => {
  const normalizedPath =
    pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
  const staticDestination = markdownRoutes.get(normalizedPath);

  if (staticDestination) return staticDestination;

  if (/^\/blog\/[a-z0-9-]+$/i.test(normalizedPath)) {
    return `/markdown${normalizedPath}.md`;
  }

  return null;
};

export default function middleware(request) {
  const accept = request.headers.get("accept")?.toLowerCase() || "";
  const markdownPath = markdownPathFor(new URL(request.url).pathname);

  if (!markdownPath || !accept.includes("text/markdown")) {
    return next();
  }

  return rewrite(new URL(markdownPath, request.url), {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Location": markdownPath,
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/why-me",
    "/professional",
    "/personal",
    "/side-projects",
    "/blog",
    "/blog/:path*",
    "/privacy",
    "/contact",
  ],
};
