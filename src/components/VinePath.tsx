"use client";

import { forwardRef } from "react";

/**
 * The three vine paths from `vine-primary.svg`, inlined so GSAP can drive
 * each one's stroke-dashoffset directly in the DOM. Geometry, colors and dash
 * lengths match the source SVG exactly (viewBox 0 0 800 1200).
 */
export type VineVariant = "main" | "branch-1" | "branch-2";

interface VineGeometry {
  d: string;
  stroke: string;
  width: number;
  dash: number;
}

export const VINES: Record<VineVariant, VineGeometry> = {
  main: {
    d: "M 400 0 C 420 80, 380 160, 350 240 S 400 380, 450 460 S 370 580, 320 660 S 420 800, 460 880 S 390 1000, 360 1100 S 420 1180, 400 1200",
    stroke: "#2d5a27",
    width: 6,
    dash: 2000,
  },
  "branch-1": {
    d: "M 450 460 C 520 500, 580 540, 620 600 S 660 700, 640 760",
    stroke: "#3a6b33",
    width: 3,
    dash: 600,
  },
  "branch-2": {
    d: "M 320 660 C 260 700, 200 740, 180 800 S 170 880, 190 920",
    stroke: "#3a6b33",
    width: 3,
    dash: 500,
  },
};

interface VinePathProps {
  variant: VineVariant;
  className?: string;
  /** Render fully grown (dashoffset 0) instead of hidden. */
  drawn?: boolean;
  preserveAspectRatio?: string;
}

/** A single vine path in its own full-bleed SVG. Forwards a ref to the <path>. */
export const VinePath = forwardRef<SVGPathElement, VinePathProps>(function VinePath(
  { variant, className, drawn = false, preserveAspectRatio = "xMidYMid meet" },
  ref,
) {
  const v = VINES[variant];
  return (
    <svg
      viewBox="0 0 800 1200"
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <path
        ref={ref}
        d={v.d}
        fill="none"
        stroke={v.stroke}
        strokeWidth={v.width}
        strokeLinecap="round"
        strokeDasharray={v.dash}
        strokeDashoffset={drawn ? 0 : v.dash}
        data-gsap={`vine-${variant}`}
      />
    </svg>
  );
});
