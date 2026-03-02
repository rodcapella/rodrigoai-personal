import { motion } from "framer-motion";
import { Heart, Music, Gamepad2, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pessoal = () => {
  const interests = [
    {
      icon: Heart,
      title: "Lifestyle",
      description: "Passionate about technology, innovation, and continuous learning. Always exploring new ideas and pushing boundaries.",
      color: "from-red-500/20 to-red-500/5"
    },
    {
      icon: Music,
      title: "Music & Culture",
      description: "Enjoy exploring diverse music genres and cultural experiences. Music is a universal language that connects us all.",
      color: "from-purple-500/20 to-purple-500/5"
    },
    {
      icon: Gamepad2,
      title: "Gaming",
      description: "Casual gamer who appreciates strategic games and immersive experiences. Gaming teaches problem-solving and creativity.",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: MapPin,
      title: "Travel",
      description: "Love exploring new places, meeting people from different backgrounds, and experiencing diverse cultures around the world.",
      color: "from-green-500/20 to-green-500/5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section id="pessoal" className="pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Pessoal
            </h1>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Beyond the code and data, I'm a person driven by curiosity, creativity, and a passion for making meaningful connections. 
              Here's what makes me tick outside the professional realm.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {interests.map((interest, idx) => {
                const Icon = interest.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`bg-gradient-to-br ${interest.color} p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-all`}
                  >
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">{interest.title}</h3>
                    <p className="text-muted-foreground">{interest.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20"
            >
              <h2 className="text-2xl font-bold mb-4">Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed">
                I believe in the power of balance—between work and life, between ambition and contentment, between innovation and tradition. 
                Life is a continuous journey of learning and growth, and every experience, whether personal or professional, shapes who we become. 
                I'm committed to living authentically, pursuing my passions, and making a positive impact on the world around me.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pessoal;
