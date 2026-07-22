import { Suspense, type ReactNode } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import CompactHighlightSection from "@/components/layout/CompactHighlightSection";
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

type Section =
  | {
      useNewLayout: true;
      title: string;
      icon: ReactNode;
      content: ReactNode;
      variant?: "default" | "gradient";
    }
  | {
      useNewLayout?: false;
      title?: string;
      icon?: ReactNode;
      content: ReactNode;
      variant?: SectionVariant;
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
        "From Enterprise BI to Analytics Engineering to Modern Data Platforms, I connect architecture with real business insight.",
    },
    {
      icon: Target,
      title: "Architecture Over Tools",
      description:
        "Tools change fast, but engineering principles last. I solve problems at the architectural and organizational level, where long-term value is created.",
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
        "I take responsibility from problem definition to production impact, ensuring solutions are built, adopted, trusted, and measurable.",
    },
    {
      icon: Sparkles,
      title: "Relentless Focus on Quality",
      description:
        "I don’t settle for working solutions. I push for robust, scalable, and elegant systems.",
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
            My leadership philosophy is grounded in an <strong>Engineering First</strong> mindset, where decisions are guided by strong principles, scalability, and long-term value. I believe that <strong>Data Drives Decisions</strong>, meaning data platforms are not just technical assets, but strategic infrastructure that should help shape how organizations operate and evolve.
          </p>

          <p>
            In high-pressure environments, I value <strong>Calm & Clarity Under Pressure</strong>, staying composed and thoughtful to support better decisions, stronger teams, and more sustainable outcomes. This is reinforced by <strong>Empathy & Understanding</strong>, because great systems are built by people, and good leadership starts with listening, context, and respect.
          </p>

          <p>
            Finally, <strong>Human-Centered AI</strong> reflects my belief that technology should amplify human capability, helping people perform at higher levels and achieve more meaningful results.
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
            description="I treat data with the same rigor as software: contracts, SLAs, and discoverability."
          />
          <PageCard
            title="AI-Native Architecture"
            icon={<Cpu />}
            description=" I help move from passive platforms to proactive AI-native systems with real-time intelligence."
          />
          <PageCard
            title="Human-AI Augmentation"
            icon={<Users />}
            description="I see AI as a multiplier of strategy and execution, not a replacement."
          />
          <PageCard
            title="Trust & Governance"
            icon={<ShieldCheck />}
            description="I design for security, lineage, and explainability from the start."
          />
        </PageGrid>
      ),
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Why Me?"
        description="Why work with Rodrigo Póvoa: 15+ years building data platforms, combining architecture expertise, AI-driven thinking and business-focused engineering." 
      />

      <Helmet>
        <title>Why Me? | Rodrigo Póvoa</title>
      </Helmet>

      <PageSection variant="gradient" spacing="none" className="pt-12 pb-6 md:pt-16 md:pb-8">
        <PageHero
          variant="page"
          title="WHY WORK WITH ME"
          subtitle="15+ years building data systems taught me one thing: architecture shapes how organizations think, decide, and scale."
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

      <CompactHighlightSection>
        <p className="max-w-4xl text-lg font-medium leading-relaxed text-foreground/90 md:text-xl">
          My goal is simple: build data platforms that people trust, businesses
          rely on, and teams can scale with confidence.
        </p>
      </CompactHighlightSection>
    </MainLayout>
  );
}
