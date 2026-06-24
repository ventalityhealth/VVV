"use client";
// GSAP: entrance animation on mount.
// Motion for React: mobile drawer slide + AnimatePresence.
import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./icons";

const LINKS = ["Shop", "Our Forest", "Ingredients", "Journal", "Contact"];

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // GSAP entrance
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.fromTo(nav,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // Glass intensification on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 opacity-0"
      aria-label="Main navigation"
    >
      <div
        className={`mx-auto max-w-7xl px-4 md:px-8 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "forest-glass rounded-b-2xl" : ""
        }`}
      >
        {/* Brand mark */}
        <a href="#hero" className="flex items-center gap-3 group" aria-label="Ventality home">
          <span className="forest-glass h-11 w-11 rounded-full flex items-center justify-center ring-1 ring-amber-gold/20 group-hover:ring-amber-gold/50 transition-all duration-300">
            <span className="font-heading italic text-xl text-cream">V</span>
          </span>
          <span className="hidden sm:block font-heading italic text-xl text-cream/90">Ventality</span>
        </a>

        {/* Center pill — desktop */}
        <div className="hidden md:flex forest-glass rounded-full px-7 py-2.5 items-center gap-7">
          {LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="nav-link text-sm font-medium text-cream/75 hover:text-amber-gold transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA — desktop */}
        <motion.a
          href="#the-grove"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden md:inline-flex forest-glass-strong rounded-full px-5 py-2.5 items-center gap-2 text-sm font-medium text-cream hover:text-amber-gold transition-colors"
        >
          Enter the Forest
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden forest-glass h-10 w-10 rounded-full flex items-center justify-center text-cream"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-forest-900/75 backdrop-blur-sm"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 forest-glass-strong z-50 p-8 flex flex-col"
            >
              <button
                className="self-end text-cream/60 hover:text-cream transition-colors mb-8"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
              <nav className="flex flex-col gap-5">
                {LINKS.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setOpen(false)}
                    className="font-heading italic text-2xl text-cream hover:text-amber-gold transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </nav>
              <a
                href="#the-grove"
                onClick={() => setOpen(false)}
                className="forest-glass-strong mt-auto rounded-full px-5 py-3 flex items-center justify-center gap-2 text-sm font-medium text-cream"
              >
                Enter the Forest
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
