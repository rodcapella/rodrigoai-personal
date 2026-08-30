export type AnalyticsConsent = "granted" | "denied" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "rpovoa-analytics-consent";
const SCRIPT_ID = "google-analytics-gtag";
let configured =
  typeof document !== "undefined" && Boolean(document.getElementById(SCRIPT_ID));
let lastTrackedPath = "";
let analyticsLoadScheduled = false;
let analyticsLoadTimer: number | undefined;
let analyticsIdleCallback: number | undefined;
let analyticsLoadHandler: (() => void) | undefined;
let pendingPageView: { path: string; title: string } | null = null;

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

const ensureGtag = () => {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // Google requires the native Arguments object for gtag command processing.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
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
  if (getAnalyticsConsent() === "granted") scheduleAnalyticsLoad();
};

const cancelScheduledAnalyticsLoad = () => {
  const idleWindow = window as IdleWindow;

  if (analyticsLoadTimer !== undefined) {
    window.clearTimeout(analyticsLoadTimer);
    analyticsLoadTimer = undefined;
  }

  if (analyticsIdleCallback !== undefined) {
    idleWindow.cancelIdleCallback?.(analyticsIdleCallback);
    analyticsIdleCallback = undefined;
  }

  if (analyticsLoadHandler) {
    window.removeEventListener("load", analyticsLoadHandler);
    analyticsLoadHandler = undefined;
  }

  analyticsLoadScheduled = false;
};

const sendPageView = (path: string, title: string) => {
  if (!measurementId || lastTrackedPath === path) return;

  window.gtag("event", "page_view", {
    send_to: measurementId,
    page_title: title,
    page_location: `${window.location.origin}${path}`,
    page_path: path,
  });
  lastTrackedPath = path;
};

function scheduleAnalyticsLoad() {
  if (
    !measurementId ||
    configured ||
    analyticsLoadScheduled ||
    getAnalyticsConsent() !== "granted"
  ) {
    return;
  }

  analyticsLoadScheduled = true;

  const scheduleAfterLoad = () => {
    const idleWindow = window as IdleWindow;
    const loadAnalytics = () => {
      analyticsLoadScheduled = false;
      analyticsIdleCallback = undefined;
      analyticsLoadTimer = undefined;
      enableAnalytics();
    };

    if (idleWindow.requestIdleCallback) {
      analyticsIdleCallback = idleWindow.requestIdleCallback(loadAnalytics, {
        timeout: 2_000,
      });
      return;
    }

    analyticsLoadTimer = window.setTimeout(loadAnalytics, 1_500);
  };

  if (document.readyState === "complete") {
    scheduleAfterLoad();
  } else {
    analyticsLoadHandler = () => {
      analyticsLoadHandler = undefined;
      scheduleAfterLoad();
    };
    window.addEventListener("load", analyticsLoadHandler, { once: true });
  }
}

export const enableAnalytics = () => {
  cancelScheduledAnalyticsLoad();
  localStorage.setItem(CONSENT_KEY, "granted");
  setConsentState("granted", "update");

  if (!measurementId) return false;

  if (!configured) {
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    configured = true;
  }

  if (pendingPageView) {
    const pageView = pendingPageView;
    pendingPageView = null;
    sendPageView(pageView.path, pageView.title);
  }

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
  cancelScheduledAnalyticsLoad();
  localStorage.setItem(CONSENT_KEY, "denied");
  setConsentState("denied", "update");
  deleteAnalyticsCookies();
  lastTrackedPath = "";
  pendingPageView = null;
};

export const trackPageView = (path: string, title = document.title) => {
  if (!measurementId || getAnalyticsConsent() !== "granted") return;
  if (!configured) {
    pendingPageView = { path, title };
    scheduleAnalyticsLoad();
    return;
  }

  sendPageView(path, title);
};

export const isAnalyticsConfigured = () => Boolean(measurementId);
