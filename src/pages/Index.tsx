import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/HeroSection";
import PageSection from "@/components/layout/PageSection";
import SectionLoader from "@/components/ui/SectionLoader";

import { Cpu, Award, Network, Database, Lightbulb, ShieldCheck, Brain, BarChart3, Workflow } from "@/lib/icons";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const CoreCompetencesSection = lazy(() => import("@/components/CoreCompetencesSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const WhatDrivesMe = lazy(() => import("@/components/WhatDrivesMe"));
const AboutMyCareer = lazy(() => import("@/components/AboutMyCareer"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

export default function Index() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

const competences = [
  { icon: Cpu, title: "Data Engineering" },
  { icon: Database, title: "Data Architecture" },
  { icon: Brain, title: "Data Analytics" },
  { icon: BarChart3, title: "Business Intelligence" },
  { icon: Award, title: "Data Governance" },
  { icon: Workflow, title: "Intelligent Automation" },
  { icon: Network, title: "System Integration" },
  { icon: Lightbulb, title: "Innovation & Strategy" },
  { icon: ShieldCheck, title: "AI Governance & Ethics" },
];

  const sections = [
    { component: <AboutSection /> },
    {
      component: <CoreCompetencesSection competences={competences} />,
      variant: "muted",
    },
    { component: <ProjectsSection /> },
    {
      component: <WhatDrivesMe />,
      variant: "muted",
    },
    { component: <AboutMyCareer /> },
    {
      component: <ContactSection />,
      variant: "glass",
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <Helmet>
        <title>
          Rodrigo Póvoa | Technical Data Leader & Data Analytics Engineer
        </title>

        <meta
          name="description"
          content="Rodrigo Póvoa is a Tech Leader and Data Analytics Engineer with 15+ years of experience designing scalable data platforms, AI-native systems and leading cross-functional teams across Europe."
        />
      </Helmet>

      <BreadcrumbSchema
        items={[{ name: "Home", url: "https://www.rpovoadata.tech/" }]}
      />

      <main id="main-content">
        <HeroSection
          onOpenChat={() => {
            console.warn("Chat not implemented yet");
          }}
        />

        {sections.map((section, index) => (
          <Suspense key={index} fallback={<SectionLoader />}>
            <PageSection variant={section.variant as any}>
              {section.component}
            </PageSection>
          </Suspense>
        ))}
      </main>
    </MainLayout>
  );
}