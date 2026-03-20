import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Sparkles } from "@/lib/icons";

interface AIPlatform {
  name: string;
  type?: string; // LLM, Tool, Research, etc
}

const aiExploration: AIPlatform[] = [
  { name: "OpenAI", type: "LLM" },
  { name: "Claude", type: "LLM" },
  { name: "Gemini", type: "LLM" },
  { name: "Perplexity", type: "Search AI" },
  { name: "Kimi", type: "LLM" },
  { name: "Manus", type: "Agent" },
  { name: "Notion", type: "Knowledge" },
];

export default function AIExplorationSection() {
  return (
    <PageSection title="AI Ecosystem Exploration" icon={<Sparkles />}>
      <div className="max-w-3xl mx-auto">
        
        <PageCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
          hover={false}
        >
          {/* Text */}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                  className="tag-ai flex items-center gap-2"
                >
                  {platform.name}

                  {platform.type && (
                    <span className="text-[10px] opacity-60 group-hover:opacity-100 transition">
                      {platform.type}
                    </span>
                  )}
                </motion.span>
              ))}
            </div>
          </div>

        </PageCard>
      </div>
    </PageSection>
  );
}