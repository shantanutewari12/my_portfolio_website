import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", value: "shantanitiwari12@gmail.com", href: "mailto:shantanitiwari12@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91-9368042721", href: "tel:+919368042721" },
  { icon: Github, label: "GitHub", value: "shantanutewari12", href: "https://github.com/shantanutewari12" },
  { icon: Linkedin, label: "LinkedIn", value: "shantanutiwari12", href: "https://linkedin.com/in/shantanutiwari12" },
  { icon: MapPin, label: "Location", value: "Moradabad, Uttar Pradesh", href: "#" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-8 h-[2px] bg-primary" />
          <span className="font-mono text-xs text-primary tracking-widest uppercase">Connect</span>
          <div className="w-8 h-[2px] bg-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Get in <span className="gradient-text">Touch</span>
        </h2>
      </motion.div>

      <div className="space-y-3">
        {contacts.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            whileHover={{ x: 6, transition: { duration: 0.2 } }}
            className="glass-card glow-border glow-border-hover p-4 flex items-center justify-between group hover:border-primary/30 transition-all duration-300 block"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                <c.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{c.label}</p>
                <p className="text-foreground text-sm font-medium">{c.value}</p>
              </div>
            </div>
            {c.href !== "#" && (
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-20 space-y-2"
      >
        <p className="text-muted-foreground text-xs font-mono">
          <span className="text-primary">{"</"}</span>built with React & Framer Motion<span className="text-primary">{">"}</span>
        </p>
        <p className="text-muted-foreground/50 text-xs font-mono">© 2024 Shantanu Tiwari</p>
      </motion.div>
    </section>
  );
}
