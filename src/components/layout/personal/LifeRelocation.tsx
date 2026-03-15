import { motion } from "framer-motion"
import { lazy } from "react"

const Compass = lazy(() => import("lucide-react").then(m => ({ default: m.Compass })));

import SectionTitle from "@/components/layout/SectionTitle"

export default function LifeRelocation() {

  return (
      <section className="px-4 mb-20">

        <div className="container max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

          <SectionTitle icon={<Compass className="w-8 h-8" />}>
            Life & Relocation
          </SectionTitle>

            <div className="space-y-6 text-muted-foreground leading-relaxed">

              <p>
                In the end of 2019, I made a significant life decision to relocate to Portugal together with his family (wife, son and their dog), seeking improved quality of life, greater personal and family security, and more challenging professional opportunities. 
                This move was driven by the desire to work on international and multi-domain projects while learning new concepts and technologies within more mature data environments.
              </p>

              <p>
                Today, the family has grown and now includes a second dog. Portugal has become home, offering the perfect balance between professional growth and personal fulfillment. The relocation proved to be a transformative decision that shaped both his career trajectory and personal identity.
              </p>

              <p>
                This journey reflects my philosophy: intentional decisions that align personal values with professional aspirations, creating a life of purpose and continuous evolution.
              </p>

            </div>

          </motion.div>

        </div>

      </section>
  )
}