import { LazyMotion, domAnimation, m } from "framer-motion"
import { lazy } from "react"

const Music = lazy(() => import("lucide-react").then(m => ({ default: m.Music })));
const Guitar = lazy(() => import("lucide-react").then(m => ({ default: m.Guitar })));
const Gamepad2 = lazy(() => import("lucide-react").then(m => ({ default: m.Gamepad2 })));
const Film = lazy(() => import("lucide-react").then(m => ({ default: m.Film })));
const Dumbbell = lazy(() => import("lucide-react").then(m => ({ default: m.Dumbbell })));
const BookOpen = lazy(() => import("lucide-react").then(m => ({ default: m.BookOpen })));

import SectionTitle from "@/components/layout/SectionTitle"

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
        <LazyMotion features={domAnimation}>

            <section className="px-4 mb-20 bg-gradient-to-r from-primary/5 to-transparent py-16">

            <div className="container max-w-4xl mx-auto">

            <m.div>
                <SectionTitle icon={<Music className="w-8 h-8" />}>
                  Passions & Hobbies
                </SectionTitle>

                <div className="grid md:grid-cols-2 gap-8">

                {hobbies.map((hobby, idx) => {

                const Icon = hobby.icon

                return (
                        <m.div key={idx} className="glass rounded-xl p-6">

                            <Icon className="w-8 h-8 text-primary mb-4" />

                            <h3 className="text-lg font-bold mb-2">
                            {hobby.title}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                            {hobby.description}
                            </p>

                        </m.div>

                )
                })}

            </div>

            </m.div>

            </div>

            </section>

        </LazyMotion>
    )
}