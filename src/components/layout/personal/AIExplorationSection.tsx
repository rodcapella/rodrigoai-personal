import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Sparkles } from "@/lib/icons";

interface AIPlatform {
  name: string;
  type?: string;
}

const aiExploration: AIPlatform[] = [
  { name: "OpenAI" },
  { name: "Claude" },
  { name: "Gemini" },
  { name: "Perplexity" },
  { name: "Kimi" },
  { name: "Manus" },
  { name: "Notion" },
];

export default function AIExplorationSection() {
  return (
    <PageSection title="AI Ecosystem Exploration" icon={<Sparkles />}>

      {/* 🔥 remove max-w-3xl */}
      <div className="w-full">
        
        <PageCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full space-y-6"
          hover={false}
        >
          {/* Text */}
          <div className="space-text text-muted-foreground text-lg leading-relaxed text-justify">
            <p>
              I actively explore modern AI systems through hands-on experimentation,
              focusing on real-world applicability within data engineering and analytics.
            </p>

            <p>
              My approach combines behavioral analysis, architectural evaluation and
              integration testing, aiming to understand how AI systems can enhance
              decision-making pipelines and scalable data platforms.
            </p>

            <p>
              All experiments are documented in structured knowledge systems,
              creating a growing internal framework of patterns, insights and
              practical use cases.
            </p>
          </div>

          {/* Platforms */}
          <div>
            <p className="text-sm font-semibold mb-4 text-foreground">
              Platforms Explored
            </p>

            <div className="flex flex-wrap gap-3">
              {aiExploration.map((platform, idx) => (
                <motion.span
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="tag-ai flex items-center gap-2 group"
                >
                  {platform.name}
                  {platform.type && <span>{platform.type}</span>}
                </motion.span>
              ))}
            </div>
          </div>

        </PageCard>
      </div>
    </PageSection>
  );
}