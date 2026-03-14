import { LazyMotion, domAnimation, m } from "framer-motion"
import { lazy } from "react"

const Heart = lazy(() => import("lucide-react").then(m => ({ default: m.Heart })));

export default function PersonalPhilosophy() {

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
            <SectionTitle icon={<Heart className="w-8 h-8 text-primary" />}>
              Personal Philosophy
            </SectionTitle>

            <div className="space-y-6 text-muted-foreground leading-relaxed">

              <p className="text-lg">
                I am a Data Analytics Engineer and Team Leader with 15+ years of experience designing scalable data architectures and leading cross-functional engineering teams.
              </p>

              <p>
                Throughout my career, i had held technical leadership and managerial roles across logistics, e-commerce, retail, financial services and digital media. 
                I combine deep technical mastery with a holistic understanding of how data drives operational efficiency, strategic decision-making and long-term business impact.
              </p>

            </div>

          </m.div>

        </div>

      </section>

    </LazyMotion>
  )
}