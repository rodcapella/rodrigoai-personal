import { homeProfile } from "@/data/homeProfile";
import { User } from "@/lib/icons";
import SectionContent from "@/components/layout/SectionContent";

const AboutSection = () => {
  return (
    <SectionContent title={homeProfile.name} icon={<User />}>
      <div className="space-text">
        <p className="body-lg text-justify">
          {homeProfile.leadershipFocus}
        </p>

        <p className="body-lg text-justify">
          {homeProfile.impactOrientation}
        </p>
      </div>
    </SectionContent>
  );
};

export default AboutSection;
