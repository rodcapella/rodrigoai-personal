import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
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
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
          >
            <PageCard className="group flex items-start gap-4">
              
              <ChevronRight
                className="
                  w-5 h-5 mt-1
                  text-primary
                  flex-shrink-0
                  transition-all duration-300
                  group-hover:translate-x-1
                  group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]
                "
              />

              <p className="body-md">
                {fact}
              </p>

            </PageCard>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
};

export default AboutMyCareer;