import { motion } from "framer-motion";
import { Music, Gamepad2, Film, Dumbbell, Trophy, BookOpen, Guitar, Heart, Target, Compass, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

interface PersonalProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const Personal = ({ theme = 'dark', onToggleTheme }: PersonalProps) => {

  const hobbies = [
    {
      icon: Music,
      title: "Rock & Heavy Metal",
      description: "Deep passion for music, especially rock and heavy metal. Spends most days listening to favorite bands at high volume."
    },
    {
      icon: Guitar,
      title: "Electric Guitar",
      description: "Electric guitar player influenced by classic and modern rock. Continuously exploring new techniques and musical styles."
    },
    {
      icon: BookOpen,
      title: "Author & Storyteller",
      description: "Currently writing his first non-technical book exploring the intersection between music, society and history."
    },
    {
      icon: Gamepad2,
      title: "Video Games",
      description: "Video game enthusiast from the PlayStation generation — proudly on the dark side of the Force."
    },
    {
      icon: Film,
      title: "Film & Series",
      description: "Film and series lover with strong interest in storytelling and cinematography."
    },
    {
      icon: Dumbbell,
      title: "Sports & Fitness",
      description: "Sports enthusiast — practices gym training and running regularly."
    }
  ];

  const sportsTeams = [
    { team: "Flamengo", country: "Brazil", emoji: "🔴⚫" },
    { team: "FC Porto", country: "Portugal", emoji: "🔵⚪" }
  ];

  const longTermVision = [
    "Building intelligent systems",
    "Bridging data & decision layers",
    "Leadership in data multi-functional teams",
    "Creating sustainable and governed data platforms",
    "Designing AI-native architectures",
    "Leveraging modern AI ecosystems"
  ];

  const personalValues = [
    { title: "Discipline", description: "Structured approach to personal and professional growth" },
    { title: "Loyalty", description: "Commitment to relationships and long-term partnerships" },
    { title: "Intellectual Growth", description: "Continuous learning and exploration" },
    { title: "Cultural Curiosity", description: "Interest in different perspectives and cultures" },
    { title: "Technology Enthusiasm", description: "Constant exploration of emerging technologies" },
    { title: "Analytical Mindset", description: "Data-driven and structured reasoning approach" }
  ];

  const influences = [
    { category: "Tech Leaders", items: ["Steve Jobs", "Elon Musk", "Jeff Bezos"] },
    { category: "Sports Idols", items: ["Ayrton Senna", "Zico", "Michael Jordan"] },
    { category: "Favorite Bands", items: ["Dream Theater", "Iron Maiden", "Metallica"] }
  ];

  const aiExploration = [
    "OpenAI",
    "Claude",
    "Gemini",
    "Perplexity",
    "Kimi",
    "Manus",
    "Notion"
  ];

  return (
    <div className="min-h-screen bg-background">

      <Helmet>
        <title>Personal | Rodrigo Póvoa – Values, Vision & AI Exploration</title>

        <meta
          name="description"
          content="Personal profile of Rodrigo Póvoa — exploring philosophy, leadership values, cultural influences, sports passion and AI ecosystem experimentation."
        />

        <link
          rel="canonical"
          href="https://rodrigoai-personal.vercel.app/personal"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Personal | Rodrigo Póvoa" />
        <meta
          property="og:description"
          content="Personal philosophy, cultural influences and AI ecosystem exploration."
        />
        <meta
          property="og:url"
          content="https://rodrigoai-personal.vercel.app/personal"
        />
        <meta
          property="og:image"
          content="https://rodrigoai-personal.vercel.app/ai-portrait.jpeg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Personal | Rodrigo Póvoa" />
        <meta
          name="twitter:description"
          content="Personal values, relocation journey and AI ecosystem research."
        />
        <meta
          name="twitter:image"
          content="https://rodrigoai-personal.vercel.app/ai-portrait.jpeg"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Rodrigo Póvoa",
            url: "https://rodrigoai-personal.vercel.app/personal",
            jobTitle: "Data Analytics Engineer & Team Leader.",
            description:
              "Personal philosophy, leadership values and AI ecosystem exploration of Rodrigo Póvoa.",
            knowsAbout: [
              "Artificial Intelligence",
              "Data Engineering",
              "Leadership",
              "Music Culture",
              "AI Ecosystems",
              "Technology Innovation"
            ],
            sameAs: [
              "https://www.linkedin.com/in/rodrigocspovoa/",
              "https://github.com/rodcapella"
            ]
          })}
        </script>
      </Helmet>

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main className="pt-32 pb-20">

        {/* HERO */}
        <section className="px-4 mb-20">
          <div className="container max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                  Personal
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Beyond data architecture, I combine analytical rigor with cultural curiosity — balancing engineering excellence with music, sports and long-term vision.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center items-center"
              >
                <div className="relative z-10 w-[320px] lg:w-[360px]">
                  <img
                    src="/ai-portrait.jpeg"
                    alt="Rodrigo Póvoa – Data Analytics Engineer & Team Leader."
                    className="rounded-2xl shadow-2xl border border-primary/20"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      {/* Philosophy Section */}
      <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary" />
              Personal Philosophy
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Rodrigo is a Data Analytics Engineer and Team Leader with 15+ years of experience designing scalable data architectures and leading cross-functional engineering teams. 
              </p>
              
              <p>
                Throughout his career, he has held technical leadership and managerial roles across logistics, e-commerce, retail, financial services and digital media. He combines deep technical mastery with a holistic understanding of how data drives operational efficiency, strategic decision-making and long-term business impact.
              </p>
            </div>  
          </motion.div>
        </div>
      </section>
        
        {/* Life Journey Section */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Compass className="w-8 h-8 text-primary" />
                Life & Relocation
              </h2>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  In the end of 2019, Rodrigo made a significant life decision—to relocate to Portugal together with his family (wife, son and their dog), seeking improved quality of life, greater personal and family security, and more challenging professional opportunities. This move was driven by the desire to work on international and multi-domain projects while learning new concepts and technologies within more mature data environments.
                </p>
                
                <p>
                  Today, the family has grown and now includes a second dog. Portugal has become home, offering the perfect balance between professional growth and personal fulfillment. The relocation proved to be a transformative decision that shaped both his career trajectory and personal identity.
                </p>
                
                <p>
                  This journey reflects Rodrigo's philosophy: intentional decisions that align personal values with professional aspirations, creating a life of purpose and continuous evolution.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Passions & Hobbies */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Music className="w-8 h-8 text-primary" />
                Passions & Hobbies
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {hobbies.map((hobby, idx) => {
                  const Icon = hobby.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + idx * 0.05 }}
                      className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold mb-2">{hobby.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {hobby.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sports & Teams */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-primary" />
                Team Spirit
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {sportsTeams.map((team, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-lg border border-primary/20 text-center"
                  >
                    <div className="text-4xl mb-4">{team.emoji}</div>
                    <h3 className="text-2xl font-bold mb-2">{team.team}</h3>
                    <p className="text-muted-foreground">{team.country}</p>
                  </motion.div>
                ))}
              </div>
              
              <p className="text-center text-muted-foreground mt-8">
                Passionate supporter of Flamengo (Brazil) and FC Porto (Portugal), bridging two countries through sports.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Heart className="w-8 h-8 text-primary" />
                Core Values
              </h2>
        
              <div className="grid md:grid-cols-2 gap-8">
                {personalValues.map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + idx * 0.05 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <h3 className="text-lg font-bold mb-2">
                      {value.title}
                    </h3>
        
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Influences */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                Influences
              </h2>
        
              <div className="grid md:grid-cols-2 gap-8">
                {influences.map((section, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + idx * 0.05 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <h3 className="text-lg font-bold mb-4">
                      {section.category}
                    </h3>
        
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-3">
                          <span className="text-primary font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Long-Term Vision */}
        <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                <Target className="w-8 h-8 text-primary" />
                Long-Term Vision
              </h2>
        
              <div className="grid md:grid-cols-2 gap-8">
                {longTermVision.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + idx * 0.05 }}
                    className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* AI Exploration */}
        <section className="px-4 mb-20">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                AI Ecosystem Exploration
              </h2>
              
              <div className="mb-8">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Rodrigo actively studies and evaluates modern AI systems as part of an independent experimentation practice focused on applied intelligence and architectural integration. He analyzes behavioral patterns, architectural trade-offs, response reliability and integration potential within scalable data environments.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  I use structured knowledge management tools such as Notion to document experiments, architectural patterns and long-term research, maintaining a systematic approach to understanding how AI can enhance data engineering and analytics workflows.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4">Platforms Explored</h3>
                <div className="flex flex-wrap gap-3">
                  {aiExploration.map((platform, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + idx * 0.05 }}
                      className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 font-medium text-sm"
                    >
                      {platform}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Personal;
