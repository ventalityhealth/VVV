"use client";
// Hero — "The Forest Threshold"
// GSAP cinematic timeline drives all entrance animations.
// Editorial direction: quiet dark canvas, strong type hierarchy, nature as a
// faint accent — not an atmosphere machine.
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Spores } from "@/components/Spores";
import { BlurText } from "@/components/BlurText";
import { ArrowUpRight, Leaf } from "@/components/icons";

// Optional: drop in a forest mp4 URL to enable the muted video layer.
// Empty array → clean CSS canvas (which is the intended editorial default).
const FOREST_VIDEO_SRC: string[] = [];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const subtextRef   = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const trustRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      const targets = [
        badgeRef.current,
        headlineRef.current,
        subtextRef.current,
        ctaRef.current,
        statsRef.current,
        trustRef.current,
      ].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: 18 });

      tl.to(badgeRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.3)
        .to(headlineRef.current,{ opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.5)
        .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.8)
        .to(ctaRef.current,     { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.0)
        .to(statsRef.current,   { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.15)
        .to(trustRef.current,   { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.3);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* ── Quiet canvas ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#14110f_0%,#0c0f0e_45%,#070908_100%)]" />
        {FOREST_VIDEO_SRC.length > 0 && (
          <video
            src={FOREST_VIDEO_SRC[0]}
            autoPlay muted loop playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
          />
        )}
        {/* one soft, static moss wash at the foot — no pulsing */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 120%, rgba(74,124,89,0.14) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ── Faint spores (accent texture only) ── */}
      <Spores className="z-[1]" count={7} />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-16 md:px-10">
        <div className="max-w-3xl">
          {/* Eyebrow / badge */}
          <div ref={badgeRef} className="will-change-transform">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[color:var(--line)] px-4 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-amber-gold opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-gold" />
              </span>
              <span className="eyebrow text-[0.65rem]">New — Mycelium Mind now shipping</span>
            </span>
          </div>

          {/* Headline — upright editorial serif */}
          <div ref={headlineRef} className="mt-8 will-change-transform">
            <BlurText
              text="Ancient forests, modern wellness."
              as="h1"
              delay={0}
              stagger={0.08}
              align="start"
              className="font-heading text-cream text-[2.75rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl"
            />
          </div>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="mt-7 max-w-xl text-base leading-relaxed text-cream/55 will-change-transform"
          >
            Pure, forest-born ingredients sourced through Supliful&apos;s verified supply
            chain and formulated in FDA-registered, GMP-certified facilities. No fiction —
            just nature, proven.
          </p>

          {/* CTA row */}
          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-3 will-change-transform">
            <a
              href="#the-grove"
              className="btn-primary rounded-full px-7 py-3.5 text-sm"
            >
              Shop the collection
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#the-roots"
              className="btn-secondary rounded-full px-6 py-3.5 text-sm"
            >
              <Leaf className="h-4 w-4 text-amber-gold" />
              Meet the ingredients
            </a>
          </div>

          {/* Stats — quiet, rule-separated, editorial */}
          <div
            ref={statsRef}
            className="mt-16 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] will-change-transform"
          >
            {[
              { value: "200+",    label: "Supliful-verified formulas" },
              { value: "FDA · GMP", label: "Certified facilities" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-forest-900 px-6 py-5">
                <div className="font-heading text-3xl leading-none tracking-[-0.01em] text-cream">{value}</div>
                <div className="mt-2 text-xs leading-tight text-cream/45">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust bar — bottom, full-width hairline */}
      <div
        ref={trustRef}
        className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-[color:var(--line)] lg:block will-change-transform"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-8 px-10 py-4">
          <span className="text-xs text-cream/35">Trusted by wellness seekers worldwide</span>
          <div className="flex items-center gap-7">
            {["Forest Alliance", "Pure Source", "Green Certified", "BioActive"].map((b) => (
              <span key={b} className="text-[10px] font-medium uppercase tracking-[0.18em] text-cream/30">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
