import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${items.at(-1)?.url}#breadcrumb`,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          ...(index < items.length - 1 ? { item: item.url } : {}),
        })),
      })}
    </script>
  </Helmet>
);
