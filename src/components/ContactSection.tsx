import { Mail, Linkedin } from "@/lib/icons";
import CompactHighlightSection from "@/components/layout/CompactHighlightSection";
import SectionTitle from "@/components/layout/SectionTitle";

const ContactSection = () => {
  return (
    <CompactHighlightSection>
      <div className="[&>div]:mb-4 [&>div>div]:mt-2">
        <SectionTitle as="h2" icon={<Mail />}>
          Let's Build Something
        </SectionTitle>
      </div>

      <p className="mb-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Building modern data platforms, AI systems or intelligent digital
        products? Let’s connect and explore what’s possible.
      </p>

      <div className="flex items-center gap-4">
        <a
          href="/contact"
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-primary-sm"
        >
          <Mail className="w-4 h-4" />
          Get in Touch
        </a>

        <a
          href="https://www.linkedin.com/in/rodrigocspovoa/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Rodrigo Póvoa's LinkedIn profile"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
        >
          <Linkedin className="w-6 h-6 opacity-80" />
        </a>
      </div>
    </CompactHighlightSection>
  );
};

export default ContactSection;
