# Security review — 6 October 2026

Reference: Sapiente AI `docs/SECURITY_STANDARD.md`.

The contact function enforces POST, JSON, an explicit origin allowlist, a 16 KB body limit, field types and lengths, NFC normalization, email local-part/domain validation, header control-character rejection, disposable-domain checks, honeypot and Turnstile hostname/action validation. HTML email content is escaped at interpolation. Provider calls have timeouts and production logs exclude personal data and provider error objects.

## Deployment requirement

Configure either `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, or `KV_REST_API_URL` and `KV_REST_API_TOKEN`, in the correct Vercel environment. Use a write-capable token. The atomic counter permits three attempts per IP in 15 minutes; Redis receives only a SHA-256 hash of the IP. Missing/unavailable Redis in production returns 503 before Turnstile or SMTP. The existing WAF rule remains an additional layer. Local development may use memory.

Redeploy after setting variables. Verify the fourth valid attempt returns 429 and a Redis outage returns 503 without sending email. Validate security headers and the contact flow on the deployed site; local build success does not verify platform configuration.

## Documented exceptions

- Inline styles: current React UI, animation libraries and generated critical CSS still depend on inline styles. Retain `style-src 'unsafe-inline'` until these dependencies are migrated and visually tested. The risk is weaker CSS injection isolation; script CSP, Trusted Types and controlled content mitigate it. Review by 6 January 2027.
- Automatic confirmation: retained because the site owner explicitly requested this flow. The supplied mailbox has not undergone ownership verification. Risk: an attacker could send confirmation messages to a third party. Mitigations: persistent rate limit, Turnstile, strict address validation, disposable-domain rejection and HTML escape. Evaluate mailbox verification or a fixed confirmation without echoed user content by 6 January 2027.
- HSTS includes subdomains: all web subdomains must support HTTPS before production deployment. The preload directive does not automatically register the domain in browser preload lists.

No database or public administrative whitelist endpoint exists in this project. No security decision is based on User-Agent.
