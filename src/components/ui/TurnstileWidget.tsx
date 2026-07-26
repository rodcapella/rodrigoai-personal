import { useEffect, useRef } from "react";

type TurnstileApi = {
  remove: (widgetId: string) => void;
  render: (
    container: HTMLElement,
    options: {
      action: string;
      appearance: "interaction-only";
      callback: (token: string) => void;
      "error-callback": () => void;
      "expired-callback": () => void;
      sitekey: string;
      size: "flexible";
      theme: "dark" | "light";
    },
  ) => string;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileWidgetProps = {
  onError: () => void;
  onExpire: () => void;
  onVerify: (token: string) => void;
  siteKey: string;
  theme: "dark" | "light";
};

const SCRIPT_ID = "cloudflare-turnstile-script";
let scriptPromise: Promise<void> | null = null;

const loadTurnstile = () => {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null;

    const handleLoad = () => resolve();
    const handleError = () =>
      reject(new Error("Cloudflare Turnstile could not be loaded."));

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.appendChild(script);
  });

  return scriptPromise;
};

export default function TurnstileWidget({
  onError,
  onExpire,
  onVerify,
  siteKey,
  theme,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    let widgetId: string | null = null;

    loadTurnstile()
      .then(() => {
        if (!active || !containerRef.current || !window.turnstile) return;

        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: "contact_form",
          appearance: "interaction-only",
          size: "flexible",
          theme,
          callback: onVerify,
          "expired-callback": onExpire,
          "error-callback": onError,
        });
      })
      .catch(onError);

    return () => {
      active = false;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [onError, onExpire, onVerify, siteKey, theme]);

  return (
    <div
      ref={containerRef}
      className="min-h-[65px] w-full"
      role="group"
      aria-label="Human verification"
    />
  );
}
