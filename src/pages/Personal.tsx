import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";

interface PersonalProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

const PersonalPhilosophy = lazy(
  () => import("@/components/layout/personal/PersonalPhilosophy")
);

const LifeRelocation = lazy(
  () => import("@/components/layout/personal/LifeRelocation")
);

const HobbiesSection = lazy(
  () => import("@/components/layout/personal/HobbiesSection")
);

const SportsSection = lazy(
  () => import("@/components/layout/personal/SportsSection")
);

const ValuesSection = lazy(
  () => import("@/components/layout/personal/ValuesSection")
);

const InfluencesSection = lazy(
  () => import("@/components/layout/personal/InfluencesSection")
);

const VisionSection = lazy(
  () => import("@/components/layout/personal/VisionSection")
);

const AIExplorationSection = lazy(
  () => import("@/components/layout/personal/AIExplorationSection")
);

const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Personal = ({ theme = "dark", onToggleTheme }: PersonalProps) => {
  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <Helmet>
        <title>
          Personal | Rodrigo Póvoa – Values, Vision & AI Exploration
        </title>

        <meta
          name="description"
          content="Personal profile of Rodrigo Póvoa — exploring philosophy, leadership values, cultural influences, sports passion and AI ecosystem experimentation."
        />

        <link rel="canonical" href="https://www.rpovoadata.tech/personal" />
      </Helmet>

      <PageHero
        variant="page"
        title="PERSONAL"
        subtitle="I combine analytical rigor with cultural curiosity, balancing engineering with interests in music, sports and long-term vision."
        image="/rodrigo_flamengo_porto.png"
      />

      <Suspense fallback={<SectionLoader />}>
        <PageSection>
          <PersonalPhilosophy />
        </PageSection>

        <PageSection>
          <LifeRelocation />
        </PageSection>

        <PageSection>
          <HobbiesSection />
        </PageSection>

        <PageSection>
          <SportsSection />
        </PageSection>

        <PageSection>
          <ValuesSection />
        </PageSection>

        <PageSection>
          <InfluencesSection />
        </PageSection>

        <PageSection>
          <VisionSection />
        </PageSection>

        <PageSection>
          <AIExplorationSection />
        </PageSection>
      </Suspense>
    </MainLayout>
  );
};

export default Personal;
