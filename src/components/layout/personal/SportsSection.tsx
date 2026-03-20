import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Trophy } from "@/lib/icons";

const sportsTeams = [
  { team: "Flamengo", country: "Brazil", emoji: "🔴⚫", color: "255, 0, 0" }, // vermelho
  {
    team: "FC Porto",
    country: "Portugal",
    emoji: "🔵⚪",
    color: "37, 99, 235",
  }, // azul
];

export default function SportsSection() {
  return (
    <PageSection title="Team Spirit" icon={<Trophy />}>
      <PageGrid cols={2} gap="md">
        {sportsTeams.map((team, idx) => (
          <PageCard
            key={team.team}
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="text-center group"
          >
            <motion.div
              whileHover={{
                boxShadow: `0 0 20px rgba(${team.color}, 0.6), 0 0 40px rgba(${team.color}, 0.4)`,
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="rounded-xl p-6 h-full flex flex-col justify-center"
            >
              <motion.div
                className="text-4xl mb-3"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
              >
                {team.emoji}
              </motion.div>

              <p className="text-lg font-semibold text-foreground">
                {team.team}
              </p>

              <p className="text-sm text-muted-foreground">
                {team.country}
              </p>
            </motion.div>
          </PageCard>
        ))}
      </PageGrid>

      <p className="text-center text-muted-foreground mt-8 max-w-xl mx-auto leading-relaxed">
        From Rio to Porto, football is more than a game, it’s identity, culture
        and emotion. Supporting Flamengo and FC Porto connects two parts of my
        life into one story.
      </p>
    </PageSection>
  );
}
