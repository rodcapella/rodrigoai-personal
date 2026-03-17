import { lazy } from "react"
import SectionTitle from "@/components/layout/SectionTitle"
import { Heart} from "@/lib/icons"
import { motion } from "framer-motion";
import Container from "@/components/layout/Container"

export default function PersonalPhilosophy() {

  return (
      <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent py-20">

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle icon={<Heart className="w-8 h-8" />}>
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

          </motion.div>
        </Container>

      </section>
  )
}