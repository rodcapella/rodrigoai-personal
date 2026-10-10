import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "./contact";

const payload = {
  name: "Example Visitor", email: "visitor@example.com", subject: "Project enquiry",
  message: "I would like to discuss a data project.", turnstileToken: "test-token",
};

const invoke = async (body: unknown, headers: Record<string, string> = {}) => {
  let status = 200;
  let response: unknown;
  const responseHeaders: Record<string, string> = {};
  const res = {
    setHeader: (name: string, value: string) => { responseHeaders[name] = value; },
    status: (code: number) => { status = code; return res; },
    json: (value: unknown) => { response = value; },
  };
  await handler({ method: "POST", body, headers: {
    origin: "https://www.rpovoadata.tech", "content-type": "application/json",
    "x-real-ip": "192.0.2.1", ...headers,
  } }, res);
  return { status, response, headers: responseHeaders };
};

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe("contact security boundaries", () => {
  it("rejects header injection before normalization can remove it", async () => {
    expect((await invoke({ ...payload, subject: "Project enquiry\r\n" })).status).toBe(400);
  });

  it("rejects lookalike media types and unauthorized origins", async () => {
    expect((await invoke(payload, { "content-type": "application/json-extra" })).status).toBe(415);
    expect((await invoke(payload, { origin: "https://attacker.example" })).status).toBe(403);
  });

  it("measures the body even without Content-Length", async () => {
    expect((await invoke({ ...payload, extra: "a".repeat(17_000) })).status).toBe(413);
  });

  it("fails closed in production when persistent rate limiting is missing", async () => {
    vi.stubEnv("NODE_ENV", "production");
    for (const key of ["KV_REST_API_URL", "KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"]) vi.stubEnv(key, "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await invoke(payload)).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects the fourth attempt and sends only a hashed IP to Redis", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "private-test-token");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ result: [4, 45_000] }) });
    vi.stubGlobal("fetch", fetchMock);
    const result = await invoke(payload);
    expect(result.status).toBe(429);
    expect(result.headers["Retry-After"]).toBe("45");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][1].body).not.toContain("192.0.2.1");
  });
});
