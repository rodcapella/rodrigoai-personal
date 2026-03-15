interface Props {
  techStack: any[]
  maxYears: number
}

export default function TechStackSection({ techStack, maxYears }: Props) {

  return (
    <div className="container max-w-4xl mx-auto">

      <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
        Core Technology Stack & Experience Depth
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {techStack?.map((group) => (

          <div
            key={group.category}
            className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20"
          >

            <h3 className="text-xl font-semibold mb-4">
              {group.category}
            </h3>

            <div className="space-y-5">

              {group.items.map((tech: any) => {

                const width = (tech.years / maxYears) * 100

                return (
                  <div key={tech.name} className="space-y-2">

                    <div className="flex justify-between text-sm">

                      <span className="text-foreground">
                        {tech.name}
                      </span>

                      <span className="text-orange-500 font-semibold text-xs">
                        {tech.years} yrs
                      </span>

                    </div>

                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-primary to-orange-500 transition-all duration-700"
                        style={{ width: `${width}%` }}
                      />

                    </div>

                  </div>
                )
              })}

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}
