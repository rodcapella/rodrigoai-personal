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
        <title>Rodrigo Póvoa – Sapiente.AI Innovation Hub</title>
      </Helmet>

      <Suspense fallback={null}>
        {/* HERO */}
        <PageHero
          variant="page"
          title="Innovation Hub: Sapiente.AI"
          subtitle="Founder & Lead Researcher"
          image="/logo_sapienteai.png"
        />

        {/* SapienteAI */}
        <PageSection
          title="Sapiente.AI: Maximizing human potential through Artificial Intelligence"
          icon={<Cpu />}
        >
          <div className="max-w-3xl text-muted-foreground text-lg leading-relaxed space-y-6">
            <p>
              Sapiente.AI is my innovation ecosystem designed to bridge the gap
              between robust Data Engineering and the creative power of AI. It
              is the practical application of my vision: aligning human essence
              with artificial intelligence to maximize delivery and impact.
            </p>

            <p>
              At Sapiente, I leverage my 15+ years of data experience to build:
            </p>
            <p>
              - AI-Driven Data Products: Integrating LLMs and Agentic workflows
              directly into data platforms to transform raw information into
              autonomous insights.
            </p>

            <p>
              - Intelligent Web & Mobile Apps: Developing full-stack solutions
              that aren't just "apps," but data-rich interfaces powered by
              customized AI models.
            </p>

            <p>
              - Automated Digital Ecosystems: Scaling brand presence and social
              media management through data-backed automation and bespoke brand
              personas.
            </p>

            <p>
              - Smart Branding & Strategy: Using data to inform creative
              decisions, ensuring that every brand identity is both authentic
              and optimized for the digital age.
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
              Sapiente.AI is my dedicated innovation lab focused on
              democratizing the use of Generative AI and LLMs within modern data
              architectures. It serves as a bridge between cutting-edge AI
              research and practical enterprise applications. Through
              Sapiente.AI, I develop frameworks that help organizations
              transition from traditional analytics to AI-driven intelligence.
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