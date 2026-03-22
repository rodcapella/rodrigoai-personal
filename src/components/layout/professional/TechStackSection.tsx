import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Layers } from "@/lib/icons";

interface Tech {
  name: string;
  years: number;
}

interface TechGroup {
  category: string;
  items: Tech[];
}

interface Props {
  techStack: TechGroup[];
  maxYears: number;
}

export default function TechStackSection({ techStack, maxYears }: Props) {
  if (!techStack?.length) return null;

  return (
    <PageSection
      title="Core Technology Stack & Experience Depth"
      icon={<Layers />}
      variant="gradient"
    >
      <PageGrid cols={3} gap="md">
        {techStack.map((group, i) => (
          <PageCard
            key={group.category}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="space-content"
          >
            {/* CATEGORY */}
            <h3 className="heading-sm">
              {group.category}
            </h3>

            {/* TECH LIST */}
            <div className="space-content">
              {group.items.map((tech) => {
                const safeMax = maxYears || 1;
                const width = Math.min((tech.years / safeMax) * 100, 100);

                return (
                  <div key={tech.name} className="space-tight">
                    
                    {/* HEADER */}
                    <div className="flex justify-between items-center">
                      <span className="label">
                        {tech.name}
                      </span>

                      <span className="label text-primary">
                        {tech.years} yrs
                      </span>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${width}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </PageCard>
        ))}
      </PageGrid>
    </PageSection>
  );
}