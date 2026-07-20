import type { RouteObject } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import App from "./App";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const Contact = lazy(() => import("./pages/Contact"));
const Professional = lazy(() => import("./pages/Professional"));
const Personal = lazy(() => import("./pages/Personal"));
const WhyMe = lazy(() => import("./pages/WhyMe"));
const SideProjects = lazy(() => import("./pages/SideProjects"));
const Privacy = lazy(() => import("./pages/Privacy"));

const lazyPage = (page: ReactNode) => (
  <Suspense
    fallback={
      <div
        className="min-h-screen bg-background"
        role="status"
        aria-label="Loading page"
      />
    }
  >
    {page}
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: "contact", element: lazyPage(<Contact />) },
      { path: "professional", element: lazyPage(<Professional />) },
      { path: "personal", element: lazyPage(<Personal />) },
      { path: "why-me", element: lazyPage(<WhyMe />) },
      { path: "side-projects", element: lazyPage(<SideProjects />) },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "privacy", element: lazyPage(<Privacy />) },
    ],
  },
];
