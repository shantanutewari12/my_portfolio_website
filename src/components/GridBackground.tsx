import { useEffect, useRef } from "react";

const codeSnippets = [
  "const app = express();",
  "import React from 'react';",
  "async function fetch() {",
  "return res.json(data);",
  "<Component />",
  "useEffect(() => {});",
  "export default App;",
  "useState(false)",
  "await db.query(sql)",
  "router.get('/api')",
  "npm run build",
  "git push origin main",
  "docker compose up",
  "SELECT * FROM users",
  "model.predict(x)",
  "jwt.sign(payload)",
  ".then(r => r.json())",
  "interface Props {}",
  "type User = { }",
  "mongoose.connect()",
  "app.listen(3000)",
  "useRef(null)",
  "onClick={handler}",
  "console.log('✓')",
  "npm install",
  "try { } catch { }",
  "=> Promise<void>",
  "tailwind.config",
  "next.config.js",
  "tsconfig.json",
];

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  drift: number;
  phase: number;
  pulseSpeed: number;
}

interface CodeLine {
  x: number;
  y: number;
  text: string;
  speed: number;
  opacity: number;
  drift: number;
  phase: number;
  size: number;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const bubblesRef = useRef<Bubble[]>([]);
  const codesRef = useRef<CodeLine[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // Create bubbles
    bubblesRef.current = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 4 + Math.random() * 25,
      speed: 0.2 + Math.random() * 0.5,
      opacity: 0.02 + Math.random() * 0.05,
      drift: (Math.random() - 0.5) * 0.4,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.5 + Math.random() * 1.5,
    }));

    // Create floating code
    codesRef.current = Array.from({ length: 14 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      text: codeSnippets[i % codeSnippets.length],
      speed: 0.12 + Math.random() * 0.3,
      opacity: 0.04 + Math.random() * 0.05,
      drift: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2,
      size: 11 + Math.random() * 2,
    }));

    let t = 0;
    const w = () => canvas.width;
    const h = () => canvas.height;

    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w(), h());

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // ── Bubbles ──
      bubblesRef.current.forEach((b) => {
        b.y -= b.speed;
        b.x += Math.sin(t * b.pulseSpeed + b.phase) * b.drift;

        if (b.y < -b.radius * 2) {
          b.y = h() + b.radius * 2;
          b.x = Math.random() * w();
        }
        if (b.x < -50) b.x = w() + 50;
        if (b.x > w() + 50) b.x = -50;

        // Mouse proximity glow
        const dx = b.x - mx;
        const dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseBoost = dist < 200 ? (1 - dist / 200) * 0.12 : 0;

        const pulse = Math.sin(t * b.pulseSpeed + b.phase) * 0.015;
        const alpha = Math.min(b.opacity + pulse + mouseBoost, 0.2);
        const edgeFade = Math.min(b.y / 80, (h() - b.y) / 80, 1);
        const finalAlpha = alpha * Math.max(edgeFade, 0);

        // Outer glow
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius * 2.5);
        grad.addColorStop(0, `rgba(34, 211, 160, ${finalAlpha * 0.6})`);
        grad.addColorStop(0.4, `rgba(34, 211, 160, ${finalAlpha * 0.2})`);
        grad.addColorStop(1, "rgba(34, 211, 160, 0)");
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Bubble ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 160, ${finalAlpha * 1.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Bubble highlight
        ctx.beginPath();
        ctx.arc(
          b.x - b.radius * 0.3,
          b.y - b.radius * 0.3,
          b.radius * 0.25,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(34, 211, 160, ${finalAlpha * 0.8})`;
        ctx.fill();
      });

      // ── Floating code ──
      ctx.font = "12px 'JetBrains Mono', monospace";
      codesRef.current.forEach((c) => {
        c.y -= c.speed;
        c.x += Math.sin(t * 0.8 + c.phase) * c.drift;

        if (c.y < -30) {
          c.y = h() + 20;
          c.x = Math.random() * w();
          c.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }

        const dx = c.x - mx;
        const dy = c.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseBoost = dist < 180 ? (1 - dist / 180) * 0.15 : 0;

        const edgeFade = Math.min(c.y / 100, (h() - c.y) / 100, 1);
        const alpha = (c.opacity + mouseBoost) * Math.max(edgeFade, 0);

        ctx.fillStyle = `rgba(34, 211, 160, ${alpha})`;
        ctx.fillText(c.text, c.x, c.y);
      });

      // ── Tiny sparkle particles ──
      for (let i = 0; i < 40; i++) {
        const px =
          (Math.sin(t * 0.4 + i * 2.1) * 0.5 + 0.5) * w();
        const py =
          (Math.cos(t * 0.25 + i * 1.7) * 0.5 + 0.5) * h();
        const pAlpha = 0.04 + Math.sin(t * 1.2 + i) * 0.025;
        const pSize = 1 + Math.sin(t * 0.8 + i * 0.5) * 0.8;

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 160, ${pAlpha})`;
        ctx.fill();
      }

      // ── Connection lines between nearby bubbles ──
      bubblesRef.current.forEach((a, i) => {
        bubblesRef.current.forEach((b, j) => {
          if (j <= i) return;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.025;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34, 211, 160, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(155 75% 50% / 0.04), transparent 70%)",
        }}
      />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/[0.025] rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
