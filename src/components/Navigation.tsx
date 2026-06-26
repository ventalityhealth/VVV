/** Minimal fixed brand header — sits over the atmospheric hero. */
export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-5 md:px-10">
      <span className="font-serif text-lg tracking-[0.35em] text-parchment">VENTALITY</span>
      <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-parchment/70 sm:flex">
        <a href="#shilajit" className="transition-colors hover:text-gold">
          Shilajit
        </a>
        <a href="#shop" className="transition-colors hover:text-gold">
          Shop
        </a>
      </nav>
    </header>
  );
}
