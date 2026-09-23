import { Suspense, type ReactNode } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import SEO from "@/components/SEO";
import SectionLoader from "@/components/ui/SectionLoader";
import SectionContent from "@/components/layout/SectionContent";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

import {
  Zap,
  Database,
  Cpu,
  TrendingUp,
  Sparkles,
  MessageSquare,
  FlaskConical,
  Briefcase,
} from "@/lib/icons";

type SectionVariant = "default" | "muted" | "gradient" | "glass";

type SectionConfig =
  | {
      useNewLayout: true;
      title: string;
      icon: ReactNode;
      variant?: "default" | "gradient";
      content: ReactNode;
    }
  | {
      useNewLayout?: false;
      title?: string;
      icon?: ReactNode;
      variant?: SectionVariant;
      content: ReactNode;
    };

export default function SideProjects() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  const projectCategories = [
    {
      icon: Cpu,
      title: "AI Systems Exploration",
      description:
        "Systematic experimentation with modern AI ecosystems, evaluating architectural trade-offs, behaviors and integration patterns.",
    },
    {
      icon: Database,
      title: "AI-Augmented Data Platforms",
      description:
        "Designing data architectures enhanced by artificial intelligence to improve insight, responsiveness, and decision-making.",
    },
    {
      icon: Zap,
      title: "Intelligent Automation",
      description:
        "Building automation frameworks that combine AI capabilities with operational workflows.",
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
        "Applying AI to SEO, content systems and digital positioning strategies with a practical business lens.",
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

  const sapienteAchievements = [
    {
      title: "Company & Product Leadership",
      description:
        "Building and leading an AI-driven technology company, with responsibility for product strategy, software engineering and technical architecture.",
    },
    {
      title: "SEO, GEO & AEO Platform",
      description:
        "Designing and continuously evolving the company website and its proprietary free online SEO, GEO and AEO validation platform.",
    },
    {
      title: "AI, Web & Automation Architecture",
      description:
        "Engineering modern web architectures, automation workflows and integrations with artificial intelligence services and APIs.",
    },
    {
      title: "Behavioral Analytics Pipeline",
      description:
        "Architecting and evolving an end-to-end first-party analytics pipeline that captures website navigation events and delivers structured data to Google BigQuery for user journey and product engagement analysis.",
    },
  ];

  const sapienteTechStack = [
    "Python",
    "Google BigQuery",
    "Google Analytics",
    "Vercel",
    "AI APIs",
    "Modern Web Technologies",
    "SEO / GEO / AEO Frameworks",
    "Automation",
    "Cloud Infrastructure",
  ];

  const sections: SectionConfig[] = [
    {
      title:
        "Sapiente.AI: Maximizing human potential through Artificial Intelligence",
      icon: <Cpu />,
      useNewLayout: true,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-text text-muted-foreground text-lg leading-relaxed"
        >
          <p>
            Sapiente.AI is an innovation ecosystem focused on building intelligent solutions that combine technology, strategy, and creativity to solve real-world problems.
          </p>

          <p>
            More than a data-driven initiative, Sapiente.AI operates at the intersection of Artificial Intelligence, digital products, automation, and organizational transformation. Its mission is to help companies and ideas evolve from traditional operations into adaptive, intelligent and value-driven systems.
          </p>

          <p>
            Built on a strong technology foundation and an experimentation-first mindset, Sapiente.AI turns ideas into scalable systems that can learn, adapt, and grow.
          </p>

          <p>
            Its areas of focus include digital product development, intelligent automation, technology platforms, digital branding and the exploration of new AI-driven business models.
          </p>

          <p>
            The goal is simple: help organizations move from traditional operations to more adaptive, intelligent, and value-driven systems.
          </p>
        </motion.div>
      ),
    },
    {
      title: "What I’m Building at Sapiente.AI",
      icon: <Briefcase />,
      content: (
        <div className="building-sapiente-panel glass layer-blue rounded-2xl p-8 glow-primary-sm sm:p-12">
          <div className="space-y-8">
            <p className="max-w-4xl text-lg leading-relaxed text-muted-foreground">
              As Founder &amp; Technical Lead, I am building the technical
              foundation for intelligent digital products, autonomous workflows
              and data-driven solutions.
            </p>

            <PageGrid cols={2}>
              {sapienteAchievements.map((achievement) => (
                <PageCard
                  key={achievement.title}
                  title={achievement.title}
                  description={achievement.description}
                />
              ))}
            </PageGrid>

            <div className="space-tight">
              <span className="text-xs font-medium tracking-wide text-[#e59b4b] uppercase dark:text-[#FFDD79]">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {sapienteTechStack.map((technology) => (
                  <span key={technology} className="tag-tech">
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "AI Project Focus Areas",
      icon: <Zap />,
      variant: "muted",
      content: (
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
                className={layers[idx % 4]}
              />
            );
          })}
        </PageGrid>
      ),
    },
    {
      variant: "gradient",
      content: (
        <div className="glass layer-blue rounded-2xl p-12 text-center glow-primary-sm">
          <div className="group flex justify-center mb-6">
            <img
              src="/banner_SapienteAI.webp"
              alt="Sapiente.AI platform for artificial intelligence governance, automation and data-driven solutions"
              className="h-48 w-auto opacity-90 transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-[0_0_24px_rgba(59,130,246,0.45)]"
            />
          </div>

          <h3 className="text-base font-semibold text-foreground">
            Explore Sapiente.AI
          </h3>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sapiente.AI is my dedicated innovation lab focused on expanding what generative AI can do in practice.

            It is where I test ideas, refine patterns, and build systems that bridge experimentation and real-world application.
          </p>

          <a
            href="https://www.sapienteai.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
          >
            Visit Sapiente.AI website
          </a>
        </div>
      ),
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Innovation Hub | Rodrigo Póvoa – Sapiente.AI"
        description="Explore the AI products, SEO, GEO and AEO platform, automation systems and BigQuery analytics architecture Rodrigo Póvoa is building at Sapiente.AI."
        keywords="Sapiente.AI, AI product development, technical founder, Google BigQuery, Google Analytics, SEO validator, GEO validator, AEO validator, AI automation"
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.rpovoadata.tech/" },
          {
            name: "Innovation Hub",
            url: "https://www.rpovoadata.tech/side-projects",
          },
        ]}
      />

      {/* HERO */}
      <PageSection variant="gradient" spacing="none" className="pt-12 pb-6 md:pt-16 md:pb-8">
        <PageHero
          variant="page"
          title="Innovation Hub: Sapiente.AI"
          subtitle="Founder & Technical Lead"
          image="/logos/logo_sapienteai.webp"
          imageAlt="Sapiente.AI artificial intelligence innovation company logo"
        />
      </PageSection>

      {/* SECTIONS */}
      {sections.map((section, index) => {
        const isMain = section.useNewLayout;

        return (
          <Suspense key={index} fallback={<SectionLoader />}>
            {isMain ? (
              <SectionContent
                title={section.title!}
                icon={section.icon}
                variant={section.variant}
                centered={false}
              >
                {section.content}
              </SectionContent>
            ) : (
              <PageSection
                variant={section.variant}
                title={section.title}
                icon={section.icon}
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
