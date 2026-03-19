import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

export default function SEO({ title, description, image }: SEOProps) {
  const location = useLocation();
  const baseUrl = "https://www.rpovoadata.tech";

  const currentUrl = baseUrl + location.pathname;
  const ogImage = image || `${baseUrl}/ai-portrait.webp`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}