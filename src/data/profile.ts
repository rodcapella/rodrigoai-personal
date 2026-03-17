import {
  Database,
  Cloud,
  Layers,
  BarChart3,
  Network,
  LineChart,
  Workflow,
  ShieldCheck,
  Users,
  GitBranch,
} from "@/lib/icons";

export const profile = {
  name: "Rodrigo Póvoa",

  title: "Technical Data Leader | Data Analytics Engineer",

  summary:
    "Technical Data Leader specialized in designing enterprise data ecosystems, structuring governance frameworks and leading analytics teams in complex environments. I operate at the intersection of architecture, engineering and business strategy. Transforming fragmented data landscapes into scalable, governed and decision-driven platforms.",

  core_skills: [
    {
      icon: Database,
      title: "Enterprise Data Architecture & Lakehouse Design",
    },
    {
      icon: Cloud,
      title: "Azure & Distributed Data Engineering",
    },
    {
      icon: Layers,
      title: "Databricks, Delta Lake & Modern Data Platform Architecture",
    },
    {
      icon: BarChart3,
      title: "Analytics Platform Strategy",
    },
    {
      icon: Network,
      title: "Data Modeling (Kimball, Data Vault, Lakehouse Patterns)",
    },
    {
      icon: LineChart,
      title: "BI Capability Building & KPI Structuring",
    },
    {
      icon: Workflow,
      title: "Scalable Data Pipelines & ELT Architecture",
    },
    {
      icon: ShieldCheck,
      title: "Data Governance, GDPR Compliance and Quality Frameworks",
    },
    {
      icon: Users,
      title: "Technical Leadership & Team Development",
    },
    {
      icon: GitBranch,
      title: "Cross-Functional Stakeholder Alignment",
    },
  ],

  technical_stack: [
    {
      category: "Languages & Processing",
      items: [
        { name: "SQL", years: 15 },
        { name: "T-SQL", years: 7 },
        { name: "PL/SQL", years: 7 },
        { name: "Python", years: 5 },
        { name: "PySpark", years: 3 },
      ],
    },
    {
      category: "Data Engineering & Platforms",
      items: [
        { name: "ELT / ETL Pipelines", years: 15 },
        { name: "Azure", years: 3 },
        { name: "Azure Databricks", years: 3 },
        { name: "Delta Lake", years: 3 },
        { name: "Hive", years: 3 },
        { name: "Hadoop Ecosystem", years: 2 },
        { name: "ElasticSearch", years: 2 },
      ],
    },
    {
      category: "Databases",
      items: [
        { name: "Oracle", years: 10 },
        { name: "SQL Server", years: 8 },
        { name: "MySQL", years: 5 },
        { name: "PostgreSQL", years: 2 },
        { name: "BigQuery", years: 1 },
        { name: "MongoDB", years: 1 },
      ],
    },
    {
      category: "BI & Analytics Platforms",
      items: [
        { name: "IBM Cognos", years: 7 },
        { name: "Power BI", years: 5 },
        { name: "Tableau", years: 3 },
        { name: "MicroStrategy", years: 2 },
        { name: "Kibana", years: 2 },
        { name: "Qlik Sense", years: 1 },
        { name: "QlikView", years: 1 },
      ],
    },
    {
      category: "Microsoft BI Stack",
      items: [
        { name: "SSIS", years: 4 },
        { name: "SSAS", years: 4 },
        { name: "SSRS", years: 4 },
      ],
    },
    {
      category: "Data Architecture & Governance",
      items: [
        { name: "Dimensional Modeling", years: 12 },
        { name: "Data Architecture", years: 6 },
        { name: "Semantic Modeling", years: 5 },
        { name: "Data Governance", years: 4 },
      ],
    },
  ],

  leadership_focus:
    "Proven experience in building analytics capabilities from the ground up, leading multidisciplinary teams and delivering large-scale data initiatives that align technical execution with strategic business goals.",

  impact_orientation:
    "Focused on turning data into organizational leverage, ensuring platforms are not only technically robust, but also governed, scalable and aligned with executive decision-making.",

  positioning_statement:
    "I lead the design of intelligent data infrastructures that scale with the organization: combining technical depth, governance discipline and strategic clarity.",

  experience: [
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
        "Acted as technical authority for Azure Databricks architecture and pipeline design.",
      ],
      stack: [
        "Azure",
        "Databricks",
        "PySpark",
        "Delta Lake",
        "Power BI",
        "SQL Server",
        "GitHub",
        "Jira",
        "Confluence",
        "SCRUM",
      ],
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
        "Worked closely with financial controllers and risk teams to automate reporting and strengthen data quality for regulatory dashboards.",
      ],
      stack: ["Power BI", "Python", "SQL", "SQL Server", "Hive", "SCRUM"],
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
        "Mentored junior engineers and contributed to architecture reviews to ensure code quality and compliance.",
      ],
      stack: ["Oracle", "SQL", "PL/SQL", "MicroStrategy"],
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
        "Acted as senior technical authority for data platform design, ensuring scalability, reliability, and governance.",
      ],
      stack: [
        "SQL",
        "T-SQL",
        "Power BI",
        "SQL Server",
        "Python",
        "GitLab",
        "SCRUM",
        "Elasticsearch",
        "Kibana",
        "Logstash",
      ],
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
        "Tuned SQL, T-SQL and PL/SQL queries for multiple databases including SQL Server, Oracle, MySQL, PostgreSQL and Google BigQuery.",
      ],
      stack: [
        "SQL",
        "SQL Server",
        "Azure",
        "Databricks",
        "Python",
        "PySpark",
        "Hadoop",
        "GitHub",
        "Jira",
        "SCRUM",
        "Confluence",
      ],
    },
    {
      title: "BI Specialist",
      company: "Holos Media – Digital Media Agency",
      location: "Brazil",
      period: "Jan 2019 – Oct 2019",
      highlights: [
        "Developed Tableau dashboards and PL/SQL routines on Oracle Database for marketing performance analysis.",
        "Migrated legacy QlikView dashboards to Tableau, improving visualization performance and analytical clarity.",
        "Supported reporting needs for media and marketing departments with data-driven insights.",
      ],
      stack: ["SQL", "PL/SQL", "Oracle", "Qlik View", "Tableau"],
    },
    {
      title: "IT Specialist",
      company: "Som Livre",
      location: "Brazil",
      period: "Jan 2017 – Dec 2018",
      highlights: [
        "Led the design and implementation of enterprise BI and Data Warehouse solutions in the Microsoft ecosystem.",
        "Integrated Power BI, SSIS, SSRS and SSAS to modernize financial and operational reporting.",
        "Acted as Product Owner for the Royalties ERP system, managing backlog prioritization and cross-team alignment.",
        "Optimized PL/SQL and T-SQL routines improving reporting performance and reliability.",
      ],
      stack: [
        "SQL",
        "SQL Server",
        "MySQL",
        "T-SQL",
        "Power BI",
        "SSIS",
        "SSAS",
        "SSRS",
        "SCRUM",
      ],
    },
    {
      title: "BI Team Leader",
      company: "Celular Direto",
      location: "Brazil",
      period: "Mar 2016 – Dec 2016",
      highlights: [
        "Founded and structured the Business Intelligence area from the ground up.",
        "Designed the BI platform integrating CRM, ERP and operational systems into centralized analytical data models.",
        "Implemented scalable ETL pipelines ensuring data consistency and performance.",
        "Built executive dashboards in Qlik Sense providing leadership with actionable insights.",
        "Hired, mentored and led a team of BI developers establishing scalable delivery capability.",
      ],
      stack: ["SQL", "SQL Server", "MySQL", "PL/SQL", "Qlik Sense", "SCRUM"],
    },
    {
      title: "System Analyst & BI Analyst",
      company: "B2W Digital Group",
      location: "Brazil",
      period: "Jan 2014 – Mar 2016",
      highlights: [
        "Led technical design for vendor accounts payable BI systems using SQL Server, SSIS, SSRS and SSAS.",
        "Built dynamic Tableau dashboards integrating MongoDB and SQL Server.",
        "Automated reporting solutions using PL/SQL routines.",
        "Optimized advanced T-SQL queries significantly improving data processing efficiency.",
      ],
      stack: [
        "SQL",
        "Oracle",
        "SQL Server",
        "T-SQL",
        "SSIS",
        "SSAS",
        "SSRS",
        "Tableau",
        "SCRUM",
      ],
    },
    {
      title: "Early Career (Trainee to BI Team Leader)",
      company:
        "Multiple Organizations (Wilson Sons, FGV, Delphos Tecnologia em Seguros)",
      location: "Brazil",
      period: "2007 – 2014",
      highlights: [
        "Progressively advanced from Trainee to BI Team Leader delivering data and analytics solutions.",
        "Built strong foundations in data modeling, PL/SQL development and ETL processes.",
        "Delivered enterprise dashboards and automation projects enhancing finance and operations decision-making.",
        "Led small technical teams and contributed to governance and reporting modernization initiatives.",
      ],
      stack: [
        "Oracle",
        "IBM Cognos",
        "SQL Server",
        "PL/SQL",
        "ETL",
        "Data Modeling",
      ],
    },
  ],

  certifications: [
    "Mastering Azure Databricks for Data Engineers Specialization – Packt (2025)",
    "Snowflake Data Engineering Professional – Snowflake (2025)",
    "GDPR – DLC (Distance Learning Consulting) (2022)",
    "Microsoft Learning: Perform Data Science and Data Engineering with Databricks (2021)",
    "SCRUM Foundation Professional Certificate – CertiProf (2020)",
    "Python and R Programmer Track – DataCamp (2019)",
    "Qlik Sense Developer & Admin Modules (2016)",
  ],

  languages: [
    { name: "Portuguese", level: "Native" },
    {
      name: "English",
      level: "Advanced (C1 – improving towards C2 proficiency)",
    },
    { name: "Spanish", level: "Basic (A1 equivalent)" },
  ],

  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "UFF (Federal Fluminense University)",
      location: "Brazil",
      year: "2011",
    },
  ],
};
