import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import {
  Heart,
  Brain,
  Target,
  ShieldCheck,
  Star,
  Repeat,
  Globe,
  Cpu,
} from "@/lib/icons";

const personalValues = [
  {
    title: "Analytical Thinking",
    description:
      "I value the ability to break complexity into clarity through structured reasoning and data-driven decisions.",
    icon: Brain,
  },
  {
    title: "Discipline & Consistency",
    description:
      "Long-term results come from daily execution, focus, and commitment.",
    icon: Target,
  },
  {
    title: "Accountability",
    description:
      "I believe in taking full ownership of decisions, actions, and outcomes.",
    icon: ShieldCheck,
  },
  {
    title: "Commitment to Excellence",
    description:
      "I’m driven by the pursuit of high-quality work and the best possible solution.",
    icon: Star,
  },
  {
    title: "Loyalty",
    description:
      "I value trust, long-term relationships, and mutual growth.",
    icon: Heart,
  },
  {
    title: "Continuous Evolution",
    description:
      "I’m always learning, adapting, and expanding both technically and personally.",
    icon: Repeat,
  },
  {
    title: "Curiosity About the World",
    description:
      "I’m inspired by different perspectives, cultures, and ways of thinking.",
    icon: Globe,
  },
  {
    title: "Passion for Technology",
    description:
      "I’m constantly exploring new tools, systems, and emerging innovations.",
    icon: Cpu,
  },
];

export default function ValuesSection() {
  return (
    <PageSection title="Core Values" icon={<Heart />} variant="gradient">
      <PageGrid cols={3} gap="md">
        {personalValues.map((value, idx) => {
          const Icon = value.icon;

          return (
            <PageCard
              key={value.title}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group space-content"
            >
              {/* TITLE + ICON */}
              <div className="flex items-center gap-2 mt-2">
                <Icon className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />

              <h3 className="text-base font-semibold text-foreground transition-all duration-300 group-hover:text-primary">
                {value.title}
              </h3>
              </div>

              {/* DESCRIPTION */}
              <p className="body-sm">
                {value.description}
              </p>
            </PageCard>
          );
        })}
      </PageGrid>
    </PageSection>
  );
}