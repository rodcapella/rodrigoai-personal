import { Globe } from "lucide-react"
import { LazyMotion, domAnimation, m } from "framer-motion"

interface Language {
  language: string
  level: string
}

interface LanguagesSectionProps {
  languages: Language[]
}

export default function LanguagesSection({ languages }: LanguagesSectionProps) {

  return (
    <LazyMotion features={domAnimation}>
      <div className="container max-w-4xl mx-auto">

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Globe className="w-8 h-8 text-primary" />
            Languages
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {languages.map((lang, idx) => (

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
                  {lang.language}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {lang.level}
                </p>

              </m.div>

            ))}

          </div>

        </m.div>

      </div>
    </LazyMotion>
  )
}