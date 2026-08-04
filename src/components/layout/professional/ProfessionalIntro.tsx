import { Workflow } from "@/lib/icons";
import SectionContent from "@/components/layout/SectionContent";

export default function ProfessionalIntro() {
  return (
    <SectionContent
      title="End-to-End Data Leader"
      icon={<Workflow className="w-6 h-6 opacity-80" />}
      variant="default"
    >
      <div className="space-text">
        <p className="body-lg text-justify">
          With more than 15 years of experience across Data Analytics,
          Engineering and Architecture, I combine hands-on technical expertise
          with team leadership, stakeholder management and business-focused
          delivery.
        </p>

        <p className="body-lg text-justify">
          My career has evolved alongside the data industry, from traditional
          Business Intelligence and Enterprise Data Warehousing, through
          distributed Big Data ecosystems using Hadoop, Hive and Elasticsearch,
          to modern Cloud Data Platforms and Lakehouse architectures based on
          Azure, Databricks, Delta Lake, Python, PySpark, SQL and Power BI.
        </p>

        <p className="body-lg text-justify">
          Throughout this journey, I have designed, integrated and modernized
          complete data ecosystems, covering ingestion, transformation,
          orchestration, quality, governance, security, performance optimization
          and analytics delivery.
        </p>
      </div>
    </SectionContent>
  );
}
