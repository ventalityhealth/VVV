# Ventality Motion-First Website — Claude Code Implementation Brief

## Project: Shilajit Hero Log Scene + Scroll Animation

### Stack
- **Next.js 14+** (App Router)
- **Tailwind CSS** for styling
- **GSAP + ScrollTrigger** for scroll animations
- **Motion for React** (framer-motion) for hover/tap/interaction animations
- **TypeScript**

---

## Assets Delivered

All assets live in `/public/assets/`. Copy the entire `assets/` folder into your Next.js `public/` directory.

```
public/assets/
├── global/botanical-kit/
│   ├── vines/vine-primary.svg          # 3 vine paths with stroke-dasharray, data-gsap
│   ├── leaves/leaf-shapes.svg          # 5 leaf shapes, individually animatable (data-gsap)
│   ├── leaves/leaf-cluster-dark.png    # Dark leaf cluster 1024x1024 (needs bg removal)
│   ├── moss/moss-accents.svg           # Scattered moss ellipses for foreground
│   ├── fog/mist-overlay.png            # Atmospheric mist 1024x1024 (CSS screen blend)
│   └── glow/golden-light-sweep.png     # Warm golden light sweep 1024x1024 (CSS screen blend)
├── hero-log/
│   └── background/hero-log-base.png    # Landscape hero plate 1024x576 (16:9) — NO text, NO bottles
└── products/shilajit/
    ├── bottle/shilajit-label-flat.png        # FLAT label artwork 1200x400 (SOURCE OF TRUTH — never edit)
    ├── bottle/shilajit-bottle-ref.jpg        # ACTUAL bottle photo 2048x2048 — amber body, dark cap, ~1:1 aspect
    ├── bottle/shilajit-bottle-blank.png      # Generated blank bottle 576x1024 (PLACEHOLDER — wrong color/shape)
    ├── bottle/shilajit-bottle-composite.png  # Composite w/ real label 576x1024 (PLACEHOLDER — will be redone post label-migration)
    └── backgrounds/wet-stone-base.png        # Wet black stone texture 1024x1024
```

---

## Animation Architecture

### SVG Vine Growth (GSAP ScrollTrigger)

The vine SVG (`vine-primary.svg`) has 3 `<path>` elements with pre-set attributes:
- `#vine-main` — primary descending vine, 2000px dash (the main scroll guide)
- `#vine-branch-1` — right-side offshoot, 600px dash
- `#vine-branch-2` — left-side offshoot, 500px dash

All have `stroke-dasharray` and `data-gsap` attributes ready for targeting.

```tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Main vine grows with scroll
gsap.fromTo('#vine-main',
  { strokeDashoffset: 2000 },
  {
    strokeDashoffset: 0,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom center',
      scrub: 0.5,  // smooth scrubbing
    }
  }
);

// Branch offshoots start later
gsap.fromTo('#vine-branch-1',
  { strokeDashoffset: 600 },
  {
    strokeDashoffset: 0,
    scrollTrigger: {
      trigger: '.branch-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    }
  }
);
```

### Parallax Depth Model (Layer Order)

```
z-0:  Far background atmosphere (mist-overlay.png) — CSS mix-blend-mode: screen
z-10: Background plate (hero-log-base.png) 
z-20: Hero log / ground objects
z-30: Ingredient still-life elements
z-40: Back vines (vine-branch-2) — behind bottle
z-50: Product bottle (shilajit-bottle-composite.png)
z-60: Front vines (vine-main, vine-branch-1) — in front of bottle
z-70: Leaves (leaf-shapes.svg), moss accents (moss-accents.svg)
z-80: Particles, glow overlay (golden-light-sweep.png) — screen blend
z-90: Live HTML text / info cards / CTA
```

---

