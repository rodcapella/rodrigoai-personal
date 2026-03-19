import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Compass } from "@/lib/icons";

export default function LifeRelocation() {
  return (
    <PageSection
      title="Life & Relocation"
      icon={
        <Suspense fallback={null}>
          <Compass />
        </Suspense>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <PageCard className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            In the end of 2019, I made a significant life decision to relocate
            to Portugal together with my family (wife, son and our dog), seeking
            improved quality of life, greater personal and family security, and
            more challenging professional opportunities. This move was driven by
            the desire to work on international and multi-domain projects while
            learning new concepts and technologies within more mature data
            environments.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Today, the family has grown and now includes a second dog. Portugal
            has become home, offering the perfect balance between professional
            growth and personal fulfillment. The relocation proved to be a
            transformative decision that shaped both my career trajectory and
            personal identity.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            This journey reflects my philosophy: intentional decisions that
            align personal values with professional aspirations, creating a life
            of purpose and continuous evolution.
          </p>
        </PageCard>
      </motion.div>
    </PageSection>
  );
}
