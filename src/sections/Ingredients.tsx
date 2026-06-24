// sections/Ingredients.tsx — "The Roots"
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp } from '@/lib/motion-variants';
import { MotionTokens } from '@/lib/motion-config';
import { Plus } from '@/components/icons';

interface Ingredient {
  name: string;
  thumb: string;
  // Supliful-sourced claim (placeholder — verify verbatim before launch)
  claim: string;
  detail: string;
  source: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    name: "Lion's Mane Extract",
    thumb: '#C9A96E',
    claim: 'Supports cognitive function',
    detail:
      'A functional mushroom traditionally used to support focus and mental clarity. Sourced through Supliful’s verified suppliers and third-party tested.',
    source: 'Fruiting body extract',
  },
  {
    name: 'KSM-66 Ashwagandha',
    thumb: '#8FBC9F',
    claim: 'Helps manage everyday stress',
    detail:
      'A full-spectrum root extract standardized for consistency, formulated to help the body adapt to everyday stress.',
    source: 'Root extract',
  },
  {
    name: 'Hydrolyzed Marine Collagen',
    thumb: '#E8D5B5',
    claim: 'Supports skin elasticity',
    detail:
      'Marine-derived collagen peptides that support skin elasticity, hair, and nails. Paired with hyaluronic acid and vitamin C.',
    source: 'Wild-caught marine source',
  },
  {
    name: 'Algal Oil DHA/EPA',
    thumb: '#6B9E7C',
    claim: 'Supports heart and brain health',
    detail:
      'A plant-based omega-3 grown from algae — a vegan source of DHA and EPA that supports heart and brain health.',
    source: 'Cultivated algae',
  },
];

export function Ingredients() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    [MotionTokens.parallax.depth, -MotionTokens.parallax.depth]
  );
  const fgY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      MotionTokens.parallax.depth * MotionTokens.parallax.fgSpeed,
      -MotionTokens.parallax.depth * MotionTokens.parallax.fgSpeed,
    ]
  );

  return (
    <section
      id="the-roots"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-bark px-6 py-24 md:px-16 lg:px-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left — photoreal ingredient visual (parallax) */}
        <div className="relative h-[420px] overflow-hidden rounded-[2rem] lg:h-[600px]">
          <motion.div
            style={{ y: imgY }}
            className="absolute inset-[-15%] bg-[radial-gradient(circle_at_30%_30%,#2D4A2D,transparent_55%),radial-gradient(circle_at_70%_70%,#4A7C59,transparent_50%),linear-gradient(160deg,#1C1410,#0B1A0B)]"
          />
          {/* moss / dew detail */}
          <motion.div
            style={{ y: fgY }}
            className="absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute left-[20%] top-[30%] h-40 w-40 rounded-full bg-forest-500/30 blur-2xl" />
            <div className="absolute right-[15%] bottom-[20%] h-52 w-52 rounded-full bg-amber-gold/20 blur-3xl" />
          </motion.div>
          <div className="forest-glass absolute bottom-6 left-6 rounded-full px-4 py-2 text-xs text-cream/70">
            Photographed · Documented · Third-party tested
          </div>
        </div>

        {/* Right — content */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="mb-4 text-sm font-body text-amber-gold/80">// The Roots</p>
            <h2 className="font-heading italic text-4xl leading-[0.95] tracking-[-2px] text-cream md:text-5xl">
              From forest floor to capsule.
            </h2>
            <p className="mt-4 max-w-md text-cream/60">
              We don&apos;t hide behind proprietary blends. Every ingredient in
              Ventality is traceable to Supliful&apos;s verified suppliers —
              photographed, documented, and third-party tested.
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="mt-8 flex flex-col gap-3">
            {INGREDIENTS.map((ing, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={ing.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="forest-glass overflow-hidden rounded-2xl"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 p-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="h-10 w-10 flex-shrink-0 rounded-lg"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${ing.thumb}, #1C1410)`,
                      }}
                      aria-hidden="true"
                    />
                    <span className="flex-1">
                      <span className="block font-heading italic text-lg text-cream">
                        {ing.name}
                      </span>
                      <span className="block text-xs text-amber-gold/80">
                        {ing.claim}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: MotionTokens.duration.fast }}
                      className="text-cream/60"
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: MotionTokens.duration.normal,
                          ease: [...MotionTokens.ease.gentle],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pl-[4.5rem] text-sm leading-relaxed text-cream/60">
                          {ing.detail}
                          <span className="mt-2 block text-xs text-cream/40">
                            Source: {ing.source}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
