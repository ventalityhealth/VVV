import { shilajit } from "@/data/shilajit";

/** Footer with brand line, required DSHEA disclaimer and copyright. */
export function Footer() {
  return (
    <footer className="relative z-[90] border-t border-forest-500/20 bg-ink px-6 py-12 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="font-serif text-base tracking-[0.3em] text-parchment">VENTALITY</p>
        <p className="mt-2 max-w-xl text-sm text-parchment/50">
          Performance nutrition rooted in ancient botanicals and modern science.
        </p>
        <p className="mt-8 max-w-3xl text-[11px] leading-relaxed text-parchment/35">
          {shilajit.disclaimer}
        </p>
        <p className="mt-6 text-[11px] text-parchment/35">
          © {new Date().getFullYear()} Ventality Health. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
