import { useOutletContext } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { AlertCircle, CheckCircle } from "@/lib/icons";
import FormField from "@/components/ui/FormField";
import TurnstileWidget from "@/components/ui/TurnstileWidget";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  subject: string;
  message: string;
  website: string;
};

const BLACKLISTED_EMAIL_MESSAGE =
  "This email address uses a domain that appears on a public email blacklist. Please use a different email address.";

export default function Contact() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    subject: "",
    message: "",
    website: "",
  });
  const successMessageRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (status === "success") successMessageRef.current?.focus();
  }, [status]);
  const [submissionError, setSubmissionError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const turnstileSiteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() || "";

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken("");
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken("");
    setStatus("error");
    setSubmissionError(
      "Human verification could not be completed. Please refresh the page.",
    );
  }, []);

  const limits = {
    name: { min: 3, max: 100 },
    email: { max: 254 },
    phone: { max: 20 },
    company: { max: 100 },
    jobTitle: { max: 80 },
    subject: { min: 3, max: 120 },
    message: { min: 10, max: 1000 },
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s+()-]{8,20}$/;

  const validate = () => {
    const e: Partial<FormData> = {};

    if (!formData.name.trim()) e.name = "Name is required";
    else if (formData.name.length < limits.name.min)
      e.name = `Min ${limits.name.min} characters`;
    else if (formData.name.length > limits.name.max)
      e.name = `Max ${limits.name.max} characters`;

    if (!formData.email.trim()) e.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      e.email = "Enter a valid email address (for example, name@example.com)";
    else if (formData.email.length > limits.email.max)
      e.email = `Max ${limits.email.max} characters`;

    if (formData.phone.length > limits.phone.max)
      e.phone = `Max ${limits.phone.max} characters`;
    else if (formData.phone.trim() && !phoneRegex.test(formData.phone))
      e.phone = "Invalid phone number";

    if (formData.company.length > limits.company.max)
      e.company = `Max ${limits.company.max} characters`;

    if (formData.jobTitle.length > limits.jobTitle.max)
      e.jobTitle = `Max ${limits.jobTitle.max} characters`;

    if (!formData.subject.trim()) e.subject = "Subject is required";
    else if (formData.subject.length < limits.subject.min)
      e.subject = `Min ${limits.subject.min} characters`;
    else if (formData.subject.length > limits.subject.max)
      e.subject = `Max ${limits.subject.max} characters`;

    if (!formData.message.trim()) e.message = "Message is required";
    else if (formData.message.length < limits.message.min)
      e.message = `Min ${limits.message.min} characters`;
    else if (formData.message.length > limits.message.max)
      e.message = `Max ${limits.message.max} characters`;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const normalizedEmail = formData.email.trim().toLowerCase();
    const emailDomain = normalizedEmail.slice(
      normalizedEmail.lastIndexOf("@") + 1,
    );

    let isBlacklisted = false;
    try {
      const { isDisposableDomain, isDisposableEmail } = await import(
        "@rodcapella/common-resources"
      );
      isBlacklisted =
        isDisposableEmail(normalizedEmail) ||
        isDisposableDomain(emailDomain);
    } catch (error) {
      console.error("Email blacklist validation failed:", error);
      setStatus("error");
      setSubmissionError(
        "Email validation is temporarily unavailable. Please try again.",
      );
      return;
    }

    if (isBlacklisted) {
      setErrors((current) => ({
        ...current,
        email: BLACKLISTED_EMAIL_MESSAGE,
      }));
      setStatus("error");
      setSubmissionError(BLACKLISTED_EMAIL_MESSAGE);
      return;
    }

    if (!turnstileSiteKey) {
      setStatus("error");
      setSubmissionError("Human verification is not configured.");
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setSubmissionError("Please complete the human verification.");
      return;
    }

    setLoading(true);
    setSubmissionError("");
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string; success?: boolean }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.error || "The message could not be sent. Please try again.",
        );
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        subject: "",
        message: "",
        website: "",
      });
    } catch (error) {
      setStatus("error");
      setTurnstileToken("");
      setTurnstileResetKey((value) => value + 1);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "The message could not be sent. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Contact | Rodrigo Póvoa"
        description="Get in touch with Rodrigo Póvoa to discuss data engineering, AI systems, analytics platforms or strategic technology initiatives." 
      />

      {/* HERO */}
      <PageSection variant="gradient" spacing="none" className="pt-12 pb-6 md:pt-16 md:pb-8">
        <PageHero
          variant="page"
          title="LET'S CONNECT"
          subtitle="Whether it's a project, an idea or just a conversation. I'm always open to building something meaningful."
          image="/rodrigo_contact_image.webp"
        />
      </PageSection>

      {/* FORM */}
      <PageSection variant="glass">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              ref={successMessageRef}
              key="success"
              tabIndex={-1}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass p-10 rounded-2xl text-center glow-primary"
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-text">
                Message Sent 🚀
              </h3>
              <p className="text-muted-foreground">
                I’ll get back to you shortly.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                glass
                p-10
                rounded-2xl
                space-y-6
                border border-white/10
                max-w-2xl
                mx-auto
              "
            >
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <FormField
                name="name"
                placeholder="Full Name"
                disabled={loading}
                maxLength={limits.name.max}
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <FormField
                name="email"
                type="email"
                placeholder="Email"
                disabled={loading}
                maxLength={limits.email.max}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FormField
                name="phone"
                placeholder="Phone (optional)"
                disabled={loading}
                maxLength={limits.phone.max}
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              <FormField
                name="company"
                placeholder="Company (optional)"
                disabled={loading}
                maxLength={limits.company.max}
                value={formData.company}
                onChange={handleChange}
                error={errors.company}
              />

              <FormField
                name="jobTitle"
                placeholder="Job Title (optional)"
                disabled={loading}
                maxLength={limits.jobTitle.max}
                value={formData.jobTitle}
                onChange={handleChange}
                error={errors.jobTitle}
              />

              <FormField
                name="subject"
                placeholder="Subject"
                disabled={loading}
                maxLength={limits.subject.max}
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
              />

              {/* TEXTAREA */}
              <div className="space-y-2">
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your idea, project or challenge..."
                  disabled={loading}
                  maxLength={limits.message.max}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message
                      ? "contact-message-error contact-message-count"
                      : "contact-message-count"
                  }
                  className={`
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-background
                    backdrop-blur-md
                    border border-border
                    text-sm
                    text-foreground
                    placeholder:text-muted-foreground/70
                    leading-relaxed
                    transition-all duration-200
                    outline-none
                    resize-none
                    ${
                      errors.message
                        ? "border-red-500"
                        : "focus:border-primary focus:ring-2 focus:ring-primary/30"
                    }
                  `}
                />

                <p
                  id="contact-message-count"
                  className="text-right text-xs text-muted-foreground"
                >
                  {formData.message.length} / {limits.message.max}
                </p>

                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="text-red-500 text-xs mt-1 flex gap-2 items-center"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {turnstileSiteKey ? (
                <TurnstileWidget
                  key={turnstileResetKey}
                  siteKey={turnstileSiteKey}
                  theme={theme}
                  onVerify={setTurnstileToken}
                  onExpire={handleTurnstileExpire}
                  onError={handleTurnstileError}
                />
              ) : (
                <p
                  role="alert"
                  className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-500"
                >
                  Human verification is not configured.
                </p>
              )}

              {status === "error" && submissionError && (
                <p
                  role="alert"
                  className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {submissionError}
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading || !turnstileSiteKey || !turnstileToken}
                className="
                  w-full py-4 rounded-xl
                  bg-gradient-to-r from-primary to-secondary
                  text-white font-semibold
                  tracking-wide
                  shadow-lg shadow-primary/20
                  hover:scale-[1.02]
                  transition-all duration-300
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:scale-100
                "
              >
                {loading ? "Sending message ..." : "Send Message"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </PageSection>
    </MainLayout>
  );
}
