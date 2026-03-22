import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "center";
  variant?: "default" | "gradient";
  as?: "h2" | "h3";
  className?: string;
}

export default function SectionTitle({
  icon,
  children,
  align = "left",
  variant = "gradient",
  as = "h2",
  className = "",
}: SectionTitleProps) {
  const isCenter = align === "center";

  const textVariant = {
    default: "text-foreground",
    gradient:
      "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
  };

  const MotionTag = motion(as);

  return (
    <div className={`mb-12 ${isCenter ? "text-center" : ""}`}>
      
      <MotionTag
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          group
          heading-lg
          flex items-center gap-3
          ${isCenter ? "justify-center" : ""}
          ${className}
        `}
      >
        {/* ICON */}
        {icon && (
          <span
            className="
              text-primary
              transition-all duration-300
              group-hover:scale-110
              group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]
              flex items-center
            "
          >
            {icon}
          </span>
        )}

        {/* TITLE */}
        <span
          className={`
            transition-all duration-300
            ${textVariant[variant]}
            group-hover:opacity-90
          `}
        >
          {children}
        </span>
      </MotionTag>

      {/* UNDERLINE */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: isCenter ? "120px" : "80px", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`
          h-[2px] mt-4
          bg-gradient-to-r from-primary to-secondary
          ${isCenter ? "mx-auto" : ""}
        `}
      />
    </div>
  );
}