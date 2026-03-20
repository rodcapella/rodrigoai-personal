import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import SectionLoader from "@/components/ui/SectionLoader";

interface PersonalProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

const PersonalPhilosophy = lazy(() => import("@/components/layout/personal/PersonalPhilosophy"));
const CuriosityStackSection = lazy(() => import("@/components/layout/personal/CuriosityStackSection"));
const LifeRelocation = lazy(() => import("@/components/layout/personal/LifeRelocation"));
const HobbiesSection = lazy(() => import("@/components/layout/personal/HobbiesSection"));
const SportsSection = lazy(() => import("@/components/layout/personal/SportsSection"));
const ValuesSection = lazy(() => import("@/components/layout/personal/ValuesSection"));
const InfluencesSection = lazy(() => import("@/components/layout/personal/InfluencesSection"));
const VisionSection = lazy(() => import("@/components/layout/personal/VisionSection"));
const AIExplorationSection = lazy(() => import("@/components/layout/personal/AIExplorationSection"));

const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

type SectionVariant = "default" | "muted" | "gradient" | "glass";

const Personal = ({ theme = "dark", onToggleTheme }: PersonalProps) => {
  
  const sections: {
    component: React.ReactNode;
    variant?: SectionVariant;
  }[] = [
    { component: <PersonalPhilosophy /> },
    { component: <LifeRelocation />, variant: "muted" },
    { component: <HobbiesSection /> },
    { component: <SportsSection />, variant: "muted" },
    { component: <ValuesSection /> },
    { component: <InfluencesSection />, variant: "muted" },
    { component: <VisionSection /> },
    { component: <AIExplorationSection />, variant: "muted" },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Personal"
        description="I combine analytical rigor with cultural curiosity, balancing engineering with interests in music, sports and long-term vision."
      />

      <Helmet>
        <title>Personal | Rodrigo Póvoa – Values, Vision & AI Exploration</title>

        <meta
          name="description"
          content="Personal profile of Rodrigo Póvoa — exploring philosophy, leadership values, cultural influences, sports passion and AI ecosystem experimentation."
        />

        <link rel="canonical" href="https://www.rpovoadata.tech/personal" />
      </Helmet>

      {/* HERO PADRONIZADO */}
      <PageSection variant="gradient" className="pt-32 pb-16">
        <PageHero
          variant="page"
          title="PERSONAL"
          subtitle="I combine analytical rigor with cultural curiosity, balancing engineering with interests in music, sports and long-term vision."
          image="/rodrigo_flamengo_porto.png"
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

export default Personal;