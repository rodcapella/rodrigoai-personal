import { motion } from "framer-motion";
import { ArrowDown, MessageSquare } from "lucide-react";

interface HeroSectionProps {
  onOpenChat: () => void;
}

const HeroSection = ({ onOpenChat }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      
      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-6">
            AI Architecture • Data Engineering • Governance
          </p>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 tracking-tight">
            I build intelligent
            <br />
            <span className="text-gradient">systems that scale.</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Designing production-grade data infrastructure and AI systems
            that don't just work — they evolve.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all glow-primary-sm hover:glow-primary"
            >
              View Projects
            </a>
            <button
              onClick={onOpenChat}
              className="px-8 py-3.5 rounded-lg border border-border text-foreground font-display font-semibold text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Ask RodrigoAI
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
