import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import SEO from "@/components/SEO";
import { Layers, Zap, Users, Target, Brain, Lightbulb, ShieldCheck, Sparkles, BarChart3  } from "@/lib/icons";

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
    {
      icon: ShieldCheck,
      title: "End-to-End Ownership",
      description:
        "I take full responsibility from problem definition to production impact—ensuring solutions are not only built, but adopted, trusted and measurable.",
      highlight: "From idea to impact, not just implementation",
    },
    {
      icon: Sparkles,
      title: "Relentless Focus on Quality",
      description:
        "I don’t settle for 'working solutions'. I push for robust, scalable and elegant systems—always aiming for the best possible implementation.",
      highlight: "Good enough is never the finish line",
    },
    {
      icon: BarChart3,
      title: "Business-Driven Engineering",
      description:
        "I translate complex data systems into clear business value—aligning engineering decisions with measurable outcomes and strategic goals.",
      highlight: "Bridging the gap between data and decisions",
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
    title: "Calm & Clarity Under Pressure",
    description: "A composed and thoughtful approach to challenges, enabling better decisions, stronger teams and sustainable outcomes.",
    },
    {
      title: "Empathy & Understanding",
      description: "Great systems are built by people. I value listening, understanding different perspectives and creating environments where individuals can thrive.",
    },
    {
      title: "Human-Centered AI",
      description: "Technology amplifies capability.",
    },
  ];

  const sections: {
    component: React.ReactNode;
    variant?: SectionVariant;
  }[] = [
    {
      component: (
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
      ),
    },
    {
      component: (
        <PageSection title="What sets me apart" icon={<Zap />}>
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
      ),
      variant: "muted",
    },
    {
      component: (
        <PageSection title="My Vision" icon={<Lightbulb />}>
          <PageGrid cols={3}>
            <PageCard
              title="Architecture"
              description="Data Platforms → AI-Native Systems..."
            />
            <PageCard
              title="Data as Products"
              description="Clear ownership, accountability, and trust."
            />
            <PageCard
              title="Impact"
              description="AI Amplifies Humans..."
            />
          </PageGrid>
        </PageSection>
      ),
    },
    {
      component: (
        <PageSection title="What This Means For You" icon={<Users />}>
          <PageGrid cols={3}>
            <PageCard title="AI-Ready Data Platforms" description="..." />
            <PageCard title="Applied AI Exploration" description="..." />
            <PageCard title="Scaling Data Organizations" description="..." />
            <PageCard title="Trustworthy Data Foundations" description="..." />
            <PageCard title="Data as Strategic Assets" description="..." />
            <PageCard title="AI in Production" description="..." />
          </PageGrid>
        </PageSection>
      ),
      variant: "glass",
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

      {/* HERO PADRONIZADO */}
      <PageSection variant="gradient" className="pt-32 pb-16">
        <PageHero
          variant="page"
          title="WHY WORK WITH ME"
          subtitle="15+ years building data systems taught me one thing: data architecture defines organizational intelligence."
          image="/rodrigo_why_me.webp"
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
};

export default WhyMe;
