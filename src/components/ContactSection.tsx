import { motion } from "framer-motion";
import { Mail, Linkedin } from "@/lib/icons";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";

const ContactSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-transparent py-10 md:py-12">
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
          <div className="[&>div]:mb-6">
            <SectionTitle as="h2" icon={<Mail />}>
              Let's Build Something
            </SectionTitle>
          </div>

          <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Building modern data platforms, AI systems or intelligent digital
            products? Let’s connect and explore what’s possible.
          </p>

          {/* BOTÕES */}
          <div className="flex items-center gap-4">
            
            {/* BOTÃO PRINCIPAL */}
            <a
              href="/contact"
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-primary-sm"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>

            {/* LINKEDIN (MESMA ALTURA DO BOTÃO) */}
            <a
              href="https://www.linkedin.com/in/rodrigocspovoa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
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
