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
        {competences.map((competence, i) => {
          const Icon = competence.icon;

          return (
            <PageCard
              key={i}
              align="center"
              className="space-tight"
              hover
            >
              <div className="flex flex-col items-center gap-2 text-center">
                
                {/* ICON */}
                <Icon className="w-6 h-6 text-primary" />

                {/* TITLE */}
                <span className="label">
                  {competence.title}
                </span>

              </div>
            </PageCard>
          );
        })}
      </PageGrid>
    </PageSection>
  );
};

export default CoreCompetencesSection;
