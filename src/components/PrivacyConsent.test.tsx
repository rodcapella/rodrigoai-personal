// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";
import PrivacyConsent from "./PrivacyConsent";

vi.mock("@/lib/analytics", () => ({
  getAnalyticsConsent: () => null,
  isAnalyticsConfigured: () => false,
  enableAnalytics: vi.fn(),
  disableAnalytics: vi.fn(),
  trackPageView: vi.fn(),
}));

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-privacy-view");
});

it("allows dismissing the first-visit dialog with Escape without granting consent", async () => {
  render(<MemoryRouter><PrivacyConsent /></MemoryRouter>);
  await waitFor(() => expect(document.documentElement.dataset.privacyView).toBe("dialog"));
  expect(screen.getByRole("button", { name: "Close privacy preferences" })).toBeTruthy();
  fireEvent.keyDown(document, { key: "Escape" });
  await waitFor(() => expect(document.documentElement.dataset.privacyView).toBe("launcher"));
});

it("allows closing the first-visit dialog with its labelled button", async () => {
  render(<MemoryRouter><PrivacyConsent /></MemoryRouter>);
  await waitFor(() => expect(document.documentElement.dataset.privacyView).toBe("dialog"));
  fireEvent.click(screen.getByRole("button", { name: "Close privacy preferences" }));
  await waitFor(() => expect(document.documentElement.dataset.privacyView).toBe("launcher"));
});
