import nodemailer from "nodemailer";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

type ApiRequest = {
  method?: string;
  body?: ContactPayload;
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (body: { code?: string; error?: string; success?: boolean }) => void;
};

const SMTP_HOST = process.env.SMTP_HOST || "smtp-pt.securemail.pro";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "contacto@rpovoadata.tech";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const CONTACT_EMAIL_TO =
  process.env.CONTACT_EMAIL_TO || "contacto@rpovoadata.tech";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s+()-]{8,20}$/;

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

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const payload = req.body || {};
  const name = normalize(payload.name);
  const email = normalize(payload.email);
  const phone = normalize(payload.phone);
  const subject = normalize(payload.subject).replace(/[\r\n]+/g, " ");
  const message = normalize(payload.message);
  const website = normalize(payload.website);

  // Honeypot: legitimate visitors never see or fill this field.
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (
    name.length < 3 ||
    name.length > 80 ||
    !EMAIL_PATTERN.test(email) ||
    (phone && !PHONE_PATTERN.test(phone)) ||
    subject.length < 3 ||
    subject.length > 120 ||
    message.length < 10 ||
    message.length > 1000
  ) {
    return res.status(400).json({ error: "Please check the submitted fields." });
  }

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
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New website contact</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
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
