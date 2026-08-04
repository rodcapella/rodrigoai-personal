import SectionContent from "@/components/layout/SectionContent";
import { Users } from "@/lib/icons";

export default function LeadershipBeyondTechnologySection() {
  return (
    <SectionContent
      title="Leadership Beyond Technology"
      icon={<Users className="h-6 w-6 opacity-80" />}
      variant="default"
    >
      <p className="body-lg text-justify">
        Beyond hands-on engineering, I have led multidisciplinary data teams,
        mentored engineers and analysts, established architecture and delivery
        standards, and acted as a primary technical partner for clients and
        business stakeholders. My experience in solution scoping, product
        development and commercial discussions helps me connect data strategy,
        technology, people and business outcomes.
      </p>
    </SectionContent>
  );
}
