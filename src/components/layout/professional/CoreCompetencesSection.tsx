import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Award } from "@/lib/icons";

interface Competence {
  icon: React.ElementType;
  title: string;
}

interface CoreCompetencesSectionProps {
  competences: Competence[];
}

const CoreCompetencesSection = ({ competences }: CoreCompetencesSectionProps) => {
  if (!competences?.length) return null;

  return (
    <PageSection title="Core Competences" icon={<Award />}>
      <PageGrid cols={3} gap="md">
        {(competences ?? []).map((competence, i) => {
          const Icon = competence.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="w-full flex justify-center"
            >
              <PageCard className="group">
                <Icon
                  className="
                    w-6 h-6
                    text-primary
                    mb-3
                    transition-all
                    group-hover:scale-110
                    group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]
                  "
                />

                <p className="text-foreground font-medium">
                  {competence.title}
                </p>
              </PageCard>
            </motion.div>
          );
        })}
      </PageGrid>
    </PageSection>
  );
};

export default CoreCompetencesSection;