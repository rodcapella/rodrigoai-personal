import { lazy, Suspense } from "react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import PageHero from "@/components/layout/PageHero";
import { profile } from "@/data/profile";

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

interface ProfessionalProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

const maxYears = 20;

const Professional = ({ theme = "dark", onToggleTheme }: ProfessionalProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Professional Experience | Rodrigo Póvoa</title>
        <meta
          name="description"
          content="15+ years experience in data engineering, analytics platforms and architecture."
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

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-36 pb-24">
        <PageHero
          variant="page"
          title="PROFESSIONAL JOURNEY"
          subtitle="Experience Building Enterprise Data Platforms and Analytics Capabilities"
          image="/ai-portrait.jpeg"
        />

        <Suspense fallback={<SectionLoader />}>
          <div className="max-w-6xl mx-auto space-y-28 px-4">
            <ProfessionalIntro />

            <CoreCompetencesSection competences={profile.core_skills} />

            <TechStackSection
              maxYears={maxYears}
              techStack={profile.technical_stack}
            />

            <ExperienceTimeline experiences={profile.experience} />

            <EducationSection education={profile.education} />

            <CertificationsSection certifications={profile.certifications} />

            <LanguagesSection languages={profile.languages} />
          </div>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Professional;