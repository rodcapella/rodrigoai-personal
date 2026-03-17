import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Cpu } from "@/lib/icons";

const ExpertiseSection = () => {
  return (
    <PageSection title="Core Skills" icon={<Cpu />} id="expertise">
      <PageGrid cols={4} gap="sm">
        {profile.core_skills.map((skill, i) => {
          const Icon = skill.icon;

          return (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <PageCard className="group text-center" hover>
                <Icon
                  className="
                    w-5 h-5
                    text-primary
                    mx-auto mb-3
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]
                  "
                />

                <p className="text-foreground text-sm font-medium">
                  {skill.title}
                </p>
              </PageCard>
            </motion.div>
          );
        })}
      </PageGrid>
    </PageSection>
  );
};

export default ExpertiseSection;
