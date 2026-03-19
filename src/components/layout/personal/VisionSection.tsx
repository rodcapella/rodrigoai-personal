import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Target } from "@/lib/icons";

const longTermVision = [
  "Designing and building intelligent, scalable data systems",
  "Bridging the gap between data, insights and decision-making",
  "Leading high-performing, multi-functional data teams",
  "Creating governed, secure and sustainable data platforms",
  "Integrating modern AI ecosystems into real-world applications",
  "Elevating human capability through the synergy between data, AI and decision intelligence",
];

export default function VisionSection() {
  return (
    <PageSection title="Long-Term Vision" icon={<Target />} variant="gradient">
      {longTermVision.map((item, idx) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
        >
          <PageCard className="flex items-start gap-4 group hover:translate-x-1 transition-all duration-300">
            <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />

            <p className="text-muted-foreground leading-relaxed">{item}</p>
          </PageCard>
        </motion.div>
      ))}
    </PageSection>
  );
}
