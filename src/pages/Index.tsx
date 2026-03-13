import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

import Section from "@/components/layout/Section";

import { lazy, Suspense } from "react";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExpertiseSection = lazy(() => import("@/components/ExpertiseSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const WhatDrivesMe = lazy(() => import("@/components/WhatDrivesMe"));
const AboutMyCareer = lazy(() => import("@/components/AboutMyCareer"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

import Footer from "@/components/Footer";

interface IndexProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const SectionLoader = () => (
  <div className="py-20 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"/>
  </div>
);

const Index = ({ theme = 'dark', onToggleTheme }: IndexProps) => {

  return (
    <div className="min-h-screen bg-background">

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Rodrigo Póvoa",
            "url": "https://www.rpovoadata.tech",
            "image": "https://www.rpovoadata.tech/og-image.png",
            "jobTitle": "Technical Data Leader & Data Analytics Engineer",
            "description": "Technical Data Leader specializing in enterprise data architecture, governance frameworks and scalable analytics platforms.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Aveiro",
              "addressCountry": "Portugal"
            },
            "sameAs": [
              "https://www.linkedin.com/in/rodrigocspovoa",
              "https://github.com/rodcapella"
            ],
            "knowsAbout": [
              "Enterprise Data Architecture",
              "Data Governance",
              "Azure",
              "Databricks",
              "Delta Lake",
              "Power BI",
              "Distributed Data Systems",
              "Analytics Strategy",
              "SQL",
              "PL/SQL",
              "PySpark",
              "Python",
              "T-SQL"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Tips4y and Sapiente.AI"
            },
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Technical Data Leader",
              "occupationLocation": {
                "@type": "Country",
                "name": "Portugal"
              },
              "skills": "Data Architecture, Lakehouse Design, Azure Data Engineering, Governance Frameworks, BI Strategy"
            }
          })}
        </script>

        <title>
          Rodrigo Póvoa | Technical Data Leader & Data Analytics Engineer
        </title>

        <meta
          name="description"
          content="Rodrigo Póvoa is an Tech Leader and Data Analytics Engineer with 15+ years of experience designing scalable data platforms, AI-native systems and leading cross-functional teams across Europe."
        />

        <meta
          name="keywords"
          content="Data Architect Portugal, Data Analytics Engineer Europe, Data Engineering Leader, Data Analyst Leader, Intelligent Automation, Data Governance, Sapiente.AI, SapienteAI, Sapiente, Data Platform"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://www.rpovoadata.tech/"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Rodrigo Póvoa | Data Analytics Engineer & Team Leader."
        />
        <meta
          property="og:description"
          content="Building intelligent systems, scalable data architectures and platforms aligned with governance and business impact."
        />
        <meta
          property="og:url"
          content="https://www.rpovoadata.tech/"
        />
        <meta
          property="og:image"
          content="https://www.rpovoadata.tech/ai-portrait.jpeg"
        />
        <meta property="og:site_name" content="Rodrigo Póvoa" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Rodrigo Póvoa | Data Analytics Engineer & Team Leader."
        />
        <meta
          name="twitter:description"
          content="AI-native systems, scalable data platforms and intelligent automation."
        />
        <meta
          name="twitter:image"
          content="https://www.rpovoadata.tech/ai-portrait.jpeg"
        />

      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.rpovoadata.tech/" }
        ]}
      />

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main id="main-content">

        <HeroSection />

        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ExpertiseSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <WhatDrivesMe />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AboutMyCareer />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>

      </main>

      <Footer />

    </div>
  );
};

export default Index;