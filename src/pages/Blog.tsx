import { ArrowRight, BookOpen, CalendarDays, Clock3 } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-PT", {
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
        description="Artigos e reflexões de Rodrigo Póvoa sobre dados, inteligência artificial, liderança técnica e transformação digital."
        keywords="Rodrigo Póvoa, blog de dados, inteligência artificial, data engineering, data quality, liderança técnica"
        language="pt-PT"
      />

      <PageSection variant="gradient" className="pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <BookOpen className="h-4 w-4" />
            Ideias, experiências e publicações
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Blog
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Reflexões pessoais e artigos publicados noutras plataformas sobre
            dados, IA, tecnologia e liderança.
          </p>
        </motion.div>
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
                    Ler artigo
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
