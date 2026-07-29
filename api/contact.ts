import nodemailer from "nodemailer";
import {
  isDisposableDomain,
  isDisposableEmail,
} from "@rodcapella/common-resources";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  jobTitle?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
};

type ApiRequest = {
  method?: string;
  body?: ContactPayload;
  headers?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (body: { code?: string; error?: string; success?: boolean }) => void;
};

const SMTP_HOST = process.env.SMTP_HOST || "smtp-pt.securemail.pro";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "contact@rpovoadata.tech";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const CONTACT_EMAIL_TO =
  process.env.CONTACT_EMAIL_TO || "contact@rpovoadata.tech";
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const TURNSTILE_ALLOWED_HOSTNAMES = new Set(
  (
    process.env.TURNSTILE_ALLOWED_HOSTNAMES ||
    "rpovoadata.tech,www.rpovoadata.tech"
  )
    .split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean),
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s+()-]{8,20}$/;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const BLACKLISTED_EMAIL_MESSAGE =
  "This email address uses a domain that appears on a public email blacklist. Please use a different email address.";

const rateLimits = new Map<string, { count: number; resetAt: number }>();

const normalize = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character,
  );

type ContactEmailTemplate = {
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  subject: string;
  message: string;
};

const buildContactEmailHtml = ({
  name,
  email,
  phone,
  company,
  jobTitle,
  subject,
  message,
}: ContactEmailTemplate) => {
  const identityDetail =
    jobTitle !== "Not provided" && company !== "Not provided"
      ? `${jobTitle} at ${company}`
      : jobTitle !== "Not provided"
        ? jobTitle
        : company !== "Not provided"
          ? company
          : "Contact form visitor";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>New Connection Request</title>
    <style>
      @media only screen and (max-width: 620px) {
        .email-shell { width: 100% !important; }
        .email-padding { padding-left: 20px !important; padding-right: 20px !important; }
        .column { display: block !important; width: 100% !important; }
        .column-gap { display: none !important; }
        .metadata-label, .metadata-value { display: block !important; width: 100% !important; text-align: left !important; }
        .metadata-value { padding-top: 6px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#060e20;color:#dae2fd;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      New website contact from ${name}: ${subject}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#060e20;">
      <tr>
        <td align="center" style="padding:16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" class="email-shell" style="width:600px;max-width:600px;background-color:#0b1326;border:1px solid #2d3449;border-collapse:separate;">
            <tr>
              <td class="email-padding" style="padding:18px 24px;border-bottom:1px solid #222a3d;font-family:Arial,Helvetica,sans-serif;">
                <a href="https://www.rpovoadata.tech" style="color:#adc6ff;font-size:20px;line-height:26px;font-weight:700;letter-spacing:-0.3px;text-decoration:none;">
                  RPOVOADATA.TECH
                </a>
                <div style="padding-top:4px;color:#8f9ab5;font-size:12px;line-height:18px;font-weight:400;letter-spacing:0;">
                  Data Analytics Engineer, Technical Data Leader and founder of Sapiente.AI.
                </div>
              </td>
            </tr>
            <tr>
              <td class="email-padding" style="padding:28px 24px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding-bottom:8px;color:#adc6ff;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">
                      &#9889;&nbsp;&nbsp;System Alert
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:8px;color:#ffffff;font-size:32px;line-height:40px;font-weight:700;letter-spacing:-0.6px;">
                      New Connection Request
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:28px;color:#c2c6d6;font-size:16px;line-height:24px;">
                      A new message has been captured via the contact website.
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td class="column" width="49%" valign="top" style="width:49%;padding:24px;border:1px solid #2d3449;background-color:#0b1326;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-bottom:20px;color:#adc6ff;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">Identity</td>
                          <td align="right" style="padding-bottom:20px;color:#637398;font-size:20px;">&#9675;</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="color:#ffffff;font-size:20px;line-height:28px;font-weight:700;">${name}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="color:#c2c6d6;font-size:14px;line-height:20px;">${identityDetail}</td>
                        </tr>
                      </table>
                    </td>
                    <td class="column-gap" width="16" style="width:16px;font-size:0;line-height:0;">&nbsp;</td>
                    <td class="column" width="49%" valign="top" style="width:49%;padding:24px;border:1px solid #2d3449;background-color:#0b1326;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-bottom:20px;color:#adc6ff;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">Subject</td>
                          <td align="right" style="padding-bottom:20px;color:#637398;font-size:22px;font-weight:700;">#</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="color:#ffffff;font-size:20px;line-height:28px;font-weight:700;">${subject}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="color:#c2c6d6;font-size:14px;line-height:20px;">Priority: Standard</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;border:1px solid #2d3449;border-radius:6px;border-collapse:separate;overflow:hidden;">
                  <tr>
                    <td colspan="2" style="padding:14px 24px;background-color:#131b2e;border-bottom:1px solid #222a3d;color:#adc6ff;font-size:12px;font-weight:700;letter-spacing:0.5px;">
                      Metadata Protocol
                    </td>
                  </tr>
                  <tr>
                    <td class="metadata-label" width="45%" style="padding:17px 24px;border-bottom:1px solid #171f33;color:#c2c6d6;font-size:14px;line-height:20px;">&#9993;&nbsp;&nbsp;Email Address</td>
                    <td class="metadata-value" align="right" style="padding:17px 24px;border-bottom:1px solid #171f33;color:#ffffff;font-size:14px;line-height:20px;font-weight:600;word-break:break-word;">${email}</td>
                  </tr>
                  <tr>
                    <td class="metadata-label" width="45%" style="padding:17px 24px;border-bottom:1px solid #171f33;color:#c2c6d6;font-size:14px;line-height:20px;">&#9742;&nbsp;&nbsp;Direct Line</td>
                    <td class="metadata-value" align="right" style="padding:17px 24px;border-bottom:1px solid #171f33;color:#ffffff;font-size:14px;line-height:20px;font-weight:600;">${phone}</td>
                  </tr>
                  <tr>
                    <td class="metadata-label" width="45%" style="padding:17px 24px;border-bottom:1px solid #171f33;color:#c2c6d6;font-size:14px;line-height:20px;">&#9638;&nbsp;&nbsp;Organization</td>
                    <td class="metadata-value" align="right" style="padding:17px 24px;border-bottom:1px solid #171f33;color:#ffffff;font-size:14px;line-height:20px;font-weight:600;">${company}</td>
                  </tr>
                  <tr>
                    <td class="metadata-label" width="45%" style="padding:17px 24px;color:#c2c6d6;font-size:14px;line-height:20px;">&#9671;&nbsp;&nbsp;Job Title</td>
                    <td class="metadata-value" align="right" style="padding:17px 24px;color:#ffffff;font-size:14px;line-height:20px;font-weight:600;">${jobTitle}</td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;">
                  <tr>
                    <td style="padding-bottom:14px;color:#c2c6d6;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
                      &#9633;&nbsp;&nbsp;Message Payload
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px;background-color:#171f33;border:1px solid #424754;border-radius:8px;color:#adc6ff;font-size:19px;line-height:30px;font-weight:600;font-style:italic;">
                      &ldquo;${message}&rdquo;
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
            <tr>
              <td align="center" style="padding:28px 24px;background-color:#060e20;border-top:1px solid #171f33;">
                <a href="https://www.rpovoadata.tech" style="color:#adc6ff;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1px;text-decoration:none;">
                  RPOVOADATA.TECH
                </a>
                <div style="padding-top:7px;color:#8f9ab5;font-size:11px;line-height:17px;font-weight:400;letter-spacing:0;">
                  &copy; 2026 Rodrigo P&oacute;voa &mdash; Data Analytics Engineer &amp; Team Leader
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

type ContactConfirmationEmailTemplate = {
  name: string;
  subject: string;
  message: string;
};

const buildContactConfirmationEmailHtml = ({
  name,
  subject,
  message,
}: ContactConfirmationEmailTemplate) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <title>Message Received</title>
    <style>
      @media only screen and (max-width: 620px) {
        .email-shell { width: 100% !important; }
        .email-padding { padding-left: 20px !important; padding-right: 20px !important; }
        .column { display: block !important; width: 100% !important; }
        .column-gap { display: none !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#060e20;color:#dae2fd;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Thank you for contacting Rodrigo Póvoa. Your message has been received.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#060e20;">
      <tr>
        <td align="center" style="padding:16px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" class="email-shell" style="width:600px;max-width:600px;background-color:#0b1326;border:1px solid #2d3449;border-collapse:separate;">
            <tr>
              <td class="email-padding" style="padding:18px 24px;border-bottom:1px solid #222a3d;font-family:Arial,Helvetica,sans-serif;">
                <a href="https://www.rpovoadata.tech" style="color:#adc6ff;font-size:20px;line-height:26px;font-weight:700;letter-spacing:-0.3px;text-decoration:none;">
                  RPOVOADATA.TECH
                </a>
                <div style="padding-top:4px;color:#8f9ab5;font-size:12px;line-height:18px;font-weight:400;letter-spacing:0;">
                  Data Analytics Engineer, Technical Data Leader and founder of Sapiente.AI.
                </div>
              </td>
            </tr>
            <tr>
              <td class="email-padding" style="padding:28px 24px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding-bottom:8px;color:#adc6ff;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">
                      &#10003;&nbsp;&nbsp;Message Confirmed
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:12px;color:#ffffff;font-size:32px;line-height:40px;font-weight:700;letter-spacing:-0.6px;">
                      Thank You for Reaching Out
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:12px;color:#c2c6d6;font-size:16px;line-height:25px;">
                      Hi ${name},
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:28px;color:#c2c6d6;font-size:16px;line-height:25px;">
                      Thank you for your contact. Your message has been received successfully, and I will respond within 48 business hours.
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td class="column" width="49%" valign="top" style="width:49%;padding:24px;border:1px solid #2d3449;background-color:#0b1326;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-bottom:18px;color:#adc6ff;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">Status</td>
                        </tr>
                        <tr>
                          <td style="color:#ffffff;font-size:20px;line-height:28px;font-weight:700;">Message Received</td>
                        </tr>
                        <tr>
                          <td style="color:#c2c6d6;font-size:14px;line-height:20px;">Successfully delivered</td>
                        </tr>
                      </table>
                    </td>
                    <td class="column-gap" width="16" style="width:16px;font-size:0;line-height:0;">&nbsp;</td>
                    <td class="column" width="49%" valign="top" style="width:49%;padding:24px;border:1px solid #2d3449;background-color:#0b1326;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="padding-bottom:18px;color:#adc6ff;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">Expected Response</td>
                        </tr>
                        <tr>
                          <td style="color:#ffffff;font-size:20px;line-height:28px;font-weight:700;">Within 48 Hours</td>
                        </tr>
                        <tr>
                          <td style="color:#c2c6d6;font-size:14px;line-height:20px;">During business days</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;border:1px solid #2d3449;border-radius:6px;border-collapse:separate;overflow:hidden;">
                  <tr>
                    <td style="padding:14px 24px;background-color:#131b2e;border-bottom:1px solid #222a3d;color:#adc6ff;font-size:12px;font-weight:700;letter-spacing:0.5px;">
                      Message Reference
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:17px 24px;color:#ffffff;font-size:15px;line-height:22px;font-weight:600;">
                      ${subject}
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;">
                  <tr>
                    <td style="padding-bottom:14px;color:#c2c6d6;font-size:12px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
                      &#9633;&nbsp;&nbsp;Your Message
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px;background-color:#171f33;border:1px solid #424754;border-radius:8px;color:#adc6ff;font-size:17px;line-height:27px;font-weight:600;font-style:italic;">
                      &ldquo;${message}&rdquo;
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;padding-top:24px;border-top:1px solid #2d3449;">
                  <tr>
                    <td style="color:#8f9ab5;font-size:12px;line-height:19px;">
                      This is an automated confirmation that your message was delivered through rpovoadata.tech.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:28px 24px;background-color:#060e20;border-top:1px solid #171f33;">
                <a href="https://www.rpovoadata.tech" style="color:#adc6ff;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1px;text-decoration:none;">
                  RPOVOADATA.TECH
                </a>
                <div style="padding-top:7px;color:#8f9ab5;font-size:11px;line-height:17px;font-weight:400;letter-spacing:0;">
                  &copy; 2026 Rodrigo P&oacute;voa &mdash; Data Analytics Engineer &amp; Team Leader
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const getClientIp = (req: ApiRequest) => {
  const forwardedFor = req.headers?.["x-forwarded-for"];
  const value = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor;

  return value?.split(",")[0]?.trim() || "unknown";
};

const isRateLimited = (clientIp: string) => {
  const entry = rateLimits.get(clientIp);
  if (!entry) return false;

  if (Date.now() >= entry.resetAt) {
    rateLimits.delete(clientIp);
    return false;
  }

  return entry.count >= RATE_LIMIT_MAX;
};

const recordSubmissionAttempt = (clientIp: string) => {
  const now = Date.now();
  const entry = rateLimits.get(clientIp);

  if (!entry || now >= entry.resetAt) {
    rateLimits.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return;
  }

  entry.count += 1;
};

const verifyTurnstile = async (token: string, clientIp: string) => {
  if (!TURNSTILE_SECRET_KEY) {
    return { configured: false, valid: false };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: clientIp === "unknown" ? undefined : clientIp,
        }),
        signal: controller.signal,
      },
    );

    const result = (await response.json()) as {
      action?: string;
      hostname?: string;
      success?: boolean;
    };

    const hostname = result.hostname?.toLowerCase() || "";
    return {
      configured: true,
      valid:
        response.ok &&
        result.success === true &&
        result.action === "contact_form" &&
        TURNSTILE_ALLOWED_HOSTNAMES.has(hostname),
    };
  } catch (error) {
    console.error("Contact form Turnstile error:", error);
    return { configured: true, valid: false };
  } finally {
    clearTimeout(timeout);
  }
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const payload = req.body || {};
  const name = normalize(payload.name);
  const email = normalize(payload.email);
  const phone = normalize(payload.phone);
  const company = normalize(payload.company);
  const jobTitle = normalize(payload.jobTitle);
  const subject = normalize(payload.subject).replace(/[\r\n]+/g, " ");
  const message = normalize(payload.message);
  const website = normalize(payload.website);
  const turnstileToken = normalize(payload.turnstileToken);
  const clientIp = getClientIp(req);

  // Honeypot: legitimate visitors never see or fill this field.
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (
    name.length < 3 ||
    name.length > 100 ||
    !EMAIL_PATTERN.test(email) ||
    email.length > 254 ||
    (phone && !PHONE_PATTERN.test(phone)) ||
    phone.length > 20 ||
    company.length > 100 ||
    jobTitle.length > 80 ||
    subject.length < 3 ||
    subject.length > 120 ||
    message.length < 10 ||
    message.length > 1000
  ) {
    return res.status(400).json({ error: "Please check the submitted fields." });
  }

  const emailDomain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
  if (isDisposableEmail(email) || isDisposableDomain(emailDomain)) {
    return res.status(400).json({
      code: "EMAIL_DOMAIN_BLACKLISTED",
      error: BLACKLISTED_EMAIL_MESSAGE,
    });
  }

  if (!turnstileToken || turnstileToken.length > 2048) {
    return res.status(400).json({
      code: "TURNSTILE_REQUIRED",
      error: "Please complete the human verification.",
    });
  }

  const turnstile = await verifyTurnstile(turnstileToken, clientIp);
  if (!turnstile.configured) {
    return res.status(503).json({
      code: "TURNSTILE_NOT_CONFIGURED",
      error: "Human verification is temporarily unavailable.",
    });
  }

  if (!turnstile.valid) {
    return res.status(400).json({
      code: "TURNSTILE_INVALID",
      error: "Human verification failed. Please try again.",
    });
  }

  if (isRateLimited(clientIp)) {
    res.setHeader("Retry-After", "900");
    return res.status(429).json({
      code: "RATE_LIMITED",
      error: "Too many messages were sent. Please try again in 15 minutes.",
    });
  }

  recordSubmissionAttempt(clientIp);

  if (!SMTP_PASSWORD) {
    console.error("Contact form: SMTP_PASSWORD is not configured.");
    return res.status(503).json({
      code: "SMTP_NOT_CONFIGURED",
      error: "The contact service is temporarily unavailable.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 10_000,
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeCompany = escapeHtml(company || "Not provided");
    const safeJobTitle = escapeHtml(jobTitle || "Not provided");
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    await transporter.sendMail({
        from: `"Rodrigo Póvoa website" <${SMTP_USER}>`,
        to: CONTACT_EMAIL_TO,
        replyTo: {
          name,
          address: email,
        },
        subject: `[Website] ${subject}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "Not provided"}`,
          `Company: ${company || "Not provided"}`,
          `Job title: ${jobTitle || "Not provided"}`,
          `Subject: ${subject}`,
          "",
          message,
        ].join("\n"),
        html: buildContactEmailHtml({
          name: safeName,
          email: safeEmail,
          phone: safePhone,
          company: safeCompany,
          jobTitle: safeJobTitle,
          subject: safeSubject,
          message: safeMessage,
        }),
      });

    await transporter.sendMail({
        from: `"Rodrigo Póvoa" <${SMTP_USER}>`,
        to: {
          name,
          address: email,
        },
        replyTo: CONTACT_EMAIL_TO,
        subject: `Message received — ${subject}`,
        text: [
          `Hi ${name},`,
          "",
          "Thank you for your contact. Your message has been received successfully, and I will respond within 48 business hours.",
          "",
          `Subject: ${subject}`,
          "",
          "Your message:",
          message,
          "",
          "Rodrigo Póvoa",
          "Data Analytics Engineer & Team Leader",
          "https://www.rpovoadata.tech",
        ].join("\n"),
        html: buildContactConfirmationEmailHtml({
          name: safeName,
          subject: safeSubject,
          message: safeMessage,
        }),
      });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact form SMTP error:", error);

    const smtpCode =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : "SMTP_UNKNOWN";

    const publicMessage =
      smtpCode === "EAUTH"
        ? "The email service authentication failed. Please contact the site owner."
        : ["ECONNECTION", "ETIMEDOUT", "ESOCKET"].includes(smtpCode)
          ? "The email service is currently unreachable. Please try again later."
          : "The message could not be sent. Please try again later.";

    return res.status(502).json({
      code: smtpCode,
      error: publicMessage,
    });
  }
}
