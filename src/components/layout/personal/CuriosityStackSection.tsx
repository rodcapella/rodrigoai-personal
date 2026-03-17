import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Sparkles, Brain, Eye, BookOpen, Dumbbell } from "@/lib/icons";

const curiosityStack = [
  {
    icon: Brain,
    title: "Philosophical Inquiry",
    description:
      "Exploring how ethics and consciousness integrate with the future of Generative AI.",
  },
  {
    icon: Eye,
    title: "Visual Storytelling",
    description:
      "Transforming complex data into simple and impactful visual narratives through branding and design.",
  },
  {
    icon: BookOpen,
    title: "Lifelong Learning",
    description:
      "Currently diving into History, Economics and continuous skill expansion.",
  },
  {
    icon: Dumbbell,
    title: "Physical Resilience",
    description:
      "Discipline through training and sport as a foundation for mental clarity and high-performance decision making.",
  },
];

export default function CuriosityStackSection() {
  return (
    <PageSection
      title="What Keeps Me Inspired"
      icon={<Sparkles />}
      className="bg-gradient-to-br from-primary/10 to-transparent"
    >
      <PageGrid cols={2} gap="md">
        {curiosityStack.map((item, idx) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <PageCard className="group">

                <Icon
                  className="
                    w-6 h-6
                    text-primary
                    mb-3
                    transition-all
                    group-hover:scale-110
                    group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]
                  "
                />

                <p className="text-foreground font-medium mb-1">
                  {item.title}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

              </PageCard>
            </motion.div>
          );
        })}
      </PageGrid>
    </PageSection>
  );
}