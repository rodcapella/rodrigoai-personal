import { motion } from "framer-motion";
import { Briefcase, Award, TrendingUp, Users, Code, Database, BarChart3, Shield, Zap, GraduationCap, Globe, Mail, MapPin, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProfessionalProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const coreExpertise = [
  { icon: Database, title: "Azure & Lakehouse Architecture", description: "Azure Databricks, Delta Lake, Medallion Architecture, and cloud-native data stack environments." },
  { icon: Code, title: "Python & PySpark", description: "Distributed data pipelines, automation, and large-scale data processing with Python and Apache Spark." },
  { icon: TrendingUp, title: "Data Modeling", description: "Dimensional & semantic data modeling, star schemas, and optimized analytical structures." },
  { icon: Zap, title: "ELT / ETL", description: "End-to-end pipeline orchestration, ingestion frameworks, and automated data transformation." },
  { icon: BarChart3, title: "Power BI & Advanced Analytics", description: "Dashboard development, DAX measures, semantic models, and data-driven decision support." },
  { icon: Shield, title: "Data Governance & Lineage", description: "GDPR-compliant architectures, RBAC, data quality frameworks, lineage tracking, and auditing." },
  { icon: Briefcase, title: "SQL Optimization", description: "Query tuning, indexing strategies, T-SQL and PL/SQL performance optimization at scale." },
  { icon: Users, title: "Agile Leadership", description: "Cross-functional team leadership, SCRUM delivery, mentoring, and architecture authority." },
];

const experience = [
  {
    role: "Senior Data Engineer",
    company: "Tips4y – Automotive Intelligence",
    period: "Jul 2025 – Present",
    highlights: [
      "Architected and documented scalable data lakehouse (Bronze, Silver, Gold) aligned with DataOps principles",
      "Developed ingestion pipelines from multiple sources with automated validation and data profiling",
      "Implemented Data Governance standards including RBAC, data lineage, auditing and GDPR compliance",
      "Established data quality validation frameworks and engineering best practices across the organization",
    ],
  },
  {
    role: "Senior Data Analyst",
    company: "Natixis",
    period: "Nov 2024 – Jun 2025",
    highlights: [
      "Operated within regulated financial environment ensuring compliance and risk automation",
      "Delivered analytical visibility through automated Power BI reports and dashboards for financial controllers",
      "Built data workflows and scripts in Python for data transformation and regulatory automation",
      "Collaborated with risk teams to build dashboards supporting Basel III and IFRS reporting",
    ],
  },
  {
    role: "Senior Data Engineer",
    company: "Hitachi Vantara",
    period: "Jan 2023 – Oct 2024",
    highlights: [
      "Designed enterprise data lake architecture on Azure for global manufacturing analytics",
      "Led migration of legacy ETL processes to modern Databricks-based pipelines using PySpark",
      "Implemented medallion architecture patterns enabling governed data access for 200+ users",
      "Drove adoption of Delta Lake for ACID-compliant data storage and time-travel capabilities",
    ],
  },
  {
    role: "Operations Analytics Manager",
    company: "ARPA Elastic Solutions",
    period: "Oct 2021 – Dec 2022",
    highlights: [
      "Managed analytics team delivering operational intelligence for logistics and supply chain",
      "Built real-time KPI dashboards in Power BI supporting executive decision-making",
      "Designed data models enabling predictive analytics for resource allocation optimization",
      "Introduced agile delivery practices reducing reporting cycle time by 40%",
    ],
  },
  {
    role: "Senior Data Engineer",
    company: "Sonae MC",
    period: "Jan 2020 – Oct 2021",
    highlights: [
      "Designed and maintained Azure-based Data Lake architecture enabling large-scale data processing",
      "Developed distributed ETL pipelines using PySpark and Delta Lake in Azure Databricks",
      "Applied Data Governance controls including RBAC, secure access and controlled data exposure",
      "Enabled near real-time retail analytics supporting decision-making for 400+ stores",
    ],
  },
  {
    role: "BI Specialist",
    company: "Holos Media",
    period: "2019",
    highlights: [
      "Designed and implemented BI solutions using Power BI and SQL Server for media analytics",
      "Created automated reporting pipelines reducing manual data processing by 60%",
    ],
  },
  {
    role: "IT Specialist",
    company: "Som Livre",
    period: "2017 – 2018",
    highlights: [
      "Developed data integration solutions for digital music distribution analytics",
      "Built ETL processes supporting royalty calculation and content performance tracking",
    ],
  },
  {
    role: "BI Team Leader",
    company: "Celular Direto",
    period: "2016",
    highlights: [
      "Led BI team delivering analytics for telecommunications customer management",
      "Implemented data warehouse solutions supporting CRM and sales performance analysis",
    ],
  },
  {
    role: "System Analyst & BI Analyst",
    company: "B2W Digital Group",
    period: "2014 – 2016",
    highlights: [
      "Built analytical solutions for one of Latin America's largest e-commerce platforms",
      "Designed data models and dashboards supporting marketing, logistics, and operations teams",
      "Managed large-scale data processing for customer behavior analysis across multiple brands",
    ],
  },
  {
    role: "Early Career",
    company: "Various Companies",
    period: "2007 – 2014",
    highlights: [
      "Progressive roles in systems analysis, database administration, and BI development",
      "Built foundational expertise in SQL, data modeling, ETL processes, and reporting",
      "Worked across industries including retail, telecommunications, and financial services",
    ],
  },
];

const certifications = [
  "Microsoft Certified: Azure Data Engineer Associate",
  "Databricks Certified Data Engineer Associate",
  "Microsoft Certified: Power BI Data Analyst Associate",
  "Scrum Foundation Professional Certificate (SFPC)",
];

const Professional = ({ theme = 'dark', onToggleTheme }: ProfessionalProps) => {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.8 }}>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 text-gradient">
              Rodrigo Capella de Souza Póvoa
            </h1>
            <p className="text-2xl font-display font-semibold text-primary mb-6">
              Data Analytics Engineer & Team Leader
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              15+ years driving data engineering and analytics excellence. Specialized in Azure Databricks, Delta Lake, PySpark, SQL, and Power BI — 
              delivering governed, scalable data platforms and leading cross-functional teams to transform enterprise data into strategic assets.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                São João da Madeira – Aveiro, Portugal
              </span>
              <a href="mailto:rodrigo.povoa@outlook.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                rodrigo.povoa@outlook.com
              </a>
              <a href="https://www.linkedin.com/in/rodrigocspovoa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4 text-primary" />
                linkedin.com/in/rodrigocspovoa
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.1 }}>
            <h2 className="text-3xl font-bold mb-6">About</h2>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20">
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 15 years of experience leading data initiatives across engineering and analytics domains, I bring deep expertise in designing 
                and delivering enterprise-grade data platforms. My work spans Azure Databricks and Delta Lake environments, applying Medallion architecture 
                patterns to build governed, performant, and scalable data ecosystems.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I architect distributed data pipelines using Python, PySpark, and SQL, ensuring data quality, reliability, and compliance at every layer. 
                My governance practice includes GDPR-compliant frameworks, RBAC implementation, data lineage tracking, and automated auditing — 
                critical for organizations operating under stringent regulatory requirements.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Beyond technical delivery, I serve as an architecture authority and team mentor — shaping engineering standards, guiding career development, 
                and fostering a culture of continuous improvement. I lead with agile principles, translating complex data challenges into clear, 
                actionable roadmaps that align with business strategy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Expertise */}
      <section className="pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }}>
            <h2 className="text-3xl font-bold mb-8">Core Expertise</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {coreExpertise.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.05 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-xl border border-primary/20 hover:border-primary/50 transition-all"
                  >
                    <Icon className="w-7 h-7 text-primary mb-3" />
                    <h3 className="text-sm font-bold mb-1.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
            <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/20 hidden md:block" />
              
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 + idx * 0.05 }}
                    className="relative md:pl-12"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-2.5 top-3 w-3 h-3 rounded-full bg-primary glow-primary-sm hidden md:block" />
                    
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                        <div>
                          <h3 className="text-xl font-bold">{exp.role}</h3>
                          <p className="text-primary font-semibold text-sm">{exp.company}</p>
                        </div>
                        <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{exp.period}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                            <span className="text-primary font-bold mt-0.5 shrink-0">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.3 }}>
            <h2 className="text-3xl font-bold mb-6">Certifications</h2>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.35 + idx * 0.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 text-sm font-medium text-foreground"
                >
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  {cert}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section className="pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.35 }}>
            <h2 className="text-3xl font-bold mb-6">Education</h2>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 inline-flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h3 className="text-lg font-bold">Bachelor of Computer Science</h3>
                <p className="text-sm text-muted-foreground">Universidade Federal Fluminense (UFF) — 2011</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Languages */}
      <section className="pb-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.4 }}>
            <h2 className="text-3xl font-bold mb-6">Languages</h2>
            <div className="flex flex-wrap gap-4">
              {[
                { lang: "Portuguese", level: "Native" },
                { lang: "English", level: "Advanced (C1)" },
                { lang: "Spanish", level: "Basic (A1)" },
              ].map((l, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">{l.lang}</span>
                  <span className="text-xs text-muted-foreground">— {l.level}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Professional;
