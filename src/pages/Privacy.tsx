import { Link, useOutletContext } from "react-router-dom";
import { BarChart3, Cookie, Database, MessageCircle, ShieldCheck } from "@/lib/icons";
import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { openPrivacyConsent } from "@/lib/privacyConsent";

const sections = [
  {
    icon: Database,
    title: "Data we process",
    content:
      "When you consent to Google Analytics, technical navigation data may be processed, including pages visited, time of access, approximate traffic source, device type and browser. Vercel Speed Insights separately processes anonymous performance measurements such as route, Web Vitals, network speed, browser, device type, operating system and country.",
  },
  {
    icon: BarChart3,
    title: "Google Analytics",
    content:
      "Google Analytics is used exclusively to understand website performance and improve its content. The Google tag is downloaded and audience measurement starts only after you consent. Advertising storage, Google signals and ad personalisation remain disabled.",
  },
  {
    icon: BarChart3,
    title: "Vercel Speed Insights",
    content:
      "Vercel Speed Insights measures real-world website performance and Core Web Vitals. Its data points are anonymous, are not associated with an individual visitor or IP address, and cannot be used to reconstruct a browsing session across pages.",
  },
  {
    icon: Cookie,
    title: "Local storage and cookies",
    content:
      "The website stores your theme preference and consent decision locally. If you accept Analytics, Google may create measurement identifiers in your browser. If you refuse or withdraw consent, the website updates the status to denied and attempts to remove Analytics cookies from the domain.",
  },
  {
    icon: MessageCircle,
    title: "Contact form",
    content:
      "When you use the contact form, the name, email address, optional telephone number, company, job title, subject and message you provide are sent securely to the website owner's mailbox. These details are used only to respond to your enquiry and are not published on the website.",
  },
  {
    icon: ShieldCheck,
    title: "Spam and abuse protection",
    content:
      "The contact form uses Cloudflare Turnstile to distinguish legitimate visitors from automated abuse. Cloudflare may process technical browser and network signals, including the IP address, to validate the request. Submission frequency is also limited to protect the form and email service.",
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
        description="Learn how Rodrigo Póvoa's website handles contact details, preferences, spam protection and navigation data."
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
          <p className="mt-4 text-sm text-muted-foreground">Last updated: 28 July 2026</p>
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
              Google Analytics measurement is processed on the basis of your consent. You may accept, refuse or withdraw that consent at any time using the button below. Refusing consent does not restrict access to the website. Vercel Speed Insights processes anonymous performance data without creating an identifiable browsing profile.
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
              Audience measurement is provided by Google, anonymous performance measurement by Vercel, and contact-form abuse protection by Cloudflare Turnstile. Review the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Google Privacy Policy
              </a>, the{" "}
              <a
                href="https://vercel.com/docs/speed-insights/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Vercel Speed Insights privacy information
              </a>{" "}
              and the{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Cloudflare Privacy Policy
              </a>.
            </p>
          </section>
        </div>
      </PageSection>
    </MainLayout>
  );
}
