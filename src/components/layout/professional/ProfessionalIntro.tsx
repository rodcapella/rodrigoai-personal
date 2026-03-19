import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";
import { Workflow } from "@/lib/icons";

export default function ProfessionalIntro() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle as="h2" icon={<Workflow className="w-8 h-8" />}>
              Data Analytics Engineer & Team Leader
            </SectionTitle>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-primary font-medium"
          >
            Azure Databricks · Python · PySpark · SQL · Power BI
          </motion.p>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
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
      </Container>
    </section>
  );
}