import { motion } from "framer-motion";
import { Suspense } from "react";
import { lazy } from "react";
import { Mail, Github, Linkedin } from "@/lib/icons";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";

<a
  href="https://www.linkedin.com/in/rodrigocspovoa/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit my LinkedIn profile"
  className="
    group inline-flex items-center justify-center
    w-10 h-10
    rounded-full
    bg-white/5
    border border-white/10
    transition-all
    hover:bg-primary/10 hover:border-primary/30
  "
>
  <Linkedin className="w-6 h-6 opacity-80 text-muted-foreground group-hover:text-primary transition-colors" />
</a>

const isMobile = window.innerWidth < 768;

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: window.innerWidth < 768 ? "-40px" : "-100px",
          }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center text-center"
        >
          <SectionTitle as="h2" icon={<Mail />}>
            Let's Build Something
          </SectionTitle>

          <p className="text-muted-foreground text-lg mb-10 max-w-xl">
            Building modern data platforms, AI systems, or intelligent digital
            products? Let’s connect and explore what’s possible.
          </p>

          {/* BOTÕES */}
          <div className="flex items-center gap-4">
            
            {/* BOTÃO PRINCIPAL */}
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all glow-primary-sm"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>

            {/* LINKEDIN (MESMA ALTURA DO BOTÃO) */}
            <a
              href="https://www.linkedin.com/in/rodrigocspovoa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-12 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Linkedin className="w-6 h-6 opacity-80" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ContactSection;
