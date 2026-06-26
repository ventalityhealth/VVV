"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { VinePath } from "./VinePath";

/**
 * Transition section (~180vh of scroll). The main vine descends from the hero
 * and two offshoots branch out — drawn via GSAP stroke-dashoffset scrubbed to
 * scroll. A sticky inner stage keeps the vine in view while the section passes.
 */
export function BranchTravelScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainRef = useRef<SVGPathElement>(null);
  const branch1Ref = useRef<SVGPathElement>(null);
  const branch2Ref = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      // Static fallback: fully drawn vines, no growth animation.
      [mainRef, branch1Ref, branch2Ref].forEach((r) => {
        if (r.current) gsap.set(r.current, { strokeDashoffset: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      const base = {
        trigger: sectionRef.current,
        scrub: 0.5 as const,
      };
      gsap.to(mainRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { ...base, start: "top top", end: "70% bottom" },
      });
      gsap.to(branch1Ref.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { ...base, start: "38% bottom", end: "85% bottom" },
      });
      gsap.to(branch2Ref.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { ...base, start: "42% bottom", end: "90% bottom" },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="branch-section relative h-[180vh] w-full bg-ink">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="relative h-[90vh] w-full max-w-[720px]">
          <div className="absolute inset-0">
            <VinePath ref={mainRef} variant="main" />
          </div>
          {/* offshoots — hidden on mobile per the brief (main vine only) */}
          <div className="absolute inset-0 hidden md:block">
            <VinePath ref={branch1Ref} variant="branch-1" />
          </div>
          <div className="absolute inset-0 hidden md:block">
            <VinePath ref={branch2Ref} variant="branch-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
