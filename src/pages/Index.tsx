import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhatDrivesMe from "@/components/WhatDrivesMe";
import AboutMyCareer from "@/components/AboutMyCareer";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

interface IndexProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const Index = ({ theme = 'dark', onToggleTheme }: IndexProps) => {

  return (
    <div className="min-h-screen bg-background">

      <Helmet>
         <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rodrigo Póvoa",
              "url": "https://rodrigopovoa.com",
              "image": "https://rodrigopovoa.com/og-image.png",
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
                "Analytics Strategy"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Tips4y and SapienteAI"
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
          Rodrigo Póvoa | AI Architect & Data Analytics Engineer
        </title>

        <meta
          name="description"
          content="Rodrigo Póvoa is an AI Architect and Data Analytics Engineer with 15+ years of experience designing scalable data platforms, AI-native systems and leading cross-functional teams across Europe."
        />

        <meta
          name="keywords"
          content="Architect Portugal, Data Analytics Engineer Europe, Data Engineering Leader, AI-native Architecture, Intelligent Automation, Data Governance Architect, SapienteAI"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://rodrigoai-personal.vercel.app/"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Rodrigo Póvoa | Data Analytics Engineer & Team Leader."
        />
        <meta
          property="og:description"
          content="Building intelligent systems, scalable data architectures and AI-native platforms aligned with governance and business impact."
        />
        <meta
          property="og:url"
          content="https://rodrigoai-personal.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://rodrigoai-personal.vercel.app/ai-portrait.jpeg"
        />
        <meta property="og:site_name" content="Rodrigo Póvoa" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Rodrigo Póvoa | AI Architect"
        />
        <meta
          name="twitter:description"
          content="AI-native systems, scalable data platforms and intelligent automation."
        />
        <meta
          name="twitter:image"
          content="https://rodrigoai-personal.vercel.app/ai-portrait.jpeg"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Rodrigo Póvoa",
            url: "https://rodrigoai-personal.vercel.app/",
            image: "https://rodrigoai-personal.vercel.app/ai-portrait.jpeg",
            jobTitle: "Data Analytics Engineer & Team Leader.",
            worksFor: {
              "@type": "Organization",
              name: "SapienteAI"
            },
            description:
              "Data Analytics Engineer & Team Leader designing AI-native and scalable data systems.",
            knowsAbout: [
              "Artificial Intelligence",
              "Data Engineering",
              "Analytics Architecture",
              "Cloud Data Platforms",
              "Delta Lake",
              "Databricks",
              "AI-native Systems",
              "Data Governance",
              "Automation"
            ],
            sameAs: [
              "https://www.linkedin.com/in/rodrigocspovoa/",
              "https://github.com/rodcapella"
            ]
          })}
        </script>
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://rodrigopovoa.com/" }
        ]}
      />
      
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main>
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <WhatDrivesMe />
        <AboutMyCareer />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
