// lib/motion-config.ts
//
// SINGLE SOURCE OF TRUTH for all motion values.
// Components must reference these tokens — never hardcode timing/easing/blur.
// Change a number here and it propagates everywhere.

export const MotionTokens = {
  // Timing
  duration: {
    fast: 0.3, // micro-interactions, hover states
    normal: 0.6, // standard transitions
    slow: 1.2, // entrance animations
    cinematic: 2.0, // hero reveals, section transitions
  },
  ease: {
    smooth: [0.25, 0.1, 0.25, 1.0], // cubic-bezier for general use
    bounce: [0.68, -0.55, 0.265, 1.55], // playful overshoot
    cinematic: [0.16, 1, 0.3, 1], // expo out — dramatic entrances
    gentle: [0.4, 0, 0.2, 1], // material design standard
  },
  stagger: {
    tight: 0.05, // rapid fire (cards, lists)
    normal: 0.1, // comfortable pace (text lines)
    dramatic: 0.2, // theatrical (hero words)
  },
  // Effects
  blur: {
    entrance: 10, // px — starting blur for fade-in elements
    hover: 4, // px — blur on hover for glass elements
  },
  scale: {
    hover: 1.02, // subtle lift on interactive elements
    press: 0.98, // press-down feedback
    focus: 1.05, // emphasis scale
  },
  // Parallax
  parallax: {
    bgSpeed: 0.3, // background moves at 30% of scroll
    fgSpeed: 1.2, // foreground elements move faster
    depth: 50, // max translateY in px
  },
  // Scroll-triggered reveals
  reveal: {
    threshold: 0.15, // IntersectionObserver threshold
    rootMargin: '0px 0px -50px 0px',
    once: true, // animate only first time visible
  },
} as const;
