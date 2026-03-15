import { LazyMotion, domAnimation, m } from "framer-motion"

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  image?: string
  variant?: "hero" | "page"
}

const PageHero = ({
  title,
  subtitle,
  description,
  image,
  variant = "page"
}: PageHeroProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative px-4 py-20 overflow-hidden">

        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="container relative z-10 max-w-5xl mx-auto">

          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

            {/* TEXT */}
            <m.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >

              <h1
                className={`hero-title font-display uppercase tracking-[0.18em] mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${
                  variant === "hero"
                    ? "text-4xl md:text-5xl"
                    : "text-3xl md:text-4xl"
                }`}
              >
                {title}
              </h1>

              {subtitle && (
                <p className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                  {subtitle}
                </p>
              )}

              {description && (
                <p className="text-muted-foreground max-w-xl">
                  {description}
                </p>
              )}

            </m.div>

            {/* IMAGE */}
            {image && (
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="flex justify-center"
              >
                <div className="relative w-[260px]">

                  <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl" />

                  <img
                    src={image}
                    alt={title}
                    className="relative rounded-3xl border border-primary/20 shadow-2xl"
                  />

                </div>
              </m.div>
            )}

          </div>

        </div>

      </section>
    </LazyMotion>
  )
}

export default PageHero