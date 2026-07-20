export type AnalyticsConsent = "granted" | "denied" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "rpovoa-analytics-consent";
const SCRIPT_ID = "google-analytics-gtag";
let configured = false;
let lastTrackedPath = "";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

const ensureGtag = () => {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer.push(args);
    });
};

const setConsentState = (analytics: "granted" | "denied", mode: "default" | "update") => {
  ensureGtag();
  window.gtag("consent", mode, {
    analytics_storage: analytics,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
};

export const getAnalyticsConsent = (): AnalyticsConsent => {
  const value = localStorage.getItem(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
};

export const initializeConsentMode = () => {
  setConsentState("denied", "default");
  if (getAnalyticsConsent() === "granted") enableAnalytics();
};

export const enableAnalytics = () => {
  localStorage.setItem(CONSENT_KEY, "granted");
  setConsentState("granted", "update");

  if (!measurementId || configured) return Boolean(measurementId);

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  configured = true;
  return true;
};

const deleteAnalyticsCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (name === "_ga" || name?.startsWith("_ga_")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
    }
  });
};

export const disableAnalytics = () => {
  localStorage.setItem(CONSENT_KEY, "denied");
  setConsentState("denied", "update");
  deleteAnalyticsCookies();
  lastTrackedPath = "";
};

export const trackPageView = (path: string, title = document.title) => {
  if (!measurementId || getAnalyticsConsent() !== "granted") return;
  enableAnalytics();
  if (lastTrackedPath === path) return;

  window.gtag("event", "page_view", {
    page_title: title,
    page_location: `${window.location.origin}${path}`,
    page_path: path,
  });
  lastTrackedPath = path;
};

export const isAnalyticsConfigured = () => Boolean(measurementId);
