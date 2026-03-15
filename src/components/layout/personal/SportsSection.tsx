import { LazyMotion, domAnimation, m } from "framer-motion"
import { lazy } from "react"

const Trophy = lazy(() => import("lucide-react").then(m => ({ default: m.Trophy })));

import SectionTitle from "@/components/layout/SectionTitle"

const sportsTeams = [
  { team: "Flamengo", country: "Brazil", emoji: "🔴⚫" },
  { team: "FC Porto", country: "Portugal", emoji: "🔵⚪" }
]

export default function SportsSection() {

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
            <SectionTitle icon={Trophy}>
              Team Spirit
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-8">

              {sportsTeams.map((team, idx) => (

                <m.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass rounded-xl p-8 text-center"
                >

                  <div className="text-4xl mb-4">
                    {team.emoji}
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    {team.team}
                  </h3>

                  <p className="text-muted-foreground">
                    {team.country}
                  </p>

                </m.div>

              ))}

            </div>

            <p className="text-center text-muted-foreground mt-8">
              Passionate supporter of Flamengo (Brazil) and FC Porto (Portugal), bridging two countries through sports.
            </p>

          </m.div>

        </div>

      </section>

    </LazyMotion>
  )
}