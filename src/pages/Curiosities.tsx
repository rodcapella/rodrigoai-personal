import { motion } from "framer-motion";
import { Lightbulb, BookOpen, Zap, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Curiosities = () => {
  const facts = [
    {
      icon: Lightbulb,
      title: "Continuous Learner",
      description: "I spend significant time learning new technologies, reading research papers, and exploring emerging trends in data engineering and AI.",
      color: "from-yellow-500/20 to-yellow-500/5"
    },
    {
      icon: BookOpen,
      title: "Technical Writer",
      description: "I enjoy writing technical articles and documentation. Sharing knowledge helps solidify understanding and contributes to the community.",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: Zap,
      title: "Open Source Enthusiast",
      description: "Active contributor to open-source projects. I believe in the power of collaborative development and community-driven innovation.",
      color: "from-green-500/20 to-green-500/5"
    },
    {
      icon: Rocket,
      title: "Side Projects",
      description: "Always tinkering with new ideas and experimental projects. Some of my side projects have evolved into production systems.",
      color: "from-purple-500/20 to-purple-500/5"
    }
  ];

  const funFacts = [
    "15+ years building data solutions across Brazil, USA, and Portugal",
    "Passionate about translating complex business problems into scalable technical solutions",
    "Experienced in leading teams through digital transformation initiatives",
    "Strong advocate for data-driven decision making and analytical excellence",
    "Committed to establishing data governance best practices and compliance standards",
    "Believe that great data architecture is like great engineering—elegant, scalable, and purposeful"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section id="curiosities" className="pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Curiosities
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Here are some interesting tidbits about me that don't quite fit into the professional or personal categories, 
              but definitely shape who I am as a data engineer and team leader.
            </p>

            {/* Main Facts */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">What Drives Me</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {facts.map((fact, idx) => {
                  const Icon = fact.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`bg-gradient-to-br ${fact.color} p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-all`}
                    >
                      <Icon className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-xl font-bold mb-3">{fact.title}</h3>
                      <p className="text-muted-foreground">{fact.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Fun Facts */}
            <div>
              <h2 className="text-3xl font-bold mb-8">About My Career</h2>
              <div className="space-y-4">
                {funFacts.map((fact, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + idx * 0.05 }}
                    className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20 flex items-start gap-4"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{fact}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-xl border border-primary/20 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Want to know more?</h3>
              <p className="text-muted-foreground mb-6">
                Chat with RodrigoAI to learn more about my journey, interests, or projects. I'm always happy to discuss data engineering and technology!
              </p>
              <a
                href="/#"
                className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
              >
                Start a Conversation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Curiosities;
