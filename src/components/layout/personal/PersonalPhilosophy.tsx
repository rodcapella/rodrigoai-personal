import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Heart } from "@/lib/icons";

export default function PersonalPhilosophy() {
  return (
    <PageSection
      title="Personal Philosophy"
      icon={<Heart className="w-6 h-6" />}
      variant="gradient"
    >
      <div className="max-w-3xl mx-auto text-center">
        
        <PageCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
          hover={false}
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            Beyond data pipelines and architecture diagrams, I believe in the balance between high-tech and high-touch.
            Technology builds systems, but perspective builds impact.

            When I’m not designing data ecosystems, you’ll find me exploring the philosophy of AI,
            playing electric guitar, training for my next run or discovering new coffee spots and craft breweries.

            For me, a great engineer is not defined only by technical skill, but by curiosity,
            discipline and the ability to connect ideas across different worlds.
          </p>
        </PageCard>

      </div>
    </PageSection>
  );
}