"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ASSETS } from "@/lib/assets";
import { shilajit } from "@/data/shilajit";
import { VinePath } from "./VinePath";
import { BloomingLeaves, type LeafPosition } from "./BloomingLeaves";
import { ScrollInfoCards } from "./ScrollInfoCards";

// Leaves sprouting along the front vine (positioned within the wrap stack).
const LEAVES: LeafPosition[] = [
  { x: 54, y: 30, rotation: -28, size: 30 },
  { x: 44, y: 39, rotation: 26, size: 38 },
  { x: 58, y: 47, rotation: -18, size: 26 },
  { x: 42, y: 55, rotation: 34, size: 34 },
  { x: 60, y: 62, rotation: -32, size: 28 },
  { x: 45, y: 70, rotation: 20, size: 40 },
  { x: 56, y: 77, rotation: -24, size: 24 },
  { x: 46, y: 84, rotation: 30, size: 32 },
];

/**
 * Pinned product reveal. A single scrubbed timeline sequences the layered
 * depth: back vine → bottle → front vine wrap → blooming leaves → golden glow
 * sweep → live info cards. Separate back/front vine layers create the illusion
 * of the branch wrapping AROUND the bottle (z-40 behind, z-60 in front).
 */
export function ProductWrapScene({ product = "shilajit" }: { product?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const backVineRef = useRef<SVGPathElement>(null);
  const frontVineRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      // Static fallback: everything fully revealed, no pin/scrub.
      const ctx = gsap.context(() => {
        gsap.set([backVineRef.current, frontVineRef.current], { strokeDashoffset: 0 });
        gsap.set(".bottle-img", { opacity: 1, scale: 1 });
        gsap.set(".bloom-leaf", { opacity: 1, scale: 1 });
        gsap.set(".info-card", { opacity: 1, y: 0 });
      }, sectionRef);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      gsap.set(".bottle-img", { opacity: 0, scale: 0.95 });
      gsap.set(".glow-sweep", { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=160%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(backVineRef.current, { strokeDashoffset: 0, duration: 1 }, 0)
        .to(".bottle-img", { opacity: 1, scale: 1, ease: "power2.out", duration: 0.8 }, 0.15)
        .to(frontVineRef.current, { strokeDashoffset: 0, duration: 1.2 }, 0.45)
        .to(
          ".bloom-leaf",
          { opacity: 1, scale: 1, stagger: 0.06, ease: "back.out(1.6)", duration: 0.5 },
          0.8,
        )
        .fromTo(
          ".glow-sweep",
          { opacity: 0, xPercent: -45 },
          { opacity: 0.85, xPercent: 45, duration: 1 },
          0.7,
        )
        .to(".glow-sweep", { opacity: 0, ease: "power1.in", duration: 0.4 }, 1.4)
        .to(
          ".info-card",
          { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out", duration: 0.6 },
          1.0,
        );
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      data-product={product}
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      {/* z-0: wet-stone base */}
      <Image
        src={ASSETS.shilajit.wetStone}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_42%,rgba(40,30,18,0.35),rgba(10,10,10,0.92))]" />

      {/* wrap stack — centered on mobile, shifted left on desktop */}
      <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center md:left-[9%] md:translate-x-0">
        <div className="relative h-[80vh] w-[min(92vw,440px)]">
          {/* z-40: back vine (behind bottle) */}
          <div className="absolute inset-0 z-[40]">
            <VinePath ref={backVineRef} variant="branch-2" drawn={reduced} />
          </div>

          {/* z-50: the bottle */}
          <div className="absolute inset-0 z-[50] flex items-center justify-center">
            <Image
              src={ASSETS.shilajit.bottleComposite}
              alt={`Ventality ${shilajit.headline}`}
              width={440}
              height={782}
              loading="lazy"
              className="bottle-img h-auto max-h-[80vh] w-auto object-contain"
              style={{ opacity: reduced ? 1 : 0 }}
            />
          </div>

          {/* z-55: golden light sweep (desktop only) */}
          <div className="glow-sweep absolute inset-0 z-[55] hidden mix-blend-screen md:block">
            <Image src={ASSETS.botanical.glow} alt="" fill sizes="50vw" className="object-contain" />
          </div>

          {/* z-60: front vine (wraps over bottle) */}
          <div className="absolute inset-0 z-[60]">
            <VinePath ref={frontVineRef} variant="main" drawn={reduced} />
          </div>

          {/* z-70: blooming leaves */}
          <BloomingLeaves className="absolute inset-0 z-[70]" positions={LEAVES} drawn={reduced} />
        </div>
      </div>

      {/* z-90: live info cards — bottom overlay on mobile, right rail on desktop */}
      <div className="absolute inset-x-0 bottom-0 z-[90] bg-gradient-to-t from-ink via-ink/85 to-transparent px-6 pb-8 pt-20 md:inset-x-auto md:bottom-auto md:right-[7%] md:top-1/2 md:-translate-y-1/2 md:bg-none md:from-transparent md:to-transparent md:p-0">
        <ScrollInfoCards
          headline={shilajit.headline}
          tagline={shilajit.tagline}
          benefits={shilajit.benefits}
          disclaimer={shilajit.disclaimer}
          drawn={reduced}
        />
      </div>
    </section>
  );
}
