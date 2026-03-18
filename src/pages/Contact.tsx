import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { AlertCircle, CheckCircle } from "@/lib/icons";

export default function Contact({ theme, onToggleTheme }: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  // 🔒 regras
  const limits = {
    name: { min: 3, max: 80 },
    subject: { min: 3, max: 120 },
    message: { min: 10, max: 1000 },
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s+()-]{8,20}$/;

  const validate = () => {
    const e: any = {};

    // NAME
    if (!formData.name.trim()) {
      e.name = "Name is required";
    } else if (formData.name.length < limits.name.min) {
      e.name = `Min ${limits.name.min} characters`;
    } else if (formData.name.length > limits.name.max) {
      e.name = `Max ${limits.name.max} characters`;
    }

    // EMAIL
    if (!formData.email.trim()) {
      e.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      e.email = "Invalid email format";
    }

    // PHONE (❗ NÃO obrigatório)
    if (formData.phone.trim()) {
      if (!phoneRegex.test(formData.phone)) {
        e.phone = "Invalid phone number";
      }
    }

    // SUBJECT
    if (!formData.subject.trim()) {
      e.subject = "Subject is required";
    } else if (formData.subject.length < limits.subject.min) {
      e.subject = `Min ${limits.subject.min} characters`;
    }

    // MESSAGE
    if (!formData.message.trim()) {
      e.message = "Message is required";
    } else if (formData.message.length < limits.message.min) {
      e.message = `Min ${limits.message.min} characters`;
    } else if (formData.message.length > limits.message.max) {
      e.message = `Max ${limits.message.max} characters`;
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setStatus("success");
      setLoading(false);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setStatus("idle");
      }, 2500);
    }, 1200);
  };

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO title="Contact" description="Whether it's a project, an idea or just a conversation. I'm always open to building something meaningful." />

      <PageHero
        variant="page"
        title="LET'S CONNECT"
        subtitle="Whether it's a project, an idea or just a conversation. I'm always open to building something meaningful."
        image="/rodrigo_contact_image.png"
      />

      <div className="max-w-2xl mx-auto relative z-10">
      <PageSection>
           <div className="text-center mb-6 text-sm text-muted-foreground">
            Usually replies within 24 hours, often faster.
          </div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass p-10 rounded-2xl text-center glow-primary"
              >
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />

                <h3 className="text-xl font-semibold mb-2">Message Sent 🚀</h3>

                <p className="text-muted-foreground">
                  I’ll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-2xl space-y-5 border border-primary/10"
              >
                <Field
                  name="name"
                  placeholder="Full Name"
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />

                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />

                <Field
                  name="phone"
                  placeholder="Phone (optional)"
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />

                <Field
                  name="subject"
                  placeholder="Subject"
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your idea, project or challenge..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  className={`w-full p-3 rounded-lg border bg-background transition-all duration-200 outline-none ${
                    errors.message
                      ? "border-red-500"
                      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/30"
                  }`}
                />

                {errors.message && <Error text={errors.message} />}

                <button
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-primary text-white font-semibold glow-primary-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
      </PageSection>
    </MainLayout>
  );
}

function Field({
  name,
  type = "text",
  placeholder,
  formData,
  handleChange,
  errors,
}: any) {
  return (
    <div>
      <input
        type={type}
        name={name}
        autoComplete={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        aria-invalid={!!errors[name]}
        className={`w-full p-3 rounded-lg border bg-background transition-all duration-200 outline-none ${
          errors[name]
            ? "border-red-500"
            : "border-border focus:border-primary focus:ring-2 focus:ring-primary/30"
        }`}
      />

      {errors[name] && <Error text={errors[name]} />}
    </div>
  );
}

function Error({ text }: any) {
  return (
    <p className="text-red-500 text-sm flex gap-2 mt-1">
      <AlertCircle className="w-4 h-4" />
      {text}
    </p>
  );
}
