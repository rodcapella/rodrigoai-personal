import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { Sparkles } from "@/lib/icons";

const aiExploration = [
  "OpenAI",
  "Claude",
  "Gemini",
  "Perplexity",
  "Kimi",
  "Manus",
  "Notion",
];

export default function AIExplorationSection() {
  return (
    <PageSection title="AI Ecosystem Exploration" icon={<Sparkles />}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-6"
      >
        <PageCard className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            I actively study and evaluate modern AI systems as part of an
            independent experimentation practice focused on applied intelligence
            and architectural integration. I analyze behavioral patterns,
            architectural trade-offs, response reliability and integration
            potential within scalable data environments.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            I use structured knowledge management tools such as Notion to
            document experiments, architectural patterns and long-term research,
            maintaining a systematic approach to understanding how AI can
            enhance data engineering and analytics workflows.
          </p>

          <div>
            <p className="text-sm font-semibold mb-4 text-foreground">
              Platforms Explored
            </p>

            <div className="flex flex-wrap gap-3">
              {aiExploration.map((platform, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="tag-ai"
                >
                  {platform}
                </motion.span>
              ))}
            </div>
          </div>
        </PageCard>
      </motion.div>
    </PageSection>
  );
}
