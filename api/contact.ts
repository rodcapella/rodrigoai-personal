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
      html: `
        <h2>New website contact</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Job title:</strong> ${safeJobTitle}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr />
        <p>${safeMessage}</p>
      `,
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
