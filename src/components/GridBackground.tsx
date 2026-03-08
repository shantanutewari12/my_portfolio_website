import { useEffect, useState } from "react";

const chars = "01{}[]<>/;:=()_.,-+*&^%$#@!~";

function Particle({ index }: { index: number }) {
  const left = `${(index * 17.3) % 100}%`;
  const delay = `${(index * 0.7) % 5}s`;
  const duration = `${3 + (index % 4)}s`;
  const size = 2 + (index % 3);

  return (
    <div
      className="absolute rounded-full bg-primary/30"
      style={{
        left,
        bottom: `-${size}px`,
        width: size,
        height: size,
        animation: `particle-float ${duration} ease-in-out ${delay} infinite`,
      }}
    />
  );
}

function FloatingChar({ index }: { index: number }) {
  const char = chars[index % chars.length];
  const left = `${(index * 23.7) % 95}%`;
  const top = `${(index * 31.3) % 90}%`;
  const delay = `${(index * 1.1) % 6}s`;

  return (
    <span
      className="absolute font-mono text-primary/[0.06] text-lg select-none pointer-events-none"
      style={{
        left,
        top,
        animation: `particle-float ${4 + (index % 3)}s ease-in-out ${delay} infinite`,
      }}
    >
      {char}
    </span>
  );
}

export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(155 75% 50% / 0.06), transparent 70%)",
        }}
      />

      {/* Floating code characters */}
      {Array.from({ length: 20 }, (_, i) => (
        <FloatingChar key={`c-${i}`} index={i} />
      ))}

      {/* Particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <Particle key={`p-${i}`} index={i} />
      ))}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/[0.03] rounded-full blur-[80px]" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/[0.04] rounded-full blur-[100px]" />
    </div>
  );
}
