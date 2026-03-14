import { LazyMotion, domAnimation, m } from "framer-motion";
import { profile } from "@/data/profile";
import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";

import { lazy } from "react";

const Database = lazy(() => import("lucide-react").then(m => ({ default: m.Database })));
const Zap = lazy(() => import("lucide-react").then(m => ({ default: m.Zap })));
const Rocket = lazy(() => import("lucide-react").then(m => ({ default: m.Rocket })));
const Cpu = lazy(() => import("lucide-react").then(m => ({ default: m.Cpu })));
const Cloud = lazy(() => import("lucide-react").then(m => ({ default: m.Cloud })));
const Shield = lazy(() => import("lucide-react").then(m => ({ default: m.Shield })));
const Workflow = lazy(() => import("lucide-react").then(m => ({ default: m.Workflow })));
const Code = lazy(() => import("lucide-react").then(m => ({ default: m.Code })));

const icons = [
  Database,
  Zap,
  Rocket,
  Cpu,
  Cloud,
  Shield,
  Workflow,
  Code
];

const ExpertiseSection = () => {

  return (
    <LazyMotion features={domAnimation}>

      <Section className="relative px-4 py-16" id="expertise">

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >

          <h2 className="group text-3xl font-bold mb-12 flex items-center gap-3 transition-all duration-300 hover:tracking-wide">

            <Cpu
              className="
              w-6 h-6
              text-primary
              transition-all duration-300
              group-hover:scale-110
              group-hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]
              "
            />

            Core Skills

          </h2>

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