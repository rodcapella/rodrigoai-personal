import { Helmet } from "react-helmet-async";
import { personSchemaData } from "@/data/personSchema";
import { siteBaseUrl } from "@/data/siteMetadata";

interface ProfilePageSchemaProps {
  path: "/professional" | "/why-me";
  name: string;
  description: string;
  dateModified: string;
}

export function ProfilePageSchema({
  path,
  name,
  description,
  dateModified,
}: ProfilePageSchemaProps) {
  const url = `${siteBaseUrl}${path}`;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${url}#profile-page`,
          url,
          name,
          description,
          inLanguage: "en",
          dateModified,
          mainEntity: personSchemaData,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${siteBaseUrl}/#website`,
            name: "Rodrigo Póvoa",
            url: siteBaseUrl,
          },
        })}
      </script>
    </Helmet>
  );
}
