import { lazy } from "react";
import SectionTitle from "@/components/layout/SectionTitle";
import { Heart } from "@/lib/icons";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

export default function PersonalPhilosophy() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle as="h2" icon={<Heart className="w-8 h-8" />}>
            Personal Philosophy
          </SectionTitle>

          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              Beyond the data pipelines and architecture diagrams, I am a firm believer in the balance between high-tech and high-touch. 
              When I’m not architecting data ecosystems, you’ll likely find me exploring the philosophy of AI, playing eletric guitar, training for my next run 
              or discovering new coffee spots. I believe that a great engineer is fueled by curiosity, both in and out of the office.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
