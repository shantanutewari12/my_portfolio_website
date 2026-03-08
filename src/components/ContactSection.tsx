import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";

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
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Get in Touch</span>
        </h2>
        <p className="text-muted-foreground">Let's build something together.</p>
      </motion.div>
      <div className="space-y-4">
        {contacts.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 5 }}
            className="glass-card glow-border p-4 flex items-center gap-4 hover:border-primary/50 transition-colors block"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{c.label}</p>
              <p className="text-foreground text-sm font-medium">{c.value}</p>
            </div>
          </motion.a>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground text-xs mt-16 font-mono"
      >
        © 2024 Shantanu Tiwari. Built with React & Three.js
      </motion.p>
    </section>
  );
}
