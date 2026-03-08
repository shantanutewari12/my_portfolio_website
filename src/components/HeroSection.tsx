import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ChevronDown, Terminal } from "lucide-react";

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 40 + Math.random() * 30);
    return () => clearTimeout(t);
  }, [displayed, started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="cursor-blink text-primary">▌</span>}
    </span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden scanline">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl mx-auto px-4"
      >
        {/* Terminal header */}
        <motion.div variants={item} className="glass-card glow-border rounded-t-xl rounded-b-none border-b-0 px-4 py-2 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">shantanu@portfolio ~ </span>
        </motion.div>

        {/* Terminal body */}
        <motion.div variants={item} className="glass-card glow-border rounded-b-xl rounded-t-none p-6 md:p-10">
          <div className="font-mono text-sm text-muted-foreground mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-primary">$</span>
            <TypingText text="whoami" delay={600} />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
            <motion.span variants={item} className="gradient-text text-glow block">
              Shantanu
            </motion.span>
            <motion.span variants={item} className="text-foreground block">
              Tiwari
            </motion.span>
          </h1>

          <motion.div variants={item} className="font-mono text-sm mb-6 space-y-1">
            <p>
              <span className="text-primary">const</span>{" "}
              <span className="text-accent">role</span>{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="text-foreground">"Software Development Engineer"</span>
              <span className="text-muted-foreground">;</span>
            </p>
            <p>
              <span className="text-primary">const</span>{" "}
              <span className="text-accent">company</span>{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="text-foreground">"Geneza Solutions"</span>
              <span className="text-muted-foreground">;</span>
            </p>
            <p>
              <span className="text-primary">const</span>{" "}
              <span className="text-accent">stack</span>{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="text-muted-foreground">[</span>
              <span className="text-foreground">"React"</span>
              <span className="text-muted-foreground">,</span>{" "}
              <span className="text-foreground">"TypeScript"</span>
              <span className="text-muted-foreground">,</span>{" "}
              <span className="text-foreground">"Next.js"</span>
              <span className="text-muted-foreground">];</span>
            </p>
          </motion.div>

          <motion.p variants={item} className="text-muted-foreground text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            Building cross-platform apps with modern web tech. Passionate about clean code, great UX, and shipping fast.
          </motion.p>

          <motion.div variants={item} className="flex items-center gap-3 flex-wrap">
            {[
              { icon: Mail, href: "mailto:shantanitiwari12@gmail.com", label: "Email" },
              { icon: Phone, href: "tel:+919368042721", label: "Phone" },
              { icon: Github, href: "https://github.com/shantanutewari12", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/shantanutiwari12", label: "LinkedIn" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glass-card glow-border glow-border-hover p-3 transition-all duration-300 hover:scale-110 hover:border-primary/40 group"
                aria-label={link.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.a
          href="#experience"
          variants={item}
          className="flex justify-center mt-10"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground animate-float" />
        </motion.a>
      </motion.div>
    </section>
  );
}
