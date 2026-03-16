import React from "react"
import { motion } from "framer-motion"

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

  const isCenter = align === "center"

  return (

    <div className={`mb-14 ${isCenter ? "text-center" : ""}`}>

      <h2
        className={`
          group
          text-xl md:text-2xl lg:text-3xl
          flex items-center gap-3
          ${isCenter ? "justify-center" : ""}
        `}
      >

        {icon && (
          <span
            className="
              text-primary
              transition-transform duration-300
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
            bg-gradient-to-r from-primary to-secondary
            bg-clip-text text-transparent
            transition-all duration-300
            group-hover:from-secondary group-hover:to-primary
          "
        >
          {children}
        </span>

      </h2>

      {/* Linha animada */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: isCenter ? "120px" : "80px" }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`
          h-[2px] mt-4
          bg-gradient-to-r from-primary to-secondary
          ${isCenter ? "mx-auto" : ""}
        `}
      />

    </div>

  )
}

export default SectionTitle