"use client";
// Hero — "The Forest Threshold"
// GSAP cinematic timeline drives all entrance animations.
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Spores } from "@/components/Spores";
import { BlurText } from "@/components/BlurText";
import { ArrowUpRight, Leaf, Tree } from "@/components/icons";

// Optional: drop in a Pexels / AI-generated forest mp4 URL to enable the video layer.
// Empty array → CSS atmosphere fallback (which looks great on its own).
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

      gsap.set(targets, { opacity: 0, y: 28, filter: "blur(8px)" });

      tl.to(badgeRef.current,   { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 0.3)
        .to(headlineRef.current,{ opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" }, 0.55)
        .to(subtextRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, 0.85)
        .to(ctaRef.current,     { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, 1.05)
        .to(statsRef.current,   { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }, 1.2)
        .to(trustRef.current,   { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }, 1.35);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden"
    >
      {/* ── Layer 0: CSS atmosphere ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,#1E331E_0%,#0B1A0B_50%,#050d05_100%)]" />
        {FOREST_VIDEO_SRC.length > 0 && (
          <video
            src={FOREST_VIDEO_SRC[0]}
            autoPlay muted loop playsInline
            className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-forest-900/45" />
      </div>

      {/* ── Layer 1: Bioluminescent glow ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute bottom-[-12%] left-1/2 -translate-x-1/2 h-[58vh] w-[75vw] rounded-full bg-amber-gold/15 animate-glow-pulse blur-3xl" />
        <div className="absolute bottom-[-18%] left-1/2 -translate-x-1/2 h-[50vh] w-[55vw] rounded-full bg-forest-500/25 animate-glow-pulse blur-[80px]"
          style={{ animationDelay: "2s" }} />
      </div>

      {/* ── Layer 2: Spores ── */}
      <Spores className="z-[2]" count={22} />

      {/* ── Layer 10: Content ── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-20 text-center">
        {/* Badge */}
        <div ref={badgeRef} className="will-change-transform">
          <span className="forest-glass inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-medium text-cream/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-amber-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-gold" />
            </span>
            New — Mycelium Mind now shipping
          </span>
        </div>

        {/* Headline — BlurText handles its own GSAP reveal */}
        <div ref={headlineRef} className="mt-6 will-change-transform">
          <BlurText
            text="Where Ancient Forests Meet Modern Wellness."
            as="h1"
            delay={0}
            stagger={0.09}
            align="center"
            className="font-heading italic text-cream text-5xl md:text-7xl lg:text-[5.25rem] leading-[0.9] tracking-[-3px] max-w-5xl"
          />
        </div>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="mt-6 max-w-xl text-sm md:text-base font-light leading-relaxed text-cream/65 will-change-transform"
        >
          Ventality sources pure, forest-born ingredients through Supliful&apos;s verified supply
          chain — formulated in FDA-registered, GMP-certified facilities. No fiction. Just
          nature, proven.
        </p>

        {/* CTA row */}
        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center justify-center gap-4 will-change-transform">
          <a
            href="#the-grove"
            className="forest-glass-strong inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-cream hover:text-amber-gold transition-colors duration-200"
          >
            Shop the Collection
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#the-roots"
            className="inline-flex items-center gap-2 text-cream/75 underline underline-offset-4 hover:text-amber-gold transition-colors duration-200"
          >
            <Leaf className="h-4 w-4 text-amber-gold" />
            Meet the Ingredients
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-10 flex flex-wrap items-center justify-center gap-5 will-change-transform">
          {[
            { icon: <Leaf className="h-6 w-6 text-amber-gold" />, value: "200+",     label: "Supliful Verified Formulas" },
            { icon: <Tree className="h-6 w-6 text-amber-gold" />, value: "FDA+GMP",  label: "Facility Certified" },
          ].map(({ icon, value, label }) => (
            <div key={label} className="forest-glass w-[190px] rounded-[1.25rem] p-5 text-left">
              {icon}
              <div className="mt-3 font-heading italic text-3xl leading-none tracking-[-1px] text-cream">{value}</div>
              <div className="mt-1 text-[11px] text-cream/55 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div
          ref={trustRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block will-change-transform"
        >
          <div className="forest-glass flex items-center gap-7 rounded-full px-7 py-3">
            <span className="text-xs text-cream/45">Trusted by wellness seekers worldwide</span>
            {["Forest Alliance", "Pure Source", "Green Certified", "BioActive"].map((b) => (
              <span key={b} className="text-[10px] font-medium uppercase tracking-widest text-cream/35">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 z-[5] h-36 bg-gradient-to-b from-transparent to-forest-900" />
    </section>
  );
}