## Component Structure

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <main className="bg-black">
      <HeroLogScene />
      <BranchTravelScene />
      <ProductWrapScene product="shilajit" />
    </main>
  );
}
```

### HeroLogScene
- Full-viewport hero section (100vh, `overflow: hidden`)
- Background: `hero-log-base.png` via CSS `background-image` with `background-size: cover`
- Mist overlay on top with `mix-blend-mode: screen` + subtle CSS keyframe animation (slow horizontal drift, 20-30s cycle)
- No text, no CTAs — purely atmospheric
- On scroll: the scene scrolls away, revealing BranchTravelScene

### BranchTravelScene
- Spacer/transition section (150-200vh total scroll distance)
- SVG vine paths absolutely positioned, animated with GSAP ScrollTrigger
- `stroke-dasharray`/`stroke-dashoffset` animation synced to scroll position via `scrub`
- Branches grow downward from the log origin point as user scrolls
- As branches reach the bottom, the next section (ProductWrapScene) triggers

### ProductWrapScene
- Pinned scroll section (`pin: true` via ScrollTrigger)
- Product bottle reveal with layered depth:
  1. Back vine appears behind bottle
  2. Bottle fades/scales in
  3. Front vine wraps over bottle
  4. Leaves sprout along the vine
  5. Product info cards slide/fade in
- Glow sweep animation across bottle on reveal (use `golden-light-sweep.png` with screen blend + CSS transform)

### AnimatedVinePath
Reusable component accepting props:
```tsx
interface VinePathProps {
  pathId: string;
  dashLength: number;
  trigger: string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
}
```

### BloomingLeaves
Staggered leaf reveal component:
```tsx
interface BloomingLeavesProps {
  leafCount: number;
  staggerDelay: number;
  positions: Array<{x: number; y: number; rotation: number; scale: number}>;
}
```

### ScrollInfoCards
Product info cards that reveal in sync:
```tsx
interface ScrollInfoCardsProps {
  title: string;
  description: string;
  benefits: string[];
  triggerElement: string;
}
```

---

## Scroll Timeline

```
Scroll %   | What happens
-----------|--------------------------------------------------
0%         | Hero log scene fully visible, vines hidden (dashoffset at max)
15%        | Vine-main begins growing from log center downward
30%        | Vine has traveled ~30% down the page, mist drifts
45%        | Branch offshoots (vine-branch-1, vine-branch-2) begin growing
60%        | Vine reaches product section boundary
65%        | ProductWrapScene pins — back vine layer renders behind bottle zone
70%        | Shilajit bottle fades in (opacity 0→1, slight scale 0.95→1)
75%        | Front vine wraps over bottle (dashoffset animation)
80%        | Leaves sprout along the wrapped vine (staggered opacity + scale)
85%        | Golden light sweep passes across bottle
90%        | Product info cards slide in from right/fade up
100%       | Section complete, pin releases, scroll continues to next product
```

---

## Product Wrap Reveal (Critical)

Use **separate back-vine and front-vine layers** to create the illusion of the branch wrapping AROUND the bottle:

```tsx
<div className="product-wrap-container relative h-screen" ref={containerRef}>
  {/* LAYER 1: Back vine — behind the bottle */}
  <div className="absolute inset-0 z-40">
    <AnimatedVinePath pathId="vine-branch-2" dashLength={500} />
  </div>
  
  {/* LAYER 2: The bottle itself */}
  <div className="absolute inset-0 z-50 flex items-center justify-center">
    <Image 
      src="/assets/products/shilajit/bottle/shilajit-bottle-composite.png"
      alt="Ventality Shilajit Adaptogen Complex"
      width={576}
      height={1024}
      className="bottle-reveal object-contain max-h-[80vh]"
      priority
    />
  </div>
  
  {/* LAYER 3: Front vine — in front of the bottle */}
  <div className="absolute inset-0 z-60">
    <AnimatedVinePath pathId="vine-main" dashLength={2000} />
  </div>
  
  {/* LAYER 4: Leaves sprouting along the vine */}
  <div className="absolute inset-0 z-70">
    <BloomingLeaves leafCount={8} staggerDelay={0.1} positions={leafPositions} />
  </div>
