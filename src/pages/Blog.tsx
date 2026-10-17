import { ArrowRight, CalendarDays, Clock3 } from "@/lib/icons";
import { Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { blogPosts } from "@/data/blogPosts";
import { staticPageMetadata } from "@/data/siteMetadata";
import ContentCarousel from "@/components/ui/ContentCarousel";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function Blog() {
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();
  const baseUrl = "https://www.rpovoadata.tech";
  const blogLastModified = staticPageMetadata["/blog"].lastModified;
  const blogAuthor = {
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Rodrigo Póvoa",
    url: `${baseUrl}/about`,
    image: `${baseUrl}/profile-640.webp`,
    jobTitle: "End-to-End Data Leader & Data Analytics Engineer",
    sameAs: [
      "https://www.linkedin.com/in/rodrigocspovoa",
      "https://github.com/rodcapella",
    ],
  };
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog#blog`,
    url: `${baseUrl}/blog`,
    name: "Rodrigo Póvoa Blog",
    description:
      "Articles and reflections on data, artificial intelligence, technical leadership and digital transformation.",
    inLanguage: "en-GB",
    dateModified: blogLastModified,
    author: blogAuthor,
    editor: blogAuthor,
    accountablePerson: blogAuthor,
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Rodrigo Póvoa",
      url: `${baseUrl}/about`,
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${baseUrl}/blog/${post.slug}#article`,
      url: `${baseUrl}/blog/${post.slug}`,
      headline: post.title,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      inLanguage: post.language,
      image: `${baseUrl}${post.socialImage || post.image}`,
      author: blogAuthor,
      publisher:
        post.source?.name === "IA Hoje"
          ? {
              "@type": "Organization",
              "@id": "https://inteligenciaartificialhoje.pt/#organization",
              name: "IA Hoje",
              url: "https://inteligenciaartificialhoje.pt/",
            }
          : { "@id": `${baseUrl}/#person` },
    })),
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/blog#article-list`,
    name: "Rodrigo Póvoa articles on Data Engineering, AI Governance and Analytics",
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: `${baseUrl}/blog/${post.slug}`,
      item: { "@id": `${baseUrl}/blog/${post.slug}#article` },
    })),
  };

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Data Engineering, AI Governance & Analytics | Rodrigo Póvoa"
        description="Articles and reflections by Rodrigo Póvoa on data, artificial intelligence, technical leadership and digital transformation."
        keywords="Rodrigo Póvoa, data blog, artificial intelligence, data engineering, data quality, technical leadership"
        language="en-GB"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/` },
          { name: "Blog", url: `${baseUrl}/blog` },
        ]}
      />

      <PageSection variant="gradient" spacing="none" className="pt-12 pb-6 md:pt-16 md:pb-8">
        <PageHero
          variant="page"
          title="BLOG"
          subtitle="Ideas, experiences and publications on data, AI, technology and leadership."
          image="/blog/rodrigo_blog_image.webp"
          imageWidth={1372}
          imageHeight={784}
          imageAlt="Rodrigo Póvoa with data and artificial intelligence publications"
        />
      </PageSection>

      <PageSection spacing="sm">
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Last updated:{" "}
          <time dateTime={blogLastModified}>{formatDate(blogLastModified)}</time>
        </p>
        <section
          aria-labelledby="blog-editorial-responsibility"
          className="mb-6 rounded-2xl border border-primary/15 bg-card/70 p-6 shadow-lg sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <img
              src="/profile-96.webp"
              alt="Rodrigo Póvoa, author of the Data, Analytics and AI blog"
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              className="h-16 w-16 rounded-full border border-primary/25 object-cover"
            />
            <div className="min-w-0">
              <h2
                id="blog-editorial-responsibility"
                className="text-xl font-semibold text-foreground"
              >
                Written and maintained by Rodrigo Póvoa
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Rodrigo Póvoa is an End-to-End Data Leader and Data Analytics
                Engineer with more than 15 years of experience across data
                engineering, architecture, analytics and technical leadership.
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Articles combine professional experience with cited official
                documentation where relevant. Original publication sources,
                references, publication dates and meaningful content updates are
                disclosed on each article page.
              </p>
              <Link
                to="/about"
                rel="author"
                className="mt-4 inline-flex font-semibold text-primary underline underline-offset-4"
              >
                About the author and professional background
              </Link>
            </div>
          </div>
        </section>
        <aside
          aria-labelledby="preferred-source-title"
          className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-primary/15 bg-card/70 p-6 text-center shadow-lg sm:p-8 lg:flex-row lg:text-left"
        >
          <div className="max-w-2xl">
            <h2
              id="preferred-source-title"
              className="text-2xl font-semibold text-foreground"
            >
              Follow this blog on Google
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Enjoy these articles? Add this website as a preferred source on
              Google to discover more of its content in Search.
            </p>
          </div>
          <a
            href="https://www.google.com/preferences/source?q=www.rpovoadata.tech"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Add rpovoadata.tech as a preferred source on Google"
            className="inline-flex shrink-0 rounded-lg transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <img
              src="/google/google-preferred-source-dark-en.png"
              alt="Add as a preferred source on Google"
              width={338}
              height={107}
              loading="lazy"
              decoding="async"
              className="preferred-source-badge preferred-source-badge-dark h-auto w-[175px] sm:w-[189px]"
            />
            <img
              src="/google/google-preferred-source-light-en.png"
              alt=""
              width={338}
              height={107}
              loading="lazy"
              decoding="async"
              aria-hidden="true"
              className="preferred-source-badge preferred-source-badge-light h-auto w-[175px] sm:w-[189px]"
            />
          </a>
        </aside>
      </PageSection>

      <PageSection>
        <ContentCarousel ariaLabel="Blog articles">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group h-full overflow-hidden rounded-2xl border border-primary/15 bg-card/70 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-primary/10"
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/15 to-secondary/10">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    width={post.imageWidth}
                    height={post.imageHeight}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="mb-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold leading-tight transition-colors group-hover:text-primary sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </ContentCarousel>
      </PageSection>
    </MainLayout>
  );
}
