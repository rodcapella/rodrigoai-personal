import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/layout/PageHero";
import { Helmet } from "react-helmet-async";
import { Zap, Database, Cpu, TrendingUp, Sparkles, MessageSquare } from "@/lib/icons";
import SectionTitle from "@/components/layout/SectionTitle";
import Container from "@/components/layout/Container";

interface SideProjectsProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

const SideProjects = ({ theme = "dark", onToggleTheme }: SideProjectsProps) => {
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
      icon: Sparkles,
      title: "AI Digital Presence",
      description:
        "Exploring AI-powered identities, virtual avatars and intelligent interfaces for scalable digital engagement."
    },
    {
      icon: TrendingUp,
      title: "AI-Driven Digital Strategy",
      description:
        "Applying AI to SEO, content systems and digital positioning strategies."
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
    },
    {
      icon: Sparkles,
      title: "AI Digital Presence",
      description:
        "Exploring AI-powered identities, virtual avatars and intelligent interfaces for digital engagement."
    },
    {
      icon: MessageSquare,
      title: "Intelligent Brand Interfaces",
      description:
        "Designing AI-driven interfaces and virtual personas that enable scalable and authentic audience engagement."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Rodrigo Póvoa – Sapiente.AI Innovation Studio</title>

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

        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Projects | Sapiente.AI Innovation Studio" />
        <meta
          property="og:description"
          content="Exploring AI-native architectures, automation systems and AI-augmented data platforms."
        />
        <meta property="og:url" content="https://www.rpovoadata.tech/side-projects" />
        <meta property="og:image" content="https://www.rpovoadata.tech/logo_sapienteai.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sapiente.AI – AI Innovation Projects" />
        <meta
          name="twitter:description"
          content="AI-native architectures, automation frameworks and intelligent digital systems."
        />
        <meta name="twitter:image" content="https://www.rpovoadata.tech/logo_sapienteai.png" />

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
              "Independent AI experimentation studio exploring AI-native architectures, automation systems and intelligent data platforms."
          })}
        </script>
      </Helmet>

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-36 pb-24">

        {/* HERO */}
        <PageHero
          variant="page"
          title="SIDE PROJECTS"
          subtitle="Explorations in Data Engineering, AI and Technical Research"
          image="/logo_sapienteai.png"
        />

        {/* SapienteAI */}
        <section className="py-20">
          <Container>

            <SectionTitle icon={<Cpu className="w-6 h-6" />}>
              Sapiente.AI: The Next Generation
            </SectionTitle>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 mb-12"
            >
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Sapiente.AI was born from a simple realization after 15 years building data systems: the next generation of platforms must be AI-native from the start.
                <br /><br />
                This is where I explore my vision of future: combining data engineering experience with AI to design smarter, more adaptive data platforms.
                <br /><br />
                Rather than treating AI as just another feature, Sapiente.AI looks at it as a new architectural foundation for how data systems should be built.
                <br /><br />
                It’s a space to experiment, prototype and refine ideas about AI-native data ecosystems, governance, and automation.
                <br /><br />
                The goal is simple: bridge enterprise-grade data engineering with the possibilities of AI-driven systems.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
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

          </Container>
        </section>

        {/* Project Focus */}
        <section className="py-20">
          <Container>

            <SectionTitle icon={<Zap className="w-6 h-6" />}>
              Project Focus Areas
            </SectionTitle>

            <div className="grid md:grid-cols-3 gap-8">

              {projectCategories.map((category, idx) => {

                const Icon = category.icon;
                const layers = ["layer-yellow", "layer-blue", "layer-green", "layer-purple"];

                return (
                  <motion.div
                    key={idx}
                    className={`glass ${layers[idx % 4]} rounded-xl p-6 hover:-translate-y-1 transition-all`}
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

          </Container>
        </section>

        {/* SEO */}
        <section className="py-20">
          <Container>
            <div className="sr-only">
              <h2>Artificial Intelligence Architecture Research</h2>
              <p>
                This research lab explores modern AI architectures including AI-native
                data platforms, automation pipelines and enterprise data governance
                integrated with machine learning systems and large language models.
              </p>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent">
          <Container>

            <motion.div
              className="glass layer-blue rounded-2xl p-12 text-center glow-primary-sm"
            >

              <div className="flex justify-center mb-6">
                <img
                  src="/banner_SapienteAI.png"
                  alt="SapienteAI Banner"
                  className="h-48 w-auto opacity-90"
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">
                Explore Sapiente.AI
              </h3>

              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                A structured AI experimentation lab focused on scalable architectures,
                governed automation systems and intelligent digital infrastructure.
              </p>

              <a
                href="https://sapienteai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                Visit Sapiente.AI website
              </a>

            </motion.div>

          </Container>
        </section>

      </main>

      <Footer />

    </div>
  );
};

export default SideProjects;