// sections/ForestExperience.tsx — "The Canopy"
import { motion } from 'framer-motion';
import { ForestVideo } from '@/components/ForestVideo';
import { Spores } from '@/components/Spores';
import { fadeIn, forestFloat } from '@/lib/motion-variants';
import { ArrowUpRight } from '@/components/icons';

// Optional full-bleed forest drift loop. Empty → CSS atmosphere fallback.
const CANOPY_VIDEO_SRC: string[] = [];

export function ForestExperience() {
  return (
    <section
      id="our-forest"
      className="relative h-[80vh] min-h-[560px] w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#2D4A2D_0%,#0B1A0B_60%,#050D05_100%)]" />
        {CANOPY_VIDEO_SRC.length > 0 && (
          <ForestVideo
            src={CANOPY_VIDEO_SRC}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-forest-900/40" />
      </div>

      {/* Sun rays */}
      <div
        className="absolute inset-0 opacity-30 [background:conic-gradient(from_180deg_at_50%_-10%,transparent_0deg,rgba(201,169,110,0.25)_20deg,transparent_40deg,rgba(201,169,110,0.2)_70deg,transparent_90deg)]"
        aria-hidden="true"
      />
      <Spores count={14} />

      {/* Overlay panel */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            variants={forestFloat}
            animate="animate"
            className="forest-glass-strong max-w-2xl rounded-[2rem] p-10 text-center"
          >
            <h2 className="font-heading italic text-3xl leading-tight text-cream md:text-4xl">
              The forest doesn&apos;t rush. Neither do we.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/70">
              Ventality is a living brand. As you explore, the forest reveals
              itself — new ingredients, new rituals, new growth.
            </p>
            <a
              href="#the-grove"
              className="forest-glass-strong mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-cream hover:text-amber-gold transition-colors"
            >
              Begin your ritual
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
