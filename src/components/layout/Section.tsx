import Container from "@/components/layout/Container"

interface SectionProps {
  variant?: "hero" | "content" | "highlight"
  children: React.ReactNode
}

const variants = {
  hero: "pt-32 mb-24 px-4",
  content: "mb-20 px-4",
  highlight: "py-16 px-4"
}

const Section = ({ variant = "content", children }: SectionProps) => {
  return (
    <section className={variants[variant]}>
      <Container>
        {children}
      </Container>
    </section>
  )
}

export default Section