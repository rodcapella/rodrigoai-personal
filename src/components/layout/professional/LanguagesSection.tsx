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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="w-full flex justify-center"
          >
            <PageCard align="center" className={`${layers[idx % 4]} group`}>
              <h3 className="text-lg font-semibold mb-1">{lang.name}</h3>
              <p className="text-sm text-muted-foreground">{lang.level}</p>
            </PageCard>
          </motion.div>
        ))}
      </PageGrid>
    </PageSection>
  );
}