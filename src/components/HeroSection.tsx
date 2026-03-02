import { motion } from "framer-motion";
import { ArrowDown, MessageSquare, Bot } from "lucide-react";

interface HeroSectionProps {
  onOpenChat: () => void;
}

const HeroSection = ({ onOpenChat }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      
      <div className="container relative z-10 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-6">
              AI Architecture • Data Engineering • Analytics
            </p>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 tracking-tight">
              I build intelligent
              <br />
              <span className="text-gradient">systems that scale.</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
              Designing production-grade data infrastructure and AI systems
              that don't just work — they evolve.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
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
                <Bot className="w-4 h-4" />
                Ask RodrigoAI
              </button>
            </div>
          </motion.div>

          {/* Right side - Profile image and bot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Profile Image Container */}
            <div className="relative w-64 h-80 md:w-72 md:h-96 mb-8">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl blur-3xl" />
              
              {/* Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="Rodrigo Póvoa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bot Avatar Indicator */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg border-2 border-primary/50">
                <Bot className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#pessoal" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
