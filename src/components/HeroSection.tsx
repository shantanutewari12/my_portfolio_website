import { motion } from "framer-motion";
import Scene3D from "./Scene3D";
import { Github, Linkedin, Mail, Phone, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-primary text-sm md:text-base mb-4 tracking-widest uppercase"
        >
          Software Development Engineer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">Shantanu</span>{" "}
          <span className="text-foreground">Tiwari</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          Building cross-platform applications with React, TypeScript & modern web technologies.
          Currently crafting experiences at Geneza Solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <a href="mailto:shantanitiwari12@gmail.com" className="glass-card glow-border p-3 hover:bg-primary/10 transition-colors" aria-label="Email">
            <Mail className="w-5 h-5 text-primary" />
          </a>
          <a href="tel:+919368042721" className="glass-card glow-border p-3 hover:bg-primary/10 transition-colors" aria-label="Phone">
            <Phone className="w-5 h-5 text-primary" />
          </a>
          <a href="https://github.com/shantanutewari12" target="_blank" rel="noopener noreferrer" className="glass-card glow-border p-3 hover:bg-primary/10 transition-colors" aria-label="GitHub">
            <Github className="w-5 h-5 text-primary" />
          </a>
          <a href="https://linkedin.com/in/shantanutiwari12" target="_blank" rel="noopener noreferrer" className="glass-card glow-border p-3 hover:bg-primary/10 transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 text-primary" />
          </a>
        </motion.div>
        <motion.a
          href="#experience"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="inline-block animate-float"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.a>
      </div>
    </section>
  );
}
