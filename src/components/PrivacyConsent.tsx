import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Cookie, ShieldCheck, X } from "@/lib/icons";
import {
  disableAnalytics,
  enableAnalytics,
  getAnalyticsConsent,
  isAnalyticsConfigured,
  trackPageView,
} from "@/lib/analytics";
import { PRIVACY_CONSENT_EVENT } from "@/lib/privacyConsent";

export default function PrivacyConsent() {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setOpen(getAnalyticsConsent() === null);
    const handleOpen = () => setOpen(true);
    window.addEventListener(PRIVACY_CONSENT_EVENT, handleOpen);
    return () => window.removeEventListener(PRIVACY_CONSENT_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const acceptAnalytics = () => {
    enableAnalytics();
    trackPageView(`${window.location.pathname}${window.location.search}`);
    setOpen(false);
  };

  const rejectAnalytics = () => {
    disableAnalytics();
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group fixed bottom-5 left-5 z-[80] flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-background/90 p-2 shadow-lg shadow-primary/15 backdrop-blur-md transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:left-6 sm:h-16 sm:w-16"
        aria-label="Open cookie and privacy preferences"
        title="Cookie and privacy preferences"
      >
        <img
          src="/cookie-privacy-button.webp"
          alt=""
          className="h-full w-full object-contain transition-transform duration-200 group-hover:rotate-[-7deg] group-hover:scale-105"
        />
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/65 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-consent-title"
      aria-describedby="privacy-consent-description"
    >
      <div ref={dialogRef} tabIndex={-1} className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-primary/20 bg-background/75 p-6 shadow-2xl backdrop-blur-xl outline-none sm:max-w-2xl sm:rounded-3xl sm:p-8">
        {getAnalyticsConsent() !== null && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="float-right rounded-lg p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
            aria-label="Close privacy preferences"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h2 id="privacy-consent-title" className="font-display text-2xl font-semibold sm:text-3xl">
          Your privacy matters
        </h2>
        <p id="privacy-consent-description" className="mt-4 leading-relaxed text-muted-foreground">
          This website uses strictly necessary storage to remember your preferences. With your permission, we also use Google Analytics to understand navigation and improve the content.
        </p>

        <button
          type="button"
          onClick={() => setShowDetails((value) => !value)}
          className="mt-5 text-sm font-semibold text-primary hover:underline"
          aria-expanded={showDetails}
        >
          {showDetails ? "Hide details" : "View details and preferences"}
        </button>

        {showDetails && (
          <div className="mt-5 space-y-3">
            <div className="flex gap-3 rounded-xl border border-primary/10 bg-card/50 p-4">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Necessary storage</h3>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">Always active</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Stores your chosen theme and privacy decision. It is not used for advertising.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-primary/10 bg-card/50 p-4">
              <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Audience measurement</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Measures pages visited, approximate traffic source, device and technical interactions. Advertising and personalisation remain disabled.
                </p>
              </div>
            </div>

            {!isAnalyticsConfigured() && (
              <p className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-500">
                Audience measurement is not yet configured in this environment.
              </p>
            )}
          </div>
        )}

        <p className="mt-5 text-sm text-muted-foreground">
          You can change this choice at any time using the cookie button in the lower-left corner. Read the{" "}
          <Link to="/privacy" onClick={() => setOpen(false)} className="font-semibold text-primary hover:underline">
            Privacy Policy
          </Link>.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={acceptAnalytics}
            className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Accept Analytics
          </button>
          <button
            type="button"
            onClick={rejectAnalytics}
            className="rounded-xl border border-primary/20 px-5 py-3 font-semibold transition hover:border-primary/40 hover:text-primary"
          >
            Necessary only
          </button>
        </div>
      </div>
    </div>
  );
}
