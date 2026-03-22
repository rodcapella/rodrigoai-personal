import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`w-full ${centered ? "flex justify-center" : ""}`}
      >
        <PageCard
          className="space-content"
          hover={false}
        >
          {children}
        </PageCard>
      </motion.div>
    </PageSection>
  );
};

export default SectionContent;
