import React from "react";
import { Globe } from "@/lib/icons";
import SectionTitle from "@/components/layout/SectionTitle";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

interface Language {
  name: string;
  level: string;
}

interface LanguagesSectionProps {
  languages: Language[];
}

export default function LanguagesSection({ languages }: LanguagesSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent py-20">
      <Container>
        <SectionTitle icon={<Globe className="w-6 h-6" />}>
          Languages
        </SectionTitle>

        <div className="grid md:grid-cols-3 gap-8">
          {languages?.map((lang, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`p-6 rounded-xl glass ${
                ["layer-yellow", "layer-green", "layer-purple", "layer-blue"][
                  idx % 4
                ]
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{lang.name}</h3>

              <p className="text-sm text-muted-foreground">{lang.level}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
