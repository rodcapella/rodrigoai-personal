import React from "react"
import Container from "@/components/layout/Container"
import SectionTitle from "@/components/layout/SectionTitle"

interface PageSectionProps {
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  containerClassName?: string
  variant?: "default" | "muted" | "gradient" | "glass"
  container?: boolean
}

const variants = {
  default: "",
  muted: "bg-muted/40",
  gradient: "bg-gradient-to-br from-primary/10 to-transparent",
  glass: "bg-white/5 backdrop-blur-md border-y border-white/10"
}

const PageSection = ({
  title,
  icon,
  children,
  className = "",
  containerClassName = "",
  variant = "default",
  container = true
}: PageSectionProps) => {

  const content = (
    <>
      {(
        <SectionTitle icon={icon}>
          {title}
        </SectionTitle>
      )}

      {children}
    </>
  )

  return (
    <section className={`py-20 ${variants[variant]} ${className}`}>
      {container ? (
        <Container className={containerClassName}>
          {content}
        </Container>
      ) : (
        content
      )}
    </section>
  )
}

export default PageSection