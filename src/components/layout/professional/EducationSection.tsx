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
      <PageGrid cols={3} gap="md">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <PageCard
              align="center"
              className={`${layers[i % 4]} space-tight`}
            >
              <h3 className="text-base font-semibold text-foreground transition-all duration-300 group-hover:text-primary">
                {edu.degree}
              </h3>

              <p className="body-sm text-muted-foreground">
                {edu.institution} • {edu.location} • {edu.year}
              </p>
            </PageCard>
          </motion.div>
        ))}
      </PageGrid>
    </PageSection>
  );
}