import { motion } from "framer-motion"
import Container from "@/components/layout/Container"

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
      <section className="overflow-hidden">

        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[120px]" />

        <Container>

          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
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

            </motion.div>

            {/* IMAGE */}
            {image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="flex justify-center"
              >
                <div
                  className={`relative ${
                    variant === "hero"
                      ? "w-[260px] md:w-[320px]"
                      : "w-[200px] md:w-[240px]"
                  }`}
                >

                  <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl" />

                  <img
                    src={image}
                    alt={title}
                    className="relative rounded-3xl border border-primary/20 shadow-2xl aspect-square"
                  />

                </div>
              </motion.div>
            )}

          </div>
        </Container>
      </section>
  )
}

export default PageHero