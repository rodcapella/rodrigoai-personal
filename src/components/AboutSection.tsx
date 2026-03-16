import { motion } from "framer-motion"
import { profile } from "@/data/profile";
import Section from "@/components/layout/Section"
import SectionTitle from "@/components/layout/SectionTitle"
import { User} from "@/lib/icons"
import Container from "@/components/layout/Container"

const AboutSection = () => {
  return (  
      <section className="py-20">
        <Container>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle icon={<User className="w-6 h-6" />}>
              {profile.name}
            </SectionTitle>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {profile.summary}
            </p>

           <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {profile.positioning_statement}
            </p>

          </motion.div>

        </Container>
      </Section>
  );
};

export default AboutSection;
