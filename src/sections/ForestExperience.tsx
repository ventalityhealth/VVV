"use client";
// Forest Experience — "The Canopy"
// GSAP ScrollTrigger: fade in the panel, parallax sun rays.
// Motion for React: the glass panel floats continuously.
import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Spores } from "@/components/Spores";
import { ArrowUpRight } from "@/components/icons";

export function ForestExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade panel in on scroll
      gsap.fromTo(panelRef.current,
        { opacity: 0, scale: 0.96, filter: "blur(8px)" },
        {
          opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: panelRef.current, start: "top 75%", once: true },
        }
      );

      // Parallax the background sun rays
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (!sectionRef.current) return;
          const rays = sectionRef.current.querySelector<HTMLDivElement>(".rays-layer");
          if (rays) gsap.set(rays, { y: self.progress * -40 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="our-forest"
      ref={sectionRef}
      className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-forest-950"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-5%,#2D4A2D_0%,#0B1A0B_55%,#050d05_100%)]" />
        <div className="absolute inset-0 bg-forest-900/40" />
      </div>

      {/* Sun rays (parallax layer) */}
      <div
        aria-hidden="true"
        className="rays-layer pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "conic-gradient(from 175deg at 50% -8%, transparent 0deg, rgba(201,169,110,0.3) 18deg, transparent 36deg, rgba(201,169,110,0.2) 64deg, transparent 80deg, rgba(201,169,110,0.25) 112deg, transparent 128deg)",
        }}
      />

      {/* Moss haze at bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-64 opacity-50"
        style={{
          background: "linear-gradient(to top, rgba(74,124,89,0.35), transparent)",
        }}
      />

      {/* Spores */}
      <Spores count={14} />

      {/* Panel */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div ref={panelRef} className="will-change-transform">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="forest-glass-strong max-w-2xl rounded-[2rem] p-10 md:p-14 text-center"
          >
            <p className="text-xs font-accent uppercase tracking-[0.25em] text-amber-gold/70 mb-6">
              The Canopy
            </p>
            <h2 className="font-heading italic text-3xl leading-tight text-cream md:text-4xl">
              The forest doesn&apos;t rush.
              <br />
              Neither do we.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-cream/65 leading-relaxed">
              Ventality is a living brand. As you explore, the forest reveals itself —
              new ingredients, new rituals, new growth.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="#the-grove"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="forest-glass-strong inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-cream hover:text-amber-gold transition-colors"
              >
                Begin your ritual
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
              <a
                href="#the-roots"
                className="text-sm text-cream/60 underline underline-offset-4 hover:text-amber-gold transition-colors"
              >
                Explore ingredients
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
