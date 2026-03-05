import { motion } from "framer-motion";

const AboutMyCareer = () => {
  const funFacts = [
    "15+ years building data solutions across Brazil and Portugal",
    "Passionate about translating complex business problems into scalable technical solutions",
    "Experienced in leading teams through digital transformation initiatives",
    "Strong advocate for data-driven decision making and analytical excellence",
    "Committed to establishing data governance best practices and compliance standards",
    "Believe that great data architecture is like great engineering—elegant, scalable, and purposeful"
  ];

  return (
    <section className="px-4 py-20">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12">About My Career</h2>
          
          <div className="space-y-4">
            {funFacts.map((fact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 flex items-start gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">{fact}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMyCareer;
