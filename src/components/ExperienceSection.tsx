import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Geneza Solutions Pvt. Ltd",
    role: "Software Development Engineer - 1",
    period: "Oct 2024 – Present",
    location: "Remote",
    points: [
      "Contributing to Autographa, a cross-platform (Web, Electron, PWA) Bible translation and study application.",
      "Developed panel-based synchronized workspace using React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Zustand.",
      "Implemented offline-first data handling with Drizzle ORM + SQLite and integrated cloud sync, audio recording.",
      "Enhanced accessibility with i18next-based multi-language support (EN, ES, FR, HI, PT).",
    ],
  },
  {
    company: "GlobalLogic – A Hitachi Group Company",
    role: "Associate Software Engineer",
    period: "Oct 2022 – Sept 2024",
    location: "Noida",
    points: [
      "Developed proof of concepts integrating complex APIs with ReactJS and Next.js.",
      "Built Frontend of an Admin Dashboard aimed at usability and task management efficiency.",
      "Utilized React, Redux, Tailwind CSS, Nest.js, MongoDB, Git, GitHub, Figma, and JWT Token.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-muted-foreground mb-12">Where I've been building things.</p>
      </motion.div>
      <div className="relative border-l-2 border-border pl-8 space-y-12">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary glow-border" />
            <div className="glass-card glow-border p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-lg text-foreground">{exp.company}</h3>
                </div>
                <span className="text-sm text-muted-foreground font-mono">{exp.period}</span>
              </div>
              <p className="text-primary text-sm font-medium mb-1">{exp.role}</p>
              <p className="text-xs text-muted-foreground mb-4">{exp.location}</p>
              <ul className="space-y-2">
                {exp.points.map((p, j) => (
                  <li key={j} className="text-sm text-secondary-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
