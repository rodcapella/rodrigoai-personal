import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Sparkles, Brain, Eye, BookOpen, Dumbbell } from "@/lib/icons";

const curiosityStack = [
  {
    icon: Brain,
    title: "AI, Ethics & Consciousness",
    description:
      "Exploring the boundaries between intelligence, decision-making and responsibility in the age of generative systems.",
  },
  {
    icon: Eye,
    title: "Data as Visual Language",
    description:
      "Turning complexity into clarity through design, storytelling and structured visual thinking.",
  },
  {
    icon: BookOpen,
    title: "Continuous Intellectual Expansion",
    description:
      "Studying history, economics and systems thinking to strengthen long-term strategic perspective.",
  },
  {
    icon: Dumbbell,
    title: "Discipline & Physical Performance",
    description:
      "Training as a tool for mental clarity, resilience and consistent high-level execution.",
  },
];

export default function CuriosityStackSection() {
  return (
    <PageSection
      title="What Keeps Me Inspired"
      icon={<Sparkles />}
      variant="gradient"
    >
      <PageGrid cols={2} gap="md">
        {curiosityStack.map((item, idx) => {
          const Icon = item.icon;

          return (
            <PageCard
              key={item.title}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group space-content"
            >
              <Icon
                className="
                  w-7 h-7
                  text-primary
                  transition-all
                  group-hover:scale-110
                  group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]
                "
              />

              <h3 className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-2">
                {item.title}
              </h3>

              <p className="body-md">
                {item.description}
              </p>
            </PageCard>
          );
        })}
      </PageGrid>
    </PageSection>
  );
}