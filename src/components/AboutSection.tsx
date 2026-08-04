import { profile } from "@/data/profile";
import { User } from "@/lib/icons";
import SectionContent from "@/components/layout/SectionContent";

const AboutSection = () => {
  return (
    <SectionContent title={profile.name} icon={<User />}>
      <div className="space-text">
        <p className="body-lg text-justify">
          {profile.leadership_focus}
        </p>

        <p className="body-lg text-justify">
          {profile.impact_orientation}
        </p>
      </div>
    </SectionContent>
  );
};

export default AboutSection;
