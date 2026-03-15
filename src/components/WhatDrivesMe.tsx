import { LazyMotion, domAnimation, m } from "framer-motion";

import { lazy, Suspense } from "react";

const BookOpen = lazy(() => import("lucide-react").then(m => ({ default: m.BookOpen })));
const Zap = lazy(() => import("lucide-react").then(m => ({ default: m.Zap })));
const Rocket = lazy(() => import("lucide-react").then(m => ({ default: m.Rocket })));
const Lightbulb = lazy(() => import("lucide-react").then(m => ({ default: m.Lightbulb })));
const Brain = lazy(() => import("lucide-react").then(m => ({ default: m.Brain })));

const WhatDrivesMe = () => {
  const facts = [
    {
      icon: Lightbulb,
      title: "Continuous Learner",
      description:
        "I spend significant time learning new technologies, reading research papers, and exploring emerging trends in data engineering and AI.",
      color: "from-yellow-500/20 to-yellow-500/5"
    },
    {
      icon: BookOpen,
      title: "Technical Writer",
      description:
        "I enjoy writing technical articles and documentation. Sharing knowledge helps solidify understanding and contributes to the community.",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: Zap,
      title: "Open Source Enthusiast",
      description:
        "Active contributor to open-source projects. I believe in the power of collaborative development and community-driven innovation.",
      color: "from-green-500/20 to-green-500/5"
    },
    {
      icon: Rocket,
      title: "Side Projects",
      description:
        "Always tinkering with new ideas and experimental projects. Some of my side projects have evolved into innovation.",
      color: "from-purple-500/20 to-purple-500/5"
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="px-4 py-16 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="container max-w-4xl mx-auto">

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <h2 className="group text-3xl font-bold mb-12 flex items-center gap-3 transition-all duration-300 hover:tracking-wide">

              <Suspense fallback={null}>
                <Brain
                  className="
                    w-6 h-6
                    text-primary
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]
                  "
                />
              </Suspense>

              <span className="transition-colors duration-300 group-hover:text-primary">
                What Drives Me
              </span>

            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {facts.map((fact, idx) => {
                const Icon = fact.icon;

                return (
                  <m.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-gradient-to-br ${fact.color} p-8 rounded-xl border border-primary/20 hover:border-primary/50 transition-all`}
                  >
                    <Icon className="w-8 h-8 text-primary mb-4" />

                    <h3 className="text-xl font-semibold mb-4">
                      {fact.title}
                    </h3>

                    <p className="text-muted-foreground">
                      {fact.description}
                    </p>

                  </m.div>
                );
              })}
            </div>

          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
};

export default WhatDrivesMe;