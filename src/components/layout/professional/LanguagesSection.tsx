import React from "react"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { Globe } from "lucide-react"
import SectionTitle from "@/components/ui/SectionTitle"

interface Language {
  name: string
  level: string
}

interface LanguagesSectionProps {
  languages: Language[]
}

export default function LanguagesSection({ languages }: LanguagesSectionProps) {

  return (
    <LazyMotion features={domAnimation}>
      <div className="container max-w-4xl mx-auto">
          <SectionTitle icon={<Globe className="w-6 h-6" />}>
            Languages
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">

          {languages?.map((lang, idx) => (

            <m.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`p-6 rounded-xl glass ${
                ["layer-yellow", "layer-blue", "layer-purple"][idx % 3]
              }`}
            >

              <h3 className="text-xl font-semibold mb-4">
                {lang.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {lang.level}
              </p>

            </m.div>

          ))}

          </div>

      </div>
    </LazyMotion>
  )
}