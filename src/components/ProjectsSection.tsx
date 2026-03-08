import { motion } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";

const projects = [
  {
    title: "Mailing App",
    tech: ["React.js", "Redux", "Material UI", "Node.js", "Firebase"],
    date: "Aug 2023",
    desc: "Full-featured mailing app with responsive UI, secure authentication, and Firebase-powered data storage.",
    emoji: "📧",
  },
  {
    title: "E-Commerce App",
    tech: ["React.js", "Redux", "Tailwind CSS", "Firebase"],
    date: "Sep 2023",
    desc: "Innovative shopping platform with real-time cart processing and seamless checkout experience.",
    emoji: "🛒",
  },
  {
    title: "Food Ordering App",
    tech: ["Next.js", "Redux", "Tailwind CSS"],
    date: "Oct 2023",
    desc: "Streamlined food ordering with smooth responsive frontend and optimal performance.",
    emoji: "🍔",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[2px] bg-primary" />
          <span className="font-mono text-xs text-primary tracking-widest uppercase">Portfolio</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          Featured <span className="gradient-text">Projects</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="glass-card glow-border glow-border-hover p-6 group cursor-pointer relative overflow-hidden transition-all duration-300"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="text-3xl">{p.emoji}</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{p.date}</span>
                  <Folder className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-secondary border border-border/50 text-secondary-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
