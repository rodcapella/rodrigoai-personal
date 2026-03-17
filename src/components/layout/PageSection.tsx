import React from "react"
import Container from "@/components/layout/Container"
import SectionTitle from "@/components/layout/SectionTitle"

interface PageSectionProps {
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  containerClassName?: string
}

const PageSection = ({
  title,
  icon,
  children,
  className = "",
  containerClassName = ""
}: PageSectionProps) => {

  return (
    <section className={`py-20 ${className}`}>
      <Container className={containerClassName}>

        {title && (
          <SectionTitle icon={icon}>
            {title}
          </SectionTitle>
        )}

        {children}

      </Container>
    </section>
  )
}

export default PageSection