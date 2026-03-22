import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import ListCard from "@/components/ui/ListCard";
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
            <ListCard
              key={i}
              className="items-center justify-center text-center space-tight"
              icon={<Icon className="w-5 h-5" />}
            >
              <span className="label">
                {competence.title}
              </span>
            </ListCard>
          );
        })}
      </PageGrid>
    </PageSection>
  );
};

export default CoreCompetencesSection;