import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Mailing App",
    tech: ["React.js", "Redux", "Material UI", "Node.js", "Firebase"],
    date: "August 2023",
    desc: "Full-featured mailing application with responsive UI, secure authentication, and robust data storage through Firebase.",
  },
  {
    title: "E-Commerce App",
    tech: ["React.js", "Redux", "Tailwind CSS", "Firebase"],
    date: "September 2023",
    desc: "Innovative shopping platform with real-time cart processing, user-friendly interface, and seamless checkout experience.",
  },
  {
    title: "Food Ordering App",
    tech: ["Next.js", "Redux", "Tailwind CSS"],
    date: "October 2023",
    desc: "Streamlined food ordering application with smooth, responsive frontend and optimal performance.",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-muted-foreground mb-12">Things I've built.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card glow-border p-6 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-muted-foreground">{p.date}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-secondary text-primary">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
