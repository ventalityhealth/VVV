// components/Navigation.tsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Close, Menu } from './icons';
import { MotionTokens } from '@/lib/motion-config';

const LINKS = ['Shop', 'Our Forest', 'Ingredients', 'Journal', 'Contact'];

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: MotionTokens.duration.slow, ease: [...MotionTokens.ease.cinematic] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Brand mark */}
        <a href="#hero" className="flex items-center gap-3">
          <span className="forest-glass h-12 w-12 rounded-full flex items-center justify-center">
            <span className="font-heading italic text-2xl text-cream">V</span>
          </span>
          <span className="hidden sm:block font-heading italic text-xl text-cream tracking-tight">
            Ventality
          </span>
        </a>

        {/* Center links */}
        <div className="hidden md:flex forest-glass rounded-full px-6 py-2.5 items-center gap-7">
          {LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="nav-link text-sm font-medium text-cream/80 hover:text-amber-gold transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <a
          href="#the-grove"
          className="hidden md:inline-flex forest-glass-strong rounded-full px-5 py-2.5 items-center gap-2 text-sm font-medium text-cream hover:text-amber-gold transition-colors"
        >
          Enter the Forest
          <ArrowUpRight className="h-4 w-4" />
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden forest-glass h-11 w-11 rounded-full flex items-center justify-center text-cream"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-forest-900/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: MotionTokens.duration.normal, ease: [...MotionTokens.ease.cinematic] }}
              className="fixed top-0 right-0 h-full w-72 forest-glass-strong z-50 p-8 md:hidden flex flex-col gap-6"
            >
              <button
                className="self-end text-cream"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <Close className="h-6 w-6" />
              </button>
              {LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setOpen(false)}
                  className="font-heading italic text-2xl text-cream hover:text-amber-gold transition-colors"
                >
                  {link}
                </a>
              ))}
              <a
                href="#the-grove"
                onClick={() => setOpen(false)}
                className="forest-glass-strong rounded-full px-5 py-3 inline-flex items-center justify-center gap-2 text-sm font-medium text-cream mt-4"
              >
                Enter the Forest
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
