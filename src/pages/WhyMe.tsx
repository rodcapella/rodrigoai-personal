import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import SEO from "@/components/SEO";
import { Layers, Zap, Users, Target, Brain, Lightbulb  } from "@/lib/icons";

const WhyMe = ({ theme = "dark", onToggleTheme }: any) => {
  const differentiators = [
    {
      icon: Layers,
      title: "Three Levels of Mastery",
      description:
        "Enterprise BI → Analytics Engineering → Modern Data Platforms. I connect data architecture with real business insights—building decision platforms, not just pipelines.",
      highlight: "Few leaders operate across all three layers",
    },
    {
      icon: Target,
      title: "Architecture Over Tools",
      description:
        "Technology changes fast, but good engineering principles last decades. I solve problems at the architectural and organizational level—where real value lives.",
      highlight: "Most data problems aren't technical; they're structural",
    },
    {
      icon: Users,
      title: "People Amplified by AI",
      description:
        "AI and automation enhance human capability, they don't replace it. My philosophy centers on building systems where technology multiplies team effectiveness.",
      highlight: "Productivity through intelligent infrastructure",
    },
  ];

  const leadershipPillars = [
    {
      title: "Engineering First",
      description: "Principles over tools. Scalability over quick wins.",
    },
    {
      title: "Data Drives Decisions",
      description: "Platforms are strategic infrastructure.",
    },
    {
      title: "Human-Centered AI",
      description: "Technology amplifies capability.",
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Why Me ?"
        description="15+ years building data systems taught me one thing: data architecture defines organizational intelligence."
      />

      <Helmet>
        <title>Why Me? | Rodrigo Póvoa</title>
      </Helmet>

      <Suspense fallback={null}>
        <PageHero
          variant="page"
          title="WHY WORK WITH ME"
          subtitle="15+ years building data systems taught me one thing: data architecture defines organizational intelligence."
          image="/rodrigo_why_me.png"
        />

        {/* Leadership */}
        <PageSection title="Leadership Philosophy" icon={<Brain />}>
          <PageGrid cols={3}>
            {leadershipPillars.map((pillar, idx) => (
              <PageCard
                key={idx}
                title={pillar.title}
                description={pillar.description}
              />
            ))}
          </PageGrid>
        </PageSection>

        {/* Differentiators */}
        <PageSection
          title="What sets me apart"
          icon={<Zap />}
          variant="gradient"
        >
          <PageGrid cols={3}>
            {differentiators.map((diff, idx) => {
              const Icon = diff.icon;

              return (
                <PageCard
                  key={idx}
                  icon={<Icon />}
                  title={diff.title}
                  description={diff.description}
                  highlight={diff.highlight}
                />
              );
            })}
          </PageGrid>
        </PageSection>

        {/* Vision */}
        <PageSection title="My Vision" icon={<Lightbulb />}>
          <PageGrid cols={3}>
            <PageCard
              title="Architecture"
              description="Data Platforms → AI-Native Systems. From reactive analytics to proactive intelligence."
            />

            <PageCard
              title="Data as Products"
              description="Clear ownership, accountability, and trust."
            />

            <PageCard
              title="Impact"
              description="AI Amplifies Humans. Technology multiplies human capability and creativity."
            />
          </PageGrid>
        </PageSection>

        {/* Value */}
        <PageSection title="What This Means For You" icon={<Users />}>
          <PageGrid cols={3}>
            <PageCard
              title="AI-Ready Data Platforms"
              description="I design scalable architectures that support governance, analytics, and AI workloads from the same data foundation."
            />

            <PageCard
              title="Applied AI Exploration"
              description="Sapiente.AI serves as a laboratory for new architectures and experimental systems."
            />

            <PageCard
              title="Scaling Data Organizations"
              description="I build teams, define standards, and structure platforms for sustainable growth."
            />

            <PageCard
              title="Trustworthy Data Foundations"
              description="Reliable pipelines, consistent metrics, and strong governance frameworks."
            />

            <PageCard
              title="Data as Strategic Assets"
              description="Move from reporting to data products with ownership and measurable impact."
            />

            <PageCard
              title="AI in Production"
              description="Align engineering, governance, and architecture to move AI into real systems."
            />
          </PageGrid>
        </PageSection>
      </Suspense>
    </MainLayout>
  );
};

export default WhyMe;
