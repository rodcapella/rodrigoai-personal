import { LazyMotion, domAnimation, m } from "framer-motion"

interface PageHeroProps {
  title: string
  subtitle?: string
  image?: string
}

const PageHero = ({ title, subtitle, image }: PageHeroProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative pt-32 pb-20 overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px]" />

          <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {title}
              </h1>

              {subtitle && (
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {subtitle}
                </p>
              )}
            </m.div>

            {image && (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center md:justify-end"
              >
                <div className="relative">

                  {/* Image glow */}
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />

                  <img
                    src={image}
                    alt={title}
                    className="relative w-[180px] lg:w-[220px] rounded-2xl shadow-2xl border border-primary/20"
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