import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: ["HTML", "CSS/SCSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Frameworks",
    skills: ["React.js", "Next.js", "Vue.js", "Node.js", "Nest.js", "Redux"],
  },
  {
    title: "Styling & UI",
    skills: ["Tailwind CSS", "Material UI", "shadcn/ui", "Figma"],
  },
  {
    title: "Tools & DB",
    skills: ["Git", "GitHub", "MongoDB", "Firebase", "SQLite", "Vercel", "Netlify"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-muted-foreground mb-12">Technologies I work with.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card glow-border p-6"
          >
            <h3 className="font-semibold text-primary mb-4 font-mono text-sm tracking-wider uppercase">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((s) => (
                <motion.span
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium border border-border/50 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
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
