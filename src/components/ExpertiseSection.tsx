import { LazyMotion, domAnimation, m } from "framer-motion";
import { profile } from "@/data/profile";
import Section from "@/components/layout/Section";
import SectionTitle from "@/components/layout/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";

import { lazy, Suspense } from "react"

const Database = lazy(() => import("lucide-react").then(m => ({ default: m.Database })))
const Zap = lazy(() => import("lucide-react").then(m => ({ default: m.Zap })))
const Rocket = lazy(() => import("lucide-react").then(m => ({ default: m.Rocket })))
const Cpu = lazy(() => import("lucide-react").then(m => ({ default: m.Cpu })))
const Cloud = lazy(() => import("lucide-react").then(m => ({ default: m.Cloud })))
const Shield = lazy(() => import("lucide-react").then(m => ({ default: m.Shield })))
const Workflow = lazy(() => import("lucide-react").then(m => ({ default: m.Workflow })))
const Code = lazy(() => import("lucide-react").then(m => ({ default: m.Code })))

const icons = [
  Database,
  Zap,
  Rocket,
  Cpu,
  Cloud,
  Shield,
  Workflow,
  Code
]

const ExpertiseSection = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Section variant="highlight" className="relative" id="expertise">

        {/* background pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">
            Expertise
          </p>

          <SectionTitle>
            Core Skills
          </SectionTitle>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.core_skills.map((skill, i) => {
            const Icon = icons[i % icons.length];

            return (
              <m.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card
                  variant="glass"
                  hover
                  className="group p-5"
                >
                  <CardContent className="p-0">
                    <Icon className="w-5 h-5 text-primary mb-3 group-hover:text-secondary transition-colors" />
                    <p className="text-foreground text-sm font-medium">
                      {skill}
                    </p>
                  </CardContent>
                </Card>
              </m.div>
            );
          })}
        </div>
      </Section>
    </LazyMotion>
  );
};

export default ExpertiseSection;
