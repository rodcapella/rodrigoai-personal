import { motion } from "framer-motion";
import { Award, Briefcase, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProfessionalProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const Professional = ({ theme = 'dark', onToggleTheme }: ProfessionalProps) => {
  const experiences = [
    {
      title: "Senior Data Engineer",
      company: "Tips4y – Automotive Intelligence",
      location: "Portugal",
      period: "Jul 2025 – Present",
      highlights: [
        "Built and documented a scalable data lakehouse (Bronze, Silver, Gold) aligned with DataOps and Data Mesh principles, leveraging Delta Lake schema evolution and GDPR-compliant governance.",
        "Developed ingestion pipelines from multiple sources (SQL Server, CSV, JSON, Azure Blob) into Delta Lake with automated validation, data transformations, data profiling and cleansing.",
        "Created logging, auditing, and ingestion control mechanisms to ensure reliability, traceability and operational excellence.",
        "Produced detailed technical documentation in Confluence covering project presentation, infrastructure design and data ingestion processes.",
        "Partnered with business stakeholders to define analytical KPIs and enabled Power BI dashboards built from curated Gold datasets and governed semantic layers.",
        "Improved reporting efficiency and analytical reliability across the automotive domain, supporting decision-making for strategic clients.",
        "Implemented Data Governance standards including RBAC, data lineage, auditing and GDPR-compliant data handling.",
        "Established data quality validation frameworks and enforced engineering best practices.",
        "Acted as technical authority for Azure Databricks architecture and pipeline design."
      ],
      stack: ["Azure", "Databricks", "PySpark", "Delta Lake", "Power BI", "SQL Server", "GitHub", "Jira", "Confluence", "SCRUM"]
    },
    {
      title: "Senior Data Analyst",
      company: "Natixis",
      location: "Portugal",
      period: "Nov 2024 – Jun 2025",
      highlights: [
        "Operated within a regulated financial environment, ensuring compliance and automating risk and performance dashboards using Python and Power BI.",
        "Delivered analytical visibility through automated Power BI reports and dashboards (Power Query, DAX and M Language).",
        "Built data workflows and scripts in Python for data transformation, deep analysis and automation.",
        "Worked closely with financial controllers and risk teams to automate reporting and strengthen data quality for regulatory dashboards."
      ],
      stack: ["Power BI", "Python", "SQL", "SQL Server", "Hive", "SCRUM"]
    },
    {
      title: "Senior Data Engineer",
      company: "Hitachi Vantara",
      location: "Portugal",
      period: "Jan 2023 – Oct 2024",
      highlights: [
        "Collaborated with global data governance and data management teams to define and standardize quality frameworks across multi-region environments.",
        "Led Oracle-based integration projects improving ETL efficiency and scalability.",
        "Maintained enterprise analytics in MicroStrategy while enforcing global data governance standards.",
        "Mentored junior engineers and contributed to architecture reviews to ensure code quality and compliance."
      ],
      stack: ["Oracle", "SQL", "PL/SQL", "MicroStrategy"]
    },
    {
      title: "Operations Analytics Manager",
      company: "ARPA Elastic Solutions",
      location: "Portugal",
      period: "Oct 2021 – Dec 2022",
      highlights: [
        "Led a cross-functional team of data engineers and analysts, defining data SLAs, optimizing sprint delivery, and mentoring juniors in CI/CD best practices and Git-based workflows.",
        "Defined KPIs, automated ETL pipelines in Python and T-SQL integrating Elasticsearch and SQL Server databases.",
        "Delivered KPI frameworks and semantic data models in Power BI, enabling self-service analytics and real-time decision-making for operations teams.",
        "Built dynamic Power BI and Kibana dashboards integrating real-time operational data for performance tracking.",
        "Implemented coding and versioning standards in GitLab, improving collaboration and delivery consistency.",
        "Managed and mentored engineers and analysts establishing engineering best practices.",
        "Implemented governance standards including access control, ownership and data validation.",
        "Acted as senior technical authority for data platform design, ensuring scalability, reliability, and governance."
      ],
      stack: ["SQL", "T-SQL", "Power BI", "SQL Server", "Python", "GitLab", "SCRUM", "Elasticsearch", "Kibana", "Logstash"]
    },
    {
      title: "Senior Data Engineer",
      company: "Sonae MC",
      location: "Portugal",
      period: "Jan 2020 – Oct 2021",
      highlights: [
        "Played a key role in designing and maintaining the company's Azure-based Data Lake architecture, enabling large-scale data processing with Databricks (Python, PySpark and SQL).",
        "Developed distributed ETL pipelines using PySpark and Delta Lake in Azure Databricks environment.",
        "Applied Data Governance controls including RBAC, secure access and controlled data exposure.",
        "Collaborated with architecture teams to enforce governance, lineage and engineering standards.",
        "Developed and optimized ingestion and transformation pipelines across Hadoop (Hive, Impala and Oozie) and Delta Lake environments, ensuring data quality and performance across multiple databases.",
        "Enabled near real-time retail analytics through optimized Databricks pipelines, supporting daily decision-making for over 400 stores.",
        "Collaborated with cross-functional teams to align data models with business needs and promoted best practices in versioning (GitHub) and Agile delivery (Jira, Confluence and SCRUM).",
        "Tuned SQL, T-SQL and PL/SQL queries for multiple databases including SQL Server, Oracle, MySQL, PostgreSQL and Google BigQuery."
      ],
      stack: ["SQL", "SQL Server", "Azure", "Databricks", "Python", "PySpark", "Hadoop", "GitHub", "Jira", "SCRUM", "Confluence"]
    }
  ];

  const coreCompetences = [
    "Team Leadership, Agile Delivery and cross-functional collaboration",
    "Azure (Databricks, Delta Lake and Medallion Architecture)",
    "Python & PySpark data pipelines",
    "Dimensional & semantic data modelling",
    "ELT / ETL orchestration",
    "Power BI dashboard development, semantic modeling and advanced analytics",
    "Data governance, quality & lineage frameworks",
    "SQL tuning & query optimization for analytical workloads"
  ];

  const certifications = [
    "Mastering Azure Databricks for Data Engineers Specialization – Packt (2025)",
    "Snowflake Data Engineering Professional – Snowflake (2025)",
    "GDPR – DLC (Distance Learning Consulting) (2022)",
    "Microsoft Learning: Perform Data Science and Data Engineering with Databricks (2021)",
    "SCRUM Foundation Professional Certificate – CertiProf (2020)",
    "Python and R Programmer Track – DataCamp (2019)",
    "Qlik Sense Developer & Admin Modules (2016)"
  ];

  const languages = [
    { language: "Portuguese", level: "Native", flag: "🇧🇷" },
    { language: "English", level: "Advanced (C1 – improving towards C2 proficiency)", flag: "🇬🇧" },
    { language: "Spanish", level: "Basic (A1 equivalent)", flag: "🇪🇸" }
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      institution: "UFF (Federal Fluminense University)",
      location: "Brazil",
      year: "2011"
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
                Professional
              </h1>
              
              <p className="text-lg text-primary font-semibold mb-4">
                Data Analytics Engineer & Team Leader | Azure Databricks | Python | PySpark | SQL | Power BI | Data Architecture & Insights
              </p>
              
              <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
                Data Analytics Engineer & Team Leader with 15+ years of experience leading data initiatives across engineering and analytics domains. Specialized in Azure Databricks, Delta Lake, PySpark, SQL and Power BI within modern data stack environments.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Competences */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-8">Core Competences</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {coreCompetences.map((competence, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.05 }}
                    className="flex items-start gap-3 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20"
                  >
                    <span className="text-primary font-bold mt-1">•</span>
                    <p className="text-muted-foreground">{competence}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-primary" />
                Professional Experience
              </h2>
              
              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                    className="border-l-4 border-primary pl-6 pb-8"
                  >
                    <h3 className="text-2xl font-bold text-primary mb-1">{exp.title}</h3>
                    <p className="text-lg font-semibold text-foreground mb-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-4">{exp.location} • {exp.period}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-3">
                          <span className="text-primary font-bold flex-shrink-0">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">Tech Stack:</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium border border-orange-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Academic Background */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8">Academic Background</h2>
              
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + idx * 0.05 }}
                    className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20"
                  >
                    <h3 className="text-lg font-bold text-foreground mb-2">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.location} • {edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Award className="w-8 h-8 text-primary" />
                Certifications & Courses
              </h2>
              
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + idx * 0.05 }}
                    className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 flex gap-3"
                  >
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground text-sm">{cert}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Languages */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Globe className="w-8 h-8 text-primary" />
                Languages
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {languages.map((lang, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                    className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 text-center"
                  >
                    <div className="text-4xl mb-3">{lang.flag}</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{lang.language}</h3>
                    <p className="text-sm text-muted-foreground">{lang.level}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Professional;
