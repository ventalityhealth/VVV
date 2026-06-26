"use client";

import { Leaf } from "./Leaf";

export interface LeafPosition {
  x: number; // percentage of container width
  y: number; // percentage of container height
  rotation: number;
  size: number; // leaf size in px
}

interface BloomingLeavesProps {
  positions: LeafPosition[];
  /** Pre-revealed (reduced motion / static fallback). */
  drawn?: boolean;
  className?: string;
}

const FILLS = ["#2d5a27", "#3a6b33", "#4a8c3f"];

/**
 * Leaves that sprout along the wrapped vine. Rotation/position live on the
 * outer wrapper; the inner `.bloom-leaf` is what the parent scroll timeline
 * scales + fades in (staggered), so GSAP never fights an inline transform.
 */
export function BloomingLeaves({ positions, drawn = false, className }: BloomingLeavesProps) {
  return (
    <div className={className} aria-hidden="true">
      {positions.map((p, i) => (
        <span
          key={i}
          className="absolute block"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            transformOrigin: "center",
          }}
        >
          <span
            className="bloom-leaf block"
            style={{
              opacity: drawn ? 1 : 0,
              transform: `scale(${drawn ? 1 : 0.3})`,
              transformOrigin: "center bottom",
              willChange: "transform, opacity",
            }}
          >
            <Leaf fill={FILLS[i % FILLS.length]} size={p.size} />
          </span>
        </span>
      ))}
    </div>
  );
}
