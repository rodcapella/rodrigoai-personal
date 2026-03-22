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
      "Daily fuel. From Nirvana to Iron Maiden, music is not background noise, it's part of how I think and operate.",
  },
  {
    icon: Guitar,
    title: "Electric Guitar",
    description:
      "Playing guitar as a form of expression and discipline, constantly exploring tone, technique and musical identity.",
  },
  {
    icon: BookOpen,
    title: "Writing & Storytelling",
    description:
      "Currently writing a non-technical book exploring the intersection of music, society and historical context.",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description:
      "Gamer since Atari. Today on PlayStation, still chasing immersion, storytelling and competitive edge.",
  },
  {
    icon: Film,
    title: "Cinema & Series",
    description:
      "Strong interest in storytelling, character development and visual narrative structure.",
  },
  {
    icon: Dumbbell,
    title: "Training & Discipline",
    description:
      "Gym, basketball and running as pillars for consistency, focus and mental performance.",
  },
];

export default function HobbiesSection() {
  return (
    <PageSection
      title="Passions & Hobbies"
      icon={<Music />}
      variant="gradient"
    >
      <PageGrid cols={3} gap="md">
        {hobbies.map((hobby, idx) => {
          const Icon = hobby.icon;

          return (
            <PageCard
              key={hobby.title}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group space-content"
            >
              <Icon
                className="
                  w-7 h-7
                  text-primary
                  transition-all
                  group-hover:scale-110
                  group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]
                "
              />

              <h3 className="text-base font-semibold text-foreground transition-all duration-300 group-hover:text-primary">
                {hobby.title}
              </h3>
              <p className="body-md">
                {hobby.description}
              </p>
            </PageCard>
          );
        })}
      </PageGrid>
    </PageSection>
  );
}