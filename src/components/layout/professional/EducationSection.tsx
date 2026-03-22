import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { GraduationCap } from "@/lib/icons";

interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
}

interface EducationSectionProps {
  education: Education[];
}

const layers = ["layer-yellow", "layer-green", "layer-purple", "layer-blue"];

export default function EducationSection({ education }: EducationSectionProps) {
  if (!education?.length) return null;

  return (
    <PageSection
      title="Academic Background"
      icon={<GraduationCap />}
      variant="gradient"
    >
      <PageGrid cols={3} gap="md" className="max-w-5xl">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex justify-center"
          >
            <PageCard
              align="center"
              className={`${layers[i % 4]} space-tight max-w-[280px] w-full`}
            >
              <h3 className="text-xs uppercase tracking-wide text-muted-foreground/70 mb-2">
                {edu.degree}
              </h3>

              <p className="body-sm">
                {edu.institution} • {edu.location} • {edu.year}
              </p>
            </PageCard>
          </motion.div>
        ))}
      </PageGrid>
    </PageSection>
  );
}