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
            <h2 className="group text-3xl font-bold mb-12 flex items-center gap-3 transition-all duration-300 hover:tracking-wide">
              <User
                className="
                  w-6 h-6
                  text-primary
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]
                "
              />
              <span className="transition-colors duration-300 group-hover:text-primary">
                {profile.name}
              </span>
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
