import { motion } from "framer-motion";
import { Briefcase, Award, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profissional = () => {
  const experiences = [
    {
      icon: Briefcase,
      title: "Data Engineering",
      description: "Building scalable data pipelines and infrastructure. ETL processes, data warehousing, and real-time analytics.",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: TrendingUp,
      title: "Analytics & BI",
      description: "Transforming raw data into actionable insights. Dashboard development, statistical analysis, and business intelligence.",
      color: "from-green-500/20 to-green-500/5"
    },
    {
      icon: Award,
      title: "AI & Machine Learning",
      description: "Developing intelligent systems and predictive models. NLP, computer vision, and deep learning applications.",
      color: "from-purple-500/20 to-purple-500/5"
    },
    {
      icon: Users,
      title: "Leadership & Mentoring",
      description: "Leading technical teams, mentoring junior developers, and fostering a culture of innovation and excellence.",
      color: "from-orange-500/20 to-orange-500/5"
    }
  ];

  const skills = [
    { category: "Languages", items: ["Python", "SQL", "TypeScript", "Java", "Go"] },
    { category: "Data Tools", items: ["Apache Spark", "Airflow", "Kafka", "Snowflake", "BigQuery"] },
    { category: "ML/AI", items: ["TensorFlow", "PyTorch", "Scikit-learn", "LLMs", "RAG"] },
    { category: "Cloud", items: ["AWS", "GCP", "Azure", "Kubernetes", "Docker"] }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section id="profissional" className="pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Profissional
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              With expertise spanning data engineering, analytics, AI, and leadership, I'm dedicated to solving complex technical challenges 
              and building systems that drive real business value.
            </p>

            {/* Expertise Areas */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Areas of Expertise</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {experiences.map((exp, idx) => {
                  const Icon = exp.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`bg-gradient-to-br ${exp.color} p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-all`}
                    >
                      <Icon className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-xl font-bold mb-3">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skillGroup, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20"
                  >
                    <h3 className="text-lg font-bold mb-4 text-primary">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profissional;
