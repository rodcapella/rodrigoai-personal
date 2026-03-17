import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import PageGrid from "@/components/layout/PageGrid";
import PageCard from "@/components/layout/PageCard";
import { Music, Guitar, Gamepad2, Film, Dumbbell, BookOpen } from "@/lib/icons";

const hobbies = [
  {
    icon: Music,
    title: "Rock & Heavy Metal",
    description:
      "Deep passion for music, especially rock and heavy metal. Spends most days listening to favorite bands at high volume.",
  },
  {
    icon: Guitar,
    title: "Electric Guitar",
    description:
      "Electric guitar player influenced by classic and modern rock. Continuously exploring new techniques and musical styles.",
  },
  {
    icon: BookOpen,
    title: "Author & Storyteller",
    description:
      "Currently writing his first non-technical book exploring the intersection between music, society and history.",
  },
  {
    icon: Gamepad2,
    title: "Video Games",
    description:
      "Video game enthusiast since Atari. Nowadays it is from the PlayStation generation, proudly on the dark side of the Force.",
  },
  {
    icon: Film,
    title: "Film & Series",
    description:
      "Film and series lover with strong interest in storytelling and cinematography.",
  },
  {
    icon: Dumbbell,
    title: "Sports & Fitness",
    description:
      "Sports enthusiast: practices gym training, basketball and running regularly.",
  },
];

export default function HobbiesSection() {
  return (
    <PageSection
      title="Passions & Hobbies"
      icon={<Music />}
      className="bg-gradient-to-br from-primary/10 to-transparent"
    >
      <PageGrid cols={3} gap="md">
        {hobbies.map((hobby, idx) => {
          const Icon = hobby.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <PageCard className="group">
                <Icon
                  className="
                    w-6 h-6
                    text-primary
                    mb-3
                    transition-all
                    group-hover:scale-110
                    group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]
                  "
                />

                <p className="text-foreground font-medium mb-1">
                  {hobby.title}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hobby.description}
                </p>
              </PageCard>
            </motion.div>
          );
        })}
      </PageGrid>
    </PageSection>
  );
}
