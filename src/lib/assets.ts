/**
 * Central registry of public asset paths (per CLAUDE.md brief).
 *
 * All entries now resolve to the real assets delivered from Drive. Note the
 * brief flags `shilajit-bottle-*` as interim placeholders (white bottle) that
 * will be regenerated post label-migration — swapping them needs no code change.
 */
export const ASSETS = {
  hero: {
    plate: "/assets/hero-log/background/hero-log-base.png",
  },
  botanical: {
    vinePrimary: "/assets/global/botanical-kit/vines/vine-primary.svg",
    leafShapes: "/assets/global/botanical-kit/leaves/leaf-shapes.svg",
    leafClusterDark: "/assets/global/botanical-kit/leaves/leaf-cluster-dark.png",
    moss: "/assets/global/botanical-kit/moss/moss-accents.svg",
    mist: "/assets/global/botanical-kit/fog/mist-overlay.png",
    glow: "/assets/global/botanical-kit/glow/golden-light-sweep.png",
  },
  shilajit: {
    labelFlat: "/assets/products/shilajit/bottle/shilajit-label-flat.png",
    bottleRef: "/assets/products/shilajit/bottle/shilajit-bottle-ref.jpg",
    bottleBlank: "/assets/products/shilajit/bottle/shilajit-bottle-blank.png",
    bottleComposite: "/assets/products/shilajit/bottle/shilajit-bottle-composite.png",
    wetStone: "/assets/products/shilajit/backgrounds/wet-stone-base.png",
  },
} as const;
