"use client";

import { motion } from "framer-motion";
import type { ProductBenefit } from "@/data/shilajit";

interface ScrollInfoCardsProps {
  headline: string;
  tagline: string;
  benefits: ProductBenefit[];
  disclaimer: string;
  /** Pre-revealed (reduced motion / static fallback). */
  drawn?: boolean;
}

/**
 * Live-HTML product info cards. Each `.info-card` is staggered in by the parent
 * scroll timeline; framer-motion drives the hover/tap micro-interactions.
 */
export function ScrollInfoCards({
  headline,
  tagline,
  benefits,
  disclaimer,
  drawn = false,
}: ScrollInfoCardsProps) {
  const hidden = drawn ? {} : { opacity: 0, transform: "translateY(24px)" };

  return (
    <div className="pointer-events-auto w-full max-w-md">
      <div className="info-card mb-6" style={hidden}>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-forest-300">
          Ventality
        </p>
        <h2 className="font-serif text-3xl leading-tight text-parchment sm:text-4xl">
          {headline}
        </h2>
        <p className="mt-3 text-base text-parchment/70">{tagline}</p>
      </div>

      <div className="space-y-3">
        {benefits.map((b) => (
          <motion.div
            key={b.title}
            className="info-card rounded-xl border border-forest-500/30 bg-white/[0.03] p-4 backdrop-blur-sm"
            style={hidden}
            whileHover={{ scale: 1.02, borderColor: "rgba(74,140,63,0.6)" }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <h3 className="font-serif text-lg text-gold">{b.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-parchment/70">{b.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="info-card mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-ink"
        style={hidden}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
      >
        Shop Shilajit
        <span aria-hidden>→</span>
      </motion.button>

      <p className="info-card mt-6 text-[11px] leading-relaxed text-parchment/40" style={hidden}>
        {disclaimer}
      </p>
    </div>
  );
}
