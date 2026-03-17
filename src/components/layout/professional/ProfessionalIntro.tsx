import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";
import { Workflow } from "@/lib/icons";

export default function ProfessionalIntro() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle icon={<Workflow className="w-8 h-8" />}>
            Data Analytics Engineer & Team Leader | Azure Databricks | Python |
            PySpark | SQL | Power BI
          </SectionTitle>
          <br />
          <br />
          <p className="text-lg">
            Data Analytics Engineer & Team Leader with 15+ years of experience
            leading data initiatives across engineering and analytics domains.
            Specialized in Azure Databricks, Delta Lake, PySpark, SQL and Power
            BI (Power Query, DAX, M and semantic modeling) within modern data
            stack environments.
          </p>
          <br />
          <p className="text-lg">
            Delivered enterprise data modernization programs improving
            analytical efficiency and maturity of governance across multi-domain
            environments. Proven track record in translating business goals into
            scalable data solutions that accelerate decision-making and insight
            delivery.
          </p>
          <br />
          <p className="text-lg">
            Expert in building governed and secure data platforms, implementing
            Data Governance, GDPR-compliant architectures and scalable
            distributed data pipelines.
          </p>
          <br />
          <p className="text-lg">
            Strong background in defining data architecture standards, leading
            engineering teams, mentoring engineers and aligning technical
            strategy with business goals.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
