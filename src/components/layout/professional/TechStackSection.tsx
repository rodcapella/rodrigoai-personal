import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Layers } from "@/lib/icons";

interface Props {
  techStack: any[];
  maxYears: number;
}

export default function TechStackSection({ techStack, maxYears }: Props) {
  return (
    <PageSection
      title="Core Technology Stack & Experience Depth"
      icon={<Layers />}
      className="bg-gradient-to-br from-primary/10 to-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <PageGrid cols={3} gap="md">
          {techStack?.map((group) => (
            <PageCard key={group.category}>
              <h3 className="text-lg font-semibold mb-4">{group.category}</h3>

              <div className="space-y-5">
                {group.items.map((tech: any) => {
                  const width = (tech.years / maxYears) * 100;

                  return (
                    <div key={tech.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">{tech.name}</span>

                        <span className="text-primary text-xs font-medium">
                          {tech.years} yrs
                        </span>
                      </div>

                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="
                            h-full
                            bg-gradient-to-r from-primary to-secondary
                            transition-all duration-700
                          "
                          style={{ width: `${width}%` }}
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