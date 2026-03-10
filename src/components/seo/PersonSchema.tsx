import { Helmet } from "react-helmet-async";

export const PersonSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Rodrigo Póvoa",
        jobTitle: "Data Analytics Engineer & Team Leader",
        url: "https://rpovoadata.tech",
        sameAs: [
          "https://linkedin.com/in/rodrigocspovoa",
          "https://github.com/rodcapella"
        ],
        knowsAbout: [
          "Data Architecture",
          "Azure",
          "Data Engineer",
          "Data Analytics",
          "Team Leader",
          "Tech Leader",
          "Data Teams",
          "Databricks",
          "Power BI",
          "Tableau",
          "SQL",
          "Python",
          "PySpark",
          "AI Systems",
          "Data Governance"
        ]
      })}
    </script>
  </Helmet>
);
