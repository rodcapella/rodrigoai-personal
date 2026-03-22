import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Target } from "@/lib/icons";

const layers = ["layer-yellow", "layer-blue", "layer-purple", "layer-green"];

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
    <PageSection title="Long-Term Vision" icon={<Target />}>
      <PageGrid cols={3} gap="md">
        {longTermVision.map((item, idx) => (
          <PageCard
            key={item}
            as={motion.div}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className={`${layers[idx % 4]} group space-content`}
          >
            <p className="heading-sm">
              {item}
            </p>
          </PageCard>
        ))}
      </PageGrid>
    </PageSection>
  );
}