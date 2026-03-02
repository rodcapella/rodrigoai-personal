import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SideProjects = () => {
  const projects = [
    {
      title: "DataFlow Analytics",
      description: "An open-source framework for building real-time data pipelines with minimal configuration. Supports multiple data sources and sinks.",
      tags: ["Python", "Apache Spark", "Real-time"],
      github: "https://github.com/rodcapella",
      status: "Active"
    },
    {
      title: "ML Model Registry",
      description: "A centralized platform for managing, versioning, and deploying machine learning models. Includes experiment tracking and model governance.",
      tags: ["Python", "FastAPI", "MLOps"],
      github: "https://github.com/rodcapella",
      status: "Active"
    },
    {
      title: "Azure Data Lakehouse",
      description: "Reference architecture for building medallion-pattern data lakehouses on Azure Databricks with governance and quality frameworks.",
      tags: ["Azure", "Databricks", "Delta Lake"],
      github: "https://github.com/rodcapella",
      status: "Active"
    },
    {
      title: "Power BI Semantic Models",
      description: "Collection of reusable semantic models and DAX patterns for enterprise analytics. Includes best practices documentation.",
      tags: ["Power BI", "DAX", "Analytics"],
      github: "https://github.com/rodcapella",
      status: "Active"
    },
    {
      title: "ETL Orchestration Tool",
      description: "A lightweight orchestration tool for managing complex ETL workflows. Includes scheduling, monitoring, and error handling.",
      tags: ["Python", "Airflow", "Docker"],
      github: "https://github.com/rodcapella",
      status: "Maintenance"
    },
    {
      title: "Data Quality Framework",
      description: "Comprehensive framework for implementing data quality checks, validation rules, and data governance standards.",
      tags: ["Python", "SQL", "Governance"],
      github: "https://github.com/rodcapella",
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section id="side-projects" className="pt-32 pb-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Side Projects
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Beyond my professional work, I'm passionate about building tools and solutions that solve real problems in data engineering and analytics. 
              Here are some of my side projects and open-source contributions.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                      project.status === 'Active' 
                        ? 'bg-green-500/20 text-green-600' 
                        : 'bg-yellow-500/20 text-yellow-600'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">View Code</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contribution Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-xl border border-primary/20"
            >
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <p className="text-muted-foreground">Years of Experience</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <p className="text-muted-foreground">Projects Delivered</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <p className="text-muted-foreground">Professionals Mentored</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SideProjects;
