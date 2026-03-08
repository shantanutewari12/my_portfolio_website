import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
  alpha: number;
  phase: number;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const mouse = useRef({ x: -9999, y: -9999 });

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

    const onMove = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    // Create orbs — big soft glowing bubbles
    const orbs: Orb[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 30 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      hue: Math.random() > 0.3 ? 155 : 265, // green or purple
      alpha: 0.03 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const orb of orbs) {
        // ── Mouse repulsion ──
        const dx = orb.x - mx;
        const dy = orb.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 180;

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 2.5;
          orb.vx += (dx / dist) * force * 0.08;
          orb.vy += (dy / dist) * force * 0.08;
        }

        // ── Drift + damping ──
        orb.vx *= 0.995;
        orb.vy *= 0.995;

        // Gentle wobble
        orb.vx += Math.sin(t * 0.5 + orb.phase) * 0.005;
        orb.vy += Math.cos(t * 0.4 + orb.phase) * 0.005;

        orb.x += orb.vx;
        orb.y += orb.vy;

        // Wrap edges softly
        if (orb.x < -orb.r * 2) orb.x = W + orb.r;
        if (orb.x > W + orb.r * 2) orb.x = -orb.r;
        if (orb.y < -orb.r * 2) orb.y = H + orb.r;
        if (orb.y > H + orb.r * 2) orb.y = -orb.r;

        // ── Mouse proximity glow boost ──
        const glowBoost = dist < 250 ? (1 - dist / 250) * 0.06 : 0;
        const pulse = Math.sin(t * 1.5 + orb.phase) * 0.008;
        const a = orb.alpha + pulse + glowBoost;

        const isGreen = orb.hue === 155;
        const rgb = isGreen ? "34,211,160" : "147,51,234";

        // Outer soft glow (large radius)
        const g1 = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r * 3);
        g1.addColorStop(0, `rgba(${rgb},${a * 0.7})`);
        g1.addColorStop(0.5, `rgba(${rgb},${a * 0.2})`);
        g1.addColorStop(1, `rgba(${rgb},0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r * 3, 0, 6.283);
        ctx.fillStyle = g1;
        ctx.fill();

        // Inner core
        const g2 = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g2.addColorStop(0, `rgba(${rgb},${a * 1.5})`);
        g2.addColorStop(0.6, `rgba(${rgb},${a * 0.4})`);
        g2.addColorStop(1, `rgba(${rgb},0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, 6.283);
        ctx.fillStyle = g2;
        ctx.fill();

        // Bubble ring
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r * 0.9, 0, 6.283);
        ctx.strokeStyle = `rgba(${rgb},${a * 0.8})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Specular highlight
        ctx.beginPath();
        ctx.arc(orb.x - orb.r * 0.2, orb.y - orb.r * 0.25, orb.r * 0.12, 0, 6.283);
        ctx.fillStyle = `rgba(255,255,255,${a * 0.5})`;
        ctx.fill();
      }

      // ── Connections between nearby orbs ──
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const dx = orbs[i].x - orbs[j].x;
          const dy = orbs[i].y - orbs[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 40000) { // 200px
            const a = (1 - Math.sqrt(d2) / 200) * 0.015;
            ctx.beginPath();
            ctx.moveTo(orbs[i].x, orbs[i].y);
            ctx.lineTo(orbs[j].x, orbs[j].y);
            ctx.strokeStyle = `rgba(34,211,160,${a})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-auto" />
    </div>
  );
}
