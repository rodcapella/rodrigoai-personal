import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";

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

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <SEO
        title="Blog | Rodrigo Póvoa"
        description="Articles and reflections by Rodrigo Póvoa on data, artificial intelligence, technical leadership and digital transformation."
        keywords="Rodrigo Póvoa, data blog, artificial intelligence, data engineering, data quality, technical leadership"
        language="en-GB"
      />

      <PageSection variant="gradient" className="pt-32 pb-16">
        <PageHero
          variant="page"
          title="BLOG"
          subtitle="Ideas, experiences and publications on data, AI, technology and leadership."
          description="Personal reflections and articles originally published here or on other platforms."
          image="/rodrigo_blog_image.webp"
        />
      </PageSection>

      <PageSection>
        <div className="grid gap-8 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-primary/15 bg-card/70 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-primary/10"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/15 to-secondary/10">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 sm:p-8">
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
                  <h2 className="text-2xl font-semibold leading-tight transition-colors group-hover:text-primary">
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
        </div>
      </PageSection>
    </MainLayout>
  );
}
