import React from "react"
import { motion } from "framer-motion"
import { Award } from "@/lib/icons"
import SectionTitle from "@/components/ui/SectionTitle"

interface Competence {
  icon: React.ElementType
  title: string
}

interface CoreCompetencesSectionProps {
  competences: Competence[]
}

const CoreCompetencesSection = ({ competences }: CoreCompetencesSectionProps) => {
  return (
    <div className="container max-w-4xl mx-auto">

      <SectionTitle icon={<Award className="w-8 h-8" />}>
        Core Competences
      </SectionTitle>

      <div className="grid md:grid-cols-2 lg:grid-cols-3">

        {competences.map((competence, i) => {
          const Icon = competence.icon

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-start gap-3 p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20"
            >
              <Icon className="w-6 h-6 text-primary flex-shrink-0" />

              <p className="text-muted-foreground text-sm leading-relaxed">
                {competence.title}
              </p>
            </motion.div>
          )
        })}

      </div>

    </div>
  )
}

export default CoreCompetencesSection