import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";

interface CompactHighlightSectionProps {
  children: ReactNode;
  className?: string;
}

export default function CompactHighlightSection({
  children,
  className = "",
}: CompactHighlightSectionProps) {
  return (
    <section
      className={`bg-gradient-to-br from-primary/10 to-transparent py-6 md:py-8 ${className}`}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex w-full flex-col items-center text-center"
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
