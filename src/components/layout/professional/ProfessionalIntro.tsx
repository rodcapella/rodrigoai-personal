import { Workflow } from "@/lib/icons";
import SectionContent from "@/components/layout/SectionContent";

export default function ProfessionalIntro() {
  return (
    <SectionContent
      title="Data Analytics Engineer & Team Leader"
      icon={<Workflow className="w-6 h-6" />}
      variant="default"
    >
      <div className="space-text">
        <p className="body-lg text-justify">
          Data Analytics Engineer & Team Leader with 15+ years of experience
          leading data initiatives across engineering and analytics domains.
        </p>

        <p className="body-lg text-justify">
          Specialized in Azure Databricks, Delta Lake, PySpark, SQL and Power BI
          (Power Query, DAX, M and semantic modeling) within modern data stack
          environments.
        </p>

        <p className="body-lg text-justify">
          Delivered enterprise data modernization programs improving analytical
          efficiency and governance maturity across multi-domain environments.
        </p>

        <p className="body-lg text-justify">
          Expert in building governed and secure data platforms, implementing
          GDPR-compliant architectures and scalable distributed data pipelines.
        </p>

        <p className="body-lg text-justify">
          Strong background in defining data architecture standards, leading
          engineering teams and aligning technical strategy with business goals.
        </p>
      </div>
    </SectionContent>
  );
}