import { motion } from "framer-motion"
import { lazy } from "react"
import { Music, Guitar, Gamepad2, Film, Dumbbell, BookOpen } from "@/lib/icons"
import SectionTitle from "@/components/layout/SectionTitle"
import Container from "@/components/layout/Container"

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
      description: "Video game enthusiast since Atari. Nowadays. it is from the PlayStation generation, proudly on the dark side of the Force."
    },
    {
      icon: Film,
      title: "Film & Series",
      description: "Film and series lover with strong interest in storytelling and cinematography."
    },
    {
      icon: Dumbbell,
      title: "Sports & Fitness",
      description: "Sports enthusiast: practices gym training, basketball and running regularly."
    }
]

export default function HobbiesSection() {

    return (
            <section className="py-20 bg-gradient-to-br from-primary/10 to-transparent py-16">

            <Container>
              <motion.div>
                  <SectionTitle icon={<Music className="w-8 h-8" />}>
                    Passions & Hobbies
                  </SectionTitle>

                  <div className="grid md:grid-cols-3 gap-8">

                  {hobbies.map((hobby, idx) => {

                  const Icon = hobby.icon

                  return (
                          <motion.div key={idx} className="glass rounded-xl p-6">

                              <Icon className="w-8 h-8 text-primary mb-4" />

                              <h3 className="text-lg font-bold mb-2">
                              {hobby.title}
                              </h3>

                              <p className="text-sm text-muted-foreground">
                              {hobby.description}
                              </p>

                          </motion.div>

                  )
                  })}

              </div>

              </motion.div>

            </Container>

            </section>
    )
}