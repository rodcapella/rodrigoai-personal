import React from "react"
import { Briefcase } from "@/lib/icons"
import SectionTitle from "@/components/layout/SectionTitle"
import { motion } from "framer-motion"
import Container from "@/components/layout/Container"

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
    <section className="py-20">
      <Container>
        <SectionTitle icon={<Briefcase className="w-8 h-8" />}>
          Professional Experience
        </SectionTitle>

        <div className="space-y-4">

          {(experiences ?? []).map((exp, idx) => (

            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="
                relative
                border-l-4 border-primary
                pl-6
              "
            >

              <div
                className="
                  p-6
                  rounded-xl
                  border border-border
                  bg-card
                  hover:border-primary/40
                  transition-all duration-300
                "
              >

                {/* Role */}

                <h3 className="text-xl font-semibold mb-1 text-secondary">
                  {exp.title}
                </h3>

                {/* Company */}
                <p
                  className="
                    text-lg font-semibold
                    bg-gradient-to-r from-primary to-secondary
                    bg-clip-text text-transparent
                  "
                >
                  {exp.company}
                </p>

                {/* Location + period */}
                <p className="text-sm text-muted-foreground mb-5">
                  {exp.location} • {exp.period}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">

                  {(exp.highlights ?? []).map((highlight, i) => (

                    <li
                      key={i}
                      className="flex gap-3 text-muted-foreground text-sm leading-relaxed"
                    >

                      <span className="text-primary font-bold flex-shrink-0">
                        •
                      </span>

                      <span>{highlight}</span>

                    </li>

                  ))}

                </ul>

                {/* Tech Stack */}
                <div>

                  <p className="text-sm font-semibold mb-3 text-foreground">
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
                          text-orange-500 font-semibold text-xs
                          border border-primary/30
                          hover:bg-primary/20
                          transition-colors
                        "
                      >
                        {tech}
                      </span>

                    ))}

                  </div>

                </div>

              </div>
            </motion.div>

          ))}

        </div>
      </Container>
    </section>
  )
}