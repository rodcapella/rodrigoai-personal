import { LazyMotion, domAnimation, m } from "framer-motion"
import React, { lazy } from "react"

const Award = lazy(() => import("lucide-react").then(m => ({ default: m.Award })));

interface CertificationsSectionProps {
  certifications: string[]
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {

  return (
    <LazyMotion features={domAnimation}>
      <div className="container max-w-4xl mx-auto">

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            Certifications & Courses
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {certifications?.map((cert, idx) => (

              <m.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex items-start gap-3 p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20"
              >

                <span className="text-primary font-bold mt-1">
                  •
                </span>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {cert}
                </p>

              </m.div>

            ))}

          </div>

        </m.div>

      </div>
    </LazyMotion>
  )
}