"use client";
import { useMemo } from "react";

interface SporesProps {
  count?: number;
  className?: string;
}

export function Spores({ count = 20, className = "" }: SporesProps) {
  const spores = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left:     Math.random() * 100,
        size:     1.5 + Math.random() * 2.5,
        driftX:   (Math.random() - 0.5) * 140,
        duration: 18 + Math.random() * 14,
        delay:    Math.random() * 24,
        opacity:  0.08 + Math.random() * 0.14,
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {spores.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-amber-gold animate-spore"
          style={
            {
              left:              `${s.left}%`,
              width:             `${s.size}px`,
              height:            `${s.size}px`,
              opacity:           s.opacity,
              animationDuration: `${s.duration}s`,
              animationDelay:    `${s.delay}s`,
              "--drift-x":       `${s.driftX}px`,
              boxShadow:         "0 0 6px rgba(201,169,110,0.3)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
