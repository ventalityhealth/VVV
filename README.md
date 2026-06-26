# Ventality — Motion-First Site

A motion-first Next.js experience for the **Ventality Shilajit Adaptogen Complex**,
built to the spec in [`CLAUDE.md`](./CLAUDE.md): a dark wood-log hero → GSAP
ScrollTrigger vine growth → a pinned product-bottle "wrap" reveal with separate
back/front vine layers, blooming leaves, a golden light sweep, and live-HTML
info cards.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme`)
- **GSAP + ScrollTrigger** — scroll-scrubbed vine growth & the pinned reveal timeline
- **Framer Motion** — hover/tap micro-interactions on the info cards

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Scenes

| Component | Role |
| --- | --- |
| `HeroLogScene` | Full-viewport atmospheric plate + drifting mist (`.hero-section`) |
| `BranchTravelScene` | ~180vh transition; main vine descends, offshoots branch (scrubbed) |
| `ProductWrapScene` | Pinned reveal: back vine → bottle → front vine → leaves → glow → cards |

Accessibility & performance are wired per the brief: `prefers-reduced-motion`
renders a fully-drawn static state (no pin/scrub), offshoot vines + mist/glow
are disabled on mobile, and every ScrollTrigger is torn down on unmount via
`gsap.context().revert()`.

## Assets

All real assets from Google Drive (`ventalityassetmd/assets/`) are committed at
the paths in the brief — vectors (`vine-primary.svg`, `leaf-shapes.svg`,
`moss-accents.svg`) and rasters (hero plate, wet-stone, mist, glow, leaf
cluster, bottle composite/blank/ref, flat label). `src/lib/assets.ts` is the
single source of paths.

Two caveats carried over from the brief:

- **`shilajit-bottle-*`** are interim placeholders (white bottle); the real
  bottle is amber with a dark cap and will be regenerated post label-migration.
  Swapping the file needs no code change.
- The composite carries its own dark-stone background, so `ProductWrapScene`
  applies a radial edge-fade mask to blend it into the scene.

`scripts/gen-placeholders.mjs` remains as a fallback generator (`npm run
gen:assets`) if a raster ever needs a stand-in.
