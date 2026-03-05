import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Linkedin, Github, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ContactProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

type FormData = {
  name: string;
  email: string;
  company?: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact = ({ theme = "dark", onToggleTheme }: ContactProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // Aqui você poderá integrar API futuramente
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact | Rodrigo Póvoa</title>
        <meta
          name="description"
          content="Get in touch with Rodrigo Póvoa – AI Architect and Data Analytics Engineer based in Aveiro, Portugal."
        />
        <link
          rel="canonical"
          href="https://rodrigoai-personal.vercel.app/contact"
        />
      </Helmet>

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-32 pb-24 px-4">
        <section className="container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Contact</h1>

            <p className="text-muted-foreground mb-10 leading-relaxed">
              If you're exploring AI-native architectures, data modernization or
              strategic analytics leadership, feel free to reach out.
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email *"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Company (optional) */}
              <div>
                <input
                  {...register("company")}
                  placeholder="Company"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: {
                      value: 8,
                      message: "Invalid phone number",
                    },
                  })}
                  placeholder="Phone *"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <input
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  placeholder="Subject *"
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  placeholder="Message *"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary outline-none resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-[0_0_12px_rgba(59,130,246,0.5)]"
              >
                Send Message
              </button>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 pt-10 border-t border-primary/20"
            >
              <h3 className="text-xl font-semibold mb-6">
                Or connect directly
              </h3>

              <div className="flex flex-wrap gap-6 mb-8">
                <a
                  href="https://www.linkedin.com/in/rodrigocspovoa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all border border-primary/20"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span className="font-medium">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/rodcapella"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all border border-primary/20"
                >
                  <Github className="w-5 h-5 text-primary" />
                  <span className="font-medium">GitHub</span>
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Aveiro, Portugal</span>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
