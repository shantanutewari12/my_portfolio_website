import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card border-b border-border/40 shadow-2xl shadow-background/50" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
        <a href="#home" className="flex items-center gap-2 group">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-bold text-sm font-mono gradient-text">ST</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              className="text-xs text-muted-foreground hover:text-primary px-3 py-2 rounded-md hover:bg-secondary/60 transition-all duration-200 font-mono"
            >
              <span className="text-primary/50">.</span>{l.label.toLowerCase()}
            </motion.a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-1">
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border/40 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  <span className="text-primary/50">./</span>{l.label.toLowerCase()}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
