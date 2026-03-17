import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";

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

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <Helmet>
        <title>Rodrigo Póvoa – Sapiente.AI Innovation Studio</title>
      </Helmet>

      <Suspense fallback={null}>
        {/* HERO */}
        <PageHero
          variant="page"
          title="SIDE PROJECTS"
          subtitle="Explorations in Data Engineering, AI and Technical Research"
          image="/logo_sapienteai.png"
        />

        {/* SapienteAI */}
        <PageSection title="Sapiente.AI: The Next Generation" icon={<Cpu />}>
          <div className="max-w-3xl text-muted-foreground text-lg leading-relaxed space-y-6">
            <p>
              Sapiente.AI was born from a simple realization after 15 years
              building data systems: the next generation of platforms must be
              AI-native from the start.
            </p>

            <p>
              This is where I explore my vision of future: combining data
              engineering experience with AI to design smarter, more adaptive
              data platforms.
            </p>

            <p>
              Rather than treating AI as just another feature, Sapiente.AI looks
              at it as a new architectural foundation for how data systems
              should be built.
            </p>

            <p>
              It’s a space to experiment, prototype and refine ideas about
              AI-native data ecosystems, governance, and automation.
            </p>

            <p>
              The goal is simple: bridge enterprise-grade data engineering with
              the possibilities of AI-driven systems.
            </p>
          </div>
        </PageSection>

        {/* PROJECT FOCUS */}
        <PageSection
          title="Project Focus Areas"
          icon={<Zap />}
          variant="gradient"
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

        {/* CTA */}
        <PageSection variant="gradient">
          <div className="glass layer-blue rounded-2xl p-12 text-center glow-primary-sm">
            <div className="flex justify-center mb-6">
              <img
                src="/banner_SapienteAI.png"
                alt="SapienteAI Banner"
                className="h-48 w-auto opacity-90"
              />
            </div>

            <h3 className="text-2xl font-bold mb-2">Explore Sapiente.AI</h3>

            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              A structured AI experimentation lab focused on scalable
              architectures, governed automation systems and intelligent digital
              infrastructure.
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
        </PageSection>
      </Suspense>
    </MainLayout>
  );
};

export default SideProjects;
