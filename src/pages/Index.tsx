import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExpertiseSection = lazy(() => import("@/components/ExpertiseSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const WhatDrivesMe = lazy(() => import("@/components/WhatDrivesMe"));
const AboutMyCareer = lazy(() => import("@/components/AboutMyCareer"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

interface IndexProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

const SectionLoader = () => (
  <div className="py-20 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = ({ theme = "dark", onToggleTheme }: IndexProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Rodrigo Póvoa",
            url: "https://www.rpovoadata.tech",
            image: "https://www.rpovoadata.tech/ai-portrait.jpeg",
            jobTitle: "Technical Data Leader & Data Analytics Engineer",
            description:
              "Technical Data Leader specializing in enterprise data architecture, governance frameworks and scalable analytics platforms.",
            contactPoint: {
				"@type": "ContactPoint",
				contactType: "professional",
				email: "contato@rpovoadata.tech",
				availableLanguage: ["English", "Portuguese"]
				},
			  address: {
              "@type": "PostalAddress",
              addressLocality: "Aveiro",
              addressCountry: "Portugal",
            },
            sameAs: [
              "https://www.linkedin.com/in/rodrigocspovoa",
              "https://github.com/rodcapella",
            ],
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Federal Fluminense University",
            },
            worksFor: {
              "@type": "Organization",
              name: "Tips4y",
            },
            knowsAbout: [
              "Enterprise Data Architecture",
              "Data Governance",
              "Azure Databricks",
              "Delta Lake",
              "Data Engineering",
              "Power BI",
              "PySpark",
              "Distributed Data Systems",
              "Analytics Strategy",
            ],
            hasOccupation: {
              "@type": "Occupation",
              name: "Technical Data Leader",
              occupationLocation: {
                "@type": "Country",
                name: "Portugal",
              },
            },
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who is Rodrigo Póvoa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rodrigo Póvoa is a Technical Data Leader and Data Analytics Engineer with more than 15 years of experience designing enterprise data platforms, lakehouse architectures and scalable analytics systems.",
                },
              },
              {
                "@type": "Question",
                name: "What technologies does Rodrigo Póvoa specialize in?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rodrigo specializes in Azure Databricks, Delta Lake, PySpark, SQL, Power BI, data governance frameworks and modern lakehouse architectures.",
                },
              },
              {
                "@type": "Question",
                name: "What is Rodrigo Póvoa's experience in data engineering?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rodrigo has more than 15 years of experience building data platforms, engineering pipelines and analytics solutions across industries including finance, retail, automotive intelligence and digital media.",
                },
              },
              {
                "@type": "Question",
                name: "Where does Rodrigo Póvoa work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Rodrigo currently works as a Senior Data Engineer at Tips4y in Portugal and leads research AI initiatives through Sapiente.AI.",
                },
              },
            ],
          })}
        </script>

        <title>
          Rodrigo Póvoa | Technical Data Leader & Data Analytics Engineer
        </title>

        <meta
          name="description"
          content="Rodrigo Póvoa is a Tech Leader and Data Analytics Engineer with 15+ years of experience designing scalable data platforms, AI-native systems and leading cross-functional teams across Europe."
        />

        <meta
          name="keywords"
          content="Data Architect Portugal, Data Analytics Engineer Europe, Data Engineering Leader, Data Analyst Leader, Intelligent Automation, Data Governance, Sapiente.AI, SapienteAI, Sapiente, Data Platform"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://www.rpovoadata.tech/" />

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
        <meta property="og:url" content="https://www.rpovoadata.tech/" />
        <meta
          property="og:image"
          content="https://www.rpovoadata.tech/ai-portrait.jpeg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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

        <meta name="author" content="Rodrigo Póvoa" />
        <meta name="creator" content="Rodrigo Póvoa" />
      </Helmet>

      <BreadcrumbSchema
        items={[{ name: "Home", url: "https://www.rpovoadata.tech/" }]}
      />

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main id="main-content">
        <HeroSection
          onOpenChat={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        <Suspense fallback={<SectionLoader />}>
          <PageSection>
            <AboutSection />
          </PageSection>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PageSection>
            <ExpertiseSection />
          </PageSection>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PageSection>
            <ProjectsSection />
          </PageSection>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PageSection>
            <WhatDrivesMe />
          </PageSection>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PageSection>
            <AboutMyCareer />
          </PageSection>
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PageSection>
            <AboutMyCareer />
          </PageSection>
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