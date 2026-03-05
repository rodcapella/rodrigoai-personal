import { motion } from "framer-motion";
import { Zap, Target, TrendingUp, Code, Database, BarChart3, Cloud, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SideProjectsProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const SideProjects = ({ theme = 'dark', onToggleTheme }: SideProjectsProps) => {
  const projects = [
    {
      name: "Enterprise Lakehouse Modernization",
      context: "Automotive Intelligence sector",
      description: "Designed and documented a scalable Bronze, Silver and Gold data lakehouse using Azure Databricks and Delta Lake aligned with DataOps and Data Mesh principles.",
      impact: "Improved reporting reliability, governance maturity and analytical efficiency across multi-domain environments.",
      stack: ["Azure", "Databricks", "Delta Lake", "PySpark", "Power BI"],
      icon: Cloud,
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      name: "Regulated Financial Analytics Automation",
      context: "Financial institution environment",
      description: "Automated risk and performance dashboards ensuring compliance and regulatory-grade data accuracy.",
      impact: "Enhanced transparency and reporting efficiency within regulated financial frameworks.",
      stack: ["Python", "Power BI", "SQL"],
      icon: Lock,
      color: "from-purple-500/20 to-purple-500/5"
    },
    {
      name: "Retail Data Platform Optimization",
      context: "Large-scale retail environment",
      description: "Built distributed ETL pipelines in Azure Databricks enabling near real-time analytics across hundreds of stores.",
      impact: "Enabled data-driven daily decision-making for large retail operations.",
      stack: ["Azure", "Databricks", "PySpark", "SQL"],
      icon: TrendingUp,
      color: "from-green-500/20 to-green-500/5"
    }
  ];

  const projectCategories = [
    {
      icon: Database,
      title: "Data Architecture",
      description: "Designing scalable, governance-first lakehouse architectures using Bronze, Silver and Gold layers aligned with DataOps principles."
    },
    {
      icon: BarChart3,
      title: "Analytics & BI",
      description: "Building comprehensive analytics solutions and dashboards that drive data-driven decision-making across organizations."
    },
    {
      icon: Zap,
      title: "ETL & Pipelines",
      description: "Developing robust data pipelines and orchestration workflows that ensure data quality and reliability at scale."
    },
    {
      icon: Code,
      title: "Engineering Excellence",
      description: "Establishing engineering best practices, standards and processes that enable scalable team delivery."
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
                Beyond professional engagements, I'm building SapienteAI - a studio dedicated to applied artificial intelligence, data engineering, and innovative analytics solutions. This is where I explore cutting-edge technologies and develop products that solve real-world challenges.
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

        {/* Featured Projects */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
              
              <div className="space-y-8">
                {projects.map((project, idx) => {
                  const Icon = project.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                      className={`bg-gradient-to-br ${project.color} p-8 rounded-lg border border-primary/20 hover:border-primary/40 transition-all`}
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <Icon className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-1">{project.name}</h3>
                          <p className="text-sm text-primary font-semibold">{project.context}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="mb-6 p-4 bg-background/50 rounded-lg border border-primary/10">
                        <h4 className="text-sm font-bold mb-2 text-foreground">Impact</h4>
                        <p className="text-sm text-muted-foreground">
                          {project.impact}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-bold mb-3 text-foreground">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Philosophy */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8">Project Philosophy</h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Every project represents a deliberate approach to solving complex data challenges. The focus is not just on technical implementation, but on understanding the business context, defining clear success metrics, and ensuring that solutions are scalable, maintainable, and aligned with organizational goals.
                </p>
                
                <p>
                  Key principles guiding project execution include governance-first architecture design, data quality as a foundational concern, cross-functional collaboration, and continuous learning from implementation experiences. The goal is to deliver solutions that not only solve immediate problems but also establish patterns and practices that benefit the entire organization.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Achievements */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-12">Key Achievements</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    metric: "400+",
                    description: "Retail stores supported with real-time analytics"
                  },
                  {
                    metric: "99.9%",
                    description: "Data reliability and governance compliance"
                  },
                  {
                    metric: "5x",
                    description: "Improvement in reporting efficiency"
                  },
                  {
                    metric: "100%",
                    description: "Regulatory compliance in financial environments"
                  }
                ].map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 + idx * 0.05 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20 text-center"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">
                      {achievement.metric}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-primary/20 to-primary/5 p-12 rounded-lg border border-primary/20 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Explore SapienteAI Studio</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                SapienteAI is my innovation studio where I develop AI-powered solutions, data platforms, and analytics tools. Discover what we're building and how we can transform your data challenges into competitive advantages.
              </p>
              <a
                href="https://sapiente-ai.vercel.app"
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
