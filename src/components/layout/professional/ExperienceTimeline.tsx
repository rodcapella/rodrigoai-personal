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
  experiences,
}: ExperienceTimelineProps) {
  if (!experiences?.length) return null;

  return (
    <PageSection title="Professional Experience" icon={<Briefcase />}>
      <div className="relative w-full space-section">
        
        {/* linha vertical */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-primary/20" />

        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="relative pl-12"
          >
            {/* dot */}
            <div className="absolute left-2 top-3 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.6)]" />

            <PageCard className="space-content">
  
              {/* HEADER */}
              <div className="space-tight">
                
                {/* ROLE */}
                <h3 className="heading-sm">
                  {exp.title}
                </h3>

                {/* COMPANY + PERIOD */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="body-md text-primary font-medium">
                    {exp.company}
                  </span>

                  <span className="body-sm opacity-70">
                    {exp.period}
                  </span>
                </div>

                {/* LOCATION */}
                <span className="body-sm opacity-70">
                  {exp.location}
                </span>

              </div>

              {/* HIGHLIGHTS */}
              <ul className="space-tight">
                {(exp.highlights ?? []).map((highlight, i) => (
                  <li key={i} className="flex gap-2 body-sm">
                    <span className="text-primary">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* STACK */}
              <div className="space-tight">
                
                {/* label mais discreta */}
                <span className="body-xs opacity-50 uppercase tracking-wide">
                  Tech Stack
                </span>

                <div className="flex flex-wrap gap-2">
                  {(exp.stack ?? []).map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="tag-ai"
                    >
                      {tech}
                    </motion.span>
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