import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import PageSection from "@/components/layout/PageSection";
import PageCard from "@/components/layout/PageCard";
import { User } from "@/lib/icons";

const AboutSection = () => {
  return (
    <PageSection title={profile.name} icon={<User />}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <PageCard>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            {profile.summary}
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {profile.positioning_statement}
          </p>
        </PageCard>
      </motion.div>
    </PageSection>
  );
};

export default AboutSection;