import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Trophy } from "@/lib/icons";

const sportsTeams = [
  { team: "Flamengo", country: "Brazil", emoji: "🔴⚫", color: "255, 0, 0" },
  {
    team: "FC Porto",
    country: "Portugal",
    emoji: "🔵⚪",
    color: "37, 99, 235",
  },
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
            className="group text-center space-content"
          >
            <motion.div
              whileHover={{
                boxShadow: `0 0 20px rgba(${team.color}, 0.6), 0 0 40px rgba(${team.color}, 0.4)`,
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center"
            >
              
              {/* EMOJI */}
              <motion.div
                className="text-4xl mb-1"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.2 }}
              >
                {team.emoji}
              </motion.div>

              {/* TITLE */}
              <h3
                className="text-lg font-bold mt-1 transition-all duration-300"
                style={{ color: `rgb(${team.color})` }}
              >
                {team.team}
              </h3>

            </motion.div>
          </PageCard>
        ))}
      </PageGrid>
    </PageSection>
  );
}