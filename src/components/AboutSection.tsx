import { profile } from "@/data/profile";
import { User } from "@/lib/icons";
import SectionContent from "@/components/layout/SectionContent";

const AboutSection = () => {
  return (
    <SectionContent title={profile.name} icon={<User />}>
      <p className="text-muted-foreground text-lg leading-relaxed">
        {profile.summary}
      </p>

      <p className="text-muted-foreground text-lg leading-relaxed">
        {profile.positioning_statement}
      </p>
    </SectionContent>
  );
};

export default AboutSection;