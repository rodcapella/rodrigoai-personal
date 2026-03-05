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

{/* Project Categories */} <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16"> <div className="container max-w-4xl mx-auto"> <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} > <h2 className="text-3xl font-bold mb-12">Project Focus Areas</h2> <div className="grid md:grid-cols-2 gap-8"> {projectCategories.map((category, idx) => { const Icon = category.icon; return ( <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 + idx * 0.05 }} className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20" > <Icon className="w-8 h-8 text-primary mb-4" /> <h3 className="text-lg font-bold mb-3">{category.title}</h3> <p className="text-sm text-muted-foreground leading-relaxed"> {category.description} </p> </motion.div> ); })} </div> </motion.div> </div> </section> {/* Project Philosophy */} <section className="px-4 mb-20"> <div className="container max-w-4xl mx-auto"> <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} > <h2 className="text-3xl font-bold mb-8">Project Philosophy</h2> <div className="space-y-6 text-muted-foreground leading-relaxed"> <p> SapienteAI is built on the belief that artificial intelligence should not be treated as a tool, but as an architectural layer. Every experiment focuses on understanding how AI can enhance data governance, accelerate analytics workflows and create measurable strategic advantages across industries. </p> <p> The objective is to bridge engineering discipline with AI-native thinking — designing systems that are sustainable, governed and prepared for long-term evolution. </p> </div> </motion.div> </div> </section> {/* CTA Section */} <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16"> <div className="container max-w-4xl mx-auto"> <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="bg-gradient-to-r from-primary/20 to-primary/5 p-12 rounded-lg border border-primary/20 text-center" > {/* Logo */} <div className="flex justify-center mb-6"> <img src="/logo_sapienteai.png" alt="SapienteAI Logo" className="h-14 w-auto opacity-90" /> </div> <h3 className="text-2xl font-bold mb-4"> Explore SapienteAI </h3> <p className="text-muted-foreground mb-8 max-w-2xl mx-auto"> SapienteAI is an innovation studio dedicated to exploring the full potential of artificial intelligence and translating that intelligence into scalable data, automation and digital growth solutions. </p> <a href="https://sapienteai.com" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all" > Visit SapienteAI </a> </motion.div> </div> </section> </main> <Footer /> </div> ); };

export default SideProjects;
