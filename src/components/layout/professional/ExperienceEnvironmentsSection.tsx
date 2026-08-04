import SectionContent from "@/components/layout/SectionContent";
import { Globe } from "@/lib/icons";

export default function ExperienceEnvironmentsSection() {
  return (
    <SectionContent
      title="Experience Across Different Environments"
      icon={<Globe className="h-6 w-6 opacity-80" />}
      variant="default"
    >
      <p className="body-lg text-justify">
        My experience spans large enterprises, consulting engagements,
        international banking and retail projects, digital businesses and
        technology startups. This diversity allows me to operate effectively in
        regulated corporate environments as well as fast-moving organizations
        requiring flexibility, ownership and rapid delivery.
      </p>
    </SectionContent>
  );
}
