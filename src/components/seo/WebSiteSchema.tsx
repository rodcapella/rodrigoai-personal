import { Helmet } from "react-helmet-async";

export const WebSiteSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Rodrigo Póvoa",
        url: "https://rodrigopovoa.com",
        description:
          "Personal website of Rodrigo Póvoa, Data Analytics Engineer & Team Leader specialized in AI-native data systems.",
        inLanguage: "en",
        author: {
          "@type": "Person",
          name: "Rodrigo Póvoa"
        }
      })}
    </script>
  </Helmet>
);
