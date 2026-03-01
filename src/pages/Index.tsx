import { useState, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const ChatWidget = lazy(() => import("@/components/ChatWidget"));

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection onOpenChat={() => setChatOpen(true)} />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen((o) => !o)} />
      </Suspense>
    </div>
  );
};

export default Index;
