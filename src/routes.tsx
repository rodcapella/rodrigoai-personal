import type { RouteObject } from "react-router-dom";
import App from "./App";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Professional from "./pages/Professional";
import Personal from "./pages/Personal";
import WhyMe from "./pages/WhyMe";
import SideProjects from "./pages/SideProjects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: "contact", element: <Contact /> },
      { path: "professional", element: <Professional /> },
      { path: "personal", element: <Personal /> },
      { path: "why-me", element: <WhyMe /> },
      { path: "side-projects", element: <SideProjects /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "privacy", element: <Privacy /> },
    ],
  },
];
