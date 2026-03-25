import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { BookOpen, Zap, Rocket, Lightbulb, Brain, Package } from "@/lib/icons";

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
      icon={<Brain className="w-6 h-6 opacity-80" />}
      variant="gradient"
    >
      <PageGrid cols={3} gap="md">
        {facts.map((fact, idx) => {
          const Icon = fact.icon;

          return (
            <PageCard
              key={idx}
              icon={<Icon />}
              title={fact.title}
              description={fact.description}
              className={`${layers[idx % 4]} group`}
            ></PageCard>
          );
        })}
      </PageGrid>
    </PageSection>
  );
};

export default WhatDrivesMe;