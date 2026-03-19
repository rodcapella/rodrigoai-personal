import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Heart } from "@/lib/icons";

const personalValues = [
  {
    title: "Analytical Thinking",
    description:
      "Breaking complexity into clarity through structured reasoning and data-driven decisions.",
  },
  {
    title: "Discipline & Consistency",
    description:
      "Long-term results are built through daily execution and commitment.",
  },
  {
    title: "Accountability",
    description:
      "Taking full ownership of decisions, actions and outcomes with a strong sense of responsibility.",
  },
  {
    title: "Commitment to Excellence",
    description:
      "A constant drive to deliver high-quality work, always striving for the best possible solution.",
  },
  {
    title: "Loyalty",
    description:
      "Strong belief in trust, long-term relationships and mutual growth.",
  },
  {
    title: "Continuous Evolution",
    description:
      "Always learning, adapting and expanding both technically and personally.",
  },
  {
    title: "Curiosity About the World",
    description:
      "Driven by different perspectives, cultures and ways of thinking.",
  },
  {
    title: "Passion for Technology",
    description:
      "Constant exploration of new tools, systems and emerging innovations.",
  },
];

export default function ValuesSection() {
  return (
    <PageSection title="Core Values" icon={<Heart />} variant="gradient">
      <PageGrid cols={3} gap="md">
        {personalValues.map((value, idx) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <PageCard className="group hover:scale-[1.03] transition-all duration-300">
              <div className="w-6 h-[2px] bg-primary mb-3 opacity-70 group-hover:w-10 transition-all duration-300" />

              <p className="text-foreground font-semibold mb-2">
                {value.title}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </PageCard>
          </motion.div>
        ))}
      </PageGrid>
    </PageSection>
  );
}
