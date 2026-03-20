import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import SEO from "@/components/SEO";
import SectionLoader from "@/components/ui/SectionLoader";
import { Layers, Zap, Users, Target, Brain, Lightbulb, ShieldCheck, Sparkles, BarChart3  } from "@/lib/icons";

const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
    <PageSection title="Strategic Vision" icon={<Lightbulb />}>
      <PageGrid cols={3}>
        <PageCard
          title="AI-Native Architecture"
          icon={<Cpu />}
          description="Transitioning from passive Data Platforms to proactive AI-Native Systems. Building event-driven backends and vector-ready infrastructures for RAG and Real-Time LLM integration."
        />
        <PageCard
          title="Data as a Product"
          icon={<Package />}
          description="Shifting ownership to the source. Treating data with the same rigor as software: clear SLAs, robust Data Contracts, and high-fidelity discovery for seamless consumption."
        />
        <PageCard
          title="Human-AI Augmentation"
          icon={<Users />}
          description="Focusing on the synergy between machine intelligence and human intuition. AI shouldn't just automate tasks; it should amplify human strategic potential and creative output."
        />
        <PageCard
          title="Trust & Governance"
          icon={<ShieldCheck />}
          description="Ensuring ethical AI through 'Security by Design'. Implementing automated data lineage, privacy-preserving computation, and transparent model explainability."
        />
      </PageGrid>
    </PageSection>
  ),
    },
    {
      component: (
        <PageSection title="What This Means For You" icon={<Users />}>
          <PageGrid cols={3}>
            <PageCard title="AI-Ready Data Platforms" description="I design scalable architectures that support governance, analytics, and AI workloads from the same data foundation." />
            <PageCard title="Applied AI Exploration" description="Sapiente.AI serves as a laboratory for new architectures and experimental systems." />
            <PageCard title="Scaling Data Organizations" description="I build teams, define standards, and structure platforms for sustainable growth." />
            <PageCard title="Trustworthy Data Foundations" description="Reliable pipelines, consistent metrics, and strong governance frameworks." />
            <PageCard title="Data as Strategic Assets" description="Move from reporting to data products with ownership and measurable impact." />
            <PageCard title="AI in Production" description="Align engineering, governance, and architecture to move AI into real systems" />
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
        <Suspense key={index} fallback={<SectionLoader size="lg" />}>
          <PageSection variant={section.variant}>
            {section.component}
          </PageSection>
        </Suspense>
      ))}
    </MainLayout>
  );
};

export default WhyMe;
