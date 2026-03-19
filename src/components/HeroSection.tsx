import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import PageSection from "@/components/layout/PageSection";
import Container from "@/components/layout/Container";
import { Link } from "react-router-dom";
import { ArrowDown } from "@/lib/icons";

interface HeroSectionProps {
  onOpenChat: () => void;
}

const HeroSection = ({ onOpenChat }: HeroSectionProps) => {
  return (
    <PageSection className="relative overflow-hidden py-32">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary/5 blur-[120px]" />

      <Container>
        <div className="grid md:grid-cols-[1.25fr_0.75fr] gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-[0.18em] mb-6 text-gradient">
              DATA ANALYTICS ENGINEER • TEAM LEADER
            </h1>

            <motion.p className="hero-title text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground/90 mb-10">
              Designing Enterprise Data Platforms
              <br />
              That Scale, Govern and Drive Decisions.
            </motion.p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-[260px] md:w-[300px] aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-2xl" />

              <div className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-all duration-500">
                <img
                  src="/ai-portrait.webp"
                  alt="Rodrigo Povoa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <Link
          to="/professional"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </Link>
      </motion.div>
    </PageSection>
  );
};

export default HeroSection;