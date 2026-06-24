// lib/motion-tokens.ts
// Motion for React animation tokens — hover, tap, layout, component animations.
// Edit here; never hardcode values in components.

export const spring = {
  snappy:   { type: "spring", stiffness: 400, damping: 30 } as const,
  gentle:   { type: "spring", stiffness: 200, damping: 28 } as const,
  bouncy:   { type: "spring", stiffness: 320, damping: 20 } as const,
  slow:     { type: "spring", stiffness: 80,  damping: 20 } as const,
};

export const easing = {
  cinematic: [0.16, 1, 0.3, 1]   as [number, number, number, number],
  smooth:    [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  gentle:    [0.4,  0,  0.2,  1]  as [number, number, number, number],
};

export const duration = {
  fast:    0.22,
  normal:  0.45,
  slow:    0.8,
};

export const cardHover = {
  rest:  { y: 0,  boxShadow: "0 12px 40px -16px rgba(0,0,0,0.55)" },
  hover: { y: -6, boxShadow: "0 28px 60px -24px rgba(0,0,0,0.7)",
           transition: { duration: duration.fast, ease: easing.cinematic } },
};

export const buttonTap = {
  tap: { scale: 0.97 },
};

export const fadeUpVariant = {
  hidden:  { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easing.cinematic },
  },
};

export const stagger = {
  tight:   0.04,
  normal:  0.08,
  dramatic: 0.16,
};
