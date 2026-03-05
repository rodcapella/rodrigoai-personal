import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

interface ContactProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const Contact = ({ theme = "dark", onToggleTheme }: ContactProps) => {
  return (
    <div className="min-h-screen bg-background">

      <Helmet>
        <title>Contact | Rodrigo Póvoa –Data Analytics Engineer & Team Leader.</title>
        <meta
          name="description"
          content="Get in touch with Rodrigo Póvoa —Data Analytics Engineer & Team Leader. specializing in AI-native systems and scalable data platforms."
        />
        <link
          rel="canonical"
          href="https://rodrigoai-personal.vercel.app/contact"
        />
      </Helmet>

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-32 pb-24 px-4">

        {/* Hero */}
        <section className="container max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Let's Connect
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Whether you're exploring AI-native architectures, data platform
              modernization or strategic analytics leadership, I’m open to
              meaningful conversations.
            </p>
          </motion.div>
        </section>

        {/* Contact Cards */}
        <section className="container max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20 hover:border-primary/40 transition-all"
            >
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a
                href="mailto:your@email.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                rodcapella@gmail.com
              </a>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20 hover:border-primary/40 transition-all"
            >
              <Linkedin className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/rodcspovoa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Connect on LinkedIn
              </a>
            </motion.div>

            {/* GitHub */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20 hover:border-primary/40 transition-all"
            >
              <Github className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <a
                href="https://github.com/rodcapella"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                View Projects
              </a>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20 hover:border-primary/40 transition-all"
            >
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">
                Portugal – Open to Remote & International Collaboration
              </p>
            </motion.div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Contact;
