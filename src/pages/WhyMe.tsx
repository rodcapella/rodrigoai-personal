import { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import SEO from "@/components/SEO";
import SectionContent from "@/components/layout/SectionContent";

import {
  Layers,
  Zap,
  Users,
  Target,
  Brain,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Cpu,
  Package,
} from "@/lib/icons";

const layers = ["layer-yellow", "layer-blue", "layer-purple", "layer-green"];

const CustomSectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

type SectionVariant = "default" | "muted" | "gradient" | "glass";

type Section = {
  title?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  variant?: SectionVariant;
  useNewLayout?: boolean;
};

export default function WhyMe() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  const differentiators = [
    {
      icon: Layers,
      title: "Three Levels of Mastery",
      description:
        "Enterprise BI → Analytics Engineering → Modern Data Platforms. I connect data architecture with real business insights, building decision platforms not just pipelines.",
    },
    {
      icon: Target,
      title: "Architecture Over Tools",
      description:
        "Technology changes fast, but good engineering principles last decades. I solve problems at the architectural and organizational level, where real value lives.",
    },
    {
      icon: Users,
      title: "People Amplified by AI",
      description:
        "AI and automation enhance human capability, they don't replace it. My philosophy centers on building systems where technology multiplies team effectiveness.",
    },
    {
      icon: ShieldCheck,
      title: "End-to-End Ownership",
      description:
        "I take full responsibility from problem definition to production impact—ensuring solutions are not only built, but adopted, trusted and measurable.",
    },
    {
      icon: Sparkles,
      title: "Relentless Focus on Quality",
      description:
        "I don’t settle for 'working solutions'. I push for robust, scalable and elegant systems. Always aiming for the best possible implementation.",
    },
    {
      icon: BarChart3,
      title: "Business-Driven Engineering",
      description:
        "I translate complex data systems into clear business value, always aligning engineering decisions with measurable outcomes and strategic goals.",
    },
  ];

  const sections: Section[] = [
    {
      title: "Leadership Philosophy",
      icon: <Brain />,
      useNewLayout: true,
      content: (
        <div className="w-full space-y-6 text-muted-foreground text-lg leading-relaxed text-justify">
          <p>
            This leadership philosophy is grounded in an <strong>Engineering First</strong> mindset, where decisions are driven by strong principles and a focus on scalability rather than short-term gains. In parallel, <strong>Data Drives Decisions</strong> emphasizes that platforms are not just tools, but strategic infrastructure that should guide how organizations think, operate and evolve.
          </p>

          <p>
            In high-pressure environments, <strong>Calm & Clarity Under Pressure</strong> highlights the importance of maintaining a composed and thoughtful approach, enabling better decisions, stronger teams and more sustainable outcomes. This is reinforced by <strong>Empathy & Understanding</strong>, recognizing that great systems are built by people.
          </p>

          <p>
            Finally, <strong>Human-Centered AI</strong> reflects the belief that technology should amplify human capability—empowering people to achieve higher levels of performance and innovation.
          </p>
        </div>
      ),
    },
    {
      title: "What sets me apart",
      icon: <Zap />,
      variant: "muted",
      content: (
        <PageGrid cols={3}>
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;

            return (
              <PageCard
                key={idx}
                icon={<Icon />}
                title={diff.title}
                description={diff.description}
                className={`${layers[idx % 4]} group`}
              />
            );
          })}
        </PageGrid>
      ),
    },
    {
      title: "Strategic Vision",
      icon: <Lightbulb />,
      content: (
        <PageGrid cols={3}>
          <PageCard
            title="Data as a Product"
            icon={<Package />}
            description="Treating data with the same rigor as software: SLAs, contracts and discoverability."
          />
          <PageCard
            title="AI-Native Architecture"
            icon={<Cpu />}
            description="From passive platforms to proactive AI-native systems with real-time intelligence."
          />
          <PageCard
            title="Human-AI Augmentation"
            icon={<Users />}
            description="AI as a multiplier of human strategy, not a replacement."
          />
          <PageCard
            title="Trust & Governance"
            icon={<ShieldCheck />}
            description="Security, lineage and explainability by design."
          />
        </PageGrid>
      ),
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Why Me?"
        description="15+ years building data systems taught me one thing: data architecture defines organizational intelligence."
      />

      <Helmet>
        <title>Why Me? | Rodrigo Póvoa</title>
      </Helmet>

      <PageSection variant="gradient" className="pt-32 pb-16">
        <PageHero
          variant="page"
          title="WHY WORK WITH ME"
          subtitle="15+ years building data systems taught me one thing: data architecture defines organizational intelligence."
          image="/rodrigo_why_me.webp"
        />
      </PageSection>

      {sections.map((section, index) => {
        const isNewLayout = section.useNewLayout;

        return (
          <Suspense key={index} fallback={<CustomSectionLoader />}>
            {isNewLayout && section.title ? (
              <SectionContent
                title={section.title}
                icon={section.icon}
                variant={section.variant}
                centered={false}
              >
                {section.content}
              </SectionContent>
            ) : (
              <PageSection
                title={section.title}
                icon={section.icon}
                variant={section.variant}
              >
                {section.content}
              </PageSection>
            )}
          </Suspense>
        );
      })}
    </MainLayout>
  );
}