import React from "react";
import { motion } from "framer-motion";
import { Award } from "@/lib/icons";
import SectionTitle from "@/components/layout/SectionTitle";
import Container from "@/components/layout/Container";

interface Competence {
  icon: React.ElementType;
  title: string;
}

interface CoreCompetencesSectionProps {
  competences: Competence[];
}

const CoreCompetencesSection = ({
  competences,
}: CoreCompetencesSectionProps) => {
  return (
    <section className="py-20">
      <Container>
        <SectionTitle icon={<Award className="w-8 h-8" />}>
          Core Competences
        </SectionTitle>

        <div className="grid md:grid-cols-3 gap-8">
          {competences.map((competence, i) => {
            const Icon = competence.icon;

            return (
              <motion.div key={i} className="glass rounded-xl p-6">
                <Icon className="w-8 h-8 text-primary mb-4" />

                <h3 className="text-2xl font-bold mb-2">{competence.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CoreCompetencesSection;
