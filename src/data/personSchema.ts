import { siteBaseUrl } from "@/data/siteMetadata";

const authoredArticleSlugs = [
  "from-chaos-to-version-control-how-pbip-and-git-are-revolutionizing-power-bi-development",
  "sem-dados-de-qualidade-nao-ha-ia-que-salve-o-negocio",
  "next-challenge-data-engineering-isnt-scale-its-ai-governance",
];

export const personSchemaData = {
  "@type": "Person",
  "@id": `${siteBaseUrl}/#person`,
  name: "Rodrigo Póvoa",
  jobTitle: "End-to-End Data Leader & Data Analytics Engineer",
  description:
    "End-to-End Data Leader & Data Analytics Engineer with 15+ years of experience across Data Engineering, Architecture and Analytics, available for remote projects worldwide conducted in Portuguese or English.",
  knowsLanguage: [
    { "@type": "Language", name: "Portuguese", alternateName: "pt" },
    { "@type": "Language", name: "English", alternateName: "en" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Professional project enquiries",
    url: `${siteBaseUrl}/contact`,
    areaServed: "Worldwide",
    availableLanguage: ["Portuguese", "English"],
  },
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      "@id": `${siteBaseUrl}/#remote-data-services`,
      name: "Remote Data Engineering, Architecture, Analytics and Technical Leadership",
      description:
        "Remote delivery of data projects worldwide, with project collaboration and communication in Portuguese or English.",
      serviceType: ["Data Engineering", "Data Architecture", "Data Analytics", "Technical Leadership"],
      areaServed: "Worldwide",
      provider: { "@id": `${siteBaseUrl}/#person` },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${siteBaseUrl}/contact`,
        availableLanguage: ["Portuguese", "English"],
      },
    },
  },
  url: `${siteBaseUrl}/about`,
  image: `${siteBaseUrl}/profile-640.webp`,
  hasOccupation: {
    "@type": "Occupation",
    name: "End-to-End Data Leader & Data Analytics Engineer",
    description:
      "Senior data professional combining hands-on Data Engineering, Data Architecture and Analytics delivery with technical leadership, governance and stakeholder management.",
    occupationLocation: {
      "@type": "Country",
      name: "Portugal",
    },
    skills: [
      "Data Engineering",
      "Data Architecture",
      "Data Analytics",
      "Technical Leadership",
      "Azure Databricks",
      "Delta Lake",
      "Power BI",
      "Python",
      "PySpark",
      "SQL",
      "Data Governance",
    ].join(", "),
  },
  worksFor: {
    "@id": "https://www.sapienteai.com/#organization",
  },
  subjectOf: authoredArticleSlugs.map((slug) => ({
    "@type": "BlogPosting",
    "@id": `${siteBaseUrl}/blog/${slug}#article`,
    url: `${siteBaseUrl}/blog/${slug}`,
  })),
  sameAs: [
    "https://www.linkedin.com/in/rodrigocspovoa",
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
