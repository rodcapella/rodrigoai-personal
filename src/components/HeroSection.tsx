import { LazyMotion, domAnimation, m } from "framer-motion";
import Section from "@/components/layout/Section"
import { lazy, Suspense } from "react"

const ArrowDown = lazy(() => import("lucide-react").then(m => ({ default: m.ArrowDown })))
const Bot = lazy(() => import("lucide-react").then(m => ({ default: m.Bot })))
const MessageSquare = lazy(() => import("lucide-react").then(m => ({ default: m.MessageSquare })))

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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-6">
                Data Analytics Engineer • Team Leader
              </p>
              
              <m.h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                Designing Enterprise Data Platforms
                <br />
                That Scale, Govern and Drive Decisions.
              </m.h1>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="/contact"
                  className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all glow-primary-sm hover:glow-primary"
                >
                  Get in Touch
                </a>
              </div>
            </m.div>

            {/* Right side - Profile image and bot */}
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative flex flex-col items-center justify-center"
            >
              {/* Profile Image Container - LinkedIn Style */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 mb-8">
                {/* LinkedIn-style background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent rounded-3xl blur-2xl" />
                
                {/* Outer ring - LinkedIn style */}
                <div className="absolute inset-0 rounded-3xl border-2 border-primary/30 shadow-2xl" />
                
                {/* Image with LinkedIn-style circular crop */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <img
                    src="/profile.jpg"
                    alt="Rodrigo Povoa"
                    className="w-full h-full object-cover"
                  />
                  {/* LinkedIn-style overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/10" />
                </div>
                
                {/* LinkedIn-style accent light */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary/20 rounded-full blur-xl" />
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
          <a href="#professional" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </m.div>
      </Section>
    </LazyMotion>  
  );
};

export default HeroSection;
