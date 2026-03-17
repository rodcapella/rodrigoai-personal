import React from "react"
import { motion } from "framer-motion"

interface PageCardProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  highlight?: string
  className?: string
}

const PageCard = ({
  title,
  description,
  icon,
  children,
  highlight,
  className = ""
}: PageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`
        relative
        p-6
        rounded-xl
        glass
        border border-border
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary/40
        hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
        ${className}
      `}
    >

      {/* ICON */}
      {icon && (
        <div className="mb-4 text-primary">
          {icon}
        </div>
      )}

      {/* TITLE */}
      {title && (
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>
      )}

      {/* DESCRIPTION */}
      {description && (
        <p className="text-muted-foreground mb-3">
          {description}
        </p>
      )}

      {/* HIGHLIGHT */}
      {highlight && (
        <p className="text-sm text-primary font-semibold italic">
          {highlight}
        </p>
      )}

      {/* CUSTOM CONTENT */}
      {children}

    </motion.div>
  )
}

export default PageCard