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
  techStack: any[];
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center"
      >
        <PageGrid cols={3} gap="md">
          {techStack.map((group) => (
            <PageCard key={group.category}>
              <h3 className="text-lg font-semibold mb-4">
                {group.category}
              </h3>

              <div className="space-y-5">
                {group.items.map((tech) => {
                  const safeMax = maxYears || 1;
                  const width = Math.min(
                    (tech.years / safeMax) * 100,
                    100
                  );

                  return (
                    <div key={tech.name} className="space-y-2">
                      
                      {/* Header */}
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">
                          {tech.name}
                        </span>

                        <span className="text-primary text-xs font-medium">
                          {tech.years} yrs
                        </span>
                      </div>

                      {/* Progress bar */}
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
      </motion.div>
    </PageSection>
  );
}