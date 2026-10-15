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
      critical
      spacing="none"
      className="relative min-h-[520px] overflow-hidden pt-12 pb-6 md:min-h-[430px] md:pt-16 md:pb-8"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Glow */}
      <div className="hero-ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full" />

      <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-12 items-center">
        
        {/* LEFT */}
        <div className="max-w-xl md:min-h-[21.25rem] lg:min-h-[17rem] xl:min-h-[15.25rem]">
          <h1 className="mb-6 min-h-36 font-display text-3xl font-bold leading-[1.2] tracking-[0.12em] text-gradient uppercase sm:min-h-[4.5rem] md:min-h-[7.5rem] md:text-4xl lg:min-h-[5rem]">
            <span className="block">End-to-End Data Leader</span>
            <span className="block">&amp; Data Analytics Engineer</span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-foreground/80 md:min-h-[12.25rem] md:text-xl lg:min-h-[10.5rem] xl:min-h-[8.75rem]">
            Bridging 15+ years of experience across Data Architecture,
            Engineering, and Analytics. From traditional Enterprise Data
            Warehousing and Big Data ecosystems to modern Azure Databricks
            Lakehouse architectures, I help organizations scale their data
            platforms, ensure rigorous governance, and drive business decisions
            through reliable data.
          </p>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">
          <div className="relative w-[260px] md:w-[300px] aspect-square">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-2xl" />

            <div className="relative h-full w-full aspect-square rounded-3xl overflow-hidden border border-primary/20 shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-500">
              <img
                src="/profile-320.webp"
                srcSet="/profile-320.webp 320w, /profile-480.webp 480w, /profile-640.webp 640w"
                sizes="(min-width: 768px) 300px, 260px"
                alt="Rodrigo Póvoa, End-to-End Data Leader and Data Analytics Engineer"
                width={320}
                height={320}
                loading="eager"
                {...{ fetchpriority: "high" }}
                decoding="async"
                className="block h-full w-full aspect-square object-cover"
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
