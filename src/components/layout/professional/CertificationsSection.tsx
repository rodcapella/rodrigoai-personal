import React from "react"
import { Award } from "lucide-react"
import SectionTitle from "@/components/ui/SectionTitle"

interface CertificationsSectionProps {
  certifications: string[]
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {

  return (
      <div className="container max-w-4xl mx-auto">

          <SectionTitle icon={<Award className="w-6 h-6" />}>
            Certifications & Courses
          </SectionTitle>
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

      </div>
  )
}