import { motion } from "framer-motion";

interface ListCardProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function ListCard({
  icon,
  children,
  className = "",
}: ListCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`
        flex items-start gap-3
        p-4
        rounded-lg
        bg-card/40
        border border-border/60
        backdrop-blur-sm
        transition-all duration-300
        ${className}
      `}
    >
      {/* ICON */}
      {icon && (
        <div className="mt-1 text-primary opacity-70 flex-shrink-0">
          {icon}
        </div>
      )}

      {/* CONTENT */}
      <div className="body-md text-muted-foreground leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}