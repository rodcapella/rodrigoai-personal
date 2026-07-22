import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Rocket } from "@/lib/icons";

const projects = [
  {
    name: "TIP4Y - Automotive Intelligence - Portugal",
    description:
      "Designed and implemented a full governed Data Lakehouse architecture on Azure Databricks and ADLS Gen2, leveraging Unity Catalog for centralized governance, access control, and data lineage. Built a structured Medallion Architecture across bronze, silver, and gold layers, implemented data quality and validation frameworks, and delivered curated analytics through Power BI for business consumption.",
    stack: [
      "Azure",
      "Databricks",
      "PySpark",
      "SQL",
      "ADLS",
      "Delta Lake",
      "Medallion Architecture",
      "Unity Catalog",
      "Power BI",
      "SCRUM",
    ],
  },
  {
    name: "ARPA Elastic Solutions - Portugal",
    description:
      "Led projects and analytics teams within an Operations Analytics division, delivering cross-technology initiatives that combined ElasticSearch and Power BI to enable operational monitoring, performance analysis, and strategic reporting across business domains.",
    stack: [
      "Operational Analytics",
      "Project Leadership",
      "Team Management",
      "ElasticSearch",
      "Power BI",
      "Python",
      "SQL",
      "T-SQL",
      "SCRUM",
    ],
  },
  {
    name: "Sonae MC - Portugal",
    description:
      "Worked as a Senior Data Engineer in large-scale Azure and Hadoop ecosystems, developing scalable data pipelines, optimizing distributed processing workloads, and contributing to high-volume transformation initiatives within enterprise-grade infrastructure.",
    stack: [
      "Azure",
      "Databricks",
      "Hadoop",
      "PySpark",
      "SQL",
      "Big Data Engineering",
      "SCRUM",
    ],
  },
  {
    name: "Celular Direto - Brazil",
    description:
      "Led the creation of the Business Intelligence area from the ground up, designing governance structures, data models, KPI frameworks, and reporting standards. Built the analytical foundation that enabled executive decision-making and operational visibility across the company.",
    stack: [
      "BI Strategy",
      "Team Management",
      "Data Architecture",
      "Analytics Governance",
      "Qlik Sense",
      "SQL",  
    ],
  },
];

const ProjectsSection = () => {
  return (
    <PageSection title="Strategic Projects" icon={<Rocket />}>
      <PageGrid cols={2} gap="md">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <PageCard>
              {/* TITLE */}
              <h3 className="text-base font-semibold text-foreground transition-all duration-300 group-hover:text-primary">
                {project.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>

              {/* STACK */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="tag-ai text-[0.7rem] px-3 py-1 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </PageCard>
          </motion.div>
        ))}
      </PageGrid>
    </PageSection>
  );
};

export default ProjectsSection;
