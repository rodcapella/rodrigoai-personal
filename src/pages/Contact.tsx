import { lazy, useState, Suspense } from "react";
import { motion } from "framer-motion"
import Section from "@/components/layout/Section";
import PageHero from "@/components/layout/PageHero"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Mail = lazy(() => import("lucide-react").then(m => ({ default: m.Mail })));
const Phone = lazy(() => import("lucide-react").then(m => ({ default: m.Phone })));
const MapPin = lazy(() => import("lucide-react").then(m => ({ default: m.MapPin })));
const Send = lazy(() => import("lucide-react").then(m => ({ default: m.Send })));
const CheckCircle = lazy(() => import("lucide-react").then(m => ({ default: m.CheckCircle })));
const AlertCircle = lazy(() => import("lucide-react").then(m => ({ default: m.AlertCircle })));

interface ContactProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const Contact = ({ theme = 'dark', onToggleTheme }: ContactProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState("");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Phone validation regex (international format)
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

  // Maximum field lengths
  const maxLengths = {
    name: 80,
    email: 120,
    phone: 25,
    subject: 150,
    message: 2000
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (formData.name.length > maxLengths.name) {
      newErrors.name = `Name cannot exceed ${maxLengths.name} characters`;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > maxLengths.email) {
      newErrors.email = `Email cannot exceed ${maxLengths.email} characters`;
    }

    // Phone validation
    if (formData.phone.trim()) {
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      } else if (formData.phone.length > maxLengths.phone) {
        newErrors.phone = `Phone cannot exceed ${maxLengths.phone} characters`;
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    } else if (formData.subject.length > maxLengths.subject) {
      newErrors.subject = `Subject cannot exceed ${maxLengths.subject} characters`;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters";
    } else if (formData.message.length > maxLengths.message) {
      newErrors.message = `Message cannot exceed ${maxLengths.message} characters`;
    }

    // Spam detection: check for excessive links or suspicious patterns
    const linkCount = (formData.message.match(/https?:\/\//gi) || []).length;
    if (linkCount > 5) {
      newErrors.message = "Message contains too many links";
    }

    const totalSize =
      formData.name.length +
      formData.email.length +
      formData.phone.length +
      formData.subject.length +
      formData.message.length;

    if (totalSize > 2500) {
      newErrors.message = "Message payload too large";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus('error');
      setSubmitMessage("Please fix the errors above");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setSubmitMessage("Thank you! Your message has been sent successfully. I'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rodrigo Póvoa",
            "url": "https://www.rpovoadata.tech",
            "logo": "https://www.rpovoadata.tech/rodrigo_contact_image.png",
            "description": "Enterprise Data Architect and Analytics Platform Leader specializing in Azure, Databricks and modern Lakehouse architectures.",
            "sameAs": [
              "https://www.linkedin.com/in/rodrigopovoa",
              "https://github.com/rodcapella"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "professional inquiries",
              "email": "contato@rpovoadata.tech",
              "availableLanguage": [
                "English",
                "Portuguese"
              ]
            }
          })
        }}
      />

      {/* SEO Structured Data */}
      <script type="application/ld+json">...</script>
      <script type="application/ld+json">...</script>
      
        <main className="pt-36 pb-24">

          {/* HERO */}
          <PageHero
            variant="page"
            title="LET'S CONNECT"
            subtitle="Feel free to reach out if you want to discuss data platforms, architecture or collaboration."
            image="/rodrigo_contact_image.png"
          />

          {/* CONTACT FORM */}
          <Section>

            <div className="max-w-2xl mx-auto">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      maxLength={maxLengths.name}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-lg border transition-all 
                      bg-black text-white dark:bg-white dark:text-black
                      ${
                        errors.name
                          ? "border-red-500"
                          : "border-border hover:border-primary/50 focus:border-primary"
                      } focus:outline-none`}
                    />

                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      maxLength={maxLengths.email}
                      className={`w-full px-4 py-3 rounded-lg border transition-all 
                      bg-black text-white dark:bg-white dark:text-black
                      ${
                        errors.email
                          ? "border-red-500"
                          : "border-border hover:border-primary/50 focus:border-primary"
                      } focus:outline-none`}
                    />

                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number (Optional)
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      maxLength={maxLengths.phone}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full px-4 py-3 rounded-lg border transition-all 
                      bg-black text-white dark:bg-white dark:text-black
                      ${
                        errors.phone
                          ? "border-red-500"
                          : "border-border hover:border-primary/50 focus:border-primary"
                      } focus:outline-none`}
                    />

                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>

                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      maxLength={maxLengths.subject}
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className={`w-full px-4 py-3 rounded-lg border transition-all 
                      bg-black text-white dark:bg-white dark:text-black
                      ${
                        errors.subject
                          ? "border-red-500"
                          : "border-border hover:border-primary/50 focus:border-primary"
                      } focus:outline-none`}
                    />

                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={maxLengths.message}
                      placeholder="Your message here..."
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border transition-all resize-none 
                      bg-black text-white dark:bg-white dark:text-black
                      ${
                        errors.message
                          ? "border-red-500"
                          : "border-border hover:border-primary/50 focus:border-primary"
                      } focus:outline-none`}
                    />

                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-3 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

                </form>

              </motion.div>

            </div>

          </Section>

        </main>

      <Footer />
    </div>
  );
};

export default Contact;
