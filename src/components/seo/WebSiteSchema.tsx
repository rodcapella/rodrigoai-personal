import { Helmet } from "react-helmet-async";
import { siteBaseUrl } from "@/data/siteMetadata";

export const WebSiteSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteBaseUrl}/#website`,
        name: "Rodrigo Póvoa | End-to-End Data Leader & Data Analytics Engineer",
        url: siteBaseUrl,
        description:
          "Professional website of Rodrigo Póvoa, End-to-End Data Leader & Data Analytics Engineer.",
        inLanguage: "en-GB",
        author: {
          "@id": `${siteBaseUrl}/#person`,
        },
        creator: {
          "@type": "Organization",
          "@id": "https://www.sapienteai.com/#organization",
          name: "Sapiente AI",
          url: "https://www.sapienteai.com/en",
          logo: {
            "@type": "ImageObject",
            "@id": `${siteBaseUrl}/#sapiente-logo`,
            url: `${siteBaseUrl}/logos/logo_sapiente_transparente.webp`,
            contentUrl: `${siteBaseUrl}/logos/logo_sapiente_transparente.webp`,
            width: 400,
            height: 400,
          },
          sameAs: ["https://x.com/SapienteAI"],
          founder: {
            "@id": `${siteBaseUrl}/#person`,
          },
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://www.sapienteai.com/#organization",
          name: "Sapiente AI",
          url: "https://www.sapienteai.com/en",
        },
        image: {
          "@type": "ImageObject",
          "@id": `${siteBaseUrl}/#primary-social-image`,
          url: `${siteBaseUrl}/social/rodrigo-povoa-og-1200x675.webp`,
          contentUrl: `${siteBaseUrl}/social/rodrigo-povoa-og-1200x675.webp`,
          width: 1200,
          height: 675,
        },
        hasPart: [
          {
            "@type": "AboutPage",
            "@id": `${siteBaseUrl}/about#about-page`,
            url: `${siteBaseUrl}/about`,
            name: "About Rodrigo Póvoa",
          },
          {
            "@type": "ProfilePage",
            "@id": `${siteBaseUrl}/professional#profile-page`,
            url: `${siteBaseUrl}/professional`,
            name: "Professional Experience",
          },
          {
            "@type": "CollectionPage",
            "@id": `${siteBaseUrl}/side-projects#side-projects`,
            url: `${siteBaseUrl}/side-projects`,
            name: "Innovation Hub and Side Projects",
          },
          {
            "@type": "Blog",
            "@id": `${siteBaseUrl}/blog#blog`,
            url: `${siteBaseUrl}/blog`,
            name: "Data, Analytics and AI Articles",
          },
          {
            "@type": "ContactPage",
            "@id": `${siteBaseUrl}/contact#contact-page`,
            url: `${siteBaseUrl}/contact`,
            name: "Contact Rodrigo Póvoa",
          },
        ],
      })}
    </script>
  </Helmet>
);
