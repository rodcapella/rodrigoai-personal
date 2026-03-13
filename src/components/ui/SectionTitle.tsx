import { ReactNode } from "react"

interface SectionTitleProps {
  icon?: ReactNode
  children: ReactNode
  align?: "left" | "center"
}

export default function SectionTitle({
  icon,
  children,
  align = "left"
}: SectionTitleProps) {

  const alignment =
    align === "center"
      ? "justify-center text-center"
      : "justify-start"

  return (
    <h2
      className={`text-3xl font-bold mb-12 flex items-center gap-3 ${alignment}`}
    >
      {icon}
      {children}
    </h2>
  )
}