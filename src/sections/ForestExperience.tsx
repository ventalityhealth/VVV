"use client";
// Forest Experience — "The Canopy"
// GSAP ScrollTrigger: pin the section, fade in the panel, float continuously.
// Motion for React: the glass panel floats with an animate variant.
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
      {/* Atmosphere — quiet, one subtle moss bloom at the crown */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,#16201a_0%,#0c0f0e_50%,#070908_100%)]" />
      </div>

      {/* Sun rays (parallax layer) — faint accent */}
      <div
        aria-hidden="true"
        className="rays-layer pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "conic-gradient(from 175deg at 50% -8%, transparent 0deg, rgba(201,169,110,0.3) 18deg, transparent 40deg, rgba(201,169,110,0.18) 70deg, transparent 90deg, rgba(201,169,110,0.22) 120deg, transparent 140deg)",
        }}
      />

      {/* Moss haze at bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-56 opacity-40"
        style={{
          background: "linear-gradient(to top, rgba(74,124,89,0.18), transparent)",
        }}
      />

      {/* Spores — faint */}
      <Spores count={8} />

      {/* Panel */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div ref={panelRef} className="will-change-transform">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            className="forest-glass-strong max-w-2xl rounded-[1.75rem] p-10 text-center md:p-14"
          >
            <p className="eyebrow mb-6">The Canopy</p>
            <h2 className="font-heading text-3xl leading-[1.1] text-cream md:text-4xl">
              The forest doesn&apos;t rush.
              <br />
              Neither do we.
            </h2>
            <p className="mx-auto mt-6 max-w-lg leading-relaxed text-cream/60">
              Ventality is a living brand. As the catalog grows, the forest reveals itself —
              new formulas, new provenance, new growth.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="#the-grove"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary rounded-full px-7 py-3.5 text-sm"
              >
                Shop the collection
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
              <a
                href="#the-roots"
                className="btn-secondary rounded-full px-6 py-3.5 text-sm"
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
