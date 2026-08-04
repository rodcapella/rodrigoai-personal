import { siteBaseUrl } from "@/data/siteMetadata";

export const personSchemaData = {
  "@type": "Person",
  "@id": `${siteBaseUrl}/#person`,
  name: "Rodrigo Póvoa",
  jobTitle: "End-to-End Data Leader & Data Analytics Engineer",
  description:
    "End-to-End Data Leader with 15+ years of experience across Data Engineering, Architecture and Analytics.",
  url: siteBaseUrl,
  image: `${siteBaseUrl}/profile-640.webp`,
  sameAs: [
    "https://linkedin.com/in/rodrigocspovoa",
    "https://github.com/rodcapella",
  ],
  knowsAbout: [
    "Data Architecture",
    "Azure",
    "Data Engineering",
    "Data Analytics",
    "Technical Leadership",
    "Multidisciplinary Data Teams",
    "Azure Databricks",
    "Delta Lake",
    "Power BI",
    "SQL",
    "Python",
    "PySpark",
    "AI Systems",
    "AI-Assisted Engineering",
    "Model Context Protocol (MCP)",
    "Human-Validated AI",
    "Stakeholder Management",
    "Solution Scoping",
    "Data Governance",
  ],
};
