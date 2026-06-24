# Ventality

> **Where the forest meets the formula.**

A motion-first, premium supplement storefront for **Ventality** — a fictional
magical-forest wellness brand. Dropshipping model with **Supliful** as the sole
supplier. Built per the *Ventality Build Prompt v1.0* spec.

**Tech:** React + Vite + TypeScript + Tailwind CSS + Framer Motion.

---

## ⚠️ Supliful Compliance Lock

Every ingredient mention, dosage claim, benefit statement, and product
description **must be copied verbatim** from Supliful's product catalog. No
extrapolation, no fabricated health claims.

The product data in `src/data/products.ts` and the ingredient copy in
`src/sections/Ingredients.tsx` are **placeholders**. Before launch, replace all
`description`, `ingredients`, `benefits`, `servingSize`, `servingsPerContainer`,
and `warnings` fields with the exact text from the matching Supliful product
page, and map each `suplifulSku` to a real SKU in your Supliful dashboard.

Source of truth: <https://supliful.com/catalog>

---

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

Placeholder product images are generated SVGs. Regenerate them with:

```bash
node scripts/gen-product-images.mjs
```

---

## Motion architecture (editable)

All motion values are centralized — **never hardcode timing/easing/blur inside
components.**

| To change…                | Edit this file                          |
| ------------------------- | --------------------------------------- |
| Speed / easing / stagger  | `src/lib/motion-config.ts` (tokens)     |
| A specific animation      | `src/lib/motion-variants.ts` (variants) |
| Scroll-reveal trigger     | `src/lib/motion-config.ts` → `reveal`   |

**Workflow:** change a token value in `motion-config.ts` → every component
updates automatically. One-off exceptions must be flagged with a
`// OVERRIDE:` comment.

---

## Structure

```
src/
  components/   BlurText, ForestVideo, ProductCard, Navigation, Spores, icons
  sections/     Hero, Products, Ingredients, ForestExperience, Footer
  lib/          motion-config (tokens), motion-variants (variants)
  hooks/        use-scroll-reveal
  data/         products (Supliful placeholders)
  types/        product schema
public/
  products/     generated SVG product mockups
```

### Sections

1. **Hero — "The Forest Threshold"** — full-viewport immersive entry with
   atmosphere layers, glow, drifting spores, and staggered reveals.
2. **Products — "The Grove"** — Supliful product grid with parallax + hover.
3. **Ingredients — "The Roots"** — split-screen parallax + accordion.
4. **Forest Experience — "The Canopy"** — immersive brand moment.
5. **Footer — "The Soil"** — newsletter + links + Supliful fulfillment note.

### Atmospheric video

`Hero` and `ForestExperience` ship with CSS atmosphere fallbacks. To use real
forest loops, add mp4 URLs to `FOREST_VIDEO_SRC` / `CANOPY_VIDEO_SRC` in those
section files — `<ForestVideo>` handles cross-fade looping and fails gracefully.
