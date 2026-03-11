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

  const sapientePoints = [
    {
      icon: Database,
      title: "AI-Native Data Platforms",
      description:
        "Architecting data platforms designed from inception to support AI workloads, governance and scalable analytics."
    },
    {
      icon: Cpu,
      title: "Automation Architectures",
      description:
        "Designing automation systems that integrate AI models with operational data pipelines."
    },
    {
      icon: TrendingUp,
      title: "AI Strategic Enablement",
      description:
        "Exploring how organizations can embed AI into data ecosystems and decision frameworks."
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      <Helmet>
        <title>
          Rodrigo Póvoa – Sapiente.AI Innovation Studio
        </title>

        <meta
          name="description"
          content="Independent AI innovation studio exploring AI-native systems, intelligent automation, AI-augmented data platforms and digital strategy through SapienteAI."
        />

        <meta
          name="keywords"
          content="AI Innovation Studio, Sapiente.AI, SapienteAI, Sapiente, AI-native Architecture, AI Systems Exploration, Intelligent Automation, AI Data Platforms, AI Digital Strategy"
        />

        <link
          rel="canonical"
          href="https://www.rpovoadata.tech/side-projects"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="AI Projects | Sapiente.AI Innovation Studio"
        />
        <meta
          property="og:description"
          content="Exploring AI-native architectures, automation systems and AI-augmented data platforms."
        />
        <meta
          property="og:url"
          content="https://www.rpovoadata.tech/side-projects"
        />
        <meta
          property="og:image"
          content="https://www.rpovoadata.tech/logo_sapienteai.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sapiente.AI – AI Innovation Projects"
        />
        <meta
          name="twitter:description"
          content="AI-native architectures, automation frameworks and intelligent digital systems."
        />
        <meta
          name="twitter:image"
          content="https://www.rpovoadata.tech/logo_sapienteai.png"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ResearchProject",
            name: "Sapiente.AI Innovation Studio",
            creator: {
              "@type": "Person",
              name: "Rodrigo Póvoa"
            },
            url: "https://www.rpovoadata.tech/side-projects",
            description:
              "Independent AI experimentation studio exploring AI-native architectures, automation systems and intelligent data platforms.",
            keywords: [
              "Artificial Intelligence",
              "AI-native Architecture",
              "Automation Systems",
              "AI-Augmented Data Platforms",
              "Digital Strategy",
              "AI",
              "IA",
              "Inteligência Artificial",
              "Branding"
            ],
            about: [
              {
                "@type": "Thing",
                name: "Artificial Intelligence"
              },
              {
                "@type": "Thing",
                name: "Data Architecture"
              },
              {
                "@type": "Thing",
                name: "Automation Systems"
              }
            ]
          })}
          </script>
      </Helmet>

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-36 pb-24">
      {/* HERO */}
        <section className="px-4 mb-24">
          <div className="container max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >

                <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  Sapiente.AI
                </h1>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
                Enterprise AI Architecture Experiments
                </h2>

                <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
                  Sapiente.AI is my independent innovation studio focused on exploring how artificial intelligence
                  is transforming enterprise data architecture, automation and digital strategy.
                </p>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center"
              >

                <img
                  src="/logo_sapienteai.png"
                  alt="SapienteAI Logo"
                  className="rounded-2xl shadow-2xl border border-primary/20 w-[170px]"
                />

              </motion.div>

            </div>
          </div>
        </section>

        {/* SapienteAI - The Next Generation */}
        <section className="px-4 mb-24">
          <div className="container max-w-4xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
              Sapiente.AI: The Next Generation
            </h2>

            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20 mb-12">

              <p className="text-lg leading-relaxed mb-6">
                My 15 years building data systems revealed a critical insight:
                <span className="text-primary font-semibold"> the next generation of data platforms must be AI-native from inception.</span>
              </p>

              <p className="text-lg leading-relaxed">
                Sapiente.AI is where I explore this frontier—combining deep data engineering expertise with AI innovation
                to build the platforms enterprises need to compete in the AI era.
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              {sapientePoints.map((point, idx) => {
                const Icon = point.icon;

                return (
                  <motion.div
                    key={idx}
                    className="bg-gradient-to-br from-background to-primary/5 rounded-xl p-6 border border-primary/10"
                  >

                    <Icon className="w-8 h-8 text-primary mb-4" />

                    <h4 className="font-bold text-lg mb-3">
                      {point.title}
                    </h4>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {point.description}
                    </p>

                  </motion.div>
                );
              })}

            </div>
          </div>
        </section>

      {/* Project Philosophy */}
      <section className="px-4 py-16 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
              Design Philosophy
            </h2>
      
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
              Sapiente.AI is grounded in the belief that artificial intelligence should not be treated as a feature layer, but as a new architectural paradigm.
            </p>
            <p>
              It operates as a structured experimentation environment where AI-native systems, governance frameworks, and scalable data platforms are designed, tested, and refined beyond the constraints of client-driven projects.
            </p>
            <p>
              Each initiative explores how AI can be embedded into data ecosystems, governance models, and automation pipelines to enhance scalability, reliability, and strategic decision-making.
            </p>
            <p>
              The goal is not experimentation for novelty, but disciplined innovation—bridging enterprise data rigor with AI-native thinking.
            </p>
            </div>
          </motion.div>
        </div>
      </section>
        
      {/* Project Focus Areas */}
      <section className="px-4 mb-20">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
              Project Focus Areas
            </h2>
      
            <div className="grid md:grid-cols-2 gap-8">
              {projectCategories.map((category, idx) => {
                const Icon = category.icon;
                const layers = ["layer-yellow", "layer-blue", "layer-green", "layer-purple"];
      
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.05 }}
                    className={`glass rounded-xl p-6 ${
                      layers[idx % 4]
                    }`}
                  >
                    <Icon className="w-8 h-8 mb-4 text-primary" />
                    <h3 className="text-lg font-bold mb-3">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* SEO invisível */}
      <section className="px-4 mb-24">
        <div className="container max-w-4xl mx-auto">
          <div className="sr-only">
            <h2>Artificial Intelligence Architecture Research</h2>
            <p>
              This research lab explores modern AI architectures including AI-native
              data platforms, automation pipelines, enterprise data governance
              integrated with machine learning systems and large language models.
            </p>
          </div>
        </div>
      </section>

    {/* CTA Section */}
    <section className="px-4 py-16 bg-gradient-to-r from-primary/5 to-transparent">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass layer-blue rounded-2xl p-12 text-center glow-primary-sm"
        >
          <div className="flex justify-center mb-6">
            <img
              src="/banner_SapienteAI.png"
              alt="SapienteAI Banner"
              className="h-48 w-auto opacity-90"
            />
          </div>
    
          <h3 className="text-2xl font-bold mb-4">
            Explore Sapiente.AI
          </h3>
    
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            A structured AI experimentation lab focused on scalable architectures, governed automation systems and intelligent digital infrastructure.
          </p>
    
          <a
            href="https://sapienteai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-primary-sm"
          >
            Visit Sapiente.AI website
          </a>
        </motion.div>
      </div>
      </section>
      
              </main>
      
              <Footer />
            </div>
          );
      };
      
      export default SideProjects;
