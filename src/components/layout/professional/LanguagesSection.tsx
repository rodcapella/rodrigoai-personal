import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Globe } from "@/lib/icons";

interface Language {
  name: string;
  level: string;
}

interface LanguagesSectionProps {
  languages: Language[];
}

const layers = ["layer-yellow", "layer-green", "layer-purple", "layer-blue"];

export default function LanguagesSection({ languages }: LanguagesSectionProps) {
  if (!languages?.length) return null;

  return (
    <PageSection
      title="Languages"
      icon={<Globe />}
      variant="gradient"
    >
      <PageGrid cols={3} gap="md">
        {languages.map((lang, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <PageCard
              align="center"
              className={`${layers[idx % 4]} space-tight`}
            >
              <h3 className="text-base font-semibold text-foreground transition-all duration-300 group-hover:text-primary">
                {lang.name}
              </h3>
              <span className="body-sm">
                {lang.level}
              </span>
            </PageCard>
          </motion.div>
        ))}
      </PageGrid>
    </PageSection>
  );
}