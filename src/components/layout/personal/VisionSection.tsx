import { motion } from "framer-motion";
import { Target } from "@/lib/icons";
import SectionTitle from "@/components/layout/SectionTitle";
import Container from "@/components/layout/Container";

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
    <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle icon={<Target className="w-8 h-8" />}>
            Long-Term Vision
          </SectionTitle>

          <div className="space-y-6">
            {longTermVision.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />

                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
