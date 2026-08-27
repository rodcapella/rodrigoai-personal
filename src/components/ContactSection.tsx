import { Briefcase, ExternalLink, Linkedin, Mail } from "@/lib/icons";
import CompactHighlightSection from "@/components/layout/CompactHighlightSection";
import SectionTitle from "@/components/layout/SectionTitle";

const CTA_VARIANTS = {
  default: {
    title: "Let's Build Something",
    description:
      "Building modern data platforms, AI systems or intelligent digital products? Let’s connect and explore what’s possible.",
    contactGuidance: null,
    responseTime: null,
    primaryLabel: "Get in Touch",
    showLinkedInLabel: false,
    TitleIcon: Mail,
  },
  opportunity: {
    title: "Open to senior and leadership opportunities in Data",
    description:
      "I am currently exploring opportunities across Data Engineering, Data Architecture, Analytics and technical leadership.",
    contactGuidance:
      "Visit the Contact page or connect with me on LinkedIn.",
    responseTime: "Messages are normally answered within 48 business hours.",
    primaryLabel: "Start a Conversation",
    showLinkedInLabel: true,
    TitleIcon: Briefcase,
  },
} as const;

// Change this value to "default" to restore the original CTA immediately.
const HOME_CTA_VARIANT: keyof typeof CTA_VARIANTS = "opportunity";

const ContactSection = () => {
  const content = CTA_VARIANTS[HOME_CTA_VARIANT];
  const TitleIcon = content.TitleIcon;

  return (
    <CompactHighlightSection>
      <div className="[&>div]:mb-4 [&>div>div]:mt-2">
        <SectionTitle as="h2" icon={<TitleIcon />}>
          {content.title}
        </SectionTitle>
      </div>

      <p className="mb-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {content.description}
      </p>

      {content.contactGuidance && (
        <p className="mb-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          <strong className="font-semibold text-foreground">
            To start a conversation:
          </strong>{" "}
          {content.contactGuidance}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="/contact"
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-primary-sm"
        >
          <Mail className="w-4 h-4" />
          {content.primaryLabel}
        </a>

        <a
          href="https://www.linkedin.com/in/rodrigocspovoa/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Rodrigo Póvoa's LinkedIn profile"
          className={`flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-3 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary ${
            content.showLinkedInLabel ? "sm:px-5" : "w-11"
          }`}
        >
          <Linkedin className="h-5 w-5 opacity-80" />
          {content.showLinkedInLabel && (
            <>
              <span className="font-display text-sm font-semibold">
                Connect on LinkedIn
              </span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </a>
      </div>

      {content.responseTime && (
        <p className="mt-3 max-w-2xl text-center text-[10px] leading-4 text-muted-foreground">
          {content.responseTime}
        </p>
      )}
    </CompactHighlightSection>
  );
};

export default ContactSection;
