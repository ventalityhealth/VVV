// sections/Hero.tsx — "The Forest Threshold"
import { motion } from 'framer-motion';
import { ForestVideo } from '@/components/ForestVideo';
import { Spores } from '@/components/Spores';
import { BlurText } from '@/components/BlurText';
import { ArrowUpRight, Leaf, Tree } from '@/components/icons';
import { fadeUp } from '@/lib/motion-variants';

// Optional atmospheric forest loop. Leave empty to rely on the CSS atmosphere
// layers, or drop in a Pexels / AI-generated forest mp4 URL.
const FOREST_VIDEO_SRC: string[] = [];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const TRUST_BADGES = ['Forest Alliance', 'Pure Source', 'Green Certified', 'BioActive'];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[720px] w-full overflow-hidden"
    >
      {/* Layer 0 — atmosphere (CSS gradient base + optional video) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,#1E331E_0%,#0B1A0B_55%,#050D05_100%)]" />
        {FOREST_VIDEO_SRC.length > 0 && (
          <ForestVideo
            src={FOREST_VIDEO_SRC}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-forest-900/50" />
      </div>

      {/* Layer 1 — bioluminescent glow */}
      <div
        className="absolute bottom-[-10%] left-1/2 z-[1] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-amber-gold/20 animate-glow-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-20%] left-1/2 z-[1] h-[50vh] w-[60vw] -translate-x-1/2 rounded-full bg-forest-500/30 animate-glow-pulse"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />

      {/* Layer 2 — floating spores */}
      <Spores className="z-[2]" count={20} />

      {/* Layer 10 — content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-24 text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="forest-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-cream/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-gold" />
            </span>
            New — Mycelium Mind now shipping
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={fadeUp} className="mt-6">
          <BlurText
            text="Where Ancient Forests Meet Modern Wellness."
            className="font-heading italic text-cream leading-[0.9] tracking-[-3px] text-5xl md:text-7xl lg:text-[5rem] max-w-5xl"
          />
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-center text-sm md:text-base font-light leading-relaxed text-cream/70"
        >
          Ventality sources pure, forest-born ingredients through Supliful&apos;s
          verified supply chain — formulated in FDA-registered, GMP-certified
          facilities. No fiction. Just nature, proven.
        </motion.p>

        {/* CTA Row */}
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#the-grove"
            className="forest-glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-cream hover:text-amber-gold transition-colors"
          >
            Shop the Collection
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#the-roots"
            className="inline-flex items-center gap-2 text-cream/80 underline underline-offset-4 hover:text-amber-gold transition-colors"
          >
            <Leaf className="h-4 w-4 text-amber-gold" />
            Meet the Ingredients
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <div className="forest-glass w-[200px] rounded-[1.25rem] p-5 text-left">
            <Leaf className="h-6 w-6 text-amber-gold" />
            <div className="mt-3 font-heading italic text-4xl leading-none tracking-[-1px] text-cream">
              200+
            </div>
            <div className="mt-1 text-xs text-cream/60">Supliful Verified Formulas</div>
          </div>
          <div className="forest-glass w-[200px] rounded-[1.25rem] p-5 text-left">
            <Tree className="h-6 w-6 text-amber-gold" />
            <div className="mt-3 font-heading italic text-4xl leading-none tracking-[-1px] text-cream">
              FDA + GMP
            </div>
            <div className="mt-1 text-xs text-cream/60">Facility Certified</div>
          </div>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          variants={fadeUp}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <div className="forest-glass flex items-center gap-6 rounded-full px-6 py-3">
            <span className="text-xs text-cream/50">
              Trusted by wellness seekers worldwide
            </span>
            <div className="flex items-center gap-5">
              {TRUST_BADGES.map((name) => (
                <span
                  key={name}
                  className="text-xs font-medium uppercase tracking-wider text-cream/40"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-32 bg-gradient-to-b from-transparent to-forest-900" />
    </section>
  );
}
