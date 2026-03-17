import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Trophy } from "@/lib/icons";

const sportsTeams = [
  { team: "Flamengo", country: "Brazil", emoji: "🔴⚫" },
  { team: "FC Porto", country: "Portugal", emoji: "🔵⚪" },
];

export default function SportsSection() {
  return (
    <PageSection title="Team Spirit" icon={<Trophy />}>
      <PageGrid cols={2} gap="md">
        {sportsTeams.map((team, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <PageCard className="text-center group">
              <div className="text-3xl mb-3">{team.emoji}</div>

              <p className="text-foreground font-medium">{team.team}</p>

              <p className="text-sm text-muted-foreground">{team.country}</p>
            </PageCard>
          </motion.div>
        ))}
      </PageGrid>

      <p className="text-center text-muted-foreground mt-8 max-w-xl mx-auto">
        Passionate supporter of Flamengo (Brazil) and FC Porto (Portugal),
        bridging two countries through sports.
      </p>
    </PageSection>
  );
}