</div>
```

---

## Product Copy Module (Shilajit)

**⚠️ BOTTLE STATUS:** The current `shilajit-bottle-composite.png` is a PLACEHOLDER. The real Shilajit bottle (per reference photo) is **amber/brown body with a dark/black cap**, not white. The label artwork (`shilajit-label-flat.png`) is real and correct. Supliful is migrating labels — once migrated, all 7 product bottles + labels will be regenerated in one batch. The component architecture handles this as a simple `labelSrc`/`bottleSrc` prop swap — zero code changes needed.

All text is **live HTML/CSS** — never baked into images. Use these for the info cards:

### Headline
**Shilajit Adaptogen Complex**

### Tagline
Ancient mineral vitality. Modern performance.

### Key Benefits (3 cards)
1. **Peak Physical Performance** — Supports energy production and stamina for demanding training and daily vitality.
2. **Adaptogenic Resilience** — Helps the body respond to physical and mental stress with ashwagandha, tongkat ali, and shilajit.
3. **Mineral-Rich Foundation** — Naturally occurring fulvic acid and 85+ trace minerals from pristine Himalayan sources.

### DSHEA Disclaimer (required)
*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.

---

## Mobile Behavior

- Hero plate: `background-size: cover` with `background-position: center` — crops naturally on mobile
- Vine animation: use **only the main vine** (vine-main), skip branch offshoots
- Product wrap: stack bottle + info cards vertically (no horizontal layout)
- Mist/glow overlays: disabled on mobile (performance + visibility)
- Parallax layers: reduce to 3-4 max
- Touch scroll: GSAP ScrollTrigger handles touch natively — no special handling needed
- Text size: ensure info card text is readable at 320px viewport width

---

## Reduced Motion

```tsx
const prefersReducedMotion = 
  typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Static branch state — dashoffset at 0 (fully drawn vines, no growth animation)
  // Product sections fade in with simple opacity transitions (no scale, no slide)
  // All content remains fully accessible
  // Skip mist drift animation
}
```

---

## Performance Rules

- **Preload** hero-log-base.png (critical first paint)
- **Lazy-load** all images below the fold with Next.js `<Image>` + `loading="lazy"`
- Use Next.js `<Image>` for automatic WebP conversion and responsive sizing
- GPU-friendly transforms only: `translate3d`, `scale`, `opacity`, `rotate`
- No expensive CSS filters (`blur`, heavy `drop-shadow`) during scroll
- `will-change: transform` on animated elements (sparingly)
- `ScrollTrigger.refresh()` on route change or layout shift
- Kill ALL ScrollTriggers on component unmount:
  ```tsx
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
  ```

---

## Next Steps After This Scene

Once Hero + Shilajit reveal is working and polished:
1. Extract `ProductWrapScene` into a reusable template component
2. Add remaining 6 products: NAD+, Sleep, Brain & Focus, Multivitamin, Gummies, L-Glutamine
3. Each product gets its own background plate, bottle composite (from real label), and product-specific vine/leaf assets
4. Add navigation, footer, product pages

---

## QA Checklist Per Section

- [ ] Desktop 1920px: smooth scroll, no jank, vines animate correctly
- [ ] Desktop 1440px: layout holds, nothing breaks
- [ ] Tablet 768px: mobile behavior kicks in, simplified
- [ ] Mobile 375px: readable, performant, touch-scroll works
- [ ] `prefers-reduced-motion`: static fallback shows all content
- [ ] Asset preloads: hero plate loads first, no layout shift
- [ ] ScrollTrigger cleanup: no orphaned triggers on unmount
- [ ] No text baked into images — all copy is live HTML
- [ ] Shilajit label is 1:1 exact — compare against `shilajit-label-flat.png`
- [ ] DSHEA disclaimer visible on product info cards

---

## One-Line Directive

> Build the Ventality Shilajit hero as a Next.js motion-first scroll experience: dark wood log hero → GSAP ScrollTrigger SVG vine growth → product bottle wrap reveal with separate back/front vine layers → product info card reveal — all with responsive behavior, reduced-motion fallback, and live HTML text.