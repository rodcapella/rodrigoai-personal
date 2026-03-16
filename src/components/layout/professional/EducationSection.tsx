import { GraduationCap } from "@/lib/icons"
import SectionTitle from "@/components/ui/SectionTitle"
import { motion } from "framer-motion"
import Container from "@/components/layout/Container"

interface Education {
  degree: string
  institution: string
  location: string
  year: string
}

interface EducationSectionProps {
  education: Education[]
}

export default function EducationSection({ education }: EducationSectionProps) {

  return (
    <Container>
      <SectionTitle icon={<GraduationCap className="w-6 h-6" />}>
        Academic Background
      </SectionTitle>

      <div className="grid md:grid-cols-3 gap-8">

        {education?.map((edu, i) => (

          <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-3 p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20"
              >

                 <p className="text-muted-foreground">
                  {edu.degree} • {edu.institution} • {edu.location} • {edu.year}
                </p>

            </motion.div>

        ))}

      </div>
    </Container>
  )
}