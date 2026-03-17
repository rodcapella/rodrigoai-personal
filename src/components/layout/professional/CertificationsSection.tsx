import React from "react"
import { Award } from "@/lib/icons"
import SectionTitle from "@/components/layout/SectionTitle"
import { motion } from "framer-motion"
import Container from "@/components/layout/Container"

interface CertificationsSectionProps {
  certifications: string[]
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {

  return (
      <Container>
          <SectionTitle icon={<Award className="w-6 h-6" />}>
            Certifications & Courses
          </SectionTitle>
          <div className="space-y-6">

              {certifications?.map((cert, idx) => (

                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 flex items-start gap-4"
                >

                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />

                  <p className="text-muted-foreground leading-relaxed">
                   {cert}
                  </p>

                </motion.div>

              ))}

          </div>
      </Container>
  )
}