import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { profile } from "@/data/profile";
import SEO from "@/components/SEO";
import SectionLoader from "@/components/ui/SectionLoader";

interface ProfessionalProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

const ProfessionalIntro = lazy(() => import("@/components/layout/professional/ProfessionalIntro"));
const CoreCompetencesSection = lazy(() => import("@/components/layout/professional/CoreCompetencesSection"));
const TechStackSection = lazy(() => import("@/components/layout/professional/TechStackSection"));
const ExperienceTimeline = lazy(() => import("@/components/layout/professional/ExperienceTimeline"));
const EducationSection = lazy(() => import("@/components/layout/professional/EducationSection"));
const CertificationsSection = lazy(() => import("@/components/layout/professional/CertificationsSection"));
const LanguagesSection = lazy(() => import("@/components/layout/professional/LanguagesSection"));

const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

type SectionVariant = "default" | "muted" | "gradient" | "glass";

const maxYears = 20;

const Professional = ({ theme = "dark", onToggleTheme }: ProfessionalProps) => {

  const sections: {
    component: React.ReactNode;
    variant?: SectionVariant;
  }[] = [
    { component: <ProfessionalIntro /> },
    { component: <CoreCompetencesSection competences={profile.core_skills} />, variant: "muted" },
    { component: <TechStackSection maxYears={maxYears} techStack={profile.technical_stack} /> },
    { component: <ExperienceTimeline experiences={profile.experience} />, variant: "muted" },
    { component: <EducationSection education={profile.education} /> },
    { component: <CertificationsSection certifications={profile.certifications} />, variant: "muted" },
    { component: <LanguagesSection languages={profile.languages} />, variant: "glass" },
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

      {/* HERO PADRONIZADO */}
      <PageSection variant="gradient" className="pt-32 pb-16">
        <PageHero
          variant="page"
          title="PROFESSIONAL JOURNEY"
          subtitle="Experience Building Enterprise Data Platforms and Analytics Capabilities"
          image="/ai-portrait.webp"
        />
      </PageSection>

      {/* SECTIONS DINÂMICAS */}
      {sections.map((section, index) => (
        <Suspense key={index} fallback={<SectionLoader size="lg" />}>
          <PageSection variant={section.variant}>
            {section.component}
          </PageSection>
        </Suspense>
      ))}
    </MainLayout>
  );
};

export default Professional;