import { motion } from "framer-motion"
import { lazy } from "react"
import { BookOpen} from "@/lib/icons"
import SectionTitle from "@/components/layout/SectionTitle"
import Container from "@/components/layout/Container"

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
      <section className="py-20">

        <Container>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle icon={<BookOpen className="w-8 h-8" />}>
              Influences
            </SectionTitle>

            <div className="grid md:grid-cols-3 gap-8">

              {influences.map((section, idx) => (

                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className={`glass ${
                    ["layer-yellow","layer-blue","layer-purple","layer-green"][idx % 4]
                  } rounded-xl p-6 hover:-translate-y-1 transition-all`}
                >

                  <h3 className="text-2xl font-bold mb-2">
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

                </motion.div>

              ))}

            </div>

          </motion.div>

        </Container>

      </section>
  )
}