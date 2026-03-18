import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  variant?: "hero" | "page";
}

const PageHero = ({
  title,
  subtitle,
  description,
  image,
  variant = "page",
}: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-primary/5 blur-[120px]" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 md:gap-12 items-center">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left"
          >
            {/* TITLE */}
            <h1
              className={`
                hero-title
                font-display
                uppercase
                tracking-[0.14em] md:tracking-[0.18em]
                mb-4 md:mb-6
                bg-gradient-to-r from-primary to-secondary
                bg-clip-text text-transparent
                ${
                  variant === "hero"
                    ? "text-3xl sm:text-4xl md:text-5xl"
                    : "text-2xl sm:text-3xl md:text-4xl"
                }
              `}
            >
              {title}
            </h1>

            {/* SUBTITLE */}
            {subtitle && (
              <p className="text-xl sm:text-2xl md:text-4xl font-semibold leading-tight mb-4 md:mb-6">
                {subtitle}
              </p>
            )}

            {/* DESCRIPTION */}
            {description && (
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto md:mx-0">
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
                className={`
                  relative
                  ${
                    variant === "hero"
                      ? "w-[220px] sm:w-[260px] md:w-[320px]"
                      : "w-[180px] sm:w-[200px] md:w-[240px]"
                  }
                `}
              >
                <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl" />

                <img
                  src={image}
                  alt={title}
                  className="relative rounded-3xl border border-primary/20 shadow-2xl aspect-square w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PageHero;
