import { LazyMotion, domAnimation } from "framer-motion"

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  image?: string
}

const PageHero = ({ title, subtitle, description, image }: PageHeroProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="px-4 mb-24">
        <div className="container max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-6">
                {title}
              </h1>

              {subtitle && (
                <h2 className="text-3xl font-bold mb-6">
                  {subtitle}
                </h2>
              )}

              {description && (
                <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
                  {description}
                </p>
              )}

            </div>

            {image && (
              <div className="rounded-2xl shadow-2xl border border-primary/20 w-[220px] transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]">
                <img
                  src={image}
                  alt={title}
                  className="rounded-2xl shadow-2xl border border-primary/20 w-[170px]"
                />
              </div>
            )}

          </div>
        </div>
      </section>
    </LazyMotion>
  )
}

export default PageHero