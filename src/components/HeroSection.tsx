import { LazyMotion, domAnimation, m } from "framer-motion";
import Section from "@/components/layout/Section";
import { lazy, Suspense } from "react";

const ArrowDown = lazy(() =>
  import("lucide-react").then(m => ({ default: m.ArrowDown }))
);

interface HeroSectionProps {
  onOpenChat: () => void;
}

const HeroSection = ({ onOpenChat }: HeroSectionProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <Section variant="hero">

        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />

        <div className="container relative z-10 px-4">

          <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-12 items-center">

            {/* LEFT SIDE */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl"
            >

              {/* TITLE */}
              <p className="
                text-primary/80
                uppercase
                tracking-[0.25em]
                text-xs
                font-semibold
                mb-6
              ">
                DATA ANALYTICS ENGINEER • TEAM LEADER
              </p>

              {/* HERO STATEMENT */}
              <m.h1
                className="
                font-display
                text-5xl md:text-6xl lg:text-7xl
                font-bold
                leading-[1.05]
                tracking-tight
                mb-10
                bg-gradient-to-r
                from-white
                to-gray-400
                bg-clip-text
                text-transparent
                "
              >
                Designing Enterprise
                <br />
                Data <span className="text-primary">Platforms</span> That <span className="text-primary">Scale</span>, Govern
                <br />
                and Drive Decisions.
              </m.h1>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start gap-4">

                <a
                  href="/contact"
                  className="
                  px-8 py-3.5
                  rounded-lg
                  bg-primary
                  text-primary-foreground
                  font-display
                  font-semibold
                  text-sm
                  tracking-wide
                  transition-all
                  hover:bg-primary/90
                  glow-primary-sm
                  hover:glow-primary
                  "
                >
                  Get in Touch
                </a>

              </div>

            </m.div>

            {/* RIGHT SIDE */}
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative flex justify-center"
            >

              <div className="relative w-[260px] md:w-[300px]">

                {/* Glow background */}
                <div className="
                  absolute inset-0
                  rounded-3xl
                  bg-gradient-to-b
                  from-primary/30
                  via-primary/10
                  to-transparent
                  blur-2xl
                " />

                {/* Image container */}
                <div className="
                  relative
                  rounded-3xl
                  overflow-hidden
                  border border-primary/20
                  shadow-2xl
                  transition-all duration-500
                  hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]
                ">

                  <img
                    src="/profile.jpg"
                    alt="Rodrigo Povoa"
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>

            </m.div>

          </div>

        </div>

        {/* Scroll indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a
            href="#professional"
            className="text-muted-foreground hover:text-primary transition-colors"
          >

            <Suspense fallback={null}>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </Suspense>

          </a>
        </m.div>

      </Section>
    </LazyMotion>
  );
};

export default HeroSection;