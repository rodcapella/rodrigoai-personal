import React from "react"
import Container from "@/components/layout/Container"
import SectionTitle from "@/components/layout/SectionTitle"

interface PageSectionProps {
  id?: string
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  containerClassName?: string
  variant?: "default" | "muted" | "gradient" | "glass"
  container?: boolean
  spacing?: "none" | "default" | "sm" | "lg"
}

const variants = {
  default: "",
  muted: "bg-muted/40",
  gradient: "bg-gradient-to-br from-primary/10 to-transparent",
  glass: "bg-white/5 backdrop-blur-md border-y border-white/10"
}

const spacingMap = {
  none: "py-0",
  sm: "py-8 md:py-10",
  default: "py-12 md:py-16",
  lg: "py-20 md:py-24"
}

const PageSection = ({
  id,
  title,
  icon,
  children,
  className = "",
  containerClassName = "",
  variant = "default",
  container = true,
  spacing = "default"
}: PageSectionProps) => {

  const content = (
    <div className="space-y-7 md:space-y-8">
      {/* 🔥 Title */}
      {title && (
        <div>
          <SectionTitle
            as="h2"
            icon={icon}
            className="heading-lg"
          >
            {title}
          </SectionTitle>
        </div>
      )}

      {/* 🔥 Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  )

  return (
    <section
      id={id}
      className={`relative ${spacingMap[spacing]} ${variants[variant]} ${className}`}
    >
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
