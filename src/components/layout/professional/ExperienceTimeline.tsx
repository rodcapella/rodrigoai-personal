import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Briefcase } from "@/lib/icons";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  stack: string[];
}

interface ExperienceTimelineProps {
  experiences?: Experience[];
}

export default function ExperienceTimeline({
}: ExperienceTimelineProps) {
  return (
    <PageSection title="Professional Experience" icon={<Briefcase />}>
      <div className="relative max-w-3xl space-y-10">
        {/* vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-primary/20" />

        {(experiences ?? []).map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="relative pl-8"
          >
            {/* timeline dot */}
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.6)]" />

            <PageCard>
              {/* Role */}
              <h3 className="text-lg font-semibold mb-1">{exp.title}</h3>

              {/* Company */}
              <p className="text-sm font-semibold text-primary mb-1">
                {exp.company}
              </p>

              {/* Meta */}
              <p className="text-xs text-muted-foreground mb-4">
                {exp.location} • {exp.period}
              </p>

              {/* Highlights */}
              <ul className="space-y-2 mb-5">
                {(exp.highlights ?? []).map((highlight, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div>
                <p className="text-xs font-semibold mb-2 text-foreground">
                  Tech Stack
                </p>

                <div className="flex flex-wrap gap-2">
                  {(exp.stack ?? []).map((tech, i) => (
                    <span
                      key={i}
                      className="
                        px-3 py-1
                        rounded-full
                        bg-primary/10
                        text-primary
                        text-xs font-medium
                        border border-primary/20
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </PageCard>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
}
