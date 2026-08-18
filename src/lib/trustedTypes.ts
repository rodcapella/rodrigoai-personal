type TrustedTypePolicyRules = {
  createHTML?: (value: string) => string;
  createScript?: (value: string) => string;
  createScriptURL?: (value: string) => string;
};

type TrustedTypesFactory = {
  createPolicy: (name: string, rules: TrustedTypePolicyRules) => unknown;
};

type TrustedTypesWindow = Window & {
  __rpovoaTrustedTypesInitialized?: boolean;
  trustedTypes?: TrustedTypesFactory;
};

const isDuplicatePolicyError = (error: unknown) => {
  if (!(error instanceof Error)) return false;

  const message = error.message.toLowerCase();
  return (
    message.includes("default") &&
    (message.includes("already exists") ||
      message.includes("creating a trustedtypepolicy") ||
      message.includes("violates the following content security policy"))
  );
};

const isAllowedScriptUrl = (value: string) => {
  const url = new URL(value, window.location.origin);

  if (url.origin === window.location.origin) {
    return (
      url.pathname.startsWith("/assets/") ||
      url.pathname === "/gtag/js" ||
      url.pathname === "/gtm.js" ||
      url.pathname === "/_vercel/speed-insights/script.js"
    );
  }

  if (url.origin === "https://challenges.cloudflare.com") {
    return url.pathname.startsWith("/turnstile/");
  }

  return url.origin === "https://www.googletagmanager.com";
};

const isSchemaJson = (value: string) => {
  try {
    const parsed = JSON.parse(value) as {
      "@context"?: unknown;
      "@type"?: unknown;
    };

    return (
      !/[<>]/.test(value) &&
      parsed !== null &&
      typeof parsed === "object" &&
      parsed["@context"] === "https://schema.org"
    );
  } catch {
    return false;
  }
};

if (typeof window !== "undefined") {
  const trustedTypesWindow = window as TrustedTypesWindow;
  const trustedTypes = trustedTypesWindow.trustedTypes;

  if (trustedTypes && !trustedTypesWindow.__rpovoaTrustedTypesInitialized) {
    trustedTypesWindow.__rpovoaTrustedTypesInitialized = true;

    try {
      trustedTypes.createPolicy("default", {
        createHTML: (value) => {
          if (value === "" || isSchemaJson(value)) return value;
          throw new TypeError("Dynamic HTML injection is not allowed.");
        },
        createScript: (value) => {
          if (isSchemaJson(value)) return value;
          throw new TypeError("Dynamic JavaScript evaluation is not allowed.");
        },
        createScriptURL: (value) => {
          if (isAllowedScriptUrl(value)) return value;
          throw new TypeError(`Untrusted script URL blocked: ${value}`);
        },
      });
    } catch (error) {
      const isInvalidState =
        error instanceof DOMException && error.name === "InvalidStateError";

      if (!isDuplicatePolicyError(error) && !isInvalidState) {
        trustedTypesWindow.__rpovoaTrustedTypesInitialized = false;
        throw error;
      }
    }
  }
}
