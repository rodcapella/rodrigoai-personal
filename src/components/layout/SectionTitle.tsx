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
      className={`
        group
        text-3xl font-bold mb-12
        flex items-center gap-3
        transition-all duration-300
        hover:tracking-wide
        ${align === "center" ? "justify-center text-center" : ""}
      `}
    >

      {icon && (
        <span
          className="
            text-primary
            transition-all duration-300
            group-hover:scale-110
            group-hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]
            flex items-center
          "
        >
          {icon}
        </span>
      )}

      <span
        className="
          transition-colors duration-300
          group-hover:text-primary
        "
      >
        {children}
      </span>

    </h2>

  )
}

export default SectionTitle