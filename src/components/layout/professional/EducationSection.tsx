import Section from "@/components/layout/Section"
import SectionTitle from "@/components/layout/SectionTitle"
import { Brain } from "lucide-react"

const EducationSection = () => {

  return (

    <Section>

      <SectionTitle icon={<Brain className="w-6 h-6" />}>
        Academic Background
      </SectionTitle>

    </Section>

  )

}

export default EducationSection