import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { BookOpen, Rocket, Lightbulb, Brain, ShieldCheck } from "@/lib/icons";

const WhatDrivesMe = () => {
  const facts = [
    {
      icon: Lightbulb,
      title: "Continuous Learner",
      description:
        "I spend time learning new technologies, reading research papers, and exploring emerging trends in data engineering and AI.",
    },
    {
      icon: BookOpen,
      title: "Technical Writer",
      description:
        "I enjoy writing technical articles and documentation. Sharing knowledge helps me refine ideas and contribute to the community.",
    },
    {
      icon: ShieldCheck,
      title: "Data Quality & Governance",
      description:
        "I’m passionate about building reliable, well-governed data platforms that teams can trust.",
    },
    {
      icon: Brain,
      title: "Data Strategy",
      description:
        "I enjoy connecting business goals with scalable data solutions that create measurable impact.",
    },
    {
      icon: Rocket,
      title: "Side Projects",
      description:
        "I’m always experimenting with new ideas and side projects. Some of them evolve into real products or useful prototypes.",
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