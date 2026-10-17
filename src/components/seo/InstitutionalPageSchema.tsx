import { Helmet } from "react-helmet-async";
import { siteBaseUrl } from "@/data/siteMetadata";

interface InstitutionalPageSchemaProps {
  type: "AboutPage" | "ContactPage";
  path: "/about" | "/contact";
  name: string;
  description: string;
}

export function InstitutionalPageSchema({
  type,
  path,
  name,
  description,
}: InstitutionalPageSchemaProps) {
  const url = `${siteBaseUrl}${path}`;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type,
          "@id": `${url}#${type === "AboutPage" ? "about-page" : "contact-page"}`,
          url,
          name,
          description,
          inLanguage: "en-GB",
          mainEntity: {
            "@id": `${siteBaseUrl}/#person`,
          },
          isPartOf: {
            "@id": `${siteBaseUrl}/#website`,
          },
          breadcrumb: {
            "@id": `${url}#breadcrumb`,
          },
        })}
      </script>
    </Helmet>
  );
}
