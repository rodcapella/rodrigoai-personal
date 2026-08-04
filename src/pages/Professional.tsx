import { lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { profile } from "@/data/profile";
import SEO from "@/components/SEO";
import SectionLoader from "@/components/ui/SectionLoader";

const ProfessionalIntro = lazy(() => import("@/components/layout/professional/ProfessionalIntro"));
const ExperienceEnvironmentsSection = lazy(() => import("@/components/layout/professional/ExperienceEnvironmentsSection"));
const TechStackSection = lazy(() => import("@/components/layout/professional/TechStackSection"));
const ExperienceTimeline = lazy(() => import("@/components/layout/professional/ExperienceTimeline"));
const EducationSection = lazy(() => import("@/components/layout/professional/EducationSection"));
const CertificationsSection = lazy(() => import("@/components/layout/professional/CertificationsSection"));
const LanguagesSection = lazy(() => import("@/components/layout/professional/LanguagesSection"));

type SectionVariant = "default" | "muted" | "gradient" | "glass";

export default function Professional() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  const sections: {
    component: React.ReactNode;
    variant?: SectionVariant;
  }[] = [
    { component: <ProfessionalIntro /> },
    {
      component: <ExperienceEnvironmentsSection />,
      variant: "muted",
    },
    {
      component: (
        <TechStackSection techStack={profile.technical_stack} />
      ),
    },
    {
      component: <ExperienceTimeline experiences={profile.experience} />,
      variant: "muted",
    },
    {
      component: <EducationSection education={profile.education} />,
    },
    {
      component: <CertificationsSection certifications={profile.certifications} />,
      variant: "muted",
    },
    {
      component: <LanguagesSection languages={profile.languages} />,
      variant: "glass",
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Professional"
        description="Explore Rodrigo Póvoa's 15+ year journey from Enterprise BI and distributed Big Data ecosystems to Azure Databricks Lakehouse architecture and end-to-end data leadership."
      />

      <Helmet>
        <title>
          Professional Experience | Rodrigo Póvoa - End-to-End Data Leader
        </title>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.rpovoadata.tech/" },
          {
            name: "Professional",
            url: "https://www.rpovoadata.tech/professional",
          },
        ]}
      />

      {/* HERO */}
      <PageSection variant="gradient" spacing="none" className="pt-12 pb-6 md:pt-16 md:pb-8">
        <PageHero
          variant="page"
          title="PROFESSIONAL JOURNEY"
          subtitle="Experience Building Enterprise Data Platforms and Analytics Capabilities"
          image="/ai-portrait.webp"
        />
      </PageSection>

      {/* SECTIONS */}
      {sections.map((section, index) => (
        <Suspense key={index} fallback={<SectionLoader />}>
          <PageSection
            variant={section.variant}
            spacing="none"
            container={false}
          >
            {section.component}
          </PageSection>
        </Suspense>
      ))}
    </MainLayout>
  );
}
