import { GraduationCap } from "@/lib/icons"
import SectionTitle from "@/components/ui/SectionTitle"

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
    <div className="container max-w-4xl mx-auto">

      <SectionTitle icon={<GraduationCap className="w-6 h-6" />}>
        Academic Background
      </SectionTitle>

      <div className="grid md:grid-cols-2 gap-6">

        {education?.map((edu, i) => (

          <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex items-start gap-3 p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20"
              >

                <h3 className="text-lg font-semibold">
                  {edu.degree}
                </h3>

                 <p className="text-muted-foreground">
                  {edu.institution} • {edu.location}
                </p>

                <p className="text-sm text-muted-foreground">
                  {edu.year}
                </p>

            </motion.div>

        ))}

      </div>

    </div>
  )
}