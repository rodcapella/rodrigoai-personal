import { motion } from "framer-motion"

export default function ProfessionalIntro() {
  return (
    <div className="container max-w-4xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg text-primary font-semibold mb-4">
          Data Analytics Engineer & Team Leader | Azure Databricks | Python | PySpark | SQL | Power BI
        </p>

        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Data Analytics Engineer & Team Leader with 15+ years of experience leading
          data initiatives across engineering and analytics domains.
        </p>

      </motion.div>

    </div>
  )
}