"use client";
// Ingredients — "The Roots"
// GSAP: parallax on the visual panel, text fade-in on scroll.
// Motion for React: accordion open/close with AnimatePresence + layout.
import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PlusIcon } from "@/components/icons";
import { spring } from "@/lib/motion-tokens";

interface Ingredient {
  name: string;
  hue: string;
  claim: string;
  detail: string;
  source: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    name: "Lion's Mane Extract",
    hue: "#C9A96E",
    claim: "Supports cognitive function",
    detail:
      "A functional mushroom traditionally used to support focus and mental clarity. " +
      "Sourced through Supliful's verified suppliers and third-party tested.",
    source: "Fruiting body extract",
  },
  {
    name: "KSM-66 Ashwagandha",
    hue: "#8FBC9F",
    claim: "Helps manage everyday stress",
    detail:
      "A full-spectrum root extract standardized for consistency, formulated to help the " +
      "body adapt to everyday stress.",
    source: "Root extract",
  },
  {
    name: "Hydrolyzed Marine Collagen",
    hue: "#E8D5B5",
    claim: "Supports skin elasticity",
    detail:
      "Marine-derived collagen peptides that support skin elasticity, hair, and nails. " +
      "Paired with hyaluronic acid and vitamin C.",
    source: "Wild-caught marine source",
  },
  {
    name: "Algal Oil DHA/EPA",
    hue: "#6B9E7C",
    claim: "Supports heart and brain health",
    detail:
      "A plant-based omega-3 grown from algae — a vegan source of DHA and EPA that " +
      "supports heart and brain health.",
    source: "Cultivated algae",
  },
  {
    name: "Melatonin + Valerian Root",
    hue: "#4A7C59",
    claim: "Supports restful sleep",
    detail:
      "A soothing nighttime duo. Melatonin supports sleep onset; Valerian Root promotes " +
      "relaxation. Paired with Chamomile and Magnesium Glycinate.",
    source: "Standardized botanical extracts",
  },
];

export function Ingredients() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef  = useRef<HTMLElement>(null);
  const visualRef   = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the visual panel
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const y = self.progress * 60 - 30;
          if (visualRef.current) gsap.set(visualRef.current, { y });
        },
      });

      // Content fade-in
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 30, filter: "blur(6px)" },
        {
          opacity: 1, x: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 78%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="the-roots"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-bark px-6 py-28 md:px-14 lg:px-24"
    >
      {/* Ambient light — faint accent */}
      <div aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 18% 50%, rgba(74,124,89,0.10) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 82% 18%, rgba(201,169,110,0.08) 0%, transparent 45%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

        {/* ── Visual panel (parallax) ── */}
        <div className="relative h-[420px] overflow-hidden rounded-[2rem] lg:h-[620px]">
          <div
            ref={visualRef}
            className="absolute inset-[-15%] will-change-transform"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, rgba(74,124,89,0.30), transparent 55%), " +
                "radial-gradient(circle at 75% 78%, rgba(45,74,45,0.40), transparent 55%), " +
                "linear-gradient(160deg, #141715, #0a0c0b)",
            }}
          />
          {/* Leaf-layers SVG composition */}
          <svg
            viewBox="0 0 400 500"
            className="absolute inset-0 h-full w-full opacity-30"
            aria-hidden="true"
          >
            <ellipse cx="200" cy="250" rx="160" ry="200" fill="#4A7C59" opacity="0.2" />
            {/* stylized leaf shapes */}
            {[
              { x1: 120, y1: 80,  x2: 200, y2: 300, x3: 280, y3: 80  },
              { x1: 60,  y1: 200, x2: 200, y2: 380, x3: 340, y3: 200 },
              { x1: 150, y1: 160, x2: 200, y2: 420, x3: 250, y3: 160 },
            ].map(({ x1, y1, x2, y2, x3, y3 }, i) => (
              <path
                key={i}
                d={`M${x1} ${y1} Q${x2} ${y2} ${x3} ${y3}`}
                fill="none"
                stroke="#4A7C59"
                strokeWidth="1.5"
                opacity={0.4 - i * 0.08}
              />
            ))}
            {/* dew drops */}
            {[
              [170, 140], [230, 190], [145, 260], [255, 310], [190, 380],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#4A7C59" opacity="0.5" />
            ))}
          </svg>
          <div className="forest-glass absolute bottom-5 left-5 rounded-full px-4 py-2 text-xs text-cream/65">
            Photographed · Documented · Third-party tested
          </div>
        </div>

        {/* ── Content ── */}
        <div ref={contentRef} className="will-change-transform">
          <p className="eyebrow mb-5">The Roots · Provenance</p>
          <h2 className="font-heading text-4xl leading-[1.04] tracking-[-0.02em] text-cream md:text-5xl">
            From forest floor to capsule.
          </h2>
          <p className="mt-6 max-w-md text-cream/55 leading-relaxed">
            We don&apos;t hide behind proprietary blends. Every ingredient in Ventality is
            traceable to Supliful&apos;s verified suppliers — photographed, documented, and
            third-party tested.
          </p>

          {/* Accordion */}
          <LayoutGroup>
            <div className="mt-9 flex flex-col gap-3">
              {INGREDIENTS.map((ing, i) => {
                const isOpen = openIndex === i;
                return (
                  <motion.div
                    key={ing.name}
                    layout
                    className="forest-glass rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center gap-4 p-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="h-10 w-10 flex-shrink-0 rounded-xl"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, ${ing.hue}, #1C1410)`,
                        }}
                        aria-hidden="true"
                      />
                      <span className="flex-1 min-w-0">
                        <span className="block font-heading text-lg text-cream truncate">{ing.name}</span>
                        <span className="block text-xs text-amber-gold/75 mt-0.5">{ing.claim}</span>
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={spring.snappy}
                        className="text-cream/50 flex-shrink-0"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-5 pl-[4.5rem]">
                            <p className="text-sm text-cream/60 leading-relaxed">{ing.detail}</p>
                            <p className="mt-2 text-xs text-cream/35">Source: {ing.source}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
}
