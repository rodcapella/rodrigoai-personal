import type { RouteObject } from "react-router-dom";
import {
  lazy,
  Suspense,
  type ComponentType,
  type ReactNode,
} from "react";
import App from "./App";
import Index from "./pages/Index";

const Contact = lazy(() => import("./pages/Contact"));
const Professional = lazy(() => import("./pages/Professional"));
const Personal = lazy(() => import("./pages/Personal"));
const WhyMe = lazy(() => import("./pages/WhyMe"));
const SideProjects = lazy(() => import("./pages/SideProjects"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

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

const routePage = (
  path: string,
  lazyElement: ReactNode,
  initialPath?: string,
  InitialComponent?: ComponentType,
) => {
  const isInitialRoute =
    initialPath === path ||
    (path === "/blog/:slug" && initialPath?.startsWith("/blog/"));

  return isInitialRoute && InitialComponent
    ? <InitialComponent />
    : lazyPage(lazyElement);
};

export const createRoutes = (
  initialPath?: string,
  InitialComponent?: ComponentType,
): RouteObject[] => [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contact",
        element: routePage("/contact", <Contact />, initialPath, InitialComponent),
      },
      {
        path: "professional",
        element: routePage(
          "/professional",
          <Professional />,
          initialPath,
          InitialComponent,
        ),
      },
      {
        path: "personal",
        element: routePage("/personal", <Personal />, initialPath, InitialComponent),
      },
      {
        path: "why-me",
        element: routePage("/why-me", <WhyMe />, initialPath, InitialComponent),
      },
      {
        path: "side-projects",
        element: routePage(
          "/side-projects",
          <SideProjects />,
          initialPath,
          InitialComponent,
        ),
      },
      {
        path: "blog",
        element: routePage("/blog", <Blog />, initialPath, InitialComponent),
      },
      {
        path: "blog/:slug",
        element: routePage(
          "/blog/:slug",
          <BlogPost />,
          initialPath,
          InitialComponent,
        ),
      },
      {
        path: "privacy",
        element: routePage("/privacy", <Privacy />, initialPath, InitialComponent),
      },
    ],
  },
];

export const routes = createRoutes();
