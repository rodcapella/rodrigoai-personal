import { useOutletContext } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { AlertCircle, CheckCircle } from "@/lib/icons";
import FormField from "@/components/ui/FormField";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  const limits = {
    name: { min: 3, max: 80 },
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
      e.email = "Invalid email format";

    if (formData.phone.trim() && !phoneRegex.test(formData.phone))
      e.phone = "Invalid phone number";

    if (!formData.subject.trim()) e.subject = "Subject is required";
    else if (formData.subject.length < limits.subject.min)
      e.subject = `Min ${limits.subject.min} characters`;

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
      <SEO
        title="Contact"
        description="Get in touch with Rodrigo Póvoa to discuss data engineering, AI systems, analytics platforms or strategic technology initiatives." 
      />

      {/* HERO */}
      <PageSection variant="gradient" className="pt-32 pb-16">
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
              key="success"
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
              <FormField
                name="name"
                placeholder="Full Name"
                disabled={loading}
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <FormField
                name="email"
                type="email"
                placeholder="Email"
                disabled={loading}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FormField
                name="phone"
                placeholder="Phone (optional)"
                disabled={loading}
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              <FormField
                name="subject"
                placeholder="Subject"
                disabled={loading}
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
              />

              {/* TEXTAREA */}
              <div className="space-y-2">
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell me about your idea, project or challenge..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-white/5
                    backdrop-blur-md
                    border border-white/10
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
                        : "focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                    }
                  `}
                />

                {errors.message && (
                  <p className="text-red-500 text-xs mt-1 flex gap-2 items-center">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                disabled={loading}
                className="
                  w-full py-4 rounded-xl
                  bg-gradient-to-r from-primary to-secondary
                  text-white font-semibold
                  tracking-wide
                  shadow-lg shadow-primary/20
                  hover:scale-[1.02]
                  transition-all duration-300
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