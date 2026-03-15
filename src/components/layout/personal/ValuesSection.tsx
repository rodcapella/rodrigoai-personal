import { LazyMotion, domAnimation, m } from "framer-motion"
import { lazy } from "react"

const Heart = lazy(() => import("lucide-react").then(m => ({ default: m.Heart })));

import SectionTitle from "@/components/layout/SectionTitle"

const personalValues = [
  {
    title: "Analytical Mindset",
    description: "Data-driven and structured reasoning approach"
  },
  {
    title: "Discipline",
    description: "Structured approach to personal and professional growth"
  },
  {
    title: "Loyalty",
    description: "Commitment to relationships and long-term partnerships"
  },
  {
    title: "Intellectual Growth",
    description: "Continuous learning and exploration"
  },
  {
    title: "Cultural Curiosity",
    description: "Interest in different perspectives and cultures"
  },
  {
    title: "Technology Enthusiasm",
    description: "Constant exploration of emerging technologies"
  }
]

export default function ValuesSection() {

  return (
    <LazyMotion features={domAnimation}>

      <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">

        <div className="container max-w-4xl mx-auto">

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle icon={<Heart className="w-8 h-8" />}>
              Core Values
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-8">

              {personalValues.map((value, idx) => (

                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="glass rounded-xl p-6 hover:-translate-y-1 transition-all"
                >

                  <h3 className="text-lg font-bold mb-2">
                    {value.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>

                </m.div>

              ))}

            </div>

          </m.div>

        </div>

      </section>

    </LazyMotion>
  )
}