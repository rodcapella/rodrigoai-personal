import React from "react"

interface PageGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  className?: string
}

const colMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
}

const gapMap = {
  sm: "gap-6",
  md: "gap-8",
  lg: "gap-12"
}

const PageGrid = ({
  children,
  cols = 3,
  gap = "md",
  className = ""
}: PageGridProps) => {

  return (
    <div
      className={`
        grid
        ${colMap[cols]}
        ${gapMap[gap]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default PageGrid