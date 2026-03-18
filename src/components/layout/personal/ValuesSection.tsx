import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Heart } from "@/lib/icons";

const personalValues = [
  {
    title: "Analytical Mindset",
    description: "Data-driven and structured reasoning approach",
  },
  {
    title: "Discipline",
    description: "Structured approach to personal and professional growth",
  },
  {
    title: "Loyalty",
    description: "Commitment to relationships and long-term partnerships",
  },
  {
    title: "Intellectual Growth",
    description: "Continuous learning and exploration",
  },
  {
    title: "Cultural Curiosity",
    description: "Interest in different perspectives and cultures",
  },
  {
    title: "Technology Enthusiasm",
    description: "Constant exploration of emerging technologies",
  },
];

export default function ValuesSection() {
  return (
    <PageSection
      title="Core Values"
      icon={<Heart />}
      variant="gradient"
    >
      <PageGrid cols={3} gap="md">
        {personalValues.map((value, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <PageCard className="group">
              <p className="text-foreground font-medium mb-1">{value.title}</p>

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
