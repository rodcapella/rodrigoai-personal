import React from "react";

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

  const TitleTag = as;

  return (
    <div className={`mb-12 ${isCenter ? "text-center" : ""}`}>
      
      <TitleTag
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
      </TitleTag>

      {/* UNDERLINE */}
      <div
        className={`
          h-[2px] mt-4
          bg-gradient-to-r from-primary to-secondary
          ${isCenter ? "w-[120px]" : "w-20"}
          ${isCenter ? "mx-auto" : ""}
        `}
      />
    </div>
  );
}
