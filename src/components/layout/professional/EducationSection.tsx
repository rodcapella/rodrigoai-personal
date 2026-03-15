import Section from "@/components/layout/Section"
import SectionTitle from "@/components/layout/SectionTitle"

const EducationSection = () => {
  return (
    <Section>
      <SectionTitle>Academic Background</SectionTitle>
    </Section>
    
                <h2 className="group text-3xl font-bold mb-12 flex items-center gap-3 transition-all duration-300 hover:tracking-wide">

                              <Suspense fallback={null}>
                                <Brain
                                  className="
                                    w-6 h-6
                                    text-primary
                                    transition-all duration-300
                                    group-hover:scale-110
                                    group-hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]
                                  "
                                />
                              </Suspense>

                              <span className="transition-colors duration-300 group-hover:text-primary">
                                Academic Background
                              </span>

                </h2>
  )
}

export default EducationSection