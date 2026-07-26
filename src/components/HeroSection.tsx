import PageSection from "@/components/layout/PageSection";
import { Link } from "react-router-dom";
import { ArrowDown } from "@/lib/icons";

interface HeroSectionProps {
  onOpenChat: () => void;
}

const HeroSection = ({ onOpenChat }: HeroSectionProps) => {
  return (
    <PageSection
      variant="gradient"
      container={true}
      spacing="none"
      className="relative overflow-hidden pt-12 pb-6 md:pt-16 md:pb-8"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-12 items-center">
        
        {/* LEFT */}
        <div className="max-w-xl">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-[0.18em] mb-6 text-gradient">
            DATA ANALYTICS ENGINEER • TEAM LEADER
          </h1>

          <p className="hero-title text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground/90 mb-10">
            Designing Enterprise Data Platforms
            <br />
            That Scale, Stay Governed and Drive Decisions.
          </p>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">
          <div className="relative w-[260px] md:w-[300px] aspect-square">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-2xl" />

            <div className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-500">
              <img
                src="/profile-320.webp"
                srcSet="/profile-320.webp 320w, /profile-480.webp 480w, /profile-640.webp 640w"
                sizes="(min-width: 768px) 300px, 260px"
                alt="Rodrigo Povoa"
                width={320}
                height={320}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-3">
        <Link
          to="/professional"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Explore my professional experience"
          title="Explore my professional experience"
        >
          <ArrowDown
            aria-hidden="true"
            className="w-6 h-6 opacity-80 animate-bounce"
          />
        </Link>
      </div>
    </PageSection>
  );
};

export default HeroSection;
