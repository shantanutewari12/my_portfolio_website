import { useEffect, useRef } from "react";

const codeSnippets = [
  "const app = express()",
  "import React",
  "async fetch()",
  "res.json(data)",
  "<App />",
  "useEffect()",
  "export default",
  "useState()",
  "await db.query()",
  "router.get('/')",
  "npm run dev",
  "git push",
  "docker up",
  "SELECT *",
  "jwt.sign()",
  "Promise<void>",
  "interface {}",
  "type User",
  "next.config",
  "console.log()",
];

interface Bubble {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  baseAlpha: number;
  phase: number;
  pulse: number;
}

interface Code {
  x: number;
  y: number;
  vy: number;
  text: string;
  baseAlpha: number;
  phase: number;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Create elements ──
    const bubbles: Bubble[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 6 + Math.random() * 20,
      vy: -(0.15 + Math.random() * 0.25),
      vx: (Math.random() - 0.5) * 0.15,
      baseAlpha: 0.025 + Math.random() * 0.035,
      phase: Math.random() * Math.PI * 2,
      pulse: 0.4 + Math.random() * 0.8,
    }));

    const codes: Code[] = Array.from({ length: 10 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vy: -(0.1 + Math.random() * 0.2),
      text: codeSnippets[i % codeSnippets.length],
      baseAlpha: 0.035 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, W, H);

      // ── Bubbles ──
      for (const b of bubbles) {
        b.y += b.vy;
        b.x += b.vx + Math.sin(t + b.phase) * 0.12;

        if (b.y < -b.r * 3) { b.y = H + b.r * 2; b.x = Math.random() * W; }
        if (b.x < -60) b.x = W + 30;
        if (b.x > W + 60) b.x = -30;

        const fade = Math.min(b.y / 120, (H - b.y) / 120, 1);
        const alpha = (b.baseAlpha + Math.sin(t * b.pulse + b.phase) * 0.01) * Math.max(fade, 0);

        // Soft glow
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2);
        g.addColorStop(0, `rgba(34,211,160,${alpha * 0.5})`);
        g.addColorStop(1, "rgba(34,211,160,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 2, 0, 6.283);
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 6.283);
        ctx.strokeStyle = `rgba(34,211,160,${alpha * 1.2})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Tiny highlight
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.15, 0, 6.283);
        ctx.fillStyle = `rgba(34,211,160,${alpha * 0.7})`;
        ctx.fill();
      }

      // ── Connection lines (only check nearby) ──
      for (let i = 0; i < bubbles.length; i++) {
        const a = bubbles[i];
        for (let j = i + 1; j < bubbles.length; j++) {
          const b = bubbles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22500) { // 150^2
            const alpha = (1 - Math.sqrt(d2) / 150) * 0.02;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34,211,160,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // ── Floating code ──
      ctx.font = "11px JetBrains Mono,monospace";
      for (const c of codes) {
        c.y += c.vy;
        c.x += Math.sin(t * 0.6 + c.phase) * 0.1;

        if (c.y < -20) {
          c.y = H + 15;
          c.x = Math.random() * W;
          c.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }

        const fade = Math.min(c.y / 100, (H - c.y) / 100, 1);
        const alpha = c.baseAlpha * Math.max(fade, 0);
        ctx.fillStyle = `rgba(34,211,160,${alpha})`;
        ctx.fillText(c.text, c.x, c.y);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 35% at 50% 0%, hsl(155 75% 50% / 0.035), transparent 70%)"
      }} />
    </div>
  );
}
