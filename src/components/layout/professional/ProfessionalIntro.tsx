import { Workflow } from "@/lib/icons";
import SectionContent from "@/components/layout/SectionContent";
import { motion } from "framer-motion";

export default function ProfessionalIntro() {
  return (
    <SectionContent
      title="Data Analytics Engineer & Team Leader"
      icon={<Workflow className="w-6 h-6" />}
      variant="gradient"
    >
      <p className="text-lg text-muted-foreground leading-relaxed">
        Data Analytics Engineer & Team Leader with 15+ years of experience
        leading data initiatives across engineering and analytics domains.
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Specialized in Azure Databricks, Delta Lake, PySpark, SQL and Power BI
        (Power Query, DAX, M and semantic modeling) within modern data stack
        environments.
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Delivered enterprise data modernization programs improving analytical
        efficiency and governance maturity across multi-domain environments.
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Expert in building governed and secure data platforms, implementing
        GDPR-compliant architectures and scalable distributed data pipelines.
      </p>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Strong background in defining data architecture standards, leading
        engineering teams and aligning technical strategy with business goals.
      </p>
    </SectionContent>
  );
}
