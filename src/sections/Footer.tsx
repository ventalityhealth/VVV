"use client";
// Footer — "The Soil"
// Motion for React: layout animation for newsletter state.
// GSAP: stagger all footer items in on scroll.
import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { ArrowRight, Leaf } from "@/components/icons";

const LINK_GROUPS = [
  { title: "Explore", links: ["Shop", "About", "Ingredients", "Journal"] },
  { title: "Support", links: ["Contact", "FAQ", "Shipping", "Returns"] },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 88%", once: true },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="bg-forest-900 px-6 pb-10 pt-24 md:px-14">
      <div className="mx-auto max-w-7xl">

        {/* Top row */}
        <div className="footer-item grid gap-14 border-b border-forest-600/30 pb-14 lg:grid-cols-2">
          {/* Brand + newsletter */}
          <div>
            <div className="flex items-center gap-3">
              <span className="forest-glass flex h-12 w-12 items-center justify-center rounded-full">
                <span className="font-heading italic text-2xl text-cream">V</span>
              </span>
              <span className="font-heading italic text-2xl text-cream">Ventality</span>
            </div>
            <p className="mt-4 font-accent text-xs uppercase tracking-[0.22em] text-amber-gold/65">
              Where the forest meets the formula.
            </p>

            {/* Newsletter */}
            <motion.div layout className="mt-7 max-w-sm">
              {submitted ? (
                <motion.p
                  key="thanks"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-amber-gold"
                >
                  You&apos;re in the forest now. ✶
                </motion.p>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="forest-glass flex items-center gap-2 rounded-full p-1.5"
                >
                  <Leaf className="ml-3 h-4 w-4 flex-shrink-0 text-amber-gold" />
                  <input
                    type="email" required placeholder="Your email"
                    aria-label="Email address"
                    className="flex-1 bg-transparent px-2 py-2 text-sm text-cream placeholder:text-cream/35 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="forest-glass-strong inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-cream hover:text-amber-gold transition-colors"
                  >
                    Grow with us
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Links */}
          <div className="footer-item grid grid-cols-2 gap-10">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-medium uppercase tracking-widest text-amber-gold/70 mb-5">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {group.links.map((link) => {
                    const managed = link === "Shipping" || link === "Returns";
                    return (
                      <li key={link}>
                        <a
                          href={`#${link.toLowerCase()}`}
                          className="nav-link text-sm text-cream/55 hover:text-cream transition-colors"
                        >
                          {link}
                          {managed && (
                            <span className="ml-1 text-[10px] text-cream/25">(Supliful)</span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="footer-item mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-cream/35">
            © 2026 Ventality. All products fulfilled by Supliful.
          </p>
          <div className="flex items-center gap-5">
            {["Instagram", "TikTok", "Pinterest"].map((s) => (
              <a key={s} href="#" className="text-xs text-cream/40 hover:text-amber-gold transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
