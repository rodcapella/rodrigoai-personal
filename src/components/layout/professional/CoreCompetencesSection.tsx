import React from "react"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { Award } from "lucide-react"
import SectionTitle from "@/components/ui/SectionTitle"

interface CoreCompetencesSectionProps {
  competences: string[]
}

const CoreCompetencesSection = ({ competences }: CoreCompetencesSectionProps) => {
  return (
    <LazyMotion features={domAnimation}>

      <div className="container max-w-4xl mx-auto">

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <SectionTitle icon={<Award className="w-8 h-8" />}>
            Core Competences
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-6">

            {competences?.map((item, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass rounded-xl p-6 hover:-translate-y-1 transition-all"
              >

                <div className="flex items-start gap-3">

                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />

                  <p className="text-muted-foreground leading-relaxed">
                    {item}
                  </p>

                </div>

              </m.div>
            ))}

          </div>

        </m.div>

      </div>

    </LazyMotion>
  )
}

export default CoreCompetencesSection