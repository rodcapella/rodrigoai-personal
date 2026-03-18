import React from "react"

const colMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}

const gapMap = {
  sm: "gap-4 sm:gap-6",
  md: "gap-6 sm:gap-8",
  lg: "gap-8 sm:gap-12",
}

interface PageGridProps {
  children: React.ReactNode | React.ReactNode[]
  cols?: keyof typeof colMap
  gap?: keyof typeof gapMap
  className?: string
}

const PageGrid = ({
  children,
  cols = 3,
  gap = "md",
  className = "",
}: PageGridProps) => {
  return (
    <div
      className={`
        grid
        ${colMap[cols]}
        ${gapMap[gap]}
        w-full
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default PageGrid