import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Award } from "@/lib/icons";

interface CertificationsSectionProps {
  certifications: string[];
}

export default function CertificationsSection({
  certifications,
}: CertificationsSectionProps) {
  return (
    <PageSection title="Certifications & Courses" icon={<Award />}>
      <div className="space-y-6 max-w-3xl">
        {certifications?.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="w-full flex justify-center"
          >
            <PageCard className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground leading-relaxed">{cert}</p>
            </PageCard>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
}