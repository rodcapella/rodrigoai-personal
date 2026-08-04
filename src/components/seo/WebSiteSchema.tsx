import { Helmet } from "react-helmet-async";
import { siteBaseUrl } from "@/data/siteMetadata";

export const WebSiteSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteBaseUrl}/#website`,
        name: "Rodrigo Póvoa",
        url: siteBaseUrl,
        description:
          "Professional website of Rodrigo Póvoa, End-to-End Data Leader and Data Analytics Engineer.",
        inLanguage: "en",
        author: {
          "@id": `${siteBaseUrl}/#person`,
        },
      })}
    </script>
  </Helmet>
);
