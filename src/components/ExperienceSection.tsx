import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Geneza Solutions Pvt. Ltd",
    role: "Software Development Engineer - 1",
    period: "Oct 2024 – Present",
    location: "Remote",
    color: "primary",
    points: [
      "Contributing to Autographa — cross-platform Bible translation app (Web, Electron, PWA)",
      "Built panel-based synchronized workspace with React, TypeScript, Vite, shadcn/ui, Zustand",
      "Implemented offline-first data with Drizzle ORM + SQLite, cloud sync, audio recording (Tone.js)",
      "Added i18next multi-language support (EN, ES, FR, HI, PT) and desktop integration via Electron",
    ],
  },
  {
    company: "GlobalLogic – A Hitachi Group Company",
    role: "Associate Software Engineer",
    period: "Oct 2022 – Sept 2024",
    location: "Noida",
    color: "accent",
    points: [
      "Developed proof of concepts integrating complex APIs with ReactJS and Next.js",
      "Built Admin Dashboard frontend focused on usability and task management",
      "Worked with React, Redux, Tailwind CSS, Nest.js, MongoDB, Figma, JWT",
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[2px] bg-primary" />
          <span className="font-mono text-xs text-primary tracking-widest uppercase">Career</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          Work <span className="gradient-text">Experience</span>
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-8"
      >
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.98 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            className="glass-card glow-border glow-border-hover p-6 md:p-8 relative overflow-hidden transition-all duration-300"
          >
            {/* Accent stripe */}
            <div className={`absolute top-0 left-0 w-1 h-full ${i === 0 ? "bg-primary" : "bg-accent"}`} />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 pl-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className={`w-4 h-4 ${i === 0 ? "text-primary" : "text-accent"}`} />
                  <h3 className="font-semibold text-lg text-foreground">{exp.company}</h3>
                </div>
                <p className={`text-sm font-medium ${i === 0 ? "text-primary" : "text-accent"}`}>{exp.role}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.period}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
              </div>
            </div>

            <ul className="space-y-2 pl-4">
              {exp.points.map((p, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * j, duration: 0.3 }}
                  className="text-sm text-secondary-foreground flex items-start gap-3"
                >
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${i === 0 ? "bg-primary/60" : "bg-accent/60"}`} />
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
