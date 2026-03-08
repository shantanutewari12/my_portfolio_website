import { useEffect, useRef } from "react";

const codeSnippets = [
  "const app = express();",
  "import React from 'react';",
  "async function fetchData() {",
  "return res.json(data);",
  "<div className={styles}>",
  "useEffect(() => {}, []);",
  "export default App;",
  "const [state, setState]",
  "await prisma.user.find()",
  "router.get('/api', handler)",
  "npm install typescript",
  "git commit -m 'feat:'",
  "docker build -t app .",
  "SELECT * FROM users;",
  "model.predict(input)",
  "const token = jwt.sign()",
  ".then(res => res.json())",
  "interface Props { }",
  "type User = { id: string }",
  "CREATE TABLE posts (",
  "mongoose.connect(uri)",
  "app.listen(3000);",
  "const ref = useRef(null);",
  "onClick={() => navigate('/')}",
  "headers: { Authorization }",
  "try { await fetch(url) }",
  "export const loader = async",
  "tailwind.config.ts",
  "npm run dev",
  "console.log('deployed ✓')",
];

interface FloatingCode {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  size: number;
  drift: number;
  driftSpeed: number;
  phase: number;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const codesRef = useRef<FloatingCode[]>([]);
  const animRef = useRef<number>(0);

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

    // Initialize floating code snippets
    const initCodes = (): FloatingCode[] =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        text: codeSnippets[i % codeSnippets.length],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 0.15 + Math.random() * 0.35,
        opacity: 0.04 + Math.random() * 0.06,
        size: 11 + Math.random() * 3,
        drift: (Math.random() - 0.5) * 0.3,
        driftSpeed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      }));

    codesRef.current = initCodes();

    let time = 0;
    const animate = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "rgba(34, 211, 160, 0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw floating code
      ctx.font = "13px 'JetBrains Mono', monospace";
      codesRef.current.forEach((code) => {
        code.y -= code.speed;
        code.x += Math.sin(time * code.driftSpeed + code.phase) * code.drift;

        // Wrap around
        if (code.y < -30) {
          code.y = canvas.height + 20;
          code.x = Math.random() * canvas.width;
          code.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
        if (code.x < -200) code.x = canvas.width + 50;
        if (code.x > canvas.width + 200) code.x = -50;

        // Fade near edges
        const edgeFade = Math.min(
          code.y / 100,
          (canvas.height - code.y) / 100,
          1
        );
        const alpha = code.opacity * Math.max(edgeFade, 0);

        ctx.fillStyle = `rgba(34, 211, 160, ${alpha})`;
        ctx.fillText(code.text, code.x, code.y);
      });

      // Draw small particles
      for (let i = 0; i < 25; i++) {
        const px = (Math.sin(time * 0.5 + i * 2.5) * 0.5 + 0.5) * canvas.width;
        const py = (Math.cos(time * 0.3 + i * 1.8) * 0.5 + 0.5) * canvas.height;
        const pAlpha = 0.08 + Math.sin(time + i) * 0.04;
        const pSize = 1.5 + Math.sin(time * 0.7 + i) * 0.5;

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 160, ${pAlpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Radial glow overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, hsl(155 75% 50% / 0.05), transparent 70%)",
        }}
      />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-48 h-48 bg-primary/[0.02] rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
}
