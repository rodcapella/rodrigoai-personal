import { LazyMotion, domAnimation, m } from "framer-motion"
import { lazy } from "react";
import { Sparkles} from "lucide-react"
import SectionTitle from "@/components/layout/SectionTitle"

const aiExploration = [
  "OpenAI",
  "Claude",
  "Gemini",
  "Perplexity",
  "Kimi",
  "Manus",
  "Notion"
]

export default function AIExplorationSection() {

  return (
    <LazyMotion features={domAnimation}>

      <section className="px-4 mb-20">

        <div className="container max-w-4xl mx-auto">

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle icon={<Sparkles className="w-8 h-8" />}>
              AI Ecosystem Exploration
            </SectionTitle>

            <div className="mb-8 space-y-6">

              <p className="text-muted-foreground leading-relaxed">
                I actively study and evaluate modern AI systems as part of an independent experimentation practice focused on applied intelligence and architectural integration. I analyze behavioral patterns, architectural trade-offs, response reliability and integration potential within scalable data environments.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I use structured knowledge management tools such as Notion to document experiments, architectural patterns and long-term research, maintaining a systematic approach to understanding how AI can enhance data engineering and analytics workflows.
              </p>

            </div>

            <div>

              <h3 className="text-xl font-semibold mb-4">
                Platforms Explored
              </h3>

              <div className="flex flex-wrap gap-3">

                {aiExploration.map((platform, idx) => (

                  <m.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 font-medium text-sm"
                  >

                    {platform}

                  </m.span>

                ))}

              </div>

            </div>

          </m.div>

        </div>

      </section>

    </LazyMotion>
  )
}