import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { ExternalLink } from "lucide-react";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-4">Work</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">Selected Projects</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {profile.projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-6 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
