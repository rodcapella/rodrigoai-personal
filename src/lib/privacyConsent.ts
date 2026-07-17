export const PRIVACY_CONSENT_EVENT = "open-privacy-consent";

export const openPrivacyConsent = () =>
  window.dispatchEvent(new Event(PRIVACY_CONSENT_EVENT));
