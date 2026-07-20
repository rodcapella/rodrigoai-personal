import { Link, useOutletContext } from "react-router-dom";
import { BarChart3, Cookie, Database, MessageCircle, ShieldCheck } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { openPrivacyConsent } from "@/lib/privacyConsent";

const sections = [
  {
    icon: Database,
    title: "Data we process",
    content:
      "When you consent to audience measurement, technical data may be processed, including pages visited, time of access, approximate traffic source, device type, browser and navigation interactions. The website does not ask you to provide personal data for Analytics purposes.",
  },
  {
    icon: BarChart3,
    title: "Google Analytics",
    content:
      "Google Analytics is used exclusively to understand website performance and improve its content. Measurement is activated only after consent. Advertising storage, Google signals and ad personalisation remain disabled.",
  },
  {
    icon: Cookie,
    title: "Local storage and cookies",
    content:
      "The website stores your theme preference and consent decision locally. If you accept Analytics, Google may create measurement identifiers in your browser. If you refuse or withdraw consent, the website updates the status to denied and attempts to remove Analytics cookies from the domain.",
  },
  {
    icon: MessageCircle,
    title: "Public comments",
    content:
      "When you publish a comment, your chosen name, the comment text and publication date become publicly visible. Do not include an email address, telephone number or other personal data. Content may be removed when necessary for security, abuse prevention or legal compliance.",
  },
];

export default function Privacy() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Privacy Policy | Rodrigo Póvoa"
        description="Learn how Rodrigo Póvoa's website handles preferences, comments and navigation data, and how to manage Google Analytics consent."
        language="en-GB"
      />

      <PageSection variant="gradient" spacing="none" className="pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Clear information about the data used by this website and control over your audience measurement choice.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: 19 July 2026</p>
        </div>
      </PageSection>

      <PageSection className="pt-14">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-5">
            {sections.map(({ icon: Icon, title, content }) => (
              <section key={title} className="rounded-2xl border border-primary/15 bg-card/50 p-6 sm:p-8">
                <div className="flex gap-4">
                  <span className="h-fit rounded-lg bg-primary/10 p-2.5 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{title}</h2>
                    <p className="mt-3 leading-7 text-muted-foreground">{content}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-semibold">Purpose and control</h2>
            <p className="leading-7 text-muted-foreground">
              Measurement data is processed on the basis of your consent. You may accept, refuse or withdraw that consent at any time using the button below. Refusing consent does not restrict access to the website.
            </p>
            <button
              type="button"
              onClick={openPrivacyConsent}
              className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Manage privacy preferences
            </button>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-semibold">Your rights</h2>
            <p className="leading-7 text-muted-foreground">
              You may request information about, correction of or deletion of data relating to you, and you may withdraw consent. For privacy requests, use the{" "}
              <Link to="/contact" className="font-semibold text-primary hover:underline">
                contact page
              </Link>.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="font-display text-2xl font-semibold">External services</h2>
            <p className="leading-7 text-muted-foreground">
              Audience measurement is provided by Google. You can also review the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Google Privacy Policy
              </a>.
            </p>
          </section>
        </div>
      </PageSection>
    </MainLayout>
  );
}
