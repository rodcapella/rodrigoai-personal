// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const measurementId = "G-TEST123456";

const commandValues = (entry: unknown) =>
  Array.from(entry as ArrayLike<unknown>);

describe("Google Analytics command queue", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", measurementId);
    localStorage.clear();
    document.getElementById("google-analytics-gtag")?.remove();
    Reflect.deleteProperty(window, "dataLayer");
    Reflect.deleteProperty(window, "gtag");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("queues consent, configuration and an explicitly routed page view", async () => {
    const analytics = await import("./analytics");

    analytics.initializeConsentMode();
    analytics.enableAnalytics();
    analytics.trackPageView("/professional", "Professional");

    expect(Array.isArray(window.dataLayer[0])).toBe(false);

    const commands = window.dataLayer.map(commandValues);
    expect(commands.map((command) => command[0])).toEqual([
      "consent",
      "consent",
      "js",
      "config",
      "event",
    ]);
    expect(commands[0]).toEqual([
      "consent",
      "default",
      {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);
    expect(commands[1]).toEqual([
      "consent",
      "update",
      {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);
    expect(commands[3]).toEqual([
      "config",
      measurementId,
      {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      },
    ]);
    expect(commands[4]).toEqual([
      "event",
      "page_view",
      {
        send_to: measurementId,
        page_title: "Professional",
        page_location: `${window.location.origin}/professional`,
        page_path: "/professional",
      },
    ]);
  });
});
