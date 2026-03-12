import React from "react"

interface SectionTitleProps {
  icon?: React.ElementType
  children: React.ReactNode
  align?: "left" | "center"
}

const SectionTitle = ({
  icon: Icon,
  children,
  align = "left"
}: SectionTitleProps) => {
  return (
    <h2
      className={`text-3xl font-bold mb-12 flex items-center gap-3 ${
        align === "center" ? "justify-center text-center" : ""
      }`}
    >
      {Icon && <Icon className="w-8 h-8 text-primary" />}
      {children}
    </h2>
  )
}

export default SectionTitle