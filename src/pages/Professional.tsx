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
const TechStackSection = lazy(() => import("@/components/layout/professional/TechStackSection"));
const ExperienceTimeline = lazy(() => import("@/components/layout/professional/ExperienceTimeline"));
const EducationSection = lazy(() => import("@/components/layout/professional/EducationSection"));
const CertificationsSection = lazy(() => import("@/components/layout/professional/CertificationsSection"));
const LanguagesSection = lazy(() => import("@/components/layout/professional/LanguagesSection"));

type SectionVariant = "default" | "muted" | "gradient" | "glass";

const maxYears = 20;

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
      component: (
        <TechStackSection
          maxYears={maxYears}
          techStack={profile.technical_stack}
        />
      ),
      variant: "muted",
    },
    { component: <ExperienceTimeline experiences={profile.experience} /> },
    {
      component: <EducationSection education={profile.education} />,
      variant: "muted",
    },
    { component: <CertificationsSection certifications={profile.certifications} /> },
    {
      component: <LanguagesSection languages={profile.languages} />,
      variant: "glass",
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Professional"
        description="Over 15 years leading data engineering projects, building Azure Databricks platforms and scalable analytics architectures in Europe and Brazil."
      />

      <Helmet>
        <title>
          Professional Experience | Rodrigo Póvoa - Data Analytics Engineer Leader
        </title>
        <meta
          name="description"
          content="Over 15 years leading data engineering projects, building Azure Databricks platforms and scalable analytics architectures in Europe and Brazil."
        />
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
      <PageSection variant="gradient" className="pt-32 pb-16">
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
          <PageSection variant={section.variant}>
            {section.component}
          </PageSection>
        </Suspense>
      ))}
    </MainLayout>
  );
}