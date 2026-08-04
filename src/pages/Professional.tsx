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
import DirectAnswersSection from "@/components/layout/DirectAnswersSection";
import { ProfilePageSchema } from "@/components/seo/ProfilePageSchema";
import { MessageCircle } from "@/lib/icons";
import { staticPageMetadata } from "@/data/siteMetadata";

const ProfessionalIntro = lazy(() => import("@/components/layout/professional/ProfessionalIntro"));
const ExperienceEnvironmentsSection = lazy(() => import("@/components/layout/professional/ExperienceEnvironmentsSection"));
const LeadershipBeyondTechnologySection = lazy(() => import("@/components/layout/professional/LeadershipBeyondTechnologySection"));
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
    { component: <LeadershipBeyondTechnologySection /> },
    {
      component: (
        <DirectAnswersSection
          title="Professional Snapshot"
          icon={<MessageCircle />}
          variant="muted"
          answers={[
            {
              question: "What professional roles am I targeting?",
              answer:
                "Senior and leadership opportunities across Data Engineering, Data Architecture and Analytics.",
            },
            {
              question: "What is my core technical specialization?",
              answer:
                "End-to-end data platforms, from ingestion and orchestration to governance and analytics, with a strong focus on Azure Databricks Lakehouse architectures.",
            },
            {
              question: "What environments have I worked in?",
              answer:
                "Large enterprises, consulting, international banking, retail, digital businesses and technology startups in both regulated and fast-moving contexts.",
            },
          ]}
        />
      ),
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
        description="Explore Rodrigo Póvoa's end-to-end data career, combining Azure Databricks architecture, hands-on engineering, multidisciplinary team leadership and business-focused delivery."
        keywords="Rodrigo Póvoa, end-to-end data leader, technical data leadership, multidisciplinary data teams, stakeholder management, solution scoping, Azure Databricks architecture"
      />

      <ProfilePageSchema
        path="/professional"
        name="Rodrigo Póvoa — Professional Experience"
        description="Professional profile covering end-to-end data engineering, architecture, analytics and technical leadership."
        dateModified={staticPageMetadata["/professional"].lastModified!}
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
          imageFit="contain"
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
