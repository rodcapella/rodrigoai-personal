import { LazyMotion, domAnimation } from "framer-motion"
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Helmet } from "react-helmet-async"
import PageHero from "@/components/layout/PageHero"
import Section from "@/components/layout/Section"

import { lazy } from "react";

const Award = lazy(() => import("lucide-react").then(m => ({ default: m.Award })));
const Briefcase = lazy(() => import("lucide-react").then(m => ({ default: m.Briefcase })));
const Globe = lazy(() => import("lucide-react").then(m => ({ default: m.Globe })));
const GraduationCap = lazy(() => import("lucide-react").then(m => ({ default: m.GraduationCap })));
const Cpu = lazy(() => import("lucide-react").then(m => ({ default: m.Cpu })));
const Layers = lazy(() => import("lucide-react").then(m => ({ default: m.Layers })));

import ProfessionalIntro from "@/components/layout/professional/ProfessionalIntro"
import CoreCompetencesSection from "@/components/layout/professional/CoreCompetencesSection"
import TechStackSection from "@/components/layout/professional/TechStackSection"
import ExperienceTimeline from "@/components/layout/professional/ExperienceTimeline"
import EducationSection from "@/components/layout/professional/EducationSection"
import CertificationsSection from "@/components/layout/professional/CertificationsSection"
import LanguagesSection from "@/components/layout/professional/LanguagesSection"

interface ProfessionalProps {
  theme?: "dark" | "light"
  onToggleTheme?: () => void
}

const maxYears = 20

const Professional = ({ theme = "dark", onToggleTheme }: ProfessionalProps) => {

  return (
    <div className="min-h-screen bg-background">

      <Helmet>
        <title>Professional Experience | Rodrigo Póvoa</title>
        <meta
          name="description"
          content="15+ years experience in data engineering, analytics platforms and architecture."
        />
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.rpovoadata.tech/" },
          { name: "Professional", url: "https://www.rpovoadata.tech/professional" }
        ]}
      />

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <LazyMotion features={domAnimation}>
        <main>

          <PageHero
            title="Professional Journey"
            subtitle="Explore my professional experience and the impact delivered across multiple organizations."
            image="/ai-portrait.jpeg"
          />

          <Section>
            <ProfessionalIntro summaryPoints={summaryPoints} />
          </Section>

          <Section>
            <CoreCompetencesSection competences={coreCompetences} />
          </Section>

          <Section>
            <TechStackSection techStack={techStack} maxYears={maxYears} />
          </Section>

          <Section>
            <ExperienceTimeline experiences={experiences} />
          </Section>

          <Section>
            <EducationSection education={education} />
          </Section>

          <Section>
            <CertificationsSection certifications={certifications} />
          </Section>

          <Section>
            <LanguagesSection languages={languages} />
          </Section>

        </main>
      </LazyMotion>

      <Footer />

    </div>
  )
}

export default Professional