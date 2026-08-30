type VercelObservabilityConfig = {
  speedInsights?: {
    scriptSrc?: unknown;
  };
};

export const vercelObservabilityClientConfig =
  typeof __VERCEL_OBSERVABILITY_CLIENT_CONFIG__ === "string"
    ? __VERCEL_OBSERVABILITY_CLIENT_CONFIG__
    : "";

export const resolveSpeedInsightsScriptUrl = (
  configString: string,
  origin: string,
) => {
  if (!configString) return null;

  try {
    const config = JSON.parse(configString) as VercelObservabilityConfig;
    const scriptSrc = config.speedInsights?.scriptSrc;

    if (typeof scriptSrc !== "string" || !scriptSrc) return null;

    const url = new URL(scriptSrc, origin);
    return url.origin === origin ? url.href : null;
  } catch {
    return null;
  }
};
