import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import SEO from "@/components/SEO";

import {
  Zap,
  Database,
  Cpu,
  TrendingUp,
  Sparkles,
  MessageSquare,
  FlaskConical,
} from "@/lib/icons";

interface SideProjectsProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

type SectionVariant = "default" | "muted" | "gradient" | "glass";

const SectionLoader = () => (
  <div className="py-20 flex justify-center items-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const SideProjects = ({ theme = "dark", onToggleTheme }: SideProjectsProps) => {
  const projectCategories = [
    {
      icon: Cpu,
      title: "AI Systems Exploration",
      description:
        "Systematic experimentation with modern AI ecosystems, evaluating architectural trade-offs and integration patterns.",
    },
    {
      icon: Database,
      title: "AI-Augmented Data Platforms",
      description:
        "Designing data architectures enhanced by artificial intelligence.",
    },
    {
      icon: Zap,
      title: "Intelligent Automation",
      description:
        "Developing automation frameworks that integrate AI capabilities into operational workflows.",
    },
    {
      icon: Sparkles,
      title: "AI Digital Presence",
      description:
        "Exploring AI-powered identities, virtual avatars and intelligent interfaces for scalable digital engagement.",
    },
    {
      icon: TrendingUp,
      title: "AI-Driven Digital Strategy",
      description:
        "Applying AI to SEO, content systems and digital positioning strategies.",
    },
    {
      icon: MessageSquare,
      title: "Intelligent Brand Interfaces",
      description:
        "Designing AI-driven interfaces and virtual personas that enable scalable and authentic audience engagement.",
    },
    {
      icon: FlaskConical,
      title: "AI Prototyping Lab",
      description:
        "Rapid prototyping of experimental AI concepts, architectures and applied use cases.",
    },
  ];

  const sections: {
    component: React.ReactNode;
    variant?: SectionVariant;
  }[] = [
    {
      component: (
        <PageSection
          title="Sapiente.AI: Maximizing human potential through Artificial Intelligence"
          icon={<Cpu />}
        >
          <div className="max-w-3xl text-muted-foreground text-lg leading-relaxed space-y-6">
            <p>
              Sapiente.AI is an AI innovation ecosystem focused on building
              AI-native data platforms using modern technologies such as Azure,
              Databricks, Delta Lake and LLM-based architectures. It bridges the
              gap between traditional data engineering and next-generation
              intelligent systems.
            </p>
              With over 15 years of experience in data engineering and
              analytics, this initiative focuses on transforming raw data into
              scalable, intelligent and automated decision systems.
            <p>

            </p>
              Core areas of development include AI-powered data products,
              intelligent automation frameworks, and modern data platforms
              designed to support analytics, governance and AI workloads in a
              unified architecture.
            <p>

            </p>
              Sapiente.AI also explores full-stack AI applications, combining
              backend data pipelines with intelligent frontends to create
              adaptive digital products and scalable brand ecosystems.
            <p>

            </p>

            <p>
              The goal is to enable organizations to move beyond traditional
              analytics and adopt AI-driven decision-making systems that are
              reliable, governed and production-ready.
            </p>
          </div>
        </PageSection>
      ),
    },
    {
      component: (
        <PageSection
          title="AI Project Focus Areas"
          icon={<Zap />}
        >
          <PageGrid cols={3}>
            {projectCategories.map((category, idx) => {
              const Icon = category.icon;

              const layers = [
                "layer-yellow",
                "layer-blue",
                "layer-green",
                "layer-purple",
              ];

              return (
                <PageCard
                  key={idx}
                  icon={<Icon />}
                  title={category.title}
                  description={category.description}
                  className={`glass ${layers[idx % 4]}`}
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
        <div className="glass layer-blue rounded-2xl p-12 text-center glow-primary-sm">
          <div className="flex justify-center mb-6">
            <img
              src="/banner_SapienteAI.webp"
              alt="SapienteAI Banner"
              className="h-48 w-auto opacity-90"
            />
          </div>

          <h3 className="text-2xl font-bold mb-2">
            Explore Sapiente.AI
          </h3>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sapiente.AI is my dedicated innovation lab focused on democratizing the use of Generative AI...
          </p>

          <a
            href="https://sapienteai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            Visit Sapiente.AI website
          </a>
        </div>
      ),
      variant: "gradient",
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Sapiente.AI | AI Innovation Hub"
        description="AI innovation hub focused on data platforms, automation and AI-native systems using Azure, Databricks and modern architectures."
      />

      <Helmet>
        <title>Rodrigo Póvoa – Sapiente.AI Innovation Hub</title>
      </Helmet>

      {/* HERO PADRONIZADO */}
      <PageSection variant="gradient" className="pt-32 pb-16">
        <PageHero
          variant="page"
          title="Innovation Hub: Sapiente.AI"
          subtitle="Founder & Lead Researcher"
          image="/logo_sapienteai.webp"
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

export default SideProjects;