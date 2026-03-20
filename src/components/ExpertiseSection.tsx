import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Cpu } from "@/lib/icons";

const ExpertiseSection = () => {
  return (
    <PageSection title="Core Skills" icon={<Cpu />} id="expertise">
      <PageGrid cols={{ base: 2, md: 3, lg: 4 }} gap="sm">
        {profile.core_skills.map((skill, i) => {
          const Icon = skill.icon;

          return (
            <PageCard
              key={skill.title}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group skill-card text-center"
              hover
            >
              <Icon className="w-5 h-5 text-primary mx-auto mb-3" />

              <p className="text-foreground text-sm font-medium">
                {skill.title}
              </p>
            </PageCard>
          );
        })}
      </PageGrid>
    </PageSection>
  );
};

export default ExpertiseSection;
