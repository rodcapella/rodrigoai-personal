import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Award, ChevronRight } from "@/lib/icons";

interface CertificationsSectionProps {
  certifications: string[];
}

export default function CertificationsSection({
  certifications,
}: CertificationsSectionProps) {
  return (
    <PageSection title="Certifications & Courses" icon={<Award />}>
      <div className="space-content md:space-section">
        {certifications?.map((cert, idx) => (
          <PageCard className="group flex items-start gap-4">
              
              <ChevronRight
                className="
                  w-6 h-6 opacity-80
                  text-primary
                  flex-shrink-0
                  transition-all duration-300
                  group-hover:translate-x-1
                  group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]
                "
              />

              <p className="body-md">
                {cert}
              </p>

            </PageCard>
        ))}
      </div>
    </PageSection>
  );
}