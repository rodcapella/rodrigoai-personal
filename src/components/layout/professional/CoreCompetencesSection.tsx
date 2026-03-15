import React from "react"
import { Award } from "lucide-react"
import SectionTitle from "@/components/ui/SectionTitle"

interface CoreCompetencesSectionProps {
  competences: string[]
}

const CoreCompetencesSection = ({ competences }: CoreCompetencesSectionProps) => {
  return (
      <div className="container max-w-4xl mx-auto">

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
      </div>
  )
}

export default CoreCompetencesSection