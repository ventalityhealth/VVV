"use client";
// SVG branch that grows as the user scrolls — GSAP stroke-dashoffset technique.
// No premium plugins required; works with core GSAP + ScrollTrigger.
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface BranchSVGProps {
  className?: string;
  /** start / end scroll positions as CSS strings, e.g. "top 80%" */
  scrollStart?: string;
  scrollEnd?: string;
  color?: string;
  opacity?: number;
}

export function BranchSVG({
  className = "",
  scrollStart = "top 85%",
  scrollEnd   = "bottom 30%",
  color       = "#4A7C59",
  opacity     = 0.55,
}: BranchSVGProps) {
  const svgRef  = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  // side branches (decorative)
  const branchRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const svg   = svgRef.current;
    const trunk = pathRef.current;
    if (!svg || !trunk) return;

    const setupPath = (el: SVGPathElement, delay = 0) => {
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      return { el, len, delay };
    };

    const paths = [
      setupPath(trunk, 0),
      ...branchRefs.current
        .filter((p): p is SVGPathElement => p !== null)
        .map((p, i) => setupPath(p, 0.15 + i * 0.12)),
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start:   scrollStart,
        end:     scrollEnd,
        scrub:   1.5,
      },
    });

    paths.forEach(({ el, delay }) => {
      tl.to(el, { strokeDashoffset: 0, ease: "none", duration: 1 }, delay);
    });

    // Leaf bloom at the tip — scale from 0
    const leaves = svg.querySelectorAll(".leaf-bloom");
    if (leaves.length) {
      gsap.set(leaves, { scale: 0, transformOrigin: "center center" });
      tl.to(leaves, { scale: 1, ease: "back.out(1.8)", stagger: 0.08, duration: 0.4 }, 0.7);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === svg) st.kill();
      });
    };
  }, [scrollStart, scrollEnd]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 600"
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      {/* Main trunk */}
      <path
        ref={pathRef}
        d="M60 580 C58 520 45 460 55 400 C65 340 40 280 55 220 C70 160 50 100 60 40"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={opacity}
      />

      {/* Left branch 1 */}
      <path
        ref={(el) => { branchRefs.current[0] = el; }}
        d="M53 370 C35 355 18 340 10 318"
        fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity={opacity * 0.9}
      />
      {/* Right branch 1 */}
      <path
        ref={(el) => { branchRefs.current[1] = el; }}
        d="M57 300 C75 285 88 268 96 248"
        fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity={opacity * 0.9}
      />
      {/* Left branch 2 */}
      <path
        ref={(el) => { branchRefs.current[2] = el; }}
        d="M55 220 C38 208 24 195 14 178"
        fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={opacity * 0.8}
      />
      {/* Right branch 2 */}
      <path
        ref={(el) => { branchRefs.current[3] = el; }}
        d="M58 170 C74 155 86 138 94 118"
        fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={opacity * 0.8}
      />
      {/* Small left twig */}
      <path
        ref={(el) => { branchRefs.current[4] = el; }}
        d="M10 318 C4 308 2 296 6 284"
        fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity={opacity * 0.7}
      />

      {/* Leaf blooms at branch tips */}
      <ellipse className="leaf-bloom" cx="10" cy="315" rx="5" ry="8"
        fill={color} opacity="0.5" transform="rotate(-20,10,315)" />
      <ellipse className="leaf-bloom" cx="96" cy="246" rx="5" ry="8"
        fill={color} opacity="0.5" transform="rotate(15,96,246)" />
      <ellipse className="leaf-bloom" cx="14" cy="176" rx="4" ry="7"
        fill={color} opacity="0.45" transform="rotate(-25,14,176)" />
      <ellipse className="leaf-bloom" cx="60" cy="38"  rx="6" ry="9"
        fill={color} opacity="0.55" />
    </svg>
  );
}
