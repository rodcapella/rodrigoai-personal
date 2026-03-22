import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { BookOpen } from "@/lib/icons";

const influences = [
  {
    category: "Builders & Visionaries",
    items: ["Steve Jobs", "Elon Musk", "Jeff Bezos"],
  },
  {
    category: "Voices That Changed the World",
    items: ["Martin Luther King Jr.", "Nelson Mandela", "Princess Diana"],
  },
  {
    category: "Competitive Legends",
    items: ["Ayrton Senna", "Zico", "Michael Jordan"],
  },
  {
    category: "Soundtrack of My Life",
    items: ["Dream Theater", "Iron Maiden", "Metallica"],
  },
  {
    category: "Stories That Stayed",
    items: ["The Godfather", "The Shawshank Redemption", "Lord of the Rings"],
  },
  {
    category: "Books That Shaped Perspective",
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
          <PageCard
            key={section.category}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className={`${layers[idx % 4]} group space-content`}
          >
            {/* CATEGORY */}
            <h3 className="text-base font-semibold text-foreground transition-all duration-300 group-hover:text-primary">
              {section.category}
            </h3>

            {/* ITEMS */}
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 body-sm items-start"
                >
                  <span className="text-primary opacity-70 mt-[2px]">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </PageCard>
        ))}
      </PageGrid>
    </PageSection>
  );
}
