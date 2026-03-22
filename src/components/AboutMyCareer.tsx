import PageSection from "@/components/layout/PageSection";
import ListCard from "@/components/ui/ListCard";
import { Briefcase, ChevronRight } from "@/lib/icons";

const AboutMyCareer = () => {
  const funFacts = [
    "15+ years building data solutions across Brazil and Portugal",
    "Passionate about translating complex business problems into scalable technical solutions",
    "Strong advocate for data-driven decision making and analytical excellence",
    "Believe that great data architecture is like great engineering: elegant, scalable, and purposeful",
    "Committed to establishing data governance best practices and compliance standards",
    "Skilled at designing analytics products, dashboards and reports that transform data into actionable insights",
    "Experienced in leading teams through digital transformation initiatives",
  ];

  return (
    <PageSection title="About My Career" icon={<Briefcase />}>
           <div className="space-content md:space-section max-w-3xl">
            {funFacts.map((fact, idx) => (
              <ListCard
                key={idx}
                icon={
                  <ChevronRight className="w-4 h-4 transition-all group-hover:translate-x-1" />
                }
              >
                {fact}
              </ListCard>
            ))}
          </div>
    </PageSection>
  );
};

export default AboutMyCareer;