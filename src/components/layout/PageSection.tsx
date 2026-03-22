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
  spacing?: "default" | "sm" | "lg"
}

const variants = {
  default: "",
  muted: "bg-muted/40",
  gradient: "bg-gradient-to-br from-primary/10 to-transparent",
  glass: "bg-white/5 backdrop-blur-md border-y border-white/10"
}

const spacingMap = {
  sm: "py-10",
  default: "py-20",
  lg: "py-32"
}

const PageSection = ({
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
    <div className="space-y-10">
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