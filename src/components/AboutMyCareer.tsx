import { motion } from "framer-motion"
import { lazy, Suspense } from "react"
import { Briefcase} from "@/lib/icons"
import SectionTitle from "@/components/layout/SectionTitle"
import Container from "@/components/layout/Container"

const ChevronRight = lazy(() =>
  import("lucide-react").then(m => ({ default: m.ChevronRight }))
)

const AboutMyCareer = () => {

  const funFacts = [
    "15+ years building data solutions across Brazil and Portugal",
    "Passionate about translating complex business problems into scalable technical solutions",
    "Strong advocate for data-driven decision making and analytical excellence",
    "Believe that great data architecture is like great engineering: elegant, scalable, and purposeful",
    "Committed to establishing data governance best practices and compliance standards",
    "Skilled at designing analytics products, dashboards and reports that transform data into actionable insights",
    "Experienced in leading teams through digital transformation initiatives"
  ]

  return (
      <section className="px-4 py-20">

        <Container>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle icon={<Briefcase className="w-6 h-6" />}>
              About My Career
            </SectionTitle>

            <div className="space-y-4">

              {funFacts.map((fact, idx) => (

                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="
                    group
                    bg-gradient-to-r from-primary/10 to-primary/5
                    p-6 rounded-xl
                    border border-primary/20
                    flex items-start gap-4
                    transition-all duration-300
                    hover:border-primary/40
                    hover:translate-x-1
                  "
                >

                  <Suspense fallback={null}>
                    <ChevronRight
                      className="
                        w-5 h-5 mt-1
                        text-primary
                        flex-shrink-0
                        transition-all duration-300
                        group-hover:translate-x-1
                        group-hover:drop-shadow-[0_0_4px_rgba(249,115,22,0.6)]
                      "
                    />
                  </Suspense>

                  <p className="text-muted-foreground leading-relaxed">
                    {fact}
                  </p>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </Container>

      </section>
  )
}

export default AboutMyCareer