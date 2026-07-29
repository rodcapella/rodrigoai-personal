import { afterEach, describe, expect, it, vi } from "vitest";

type PolicyRules = {
  createHTML?: (value: string) => string;
  createScript?: (value: string) => string;
  createScriptURL?: (value: string) => string;
};

const loadPolicyRules = async () => {
  let policyRules: PolicyRules | undefined;

  vi.stubGlobal("window", {
    location: { origin: "https://www.rpovoadata.tech" },
    trustedTypes: {
      createPolicy: (_name: string, rules: PolicyRules) => {
        policyRules = rules;
      },
    },
  });

  await import("./trustedTypes");
  if (!policyRules) throw new Error("Trusted Types policy was not created.");
  return policyRules;
};

afterEach(() => {
  vi.resetModules();
  vi.unstubAllGlobals();
});

describe("Trusted Types policy", () => {
  it("allows safe Schema.org JSON-LD as script content", async () => {
    const rules = await loadPolicyRules();
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Rodrigo Póvoa",
    });

    expect(rules.createScript?.(schema)).toBe(schema);
  });

  it("rejects executable script content and untrusted URLs", async () => {
    const rules = await loadPolicyRules();

    expect(() => rules.createScript?.("alert(document.domain)")).toThrow(
      "Dynamic JavaScript evaluation is not allowed.",
    );
    expect(() =>
      rules.createScriptURL?.("https://malicious.example/payload.js"),
    ).toThrow("Untrusted script URL blocked");
  });

  it("allows the same-origin Vercel Speed Insights script", async () => {
    const rules = await loadPolicyRules();
    const scriptUrl = "/_vercel/speed-insights/script.js";

    expect(rules.createScriptURL?.(scriptUrl)).toBe(scriptUrl);
  });
});
