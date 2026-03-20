import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Compass } from "@/lib/icons";

export default function LifeRelocation() {
  return (
    <PageSection title="Life & Relocation" icon={<Compass />}>
      <div className="max-w-3xl mx-auto">
        
        <PageCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
          hover={false}
        >
          <p className="text-muted-foreground leading-relaxed">
            In 2019, I made a defining decision: relocating to Portugal with my
            family in search of a better quality of life, stronger security and
            new professional challenges.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            The move was driven by the ambition to work on international
            projects, explore more mature data ecosystems and expand both
            technical and personal horizons.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Today, Portugal is home. The family has grown, now with two dogs,
            and the balance between career evolution and personal life became a
            reality, not just a goal.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            This journey reflects how I approach life: intentional decisions,
            aligned with long-term vision, continuous growth and purpose.
          </p>
        </PageCard>

      </div>
    </PageSection>
  );
}