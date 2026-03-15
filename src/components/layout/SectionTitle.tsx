import React from "react"

interface SectionTitleProps {
  icon?: React.ReactNode
  children: React.ReactNode
  align?: "left" | "center"
}

const SectionTitle = ({
  icon,
  children,
  align = "left"
}: SectionTitleProps) => {

  return (

    <h2
      className={`text-3xl font-bold mb-12 flex items-center gap-3 ${
        align === "center" ? "justify-center text-center" : ""
      }`}
    >

      {icon && (
        <span className="text-primary flex items-center">
          {icon}
        </span>
      )}

      {children}

    </h2>

  )
}

export default SectionTitle