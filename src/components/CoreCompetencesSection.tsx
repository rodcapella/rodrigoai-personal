import PageSection from "@/components/layout/PageSection";
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {competences.map((competence) => {
          const Icon = competence.icon;

          return (
            <div
              key={competence.title}
              className="relative flex h-full flex-col items-center rounded-xl border border-border p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)]"
            >
              <div className="flex flex-col items-center gap-2 text-center">
                
                {/* ICON */}
                <Icon className="w-6 h-6 text-primary" />

                {/* TITLE */}
                <span className="label">
                  {competence.title}
                </span>

              </div>
            </div>
          );
        })}
      </div>
    </PageSection>
  );
};

export default CoreCompetencesSection;
