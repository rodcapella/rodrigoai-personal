import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Rocket } from "@/lib/icons";

const projects = [
  {
    name: "TIP4Y - Automotive Intelligence - Portugal",
    description:
      "Designed and implemented a full Data Lakehouse architecture using Azure and Databricks. Built structured Medallion Architecture (bronze/silver/gold layers), implemented governance and quality validation frameworks and delivered curated analytics through Power BI for business consumption.",
    stack: [
      "Azure",
      "Databricks",
      "Delta Lake",
      "Medallion Architecture",
      "Power BI",
      "PySpark",
      "SQL",
    ],
  },
  {
    name: "ARPA Elastic Solutions - Portugal",
    description:
      "Managed projects and analytics teams within an Operations Analytics division. Delivered cross-technology initiatives integrating ElasticSearch and Power BI, enabling operational monitoring, performance analysis and strategic reporting across distinct business domains.",
    stack: [
      "Project Leadership",
      "ElasticSearch",
      "Power BI",
      "Operational Analytics",
      "Team Management",
      "Python",
      "SQL",
      "T-SQL",
    ],
  },
  {
    name: "Sonae MC - Portugal",
    description:
      "Worked as Senior Data Engineer handling large-scale data environments across Azure and Hadoop ecosystems. Developed scalable data pipelines, optimized distributed processing workloads and contributed to high-volume data transformation initiatives within enterprise-grade infrastructure.",
    stack: [
      "Azure",
      "Databricks",
      "Hadoop",
      "PySpark",
      "SQL",
      "Big Data Engineering"
    ],
  },
  {
    name: "Celular Direto - Brazil",
    description:
      "Led the creation of the Business Intelligence area from the ground up. Designed governance structures, data models, KPI frameworks and reporting standards. Built the analytical foundation that enabled executive-level decision making and operational visibility across the company.",
    stack: [
      "BI Strategy",
      "Team Management",
      "Data Architecture",
      "KPI Framework",
      "Qlik Sense",
      "Analytics Governance",
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
