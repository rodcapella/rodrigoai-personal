import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { profile } from "@/data/profile";
import SEO from "@/components/SEO";

const ProfessionalIntro = lazy(
  () => import("@/components/layout/professional/ProfessionalIntro")
);
const CoreCompetencesSection = lazy(
  () => import("@/components/layout/professional/CoreCompetencesSection")
);
const TechStackSection = lazy(
  () => import("@/components/layout/professional/TechStackSection")
);
const ExperienceTimeline = lazy(
  () => import("@/components/layout/professional/ExperienceTimeline")
);
const EducationSection = lazy(
  () => import("@/components/layout/professional/EducationSection")
);
const CertificationsSection = lazy(
  () => import("@/components/layout/professional/CertificationsSection")
);
const LanguagesSection = lazy(
  () => import("@/components/layout/professional/LanguagesSection")
);

const SectionLoader = () => (
  <div className="text-muted-foreground py-10 animate-pulse text-center">
    Loading section...
  </div>
);

const maxYears = 20;

const Professional = ({ theme = "dark", onToggleTheme }: any) => {
  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Professional"
        description="Over 15 years leading data engineering projects, building Azure Databricks platforms and scalable analytics architectures in Europe and Brazil."
      />
      <Helmet>
        <title>
          Professional Experience | Rodrigo Póvoa - Data Analytics Engineer
          Leader
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

      <PageHero
        variant="page"
        title="PROFESSIONAL JOURNEY"
        subtitle="Experience Building Enterprise Data Platforms and Analytics Capabilities"
        image="/ai-portrait.webp"
      />

      <Suspense fallback={<SectionLoader />}>
        <PageSection>
          <ProfessionalIntro />
        </PageSection>

        <PageSection title="Core Competences">
          <CoreCompetencesSection competences={profile.core_skills} />
        </PageSection>

        <PageSection title="Technology Stack">
          <TechStackSection
            maxYears={maxYears}
            techStack={profile.technical_stack}
          />
        </PageSection>

        <PageSection title="Professional Experience">
          <ExperienceTimeline experiences={profile.experience} />
        </PageSection>

        <PageSection title="Education">
          <EducationSection education={profile.education} />
        </PageSection>

        <PageSection title="Certifications">
          <CertificationsSection certifications={profile.certifications} />
        </PageSection>

        <PageSection title="Languages">
          <LanguagesSection languages={profile.languages} />
        </PageSection>
      </Suspense>
    </MainLayout>
  );
};

export default Professional;
