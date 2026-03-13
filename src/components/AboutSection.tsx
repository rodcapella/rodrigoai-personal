import { LazyMotion, domAnimation, m } from "framer-motion";
import { profile } from "@/data/profile";
import Section from "@/components/layout/Section"

const AboutSection = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Section>
        <div className="container max-w-4xl mx-auto">

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >

            <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">
              About
            </p>

            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              {profile.name}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {profile.summary}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {profile.positioning_statement}
            </p>

          </m.div>

        </div>
      </Section>
    </LazyMotion>
  );
};

export default AboutSection;
