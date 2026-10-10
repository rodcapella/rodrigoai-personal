import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  language?: string;
}

export default function SEO({ title, description, image, imageAlt, imageWidth, imageHeight, type = "website", keywords, publishedTime, modifiedTime, author, section, tags = [], language = "en-GB" }: SEOProps) {
  const location = useLocation();
  const baseUrl = "https://www.rpovoadata.tech";

  const normalizedPath = location.pathname === "/"
    ? "/"
    : location.pathname.replace(/\/+$/, "");
  const currentUrl = baseUrl + normalizedPath;
  const ogImage = image
    ? image.startsWith("http") ? image : `${baseUrl}${image}`
    : `${baseUrl}/social/rodrigo-povoa-og-1200x675.webp`;
  const resolvedImageWidth = imageWidth || (image ? undefined : 1200);
  const resolvedImageHeight = imageHeight || (image ? undefined : 675);
  const ogImageType = ogImage.toLowerCase().endsWith(".png")
    ? "image/png"
    : /\.jpe?g(?:$|\?)/i.test(ogImage)
      ? "image/jpeg"
      : "image/webp";
  const ogLocale = language.toLowerCase().startsWith("pt") ? "pt_PT" : "en_GB";
  const identityKeywords = [
    "Rodrigo Póvoa",
    "End-to-End Data Leader",
    "Data Analytics Engineer",
  ];
  const resolvedKeywords = [...identityKeywords, ...(keywords?.split(",") || [])]
    .map((keyword) => keyword.trim())
    .filter(
      (keyword, index, allKeywords) =>
        keyword &&
        allKeywords.findIndex(
          (candidate) => candidate.toLowerCase() === keyword.toLowerCase(),
        ) === index,
    )
    .join(", ");

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
        prefix: "og: https://ogp.me/ns# article: https://ogp.me/ns/article#",
        "data-developer": "Sapiente AI",
        "data-developer-url": "https://www.sapienteai.com/en",
      }}
    >
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="keywords" content={resolvedKeywords} />
      {author && <meta name="author" content={author} />}
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang={language} href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />
      <link
        rel="alternate"
        type="text/markdown"
        href={currentUrl}
        title={`${title} in Markdown`}
      />
      <link rel="author" href={`${baseUrl}/about`} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Rodrigo Póvoa" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:image:alt" content={imageAlt || title} />
      {resolvedImageWidth && <meta property="og:image:width" content={String(resolvedImageWidth)} />}
      {resolvedImageHeight && <meta property="og:image:height" content={String(resolvedImageHeight)} />}
      <meta property="og:locale" content={ogLocale} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === "article" && author && (
        <meta property="article:author" content={`${baseUrl}/about`} />
      )}
      {type === "article" && section && (
        <meta property="article:section" content={section} />
      )}
      {type === "article" &&
        tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt || title} />
    </Helmet>
  );
}
