import { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import SEO from "@/components/SEO";
import SectionLoader from "@/components/ui/SectionLoader";
import SectionContent from "@/components/layout/SectionContent";

import {
  Zap,
  Database,
  Cpu,
  TrendingUp,
  Sparkles,
  MessageSquare,
  FlaskConical,
} from "@/lib/icons";

type SectionVariant = "default" | "muted" | "gradient" | "glass";

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

  const sections = [
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
            With a strong technology foundation and an experimentation-first mindset, Sapiente.AI creates everything from AI-powered platforms to end-to-end digital experiences—integrating backend systems, intelligent logic and modern user interfaces into scalable solutions.
          </p>

          <p>
            Its areas of focus include digital product development, intelligent automation, technology platforms, digital branding and the exploration of new AI-driven business models.
          </p>

          <p>
            The vision is simple: turn ideas into living systems, capable of learning, adapting and growing—enabling organizations to innovate continuously and sustainably.
          </p>
        </motion.div>
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
          <div className="flex justify-center mb-6">
            <img
              src="/banner_SapienteAI.webp"
              alt="SapienteAI Banner"
              className="h-48 w-auto opacity-90"
            />
          </div>

          <h3 className="text-base font-semibold text-foreground">
            Explore Sapiente.AI
          </h3>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sapiente.AI is my dedicated innovation lab focused on democratizing
            the use of Generative AI.
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
    },
  ];

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Sapiente.AI | AI Innovation Hub"
        description="Explore Sapiente.AI and innovation projects focused on AI systems, intelligent automation and modern data platforms built by Rodrigo Póvoa." 
      />

      <Helmet>
        <title>Rodrigo Póvoa – Sapiente.AI Innovation Hub</title>
      </Helmet>

      {/* HERO */}
      <PageSection variant="gradient" className="pt-32 pb-16">
        <PageHero
          variant="page"
          title="Innovation Hub: Sapiente.AI"
          subtitle="Founder & Lead Researcher"
          image="/logo_sapienteai.webp"
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