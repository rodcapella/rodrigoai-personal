import type { ComponentType } from "react";

type PageModule = { default: ComponentType };

const routeLoaders: Record<string, () => Promise<PageModule>> = {
  "/blog": () => import("./pages/Blog"),
  "/contact": () => import("./pages/Contact"),
  "/personal": () => import("./pages/Personal"),
  "/privacy": () => import("./pages/Privacy"),
  "/professional": () => import("./pages/Professional"),
  "/side-projects": () => import("./pages/SideProjects"),
  "/why-me": () => import("./pages/WhyMe"),
};

export const loadInitialRoute = async (pathname: string) => {
  const loader = pathname.startsWith("/blog/")
    ? () => import("./pages/BlogPost")
    : routeLoaders[pathname];

  return loader ? (await loader()).default : undefined;
};
