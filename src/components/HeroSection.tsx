import { motion } from "framer-motion";
import { ArrowDown, MessageSquare, Bot } from "lucide-react";

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
              Data Engineer • Analytics • Team Leader
            </p>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 tracking-tight">
              Building intelligent
              <br />
              <span className="text-gradient">data solutions.</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
              15+ years of experience designing production-grade data infrastructure,
              analytics platforms, and AI-driven systems that drive business value.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#professional"
                className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all glow-primary-sm hover:glow-primary"
              >
                Explore My Work
              </a>
            </div>
          </motion.div>

          {/* Right side - Profile image and bot */}
          <motion.div
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

            {/* Bot Avatar Indicator */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative"
            >
              {/* LinkedIn-style bot avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg border-3 border-background hover:shadow-xl transition-shadow">
                <Bot className="w-8 h-8 text-primary-foreground" />
              </div>
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-background animate-pulse" />
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
        <a href="#professional" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
