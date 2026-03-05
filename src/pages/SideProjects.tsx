import { motion } from "framer-motion";
import { Zap, Database, Cpu, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

interface SideProjectsProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const SideProjects = ({ theme = 'dark', onToggleTheme }: SideProjectsProps) => {

  const projectCategories = [
    {
      icon: Cpu,
      title: "AI Systems Exploration",
      description:
        "Systematic experimentation with modern AI ecosystems, evaluating architectural trade-offs and integration patterns."
    },
    {
      icon: Database,
      title: "AI-Augmented Data Platforms",
      description:
        "Designing data architectures enhanced by artificial intelligence."
    },
    {
      icon: Zap,
      title: "Intelligent Automation",
      description:
        "Developing automation frameworks that integrate AI capabilities into operational workflows."
    },
    {
      icon: TrendingUp,
      title: "AI-Driven Digital Strategy",
      description:
        "Applying AI to marketing, SEO and digital positioning strategies."
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      <Helmet>
        <title>
          AI Projects | Rodrigo Póvoa – SapienteAI Innovation Studio
        </title>

        <meta
          name="description"
          content="Independent AI innovation studio exploring AI-native systems, intelligent automation, AI-augmented data platforms and digital strategy through SapienteAI."
        />

        <meta
          name="keywords"
          content="AI Innovation Studio, SapienteAI, AI-native Architecture, AI Systems Exploration, Intelligent Automation, AI Data Platforms, AI Digital Strategy"
        />

        <link
          rel="canonical"
          href="https://rodrigoai-personal.vercel.app/side-projects"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="AI Projects | SapienteAI Innovation Studio"
        />
        <meta
          property="og:description"
          content="Exploring AI-native architectures, automation systems and AI-augmented data platforms."
        />
        <meta
          property="og:url"
          content="https://rodrigoai-personal.vercel.app/side-projects"
        />
        <meta
          property="og:image"
          content="https://rodrigoai-personal.vercel.app/logo_sapienteai.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="SapienteAI – AI Innovation Projects"
        />
        <meta
          name="twitter:description"
          content="AI-native architectures, automation frameworks and intelligent digital systems."
        />
        <meta
          name="twitter:image"
          content="https://rodrigoai-personal.vercel.app/logo_sapienteai.png"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "SapienteAI Innovation Studio",
            creator: {
              "@type": "Person",
              name: "Rodrigo Póvoa"
            },
            url: "https://rodrigoai-personal.vercel.app/side-projects",
            description:
              "Independent AI experimentation studio focused on AI-native architectures, automation systems and intelligent data platforms.",
            about: [
              "Artificial Intelligence",
              "AI-native Architecture",
              "Automation Systems",
              "AI-Augmented Data Platforms",
              "Digital Strategy"
            ]
          })}
        </script>
      </Helmet>

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-32 pb-20">
        {/* HERO */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Parallel Projects
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                SapienteAI represents a structured exploration of artificial intelligence and advanced data systems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Restante conteúdo permanece igual */}

      </main>

      <Footer />
    </div>
  );
};

export default SideProjects;
