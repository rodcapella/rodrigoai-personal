import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/layout/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import {
  Database,
  Zap,
  Rocket,
  Cpu,
  Cloud,
  Shield,
  Workflow,
  Code,
  Layers,
  BarChart3,
  Network,
  LineChart,
  GitBranch,
  Users,
  ShieldCheck,
} from "@/lib/icons";

const icons = [
  Database,
  Zap,
  Rocket,
  Cpu,
  Cloud,
  Shield,
  Workflow,
  Code,
  Layers,
  BarChart3,
  Network,
  LineChart,
  Users,
  GitBranch,
  ShieldCheck,
];

const ExpertiseSection = () => {
  return (
    <Section className="relative py-20" id="expertise">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle icon={<Cpu className="w-6 h-6" />}>
          Core Skills
        </SectionTitle>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {profile.core_skills.map((skill, i) => {
          const Icon = skill.icon;

          return (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card
                variant="glass"
                hover
                className="
                  group
                  p-5
                  bg-transparent
                  border border-primary/10
                  hover:border-primary/40
                  transition-all
                  "
              >
                <CardContent className="p-0">
                  <Icon
                    className="
                      w-5 h-5
                      text-primary
                      mb-3
                      transition-all duration-300
                      group-hover:scale-110
                      group-hover:drop-shadow-[0_0_4px_rgba(249,115,22,0.6)]
                      "
                  />

                  <p className="text-foreground text-sm font-medium">
                    {skill.title}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

export default ExpertiseSection;
