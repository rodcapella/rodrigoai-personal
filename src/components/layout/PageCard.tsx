import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: "glass border border-border",
  glass: "bg-white/5 backdrop-blur-md border border-white/10",
  outline: "border border-border bg-transparent",
  solid: "bg-primary text-white border border-primary",
};

const alignMap = {
  default: "",
  center: "flex flex-col justify-center items-center text-center",
};

interface PageCardProps {
  as?: any;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  highlight?: string;
  className?: string;
  hover?: boolean;
  variant?: "default" | "glass" | "outline" | "solid";
  align?: "default" | "center";
}

const PageCard = ({
  as: Component = motion.div,
  title,
  description,
  icon,
  children,
  highlight,
  className = "",
  hover = true,
  variant = "default",
  align = "default",
  ...props
}: PageCardProps) => {
  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`
        relative
        p-6
        rounded-xl
        transition-all duration-300
        h-full
        ${variants[variant]}
        ${alignMap[align]}
        ${
          hover
            ? "hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            : ""
        }
        ${className}
      `}
      {...props}
    >
      {/* ICON */}
      {icon && <div className="mb-4 text-primary">{icon}</div>}

      {/* TITLE */}
      {title && (
        <h3 className="heading-md mb-text">
          {title}
        </h3>
      )}

      {/* DESCRIPTION */}
      {description && (
        <p className="body-md mb-content">
          {description}
        </p>
      )}

      {/* HIGHLIGHT */}
      {highlight && (
        <p className="body-sm text-primary font-medium italic">
          {highlight}
        </p>
      )}

      {/* CUSTOM CONTENT */}
      {children && (
        <div className="mt-3 body-md">
          {children}
        </div>
      )}
    </Component>
  );
};

export default PageCard;