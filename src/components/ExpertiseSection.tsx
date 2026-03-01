import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Cpu, Database, Cloud, Shield, Workflow, Zap, Code, Rocket } from "lucide-react";

const icons = [Database, Cpu, Cloud, Shield, Workflow, Zap, Code, Rocket];

const ExpertiseSection = () => {
  return (
    <section id="expertise" className="py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container max-w-5xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">Expertise</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">Core Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.core_skills.map((skill, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-lg p-5 hover:border-primary/30 transition-all group"
              >
                <Icon className="w-5 h-5 text-primary mb-3 group-hover:text-secondary transition-colors" />
                <p className="text-foreground text-sm font-medium">{skill}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
