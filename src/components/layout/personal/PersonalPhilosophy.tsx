import SectionTitle from "@/components/layout/SectionTitle";
import { Heart } from "@/lib/icons";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

export default function PersonalPhilosophy() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <SectionTitle as="h2" icon={<Heart className="w-8 h-8" />}>
            Personal Philosophy
          </SectionTitle>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Beyond data pipelines and architecture diagrams, I believe in the balance between high-tech and high-touch.
            Technology builds systems, but perspective builds impact.

            When I’m not designing data ecosystems, you’ll find me exploring the philosophy of AI,
            playing electric guitar, training for my next run or discovering new coffee spots and craft breweries.

            For me, a great engineer is not defined only by technical skill, but by curiosity,
            discipline and the ability to connect ideas across different worlds.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}