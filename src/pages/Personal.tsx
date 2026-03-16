import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageHero from "@/components/layout/PageHero"
import { Helmet } from "react-helmet-async"
import SectionTitle from "@/components/ui/SectionTitle"

import { Suspense, lazy } from "react"

interface PersonalProps {
  theme?: "dark" | "light"
  onToggleTheme?: () => void
}

const PersonalPhilosophy = lazy(
  () => import("@/components/layout/personal/PersonalPhilosophy")
)

const LifeRelocation = lazy(
  () => import("@/components/layout/personal/LifeRelocation")
)

const HobbiesSection = lazy(
  () => import("@/components/layout/personal/HobbiesSection")
)

const SportsSection = lazy(
  () => import("@/components/layout/personal/SportsSection")
)

const ValuesSection = lazy(
  () => import("@/components/layout/personal/ValuesSection")
)

const InfluencesSection = lazy(
  () => import("@/components/layout/personal/InfluencesSection")
)

const VisionSection = lazy(
  () => import("@/components/layout/personal/VisionSection")
)

const AIExplorationSection = lazy(
  () => import("@/components/layout/personal/AIExplorationSection")
)

const SectionLoader = () => (
  <div className="py-24 flex justify-center items-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
)

const Personal = ({ theme = "dark", onToggleTheme }: PersonalProps) => {
  return (
    <div className="min-h-screen bg-background">

      <Helmet>

        <title>
          Personal | Rodrigo Póvoa – Values, Vision & AI Exploration
        </title>

        <meta
          name="description"
          content="Personal profile of Rodrigo Póvoa — exploring philosophy, leadership values, cultural influences, sports passion and AI ecosystem experimentation."
        />

        <link
          rel="canonical"
          href="https://www.rpovoadata.tech/personal"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Personal | Rodrigo Póvoa" />
        <meta
          property="og:description"
          content="Personal philosophy, cultural influences and AI ecosystem exploration."
        />
        <meta
          property="og:url"
          content="https://www.rpovoadata.tech/personal"
        />
        <meta
          property="og:image"
          content="https://www.rpovoadata.tech/rodrigo_flamengo_porto.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Personal | Rodrigo Póvoa" />
        <meta
          name="twitter:description"
          content="Personal values, relocation journey and AI ecosystem research."
        />
        <meta
          name="twitter:image"
          content="https://www.rpovoadata.tech/rodrigo_flamengo_porto.png"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "mainEntityOfPage": "https://www.rpovoadata.tech/personal",
            "image": "https://www.rpovoadata.tech/rodrigo_flamengo_porto.png",
            "nationality": "Brazilian",
            "knowsLanguage": ["Portuguese","English"],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Portugal"
            },
            name: "Rodrigo Póvoa",
            url: "https://www.rpovoadata.tech/personal",
            jobTitle: "Data Analytics Engineer & Team Leader",
            description:
              "Personal philosophy, leadership values and AI ecosystem exploration of Rodrigo Póvoa.",
            knowsAbout: [
              "Artificial Intelligence",
              "Data Engineering",
              "Leadership",
              "Music Culture",
              "AI Ecosystems",
              "Technology Innovation"
            ],
            sameAs: [
              "https://www.linkedin.com/in/rodrigocspovoa/",
              "https://github.com/rodcapella"
            ]
          })}
        </script>

      </Helmet>

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-36 pb-24">
        <PageHero
          variant="page"
          title="PERSONAL"
          subtitle="I combine analytical rigor with cultural curiosity, balancing engineering with interests in music, sports and long-term vision."
          image = "/rodrigo_flamengo_porto.png"
        />

        <Suspense fallback={<SectionLoader />}>

          <PersonalPhilosophy />

          <LifeRelocation />

          <HobbiesSection />

          <SportsSection />

          <ValuesSection />

          <InfluencesSection />

          <VisionSection />

          <AIExplorationSection />

        </Suspense>
      </div>    
      </main>

      <Footer />

    </div>
  )
}

export default Personal