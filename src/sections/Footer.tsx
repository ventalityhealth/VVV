// sections/Footer.tsx — "The Soil"
import { motion } from 'framer-motion';
import { staggerContainerTight, fadeUp } from '@/lib/motion-variants';
import { ArrowRight, Leaf } from '@/components/icons';

const LINK_GROUPS: { title: string; links: string[] }[] = [
  { title: 'Explore', links: ['Shop', 'About', 'Ingredients', 'Journal'] },
  { title: 'Support', links: ['Contact', 'FAQ', 'Shipping', 'Returns'] },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-forest-900 px-6 pb-10 pt-20 md:px-16">
      <motion.div
        variants={staggerContainerTight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl"
      >
        {/* Top row */}
        <div className="grid gap-12 border-b border-forest-600/40 pb-12 lg:grid-cols-2">
          {/* Brand + newsletter */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3">
              <span className="forest-glass flex h-12 w-12 items-center justify-center rounded-full">
                <span className="font-heading italic text-2xl text-cream">V</span>
              </span>
              <span className="font-heading italic text-2xl text-cream">
                Ventality
              </span>
            </div>
            <p className="mt-4 max-w-sm font-accent text-sm uppercase tracking-[0.2em] text-amber-gold/70">
              Where the forest meets the formula.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="forest-glass mt-6 flex max-w-md items-center gap-2 rounded-full p-1.5"
            >
              <Leaf className="ml-3 h-5 w-5 flex-shrink-0 text-amber-gold" />
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email address"
                className="flex-1 bg-transparent px-2 py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button
                type="submit"
                className="forest-glass-strong inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-cream hover:text-amber-gold transition-colors"
              >
                Grow with us
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

          {/* Links grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-8 sm:gap-12">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-medium uppercase tracking-wider text-amber-gold/80">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map((link) => {
                    const managed =
                      link === 'Shipping' || link === 'Returns';
                    return (
                      <li key={link}>
                        <a
                          href={`#${link.toLowerCase()}`}
                          className="nav-link text-sm text-cream/60 transition-colors hover:text-cream"
                        >
                          {link}
                          {managed && (
                            <span className="ml-1 text-[10px] text-cream/30">
                              (Supliful-managed)
                            </span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
        >
          <p className="text-xs text-cream/40">
            © 2026 Ventality. All products fulfilled by Supliful.
          </p>
          <div className="flex items-center gap-4 text-xs text-cream/50">
            <a href="#" className="hover:text-amber-gold transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-amber-gold transition-colors">
              TikTok
            </a>
            <a href="#" className="hover:text-amber-gold transition-colors">
              Pinterest
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
