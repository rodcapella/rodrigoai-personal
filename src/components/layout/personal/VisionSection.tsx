import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Target } from "@/lib/icons";

const longTermVision = [
  "Building intelligent systems",
  "Bridging data & decision layers",
  "Leadership in data multi-functional teams",
  "Creating sustainable and governed data platforms",
  "Leveraging modern AI ecosystems",
  "Combining human capability development with AI ecosystems to unlock the next level of productivity and quality",
];

export default function VisionSection() {
  return (
    <PageSection
      title="Long-Term Vision"
      icon={<Target />}
      className="bg-gradient-to-br from-primary/10 to-transparent"
    >
      <div className="space-y-6 max-w-3xl">
        {longTermVision.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <PageCard className="flex items-start gap-3 group">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 group-hover:scale-125 transition-all" />

              <p className="text-muted-foreground leading-relaxed">{item}</p>
            </PageCard>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
}