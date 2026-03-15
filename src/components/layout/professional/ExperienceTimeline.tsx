import React from "react"
import { Briefcase } from "lucide-react"
import SectionTitle from "@/components/ui/SectionTitle"

interface Experience {
  title: string
  company: string
  location: string
  period: string
  highlights: string[]
  stack: string[]
}

interface ExperienceTimelineProps {
  experiences?: Experience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {

  return (
      <div className="container max-w-4xl mx-auto">

        <SectionTitle icon={<Briefcase className="w-6 h-6" />}>
          Professional Experience
        </SectionTitle>

        <div className="space-y-10">

          {(experiences ?? []).map((exp, idx) => (

            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="border-l-4 border-primary pl-6 pb-6"
            >

              <h3 className="text-xl font-semibold mb-4">
                {exp.title}
              </h3>

              <p className="text-lg font-semibold text-foreground">
                {exp.company}
              </p>

              <p className="text-sm text-muted-foreground mb-4">
                {exp.location} • {exp.period}
              </p>

              <ul className="space-y-2 mb-6">

                {(exp.highlights ?? []).map((highlight, i) => (

                  <li
                    key={i}
                    className="flex gap-3 text-muted-foreground text-sm leading-relaxed"
                  >
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </li>

                ))}

              </ul>

              <div>

                <p className="text-sm font-semibold mb-3">
                  Tech Stack
                </p>

                <div className="flex flex-wrap gap-2">

                  {(exp.stack ?? []).map((tech, i) => (

                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium border border-orange-500/30"
                    >
                      {tech}
                    </span>

                  ))}

                </div>

              </div>

            </m.div>

          ))}

        </div>

      </div>
    </LazyMotion>
  )
}