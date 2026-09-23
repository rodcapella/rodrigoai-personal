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
          name: "Sapiente.AI",
          url: "https://www.sapienteai.com/en",
          sameAs: ["https://x.com/SapienteAI"],
          founder: {
            "@id": `${siteBaseUrl}/#person`,
          },
        },
      })}
    </script>
  </Helmet>
);
