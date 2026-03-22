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
  center: "flex flex-col items-center text-center",
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
      transition={{ duration: 0.4 }}
      className={`
        relative
        p-5                     /* 🔥 menor e mais elegante */
        rounded-xl
        h-full
        transition-all duration-300
        ${variants[variant]}
        ${alignMap[align]}
        ${
          hover
            ? "hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)]"
            : ""
        }
        ${className}
      `}
      {...props}
    >
      {/* ICON */}
      {icon && (
        <div className="mb-3 text-primary opacity-80 flex items-center">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-6 h-6",
          })}
        </div>
      )}

      {/* TITLE (sempre discreto por padrão) */}
      {title && (
        <h3 className="label">
          {title}
        </h3>
      )}

      {/* DESCRIPTION */}
      {description && (
        <p className="body-md">
          {description}
        </p>
      )}

      {/* HIGHLIGHT */}
      {highlight && (
        <p className="body-sm text-primary font-medium">
          {highlight}
        </p>
      )}

      {/* CUSTOM CONTENT */}
      {children}
    </Component>
  );
};

export default PageCard;