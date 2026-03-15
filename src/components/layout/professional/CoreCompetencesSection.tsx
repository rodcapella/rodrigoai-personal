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

            {competences.map((competence, i) => {

              const Icon = competence.icon

              return (
                <div key={i} className="flex items-start gap-4">

                  <Icon className="w-6 h-6 text-primary" />

                  <p className="text-muted-foreground">
                    {competence.title}
                  </p>

                </div>
              )
            })}

          </div>

        </m.div>

      </div>

    </LazyMotion>
  )
}

export default CoreCompetencesSection