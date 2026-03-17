import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { BookOpen } from "@/lib/icons";

const influences = [
  {
    category: "Tech Leaders",
    items: ["Steve Jobs", "Elon Musk", "Jeff Bezos"],
  },
  {
    category: "Global Leaders",
    items: ["Martin Luther King Jr.", "Nelson Mandela", "Princess Diana"],
  },
  {
    category: "Sports Idols",
    items: ["Ayrton Senna", "Zico", "Michael Jordan"],
  },
  {
    category: "Favorite Bands",
    items: ["Dream Theater", "Iron Maiden", "Metallica"],
  },
  {
    category: "Favorite Films",
    items: ["The Godfather", "The Shawshank Redemption", "Lord of the Rings"],
  },
  {
    category: "Favorite Books",
    items: [
      "The Housemaid",
      "The Catcher in the Rye",
      "A Song of Ice and Fire",
    ],
  },
];

const layers = ["layer-yellow", "layer-blue", "layer-purple", "layer-green"];

export default function InfluencesSection() {
  return (
    <PageSection title="Influences" icon={<BookOpen />}>
      <PageGrid cols={3} gap="md">
        {influences.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <PageCard className={`${layers[idx % 4]} group`}>
              <p className="text-foreground font-medium mb-3">
                {section.category}
              </p>

              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PageCard>
          </motion.div>
        ))}
      </PageGrid>
    </PageSection>
  );
}
