import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { BookOpen, Zap, Rocket, Lightbulb, Brain, Package  } from "@/lib/icons";

const WhatDrivesMe = () => {
  const facts = [
    {
      icon: Lightbulb,
      title: "Continuous Learner",
      description:
        "I spend significant time learning new technologies, reading research papers, and exploring emerging trends in data engineering and AI.",
    },
    {
      icon: BookOpen,
      title: "Technical Writer",
      description:
        "I enjoy writing technical articles and documentation. Sharing knowledge helps solidify understanding and contributes to the community.",
    },
    {
      icon: Zap,
      title: "Open Source Enthusiast",
      description:
        "Active contributor to open-source projects. I believe in the power of collaborative development and community-driven innovation.",
    },
    {
      icon: Rocket,
      title: "Side Projects",
      description:
        "Always tinkering with new ideas and experimental projects. Some of my side projects have evolved into innovation.",
    },
  ];

  const layers = ["layer-yellow", "layer-green", "layer-purple", "layer-blue"];

  return (
    <PageSection
      title="What Drives Me"
      icon={<Brain className="w-6 h-6" />}
      variant="gradient"
    >
      <PageGrid cols={3} gap="md">
        {facts.map((fact, idx) => {
          const Icon = fact.icon;

          return (
            <PageCard
              key={fact.title}
              as={motion.div}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`${layers[idx % 4]} space-content`}
            >
              <Icon className="w-8 h-8 text-primary" />

              <h3 className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-2">
                {fact.title}
              </h3>

              <p className="body-md">
                {fact.description}
              </p>
            </PageCard>
          );
        })}
      </PageGrid>
    </PageSection>
  );
};

export default WhatDrivesMe;