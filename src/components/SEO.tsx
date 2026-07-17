import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  language?: string;
}

export default function SEO({ title, description, image, type = "website", keywords, publishedTime, modifiedTime, author, language }: SEOProps) {
  const location = useLocation();
  const baseUrl = "https://www.rpovoadata.tech";

  const currentUrl = baseUrl + location.pathname;
  const ogImage = image
    ? image.startsWith("http") ? image : `${baseUrl}${image}`
    : `${baseUrl}/ai-portrait.webp`;

  return (
    <Helmet htmlAttributes={language ? { lang: language } : undefined}>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="pt_PT" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
