import { LazyMotion, domAnimation, m } from "framer-motion"
import { lazy } from "react"

const BookOpen = lazy(() => import("lucide-react").then(m => ({ default: m.BookOpen })));

import SectionTitle from "@/components/layout/SectionTitle"

const influences = [
  { category: "Tech Leaders", items: ["Steve Jobs", "Elon Musk", "Jeff Bezos"] },
  { category: "Global Leaders", items: ["Martin Luther King Jr.", "Nelson Mandela", "Princess Diana"] },
  { category: "Sports Idols", items: ["Ayrton Senna", "Zico", "Michael Jordan"] },
  { category: "Favorite Bands", items: ["Dream Theater", "Iron Maiden", "Metallica"] },
  { category: "Favorite Films", items: ["The Godfather", "The Shawshank Redemption", "Lord of the Rings"] },
  { category: "Favorite Books", items: ["The Housemaid", "The Catcher in the Rye", "A Song of Ice and Fire"] }
]

export default function InfluencesSection() {

  return (
    <LazyMotion features={domAnimation}>

      <section className="px-4 mb-20">

        <div className="container max-w-4xl mx-auto">

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle icon={<BookOpen className="w-8 h-8 text-primary" />}>
              Influences
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-8">

              {influences.map((section, idx) => (

                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className={`glass ${
                    ["layer-yellow","layer-blue","layer-purple","layer-green"][idx % 4]
                  } rounded-xl p-6 hover:-translate-y-1 transition-all`}
                >

                  <h3 className="text-lg font-bold mb-4">
                    {section.category}
                  </h3>

                  <ul className="space-y-2">

                    {section.items.map((item, i) => (

                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex gap-3"
                      >
                        <span className="text-primary font-bold">•</span>
                        <span>{item}</span>
                      </li>

                    ))}

                  </ul>

                </m.div>

              ))}

            </div>

          </m.div>

        </div>

      </section>

    </LazyMotion>
  )
}