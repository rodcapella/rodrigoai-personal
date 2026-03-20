import { motion } from "framer-motion";
import SectionContent from "@/components/layout/SectionContent";
import { Workflow } from "@/lib/icons";

export default function ProfessionalIntro() {
  return (
    <SectionContent
      title="Data Analytics Engineer & Team Leader"
      icon={<Workflow className="w-6 h-6" />}
      variant="gradient"
    >
      <div className="max-w-3xl space-y-6">
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-primary font-medium"
        >
          Azure Databricks · Python · PySpark · SQL · Power BI
        </motion.p>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 text-muted-foreground text-base leading-relaxed"
        >
          <p>
            Data Analytics Engineer & Team Leader with 15+ years of experience
            leading data initiatives across engineering and analytics domains.
          </p>

          <p>
            Specialized in Azure Databricks, Delta Lake, PySpark, SQL and Power
            BI (Power Query, DAX, M and semantic modeling) within modern data
            stack environments.
          </p>

          <p>
            Delivered enterprise data modernization programs improving
            analytical efficiency and governance maturity across multi-domain
            environments.
          </p>

          <p>
            Expert in building governed and secure data platforms, implementing
            GDPR-compliant architectures and scalable distributed data pipelines.
          </p>

          <p>
            Strong background in defining data architecture standards, leading
            engineering teams and aligning technical strategy with business goals.
          </p>
        </motion.div>

      </div>
    </SectionContent>
  );
}