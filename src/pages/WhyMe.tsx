import { lazy, Suspense } from "react"
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/layout/PageHero"
import { motion } from "framer-motion"
import SectionTitle from "@/components/layout/SectionTitle"
import Container from "@/components/layout/Container"
import PageSection from "@/components/layout/PageSection"

const Layers = lazy(() => import("@/lib/icons").then(m => ({ default: m.Layers })))
const Zap = lazy(() => import("@/lib/icons").then(m => ({ default: m.Zap })))
const Users = lazy(() => import("@/lib/icons").then(m => ({ default: m.Users })))
const Target = lazy(() => import("@/lib/icons").then(m => ({ default: m.Target })))
const Brain = lazy(() => import("@/lib/icons").then(m => ({ default: m.Brain })))
const Lightbulb = lazy(() => import("@/lib/icons").then(m => ({ default: m.Lightbulb })))

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
          <main className="pt-36 pb-24">
            {/* HERO PADRONIZADO */}
              <PageHero
                variant="page"
                title="WHY WORK WITH ME"
                subtitle="15+ years building data systems taught me one thing: data architecture defines organizational intelligence."
                image="/rodrigo_why_me.png"
              />

            {/* Leadership Philosophy */}
            <PageSection
              title="Leadership Philosophy"
              icon={<Brain className="w-6 h-6" />}
              className="bg-gradient-to-br from-primary/10 to-transparent"
            >
              <PageGrid cols={3}>

                <div className="grid md:grid-cols-3 gap-8">

                  {leadershipPillars.map((pillar, idx) => (
                    <motion.div
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

                    </motion.div>
                  ))}

                </div>
            </PageSection>

          {/* DIFFERENTIATORS */}
            <section className="py-20">
              <Container>

                <SectionTitle icon={<Zap className="w-6 h-6" />}>
                  What sets me apart from other data leaders:
                </SectionTitle>

                <div className="space-y-6">
                  {differentiators.map((diff, idx) => {
                    const Icon = diff.icon;

                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl p-8 hover:-translate-y-1 transition-all"
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
              </Container>
            </section>

            {/* Vision */}
            <PageSection
                title="My Vision"
                icon={<Lightbulb className="w-6 h-6" />}
                className="bg-gradient-to-br from-primary/10 to-transparent"
            >
                    
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6 rounded-xl glass layer-blue"
                  >
                    <h3 className="text-2xl font-bold mb-2">
                      Architecture
                    </h3>

                    <p className="text-xl font-semibold mb-2">Data Platforms → AI-Native Systems</p>
                    <p className="text-muted-foreground">From reactive analytics to proactive intelligence</p>

                  <h3 className="text-2xl font-bold mb-2">
                    Architecture
                  </h3>

                  <p className="text-xl font-semibold mb-2">Data as Products</p>
                  <p className="text-xl font-semibold mb-2">Data Platforms → AI-Native Systems</p>
                  <p className="text-muted-foreground">Clear ownership, accountability, and trust</p>

                  <h3 className="text-2xl font-bold mb-2">
                    Impact
                  </h3>

                  <p className="text-xl font-semibold mb-2">AI Amplifies Humans</p>
                  <p className="text-muted-foreground">Technology multiplies human capability and creativity</p>
               </motion.div>

              </Container>
            </PageSection>

            {/* What This Means For You */}
            <PageSection
              title="What This Means For You"
              icon={<Users className="w-6 h-6" />}
            >
              <PageGrid cols={3}>
                    <div>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
                        Architecture
                      </p>
                      <p className="text-xl font-semibold mb-2">
                        AI-Ready Data Platforms
                      </p>
                      <p className="text-muted-foreground">
                        I design scalable architectures that support governance, analytics, and AI workloads from the same data foundation.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
                        Innovation
                      </p>
                      <p className="text-xl font-semibold mb-2">
                        Applied AI Exploration
                      </p>
                      <p className="text-muted-foreground">
                        Sapiente.AI serves as a laboratory for new architectures and experimental systems that anticipate the next generation of data platforms.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
                        Leadership
                      </p>
                      <p className="text-xl font-semibold mb-2">
                        Scaling Data Organizations
                      </p>
                      <p className="text-muted-foreground">
                        I build teams, define technical standards, and structure platforms that allow data organizations to grow sustainably.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
                        Data Quality
                      </p>
                      <p className="text-xl font-semibold mb-2">
                        Trustworthy Data Foundations
                      </p>
                      <p className="text-muted-foreground">
                        Reliable pipelines, consistent metrics, and strong governance frameworks restore confidence in organizational data.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
                        Strategy
                      </p>
                      <p className="text-xl font-semibold mb-2">
                        Data as Strategic Assets
                      </p>
                      <p className="text-muted-foreground">
                        I help organizations move from operational reporting to treating data as products with ownership, quality standards, and measurable impact.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
                        AI Integration
                      </p>
                      <p className="text-xl font-semibold mb-2">
                        AI in Production
                      </p>
                      <p className="text-muted-foreground">
                        Aligning data engineering, governance, and platform architecture so AI initiatives can move beyond prototypes into production systems.
                      </p>
                    </div>
            </PageSection>      
          </main>
      </Suspense>
      <Footer />
    </div>
  );
};

export default WhyMe;
