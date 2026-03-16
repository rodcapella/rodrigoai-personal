import { GraduationCap } from "@/lib/icons"
import SectionTitle from "@/components/layout/SectionTitle"
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
    <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent py-16">
      <Container>
        <SectionTitle icon={<GraduationCap className="w-6 h-6" />}>
          Academic Background
        </SectionTitle>

          <div className="grid md:grid-cols-3 gap-8">

            {education?.map((edu, i) => (

              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`p-6 rounded-xl glass ${
                  ["layer-yellow", "layer-green", "layer-purple", "layer-blue"][i % 3]
                }`}
              >

                <h3 className="text-xl font-semibold mb-4">
                  {edu.degree}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {edu.institution} • {edu.location} • {edu.year}
                </p>

              </motion.div>

            ))}

            </div>
      </Container>
    </section>
  )
}