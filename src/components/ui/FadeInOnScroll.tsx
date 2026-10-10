import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInOnScroll({
  children,
  className,
  delay = 0,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  const isVisible = !hasMounted || prefersReducedMotion || isInView;

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      style={prefersReducedMotion ? undefined : {
        transition: "opacity 450ms ease-out",
        transitionDelay: `${delay}s`,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
