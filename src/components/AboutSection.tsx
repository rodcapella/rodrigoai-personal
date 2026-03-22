import { profile } from "@/data/profile";
import { User } from "@/lib/icons";
import SectionContent from "@/components/layout/SectionContent";

const AboutSection = () => {
  return (
    <SectionContent title={profile.name} icon={<User />}>
      <div className="space-text">
        <p className="body-lg text-justify">
          {profile.summary}
        </p>

        <p className="body-lg text-justify">
          {profile.positioning_statement}
        </p>
      </div>
    </SectionContent>
  );
};

export default AboutSection;