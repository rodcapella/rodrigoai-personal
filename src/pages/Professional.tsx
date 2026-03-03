import { motion } from "framer-motion";
import { Briefcase, Award, Code, Database, BarChart3, Users, Globe, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProfessionalProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const Professional = ({ theme = 'dark', onToggleTheme }: ProfessionalProps) => {
  const experiences = [
    {
      role: "Senior Data Engineer",
      company: "Tips4y – Automotive Intelligence",
      location: "Portugal",
      period: "Jul 2025 – Present",
      description: "Leading data lakehouse architecture and governance initiatives in the automotive sector.",
      highlights: [
        "Built scalable data lakehouse (Bronze, Silver, Gold) with DataOps principles",
        "Developed ingestion pipelines with automated validation and data profiling",
        "Implemented Data Governance standards including RBAC and GDPR compliance",
        "Established data quality validation frameworks"
      ],
      techStack: ["Azure", "Databricks", "PySpark", "Delta Lake", "Power BI", "SQL Server"]
    },
    {
      role: "Senior Data Analyst",
      company: "Natixis",
      location: "Portugal",
      period: "Nov 2024 – Jun 2025",
      description: "Delivered analytics solutions in a regulated financial environment.",
      highlights: [
        "Operated in regulated financial environment with compliance focus",
        "Delivered analytical visibility through automated Power BI dashboards",
        "Built data workflows and scripts in Python for automation",
        "Worked with financial controllers and risk teams on regulatory dashboards"
      ],
      techStack: ["Power BI", "Python", "SQL", "SQL Server", "Hive", "SCRUM"]
    },
    {
      role: "Senior Data Engineer",
      company: "Hitachi Vantara",
      location: "Portugal",
      period: "Jan 2023 – Oct 2024",
      description: "Collaborated on global data governance and integration projects.",
      highlights: [
        "Collaborated with global data governance teams",
        "Led Oracle-based integration projects improving ETL efficiency",
        "Maintained enterprise analytics in MicroStrategy",
        "Mentored junior engineers and contributed to architecture reviews"
      ],
      techStack: ["Oracle", "SQL", "PL/SQL", "MicroStrategy"]
    },
    {
      role: "Operations Analytics Manager",
      company: "ARPA Elastic Solutions",
      location: "Portugal",
      period: "Oct 2021 – Dec 2022",
      description: "Led cross-functional teams delivering analytics solutions and KPI frameworks.",
      highlights: [
        "Led cross-functional team of data engineers and analysts",
        "Defined KPIs and automated ETL pipelines in Python and T-SQL",
        "Delivered KPI frameworks and semantic data models in Power BI",
        "Built dynamic dashboards integrating real-time operational data"
      ],
      techStack: ["SQL", "T-SQL", "Power BI", "Python", "GitLab", "Elasticsearch"]
    },
    {
      role: "Senior Data Engineer",
      company: "Sonae MC",
      location: "Portugal",
      period: "Jan 2020 – Oct 2021",
      description: "Designed and maintained Azure-based Data Lake architecture for retail analytics.",
      highlights: [
        "Designed and maintained Azure-based Data Lake architecture",
        "Developed distributed ETL pipelines using PySpark and Delta Lake",
        "Applied Data Governance controls including RBAC and secure access",
        "Enabled near real-time retail analytics supporting 400+ stores"
      ],
      techStack: ["SQL", "Azure", "Databricks", "PySpark", "Hadoop", "GitHub", "Confluence"]
    },
    {
      role: "BI Specialist",
      company: "Holos Media – Digital Media Agency",
      location: "Brazil",
      period: "Jan 2019 – Oct 2019",
      description: "Developed analytics dashboards and reporting solutions for media operations.",
      highlights: [
        "Developed Tableau dashboards and PL/SQL routines on Oracle Database",
        "Migrated Qlik View dashboards to Tableau",
        "Supported reporting needs for media and marketing departments"
      ],
      techStack: ["SQL", "PL/SQL", "Oracle", "Qlik View", "Tableau"]
    }
  ];

  const skills = [
    {
      category: "Data Engineering",
      icon: Database,
      items: ["Python & PySpark", "Azure Databricks", "Delta Lake", "ETL/ELT Orchestration", "Data Architecture"]
    },
    {
      category: "Analytics & BI",
      icon: BarChart3,
      items: ["Power BI", "Tableau", "Semantic Modeling", "DAX", "Advanced Analytics"]
    },
    {
      category: "Databases & SQL",
      icon: Code,
      items: ["SQL Server", "Oracle", "PostgreSQL", "MySQL", "Query Optimization"]
    },
    {
      category: "Leadership & Governance",
      icon: Users,
      items: ["Team Leadership", "Data Governance", "GDPR Compliance", "RBAC Implementation", "Agile/SCRUM"]
    }
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
    { language: "Portuguese", level: "Native" },
    { language: "English", level: "Advanced (C1 – improving towards C2)" },
    { language: "Spanish", level: "Basic (A1)" }
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
              
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Data Analytics Engineer & Team Leader | Azure Databricks | Python | PySpark | SQL | Power BI | Data Architecture & Insights
              </p>
              
              <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
                With 15+ years of experience leading data initiatives across engineering and analytics domains, I specialize in designing and implementing enterprise data solutions. My expertise spans Azure Databricks, Delta Lake, PySpark, SQL, and Power BI within modern data stack environments. I have a proven track record of delivering enterprise data modernization programs that improve analytical efficiency and governance maturity across multi-domain environments.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Professional Journey Section */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-8">Professional Journey</h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  My career has been defined by a deliberate focus on building data-driven organizations. After progressing through various roles in data analytics and engineering, I recognized that the future of enterprise data management lies in modern cloud-native architectures, governed data platforms, and cross-functional collaboration.
                </p>
                
                <p>
                  In 2020, I made a strategic move to Portugal to expand my expertise in Azure Databricks and modern data stack technologies. This decision proved pivotal, allowing me to lead enterprise data modernization initiatives at organizations like Sonae MC and ARPA Elastic Solutions, where I designed scalable data lakehouse architectures and established governance frameworks that improved analytical efficiency and data quality across the organization.
                </p>
                
                <p>
                  What sets me apart is the combination of deep technical expertise and business acumen. I understand both the code and the strategy behind it—how to translate business requirements into scalable, governed data solutions that drive decision-making and accelerate business value.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-12">Professional Experience</h2>
              
              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.05 }}
                    className="border-l-4 border-primary/30 pl-6 pb-8"
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                      <p className="text-primary font-semibold text-lg">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.location} • {exp.period}</p>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground text-sm">
                          <span className="text-primary font-bold mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-12">Skills & Expertise</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skillGroup, idx) => {
                  const Icon = skillGroup.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + idx * 0.05 }}
                      className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-bold">{skillGroup.category}</h3>
                      </div>
                      <ul className="space-y-2">
                        {skillGroup.items.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
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
              <h2 className="text-3xl font-bold mb-8">Certifications & Courses</h2>
              
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.03 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{cert}</span>
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
              <h2 className="text-3xl font-bold mb-8">Languages</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {languages.map((lang, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + idx * 0.05 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20 text-center"
                  >
                    <Globe className="w-6 h-6 text-primary mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-2">{lang.language}</h3>
                    <p className="text-sm text-muted-foreground">{lang.level}</p>
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
              <h3 className="text-2xl font-bold mb-4">Let's Build Something Meaningful</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're looking to modernize your data infrastructure, build analytics capabilities, or explore how data can drive your business forward, I'd love to discuss how we can work together.
              </p>
              <a
                href="/#"
                className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Professional;
