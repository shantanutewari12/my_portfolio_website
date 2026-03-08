import { motion } from "framer-motion";
import { Code, Palette, Wrench, Database } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: ["HTML", "CSS/SCSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Frameworks",
    icon: Wrench,
    skills: ["React.js", "Next.js", "Vue.js", "Node.js", "Nest.js", "Redux"],
  },
  {
    title: "UI & Design",
    icon: Palette,
    skills: ["Tailwind CSS", "Material UI", "shadcn/ui", "Figma"],
  },
  {
    title: "Tools & Databases",
    icon: Database,
    skills: ["Git", "GitHub", "MongoDB", "Firebase", "SQLite", "Vercel", "Netlify"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[2px] bg-primary" />
          <span className="font-mono text-xs text-primary tracking-widest uppercase">Tech Stack</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          Skills & <span className="gradient-text">Tools</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            className="glass-card glow-border p-6 group hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                <cat.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm tracking-wide">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((s, j) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + j * 0.04, duration: 0.3 }}
                  whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.15 } }}
                  className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium border border-border/50 hover:border-primary/40 hover:text-primary cursor-default transition-colors duration-200"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
