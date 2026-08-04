import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import SEO from "@/components/SEO";
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

type SectionVariant = "default" | "muted" | "gradient" | "glass";

function DeferredSection({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "160px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={containerRef} className={isVisible ? "" : "min-h-[280px]"}>
      {isVisible ? children : null}
    </div>
  );
}

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

  const sections: { component: React.ReactNode; variant?: SectionVariant }[] = [
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
      <SEO
        title="Rodrigo Póvoa | End-to-End Data Leader & Data Analytics Engineer"
        description="Rodrigo Póvoa is an End-to-End Data Leader with 15+ years across data architecture, engineering and analytics, from enterprise data warehousing to Azure Databricks Lakehouse platforms."
        keywords="Rodrigo Póvoa, end-to-end data leader, data analytics engineer, data architecture, Azure Databricks, Lakehouse, data governance"
      />

      <BreadcrumbSchema
        items={[{ name: "Home", url: "https://www.rpovoadata.tech/" }]}
      />

      <div>
        <HeroSection
          onOpenChat={() => {
            console.warn("Chat not implemented yet");
          }}
        />

        {sections.map((section, index) => (
          <Suspense key={index} fallback={<SectionLoader />}>
            <PageSection
              variant={section.variant}
              spacing="none"
              container={false}
            >
              {index < 2 ? (
                section.component
              ) : (
                <DeferredSection>{section.component}</DeferredSection>
              )}
            </PageSection>
          </Suspense>
        ))}
      </div>
    </MainLayout>
  );
}
