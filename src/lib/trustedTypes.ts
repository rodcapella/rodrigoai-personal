type TrustedTypePolicyRules = {
  createHTML?: (value: string) => string;
  createScript?: (value: string) => string;
  createScriptURL?: (value: string) => string;
};

type TrustedTypesFactory = {
  createPolicy: (name: string, rules: TrustedTypePolicyRules) => unknown;
};

type TrustedTypesWindow = Window & {
  trustedTypes?: TrustedTypesFactory;
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
  const trustedTypes = (window as TrustedTypesWindow).trustedTypes;

  if (trustedTypes) {
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
      const isExistingDefaultPolicy =
        error instanceof TypeError &&
        error.message.includes('Policy with name "default" already exists');
      const isInvalidState =
        error instanceof DOMException && error.name === "InvalidStateError";

      if (!isExistingDefaultPolicy && !isInvalidState) {
        throw error;
      }
    }
  }
}
