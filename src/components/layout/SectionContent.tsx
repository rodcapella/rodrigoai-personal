import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";

interface SectionContentProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "gradient";
  centered?: boolean;
}

const SectionContent = ({
  title,
  icon,
  children,
  variant = "default",
  centered = true,
}: SectionContentProps) => {
  return (
    <PageSection title={title} icon={icon} variant={variant}>
      <div className={`w-full ${centered ? "flex justify-center" : ""}`}>
        <PageCard
          className="space-content"
          hover={false}
        >
          {children}
        </PageCard>
      </div>
    </PageSection>
  );
};

export default SectionContent;
