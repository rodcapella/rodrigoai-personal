import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layers, Zap, Users, Target, Brain, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface WhyMeProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const WhyMe = ({ theme = 'dark', onToggleTheme }: WhyMeProps) => {
  const differentiators = [
    {
      icon: Layers,
      title: "Three Levels of Mastery",
      description: "Enterprise BI → Analytics Engineering → Modern Data Platforms. I connect data architecture with real business insights—building decision platforms, not just pipelines.",
      highlight: "Few leaders operate across all three layers"
    },
    {
      icon: Target,
      title: "Architecture Over Tools",
      description: "Technology changes fast, but good engineering principles last decades. I solve problems at the architectural and organizational level—where real value lives.",
      highlight: "Most data problems aren't technical; they're structural"
    },
    {
      icon: Users,
      title: "People Amplified by AI",
      description: "AI and automation enhance human capability, they don't replace it. My philosophy centers on building systems where technology multiplies team effectiveness.",
      highlight: "Productivity through intelligent infrastructure"
    }
  ];

  const sapienteAIPoints = [
    {
      icon: Brain,
      title: "The Problem We Solve",
      description: "Companies adopt AI without robust data architecture—resulting in unscalable projects, unreliable models, and prototypes that never go live. We fix this.",
      metric: "AI-native from day one"
    },
    {
      icon: Lightbulb,
      title: "Our Approach",
      description: "Data, governance, automation, and AI are designed as one integrated system. Every solution is built on deep expertise and best-in-class AI tools for maximum productivity and quality.",
      metric: "Integrated architecture"
    },
    {
      icon: Zap,
      title: "Three Revenue Streams",
      description: "Applied research in AI architectures • Experimental product development • Strategic advisory for AI-ready data platforms • Digital transformation services (automation, branding, SEO/GEO/AEO)",
      metric: "Hybrid innovation studio"
    }
  ];

  const leadershipPillars = [
    {
      title: "Engineering First",
      description: "Principles over tools. Scalability over quick wins."
    },
    {
      title: "Data Drives Decisions",
      description: "Platforms are strategic infrastructure."
    },
    {
      title: "Human-Centered AI",
      description: "Technology amplifies capability."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Why Me? | Rodrigo Póvoa</title>
        <meta
          name="description"
          content="Discover what sets Rodrigo apart: 15+ years building data systems, three levels of mastery, and Sapiente.AI — the next generation of AI-native data platforms."
        />
        <meta
          name="keywords"
          content="Data Leadership, AI Architecture, Sapiente.AI, Data Engineering, Tech Leader, AI Innovation"
        />
        <link rel="canonical" href="https://rodrigoai-personal.vercel.app/why-me" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Why Me? | Rodrigo Póvoa – Tech Leader & AI Entrepreneur" />
        <meta
          property="og:description"
          content="15+ years building data systems. Three levels of mastery. Sapiente.AI — AI-native data platforms."
        />
        <meta property="og:url" content="https://rodrigoai-personal.vercel.app/why-me" />
        <meta property="og:image" content="https://rodrigoai-personal.vercel.app/rodrigo_why_me.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Why Me? | Rodrigo Póvoa – Tech Leader & AI Entrepreneur" />
        <meta
          name="twitter:description"
          content="Data architecture defines organizational intelligence. Here's why that matters."
        />
        <meta name="twitter:image" content="https://rodrigoai-personal.vercel.app/rodrigo_why_me.png" />
      </Helmet>

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-32 pb-20">
<<<<<<< HEAD
       {/* HERO PADRONIZADO */}
        <section className="px-4 mb-24">

          <div className="container max-w-4xl mx-auto">

            <div className="grid md:grid-cols-2 gap-12 items-center">

              <motion.div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Why Work With Me
                </h1>

                <p className="text-muted-foreground leading-relaxed">
                  15+ years building data systems taught me one thing:
                  <span className="text-primary font-semibold">
                    {" "}data architecture defines organizational intelligence.
                  </span>
                </p>

              </motion.div>

              <div className="flex justify-center">

                <img
                  src="/rodrigo_why_me.png"
                  alt="Why Me?"
                  className="rounded-2xl shadow-2xl border border-primary/20 w-[170px]"
                />

              </div>

            </div>

=======
        {/* Hero Section */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Why Me?
              </h2>

              <p className="text-muted-foreground max-w-2xl">
                15+ years building data systems taught me one thing: <span className="text-primary font-semibold">data architecture defines organizational intelligence</span>. Without a solid foundation, AI doesn't solve problems—it amplifies them. SapienteAI is my answer to this challenge.
              </p>
            </motion.div>
>>>>>>> 20433c42a7a47d9fe3b857aad6b269b32e0705cc
          </div>

        </section>

        {/* Header with Image */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">          
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center items-center"
              >
                <div className="relative z-10 w-[160px] lg:w-[180px]">
                  <img
                    src="/rodrigo_contact_image.png"
                    alt="Rodrigo Póvoa – Tech Leader & AI Entrepreneur"
                    className="rounded-2xl shadow-2xl border border-primary/20"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Philosophy */}
<<<<<<< HEAD
        <section className="px-4 py-16 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="container max-w-4xl mx-auto">
=======
        <section className="px-4 mb-24">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold mb-4">My Leadership Philosophy</h3>
              <p className="text-muted-foreground mb-8">
                Three pillars guide everything I do:
              </p>
            </motion.div>
>>>>>>> 20433c42a7a47d9fe3b857aad6b269b32e0705cc

            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
              <Brain className="text-primary" />
              Leadership Philosophy
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {leadershipPillars.map((pillar, idx) => (
<<<<<<< HEAD

                <div key={idx} className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl p-6">

                  <h3 className="font-bold mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    {pillar.description}
                  </p>

                </div>

=======
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`bg-gradient-to-br ${pillar.color} rounded-xl p-6 border border-primary/10 hover:border-primary/20 transition-all`}
                >
                  <h4 className="font-bold text-lg mb-2 text-foreground">{pillar.title}</h4>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </motion.div>
>>>>>>> 20433c42a7a47d9fe3b857aad6b269b32e0705cc
              ))}

            </div>

          </div>

        </section>

<<<<<<< HEAD
       {/* DIFFERENTIATORS */}
        <section className="px-4 mb-24">
=======
        {/* Three Levels of Mastery */}
        <section className="px-4 mb-24">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold mb-4">My Differentiators</h3>
              <p className="text-muted-foreground">
                What sets me apart from other data leaders:
              </p>
            </motion.div>
>>>>>>> 20433c42a7a47d9fe3b857aad6b269b32e0705cc

          <div className="container max-w-4xl mx-auto">

            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <Zap className="text-primary" />
              Differentiators
            </h2>

            <div className="space-y-6">

              {differentiators.map((diff, idx) => {

                const Icon = diff.icon;

                return (

                  <div key={idx} className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-8">

                    <div className="flex gap-4">

                      <Icon className="text-primary w-6 h-6 mt-1" />

                      <div>

                        <h3 className="font-bold text-lg mb-2">
                          {diff.title}
                        </h3>

                        <p className="text-muted-foreground">
                          {diff.description}
                        </p>

                      </div>
<<<<<<< HEAD

=======
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-2">{diff.title}</h4>
                        <p className="text-muted-foreground mb-3 leading-relaxed">{diff.description}</p>
                        <p className="text-sm text-primary font-semibold italic">{diff.highlight}</p>
                      </div>
>>>>>>> 20433c42a7a47d9fe3b857aad6b269b32e0705cc
                    </div>

                  </div>

                );
              })}

            </div>

          </div>

        </section>

        {/* SapienteAI - The Next Chapter */}
        <section className="px-4 mb-24">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold mb-4">SapienteAI: The Next Generation</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20 mb-8"
            >
              <p className="text-lg leading-relaxed mb-6">
                My 15 years building data systems revealed a critical insight: <span className="text-primary font-semibold">the next generation of data platforms must be AI-native from inception</span>. Most companies try to bolt AI onto legacy architectures. That doesn't work.
              </p>
              <p className="text-lg leading-relaxed">
                Sapiente.AI is where I explore this frontier—combining deep data engineering expertise with AI innovation to build the platforms enterprises need to compete in the AI era.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {sapienteAIPoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-background to-primary/5 rounded-xl p-6 border border-primary/10 hover:border-primary/20 transition-all"
                  >
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h4 className="font-bold text-lg mb-3">{point.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{point.description}</p>
                    <div className="pt-4 border-t border-primary/10">
                      <p className="text-xs text-primary font-semibold uppercase tracking-wide">{point.metric}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="px-4 mb-24">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20"
            >
              <h3 className="text-2xl font-bold mb-8">My Vision</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">Architecture</p>
                  <p className="text-xl font-semibold mb-2">Data Platforms → AI-Native Systems</p>
                  <p className="text-muted-foreground">From reactive analytics to proactive intelligence</p>
                </div>
                <div>
                  <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">Governance</p>
                  <p className="text-xl font-semibold mb-2">Data as Products</p>
                  <p className="text-muted-foreground">Clear ownership, accountability, and trust</p>
                </div>
                <div>
                  <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">Impact</p>
                  <p className="text-xl font-semibold mb-2">AI Amplifies Humans</p>
                  <p className="text-muted-foreground">Technology multiplies human capability and creativity</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What This Means For You */}
        <section className="px-4 mb-24">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-8">What This Means For You</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10">
                  <h4 className="font-bold text-lg mb-2">If You're Building AI-Ready Data Platforms</h4>
                  <p className="text-muted-foreground">
                    I help structure architectures that scale, govern, and deliver real business impact. Not just technology—strategic infrastructure.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10">
                  <h4 className="font-bold text-lg mb-2">If You're Exploring AI Innovation</h4>
                  <p className="text-muted-foreground">
                    Sapiente.AI is a laboratory for next-generation data and AI systems. Applied research, experimental products, and strategic advisory—all grounded in real enterprise experience.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10">
                  <h4 className="font-bold text-lg mb-2">If You're Scaling Data Leadership</h4>
                  <p className="text-muted-foreground">
                    I've led teams, mentored engineers, and built analytics capabilities from the ground up. I understand both the technical depth and organizational complexity of scaling data.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're building AI-ready data platforms, exploring innovation, or scaling data leadership—I'm here to help.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide hover:bg-primary/90 transition-all glow-primary-sm hover:glow-primary"
              >
                Let's Talk
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyMe;
