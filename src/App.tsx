import { Routes, Route } from "react-router-dom";

import Index from "@/pages/Index";
import Personal from "@/pages/Personal";
import Professional from "@/pages/Professional";
import SideProjects from "@/pages/SideProjects";
import Contact from "@/pages/Contact";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/professional" element={<Professional />} />
      <Route path="/side-projects" element={<SideProjects />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default App;
