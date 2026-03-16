import { motion } from "framer-motion"
import { Suspense } from "react"
import { lazy } from "react"
import { Mail, Github, Linkedin  } from "@/lib/icons"

const ContactSection = () => {
  return (
      <section className="px-4 py-16 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">Contact</p>
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              Let's Build Something
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Building modern data platforms, AI systems, or intelligent digital products? Let’s connect and explore what’s possible.
            </p>

            <Suspense fallback={null}>
              <div className="flex items-center justify-center gap-6">
                <a
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all glow-primary-sm"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </a>
                <a
                  href="https://www.linkedin.com/in/rodrigocspovoa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </Suspense>
          </motion.div>
        </div>
      </section>
  );
};

export default ContactSection;
