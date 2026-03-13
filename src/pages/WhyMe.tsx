import { LazyMotion, domAnimation, m } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { lazy, Suspense } from "react"

const Layers = lazy(() => import("lucide-react").then(m => ({ default: m.Layers })))
const Zap = lazy(() => import("lucide-react").then(m => ({ default: m.Zap })))
const Users = lazy(() => import("lucide-react").then(m => ({ default: m.Users })))
const Target = lazy(() => import("lucide-react").then(m => ({ default: m.Target })))
const Brain = lazy(() => import("lucide-react").then(m => ({ default: m.Brain })))
const Lightbulb = lazy(() => import("lucide-react").then(m => ({ default: m.Lightbulb })))

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
      description: "Principles over tools. Scalability over quick wins.",
      color: "from-primary/10 to-primary/5"
    },
    {
      title: "Data Drives Decisions",
      description: "Platforms are strategic infrastructure.",
      color: "from-primary/10 to-primary/5"
    },
    {
      title: "Human-Centered AI",
      description: "Technology amplifies capability.",
      color: "from-primary/10 to-primary/5"
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
        <link rel="canonical" href="https://www.rpovoadata.tech/why-me" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Why Me? | Rodrigo Póvoa – Tech Leader & AI Entrepreneur" />
        <meta
          property="og:description"
          content="15+ years building data systems. Three levels of mastery. Sapiente.AI — AI-native data platforms."
        />
        <meta property="og:url" content="https://www.rpovoadata.tech/why-me" />
        <meta property="og:image" content="https://www.rpovoadata.tech/rodrigo_why_me.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Why Me? | Rodrigo Póvoa – Tech Leader & AI Entrepreneur" />
        <meta
          name="twitter:description"
          content="Data architecture defines organizational intelligence. Here's why that matters."
        />
        <meta name="twitter:image" content="https://www.rpovoadata.tech/rodrigo_why_me.png" />
      </Helmet>

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

      <Suspense fallback={null}>
        <LazyMotion features={domAnimation}>
          <main className="pt-36 pb-24">
          {/* HERO PADRONIZADO */}
            <section className="px-4 mb-20">
              <div className="container max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <m.div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                      Why Work With Me
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                      15+ years building data systems taught me one thing:
                      <span className="text-primary font-semibold">
                        {" "}data architecture defines organizational intelligence.
                      </span>
                    </p>
                  </m.div>
                  <div className="flex justify-center">
                    <img
                      src="/rodrigo_why_me.png"
                      alt="Why Me?"
                      className="rounded-2xl shadow-2xl border border-primary/20 w-[170px]"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Leadership Philosophy */}
            <section className="px-4 py-16 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="container max-w-4xl mx-auto">

                <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                  <Brain className="text-primary" />
                  Leadership Philosophy
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                  {leadershipPillars.map((pillar, idx) => (
                    <m.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className={`bg-gradient-to-br ${pillar.color} rounded-xl p-6 border border-primary/10 hover:border-primary/20 hover:-translate-y-1 transition-all`}
                    >
                      <h4 className="font-bold text-lg mb-2 text-foreground">
                        {pillar.title}
                      </h4>

                      <p className="text-muted-foreground">
                        {pillar.description}
                      </p>

                    </m.div>
                  ))}

                </div>

              </div>
            </section>

          {/* DIFFERENTIATORS */}
            <section className="px-4 mb-24">
              <div className="container max-w-4xl mx-auto">

                <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                  <Zap className="text-primary" />
                What sets me apart from other data leaders:
                </h2>

                <div className="space-y-6">
                  {differentiators.map((diff, idx) => {
                    const Icon = diff.icon;

                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-8 hover:-translate-y-1 transition-all"
                      >
                        <div className="flex gap-4">
                          <Icon className="text-primary w-6 h-6 mt-1" />

                          <div className="flex-1">
                            <h4 className="text-lg font-bold mb-2">{diff.title}</h4>

                            <p className="text-muted-foreground mb-3 leading-relaxed">
                              {diff.description}
                            </p>

                            <p className="text-sm text-primary font-semibold italic">
                              {diff.highlight}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* Vision */}
            <section className="px-4 mb-24">
              <div className="container max-w-4xl mx-auto">
                <m.div
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
                </m.div>
              </div>
            </section>

            {/* What This Means For You */}
            <section className="px-4 mb-24">
              <div className="container max-w-4xl mx-auto">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold mb-8">What This Means For You</h3>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10 hover:-translate-y-1 transition-all">
                      <h4 className="font-bold text-lg mb-2">If You're Building AI-Ready Data Platforms</h4>
                      <p className="text-muted-foreground">
                        I help structure architectures that scale, govern, and deliver real business impact. Not just technology, but strategic infrastructure.
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10 hover:-translate-y-1 transition-all">
                      <h4 className="font-bold text-lg mb-2">If You're Exploring AI Innovation</h4>
                      <p className="text-muted-foreground">
                        Sapiente.AI is a laboratory for next-generation data and AI systems. Applied research, experimental products, and strategic advisory.
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10 hover:-translate-y-1 transition-all">
                      <h4 className="font-bold text-lg mb-2">If You're Scaling Data Leadership</h4>
                      <p className="text-muted-foreground">
                        I've led teams, mentored engineers, and built analytics capabilities from the ground up. I understand both the technical depth and organizational complexity of scaling data.
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10 hover:-translate-y-1 transition-all">
                      <h4 className="font-bold text-lg mb-2">If Your Data Platform Feels Fragile</h4>
                      <p className="text-muted-foreground">
                        Many organizations struggle with unreliable pipelines, inconsistent metrics, and low trust in dashboards.I help redesign data architecture, governance, and modeling foundations to restore confidence in data.
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10 hover:-translate-y-1 transition-all">
                      <h4 className="font-bold text-lg mb-2">If You Want to Turn Data Into Strategic Assets</h4>
                      <p className="text-muted-foreground">
                        Data should not be an operational byproduct. I help organizations treat data as products—with ownership, quality standards, governance, and measurable business impact.
                      </p>
                    </div>                  
                    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10 hover:-translate-y-1 transition-all">
                      <h4 className="font-bold text-lg mb-2">If You're Integrating AI Into Your Organization</h4>
                      <p className="text-muted-foreground">
                        AI initiatives often fail due to weak data foundations. I help align data engineering, governance, and AI architecture so AI can move beyond prototypes into scalable production systems.
                      </p>
                    </div>       
                    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10 hover:-translate-y-1 transition-all">
                      <h4 className="font-bold text-lg mb-2">If You Value Practical Innovation</h4>
                      <p className="text-muted-foreground">
                        Many AI ideas stay theoretical. My work focuses on building real systems and prototypes, testing new architectures and approaches in practical environments before they reach enterprise scale.
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border border-primary/10 hover:-translate-y-1 transition-all">
                      <h4 className="font-bold text-lg mb-2">If You Want to Work With Someone Who Understands Both Technology and Strategy</h4>
                      <p className="text-muted-foreground">
                        My background combines hands-on engineering, architecture design, and strategic leadership, allowing me to bridge the gap between technical execution and business outcomes.
                      </p>
                    </div>

                  </div>
                </m.div>
              </div>
            </section>
          </main>
        </LazyMotion>
      </Suspense>

      <Footer />
    </div>
  );
};

export default WhyMe;
