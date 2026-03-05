import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhatDrivesMe from "@/components/WhatDrivesMe";
import AboutMyCareer from "@/components/AboutMyCareer";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

interface IndexProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const Index = ({ theme = 'dark', onToggleTheme }: IndexProps) => {

  return (
    <div className="min-h-screen bg-background">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <WhatDrivesMe />
        <AboutMyCareer />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
