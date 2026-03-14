import { LazyMotion, domAnimation, m } from "framer-motion"

const AboutMyCareer = () => {
  const funFacts = [
    "15+ years building data solutions across Brazil and Portugal",
    "Passionate about translating complex business problems into scalable technical solutions",
    "Strong advocate for data-driven decision making and analytical excellence",
    "Believe that great data architecture is like great engineering: elegant, scalable, and purposeful",
    "Committed to establishing data governance best practices and compliance standards",
    "Skilled at designing analytics products, dashboards and reports that transform data into actionable insights",
    "Experienced in leading teams through digital transformation initiatives"
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="px-4 py-20">
        <div className="container max-w-4xl mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="group text-3xl font-bold mb-12 flex items-center gap-3 transition-all duration-300 hover:tracking-wide">
              <Briefcase
                className="
                  w-6 h-6
                  text-primary
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]
                "
              />
              <span className="transition-colors duration-300 group-hover:text-primary">
                About My Career
              </span>
            </h2>
          </m.div>

            <div className="space-y-4">
              {funFacts.map((fact, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 flex items-start gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">{fact}</p>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default AboutMyCareer;