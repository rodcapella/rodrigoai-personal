import { motion } from "framer-motion";
import { Zap, Code, Database, BarChart3, Cpu, TrendingUp  } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SideProjectsProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const SideProjects = ({ theme = 'dark', onToggleTheme }: SideProjectsProps) => {
  const projectCategories = [
    {
      icon: Cpu,
      title: "AI Systems Exploration",
      description:
        "Systematic experimentation with modern AI ecosystems, evaluating architectural trade-offs, performance constraints and integration patterns."
    },
    {
      icon: Database,
      title: "AI-Augmented Data Platforms",
      description:
        "Designing data architectures enhanced by artificial intelligence — improving governance, data quality, validation and decision layers."
    },
    {
      icon: Zap,
      title: "Intelligent Automation",
      description:
        "Developing automation frameworks that integrate AI capabilities into operational workflows, reducing manual effort and increasing scalability."
    },
    {
      icon: TrendingUp,
      title: "AI-Driven Digital Strategy",
      description:
        "Applying AI to marketing, SEO, GEO and digital positioning strategies to create intelligent growth systems."
    }
];

  return (
    <div className="min-h-screen bg-background">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Parallel Projects
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Parallel to corporate leadership roles, SapienteAI represents a structured exploration of artificial intelligence and advanced data systems.
              
                The core focus is to explore the full potential of modern AI ecosystems and translate that intelligence into scalable solutions across data engineering, automation, digital positioning and marketing strategy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Project Categories */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-12">Project Focus Areas</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {projectCategories.map((category, idx) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + idx * 0.05 }}
                      className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20"
                    >
                      <Icon className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-lg font-bold mb-3">{category.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Philosophy */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8">Project Philosophy</h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  SapienteAI is built on the belief that artificial intelligence should not be treated as a tool, but as an architectural layer.
                
                  Every experiment focuses on understanding how AI can enhance data governance, accelerate analytics workflows and create measurable strategic advantages across industries.
                </p>
                
                <p>
                  The objective is to bridge engineering discipline with AI-native thinking — designing systems that are sustainable, governed and prepared for long-term evolution.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-primary/20 to-primary/5 p-12 rounded-lg border border-primary/20 text-center"
            >
              
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img
                  src="/logo_sapienteai.png"
                  alt="SapienteAI Logo"
                  className="h-14 w-auto opacity-90"
                />
              </div>
        
              <h3 className="text-2xl font-bold mb-4">
                Explore SapienteAI Studio
              </h3>
        
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                SapienteAI is an innovation studio dedicated to exploring the full potential of artificial intelligence and translating that intelligence into scalable data, automation and digital growth solutions.
              </p>
        
              <a
                href="https://sapienteai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                Visit SapienteAI
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SideProjects;
