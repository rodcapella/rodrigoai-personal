import { motion } from "framer-motion";
import { Briefcase, Award, TrendingUp, Users, Code, Database, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Professional = () => {
  const coreCompetencies = [
    {
      icon: Users,
      title: "Team Leadership",
      description: "Agile delivery and cross-functional collaboration with proven track record of building and leading high-performing teams."
    },
    {
      icon: Database,
      title: "Azure & Data Platforms",
      description: "Azure Databricks, Delta Lake, Medallion Architecture, and modern cloud-native data stack environments."
    },
    {
      icon: Code,
      title: "Data Engineering",
      description: "Python & PySpark data pipelines, ELT/ETL orchestration, and scalable distributed data processing."
    },
    {
      icon: BarChart3,
      title: "Analytics & BI",
      description: "Power BI dashboard development, semantic modeling, and advanced analytics for data-driven decision making."
    },
    {
      icon: Award,
      title: "Data Governance",
      description: "GDPR-compliant architectures, data quality frameworks, lineage management, and regulatory compliance."
    },
    {
      icon: TrendingUp,
      title: "Data Architecture",
      description: "Dimensional & semantic data modeling, SQL tuning, query optimization, and scalable system design."
    }
  ];

  const experience = [
    {
      role: "Senior Data Engineer",
      company: "Tips4y – Automotive Intelligence",
      location: "Portugal",
      period: "Jul 2025 – Present",
      highlights: [
        "Built and documented scalable data lakehouse (Bronze, Silver, Gold) aligned with DataOps principles",
        "Developed ingestion pipelines from multiple sources with automated validation and data profiling",
        "Implemented Data Governance standards including RBAC, data lineage, auditing and GDPR compliance",
        "Established data quality validation frameworks and engineering best practices"
      ]
    },
    {
      role: "Senior Data Analyst",
      company: "Natixis",
      location: "Portugal",
      period: "Nov 2024 – Jun 2025",
      highlights: [
        "Operated within regulated financial environment ensuring compliance and risk automation",
        "Delivered analytical visibility through automated Power BI reports and dashboards",
        "Built data workflows and scripts in Python for data transformation and automation",
        "Worked closely with financial controllers and risk teams for regulatory dashboards"
      ]
    },
    {
      role: "Senior Data Engineer",
      company: "Sonae MC",
      location: "Portugal",
      period: "Jan 2020 – Oct 2021",
      highlights: [
        "Designed and maintained Azure-based Data Lake architecture enabling large-scale data processing",
        "Developed distributed ETL pipelines using PySpark and Delta Lake in Azure Databricks",
        "Applied Data Governance controls including RBAC, secure access and controlled data exposure",
        "Enabled near real-time retail analytics supporting decision-making for 400+ stores"
      ]
    }
  ];

  const skills = [
    { category: "Languages", items: ["Python", "SQL", "T-SQL", "PL/SQL", "Scala"] },
    { category: "Data Platforms", items: ["Azure Databricks", "Delta Lake", "Apache Spark", "Hadoop", "Snowflake"] },
    { category: "BI & Analytics", items: ["Power BI", "Tableau", "Qlik Sense", "Semantic Modeling", "DAX"] },
    { category: "Cloud & DevOps", items: ["Azure", "AWS", "GitHub", "GitLab", "Docker", "SCRUM"] }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section id="professional" className="pt-32 pb-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Professional
            </h1>
            
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Data Analytics Engineer & Team Leader with 15+ years of experience leading data initiatives across engineering and analytics domains.
            </p>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Specialized in Azure Databricks, Delta Lake, PySpark, SQL and Power BI within modern data stack environments. 
              Proven track record delivering enterprise data modernization programs and building governed, secure data platforms.
            </p>

            {/* Core Competencies */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Core Competencies</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreCompetencies.map((comp, idx) => {
                  const Icon = comp.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                      className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all"
                    >
                      <Icon className="w-8 h-8 text-primary mb-3" />
                      <h3 className="text-lg font-bold mb-2">{comp.title}</h3>
                      <p className="text-sm text-muted-foreground">{comp.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
              <div className="space-y-8">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold">{exp.role}</h3>
                        <p className="text-primary font-semibold">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.location} • {exp.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground">
                          <span className="text-primary font-bold mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skillGroup, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + idx * 0.1 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20"
                  >
                    <h3 className="text-lg font-bold mb-4 text-primary">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Professional;
