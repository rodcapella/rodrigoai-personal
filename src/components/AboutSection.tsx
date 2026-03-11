import { LazyMotion, domAnimation, m } from "framer-motion";
import { profile } from "@/data/profile";

const AboutSection = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="px-4 py-16 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="container max-w-4xl px-4">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">About</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
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
      </section>
    </LazyMotion>
  );
};

export default AboutSection;
