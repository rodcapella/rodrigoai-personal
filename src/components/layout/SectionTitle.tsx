import React from "react"
import { motion } from "framer-motion"

interface SectionTitleProps {
  icon?: React.ReactNode
  children: React.ReactNode
  align?: "left" | "center"
}

export default function SectionTitle({
  icon,
  children,
  align = "left"
}: SectionTitleProps) {

  const isCenter = align === "center"

  return (

    <div className={`mb-14 ${isCenter ? "text-center" : ""}`}>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`
          group
          text-2xl md:text-3xl font-bold
          flex items-center gap-3
          ${isCenter ? "justify-center" : ""}
        `}
      >

        {icon && (
          <span
            className="
              text-primary
              transition-all duration-300
              group-hover:scale-110
              group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]
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

      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: isCenter ? "120px" : "80px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`
          h-[2px] mt-4
          bg-gradient-to-r from-primary to-secondary
          ${isCenter ? "mx-auto" : ""}
        `}
      />

    </div>
  )
}