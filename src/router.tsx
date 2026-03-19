import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// pages
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Professional from "./pages/Professional";
import Personal from "./pages/Personal";
import WhyMe from "./pages/WhyMe";
import SideProjects from "./pages/SideProjects";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout principal
    children: [
      { index: true, element: <Index /> },
      { path: "contact", element: <Contact /> },
      { path: "professional", element: <Professional /> },
      { path: "personal", element: <Personal /> },
      { path: "why-me", element: <WhyMe /> },
      { path: "side-projects", element: <SideProjects /> },
    ],
  },
]);