import { motion } from "framer-motion"
import SectionTitle from "@/components/layout/SectionTitle"
import { Rocket} from "@/lib/icons"

const projects = [
    {
    name: "TIP4Y - Automotive Intelligence - Portugal",
    description:
      "Designed and implemented a full Data Lakehouse architecture using Azure and Databricks. Built structured Bronze/Silver/Gold layers, implemented governance and quality validation frameworks, and delivered curated analytics through Power BI for business consumption.",
    stack: ["Azure", "Databricks", "Delta Lake", "Lakehouse Architecture", "Power BI", "PySpark", "SQL"]
  },
  {
    name: "ARPA Elastic Solutions - Portugal",
    description:
      "Managed projects and analytics teams within an Operations Analytics division. Delivered cross-technology initiatives integrating ElasticSearch and Power BI, enabling operational monitoring, performance analysis and strategic reporting across distinct business domains.",
    stack: ["Project Leadership", "ElasticSearch", "Power BI", "Operational Analytics", "Team Management", "Python", "SQL", "T-SQL"]
  },
  {
    name: "Sonae MC - Portugal",
    description:
      "Worked as Senior Data Engineer handling large-scale data environments across Azure and Hadoop ecosystems. Developed scalable data pipelines, optimized distributed processing workloads and contributed to high-volume data transformation initiatives within enterprise-grade infrastructure.",
    stack: ["Azure", "Databricks", "Hadoop", "PySpark", "SQL", "Big Data Engineering", "Python"]
  },
  {
    name: "Celular Direto - Brazil",
    description:
      "Led the creation of the Business Intelligence area from the ground up. Designed governance structures, data models, KPI frameworks and reporting standards. Built the analytical foundation that enabled executive-level decision making and operational visibility across the company.",
    stack: ["BI Strategy", "Data Architecture", "KPI Framework", "Qlik Sense", "Analytics Governance"]
  }
];

const ProjectsSection = () => {
  return (
      <section id="projects" className="py-32 relative">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle icon={<Rocket className="w-6 h-6" />}>
              Strategic Projects
            </SectionTitle>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-xl p-6 hover:border-primary/30 transition-all group"
              >
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                  {project.name}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium border border-orange-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default ProjectsSection;
