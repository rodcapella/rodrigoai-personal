import { Helmet } from "react-helmet-async";
import { ArrowLeft, CalendarDays, Clock3, ExternalLink, Linkedin } from "@/lib/icons";
import { Link, Navigate, useOutletContext, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getBlogPost } from "@/data/blogPosts";

const baseUrl = "https://www.rpovoadata.tech";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const countWords = (values: string[]) =>
  values.join(" ").trim().split(/\s+/).filter(Boolean).length;

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  if (!post) return <Navigate to="/blog" replace />;

  const articleUrl = `${baseUrl}/blog/${post.slug}`;
  const authorId = `${baseUrl}/professional#person`;
  const imageObject = {
    "@type": "ImageObject",
    url: `${baseUrl}${post.image}`,
    ...(post.imageWidth ? { width: post.imageWidth } : {}),
    ...(post.imageHeight ? { height: post.imageHeight } : {}),
  };
  const articleText = post.sections.flatMap((section) => [
    section.heading || "",
    ...section.paragraphs,
    section.quote || "",
  ]);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    url: articleUrl,
    headline: post.title,
    description: post.excerpt,
    image: imageObject,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    inLanguage: post.language,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    wordCount: countWords(articleText),
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      "@id": authorId,
      name: "Rodrigo Póvoa",
      url: `${baseUrl}/professional`,
      sameAs: ["https://www.linkedin.com/in/rodrigocspovoa", "https://github.com/rodcapella"],
    },
    publisher: {
      "@type": "Person",
      "@id": authorId,
      name: "Rodrigo Póvoa",
      url: `${baseUrl}/professional`,
    },
    isBasedOn: post.source.url,
    sameAs: post.source.url,
    ...(post.references?.length
      ? { citation: post.references.map((reference) => reference.url) }
      : {}),
  };

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title={`${post.title} | Rodrigo Póvoa`}
        description={post.excerpt}
        image={post.image}
        imageAlt={post.imageAlt}
        type="article"
        keywords={post.keywords.join(", ")}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        author="Rodrigo Póvoa"
        language={post.language}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${baseUrl}/` },
          { name: "Blog", url: `${baseUrl}/blog` },
          { name: post.title, url: articleUrl },
        ]}
      />

      <PageSection variant="gradient" spacing="none" className="pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-semibold text-primary">{post.category}</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{formatDate(post.publishedAt)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{post.readingTime}</span>
          </div>
          <h1 className="max-w-4xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-4">
            <img src="/profile.webp" alt="Rodrigo Póvoa" className="h-12 w-12 rounded-full border border-primary/25 object-cover object-[center_34%]" />
            <div><p className="font-semibold">Rodrigo Póvoa</p><p className="text-sm text-muted-foreground">Data Analytics Engineer & Team Leader</p></div>
          </div>
        </div>
      </PageSection>

      <PageSection className="pt-10 pb-0">
        <figure className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-primary/15 bg-card/50 shadow-xl">
          <img
            src={post.image}
            alt={post.imageAlt}
            width={post.imageWidth}
            height={post.imageHeight}
            loading="eager"
            className="h-auto w-full object-cover"
          />
        </figure>
      </PageSection>

      <PageSection className="pt-14">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
          <article className="min-w-0" lang={post.language}>
            <div className="space-y-12">
              {post.sections.map((section, index) => (
                <section key={section.heading || index} className="space-y-5">
                  {section.heading && <h2 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">{section.heading}</h2>}
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-lg leading-8 text-muted-foreground">{paragraph}</p>)}
                  {section.quote && <blockquote className="rounded-r-xl border-l-4 border-primary bg-primary/5 px-6 py-5 text-lg font-medium italic leading-relaxed text-foreground">{section.quote}</blockquote>}
                </section>
              ))}
            </div>
            {post.references?.length ? (
              <div className="mt-10 rounded-2xl border border-primary/15 bg-card/50 p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold">References and further reading</h2>
                <ul className="mt-4 space-y-3">
                  {post.references.map((reference) => (
                    <li key={reference.url}>
                      <a href={reference.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                        {reference.name}<ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Original publication</p>
              <p className="mt-3 text-muted-foreground">This article was written by Rodrigo Póvoa and originally published on {post.source.name}.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={post.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Read on {post.source.name}<ExternalLink className="h-4 w-4" /></a>
                {post.source.linkedInUrl && post.source.linkedInUrl !== post.source.url && (
                  <a href={post.source.linkedInUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-primary/20 px-4 py-2 font-semibold transition-colors hover:border-primary/40 hover:text-primary">LinkedIn post<Linkedin className="h-4 w-4" /></a>
                )}
              </div>
            </div>
            <Link
              to="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-primary/20 px-4 py-2 font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-xl border border-primary/15 bg-card/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">About the author</p>
              <p className="mt-3 font-semibold">Rodrigo Póvoa</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Technical Data Leader, Data Analytics Engineer and founder of Sapiente.AI.</p>
              <Link to="/professional" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">View professional profile</Link>
            </div>
          </aside>
        </div>
      </PageSection>
    </MainLayout>
  );
}
