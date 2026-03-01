import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative">
      <div className="container max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">Contact</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Let's Build Something</h2>
          <p className="text-muted-foreground text-lg mb-12">
            Interested in working together on data infrastructure or AI systems?
            Let's connect.
          </p>

          <div className="flex items-center justify-center gap-6">
            <a
              href="mailto:hello@rodrigopovoa.com"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all glow-primary-sm"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
