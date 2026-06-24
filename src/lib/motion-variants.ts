// lib/motion-variants.ts
//
// All reusable Framer Motion `variants` live here.
// Import and spread them into components — do not redefine animation values inline.

import type { Variants } from 'framer-motion';
import { MotionTokens as mt } from './motion-config';

// Framer's cubic-bezier easing expects a mutable 4-tuple; our tokens are
// `as const` (readonly), so we cast through a tiny helper for type-safety.
type Bezier = [number, number, number, number];
const ease = (e: readonly number[]) => [...e] as Bezier;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: `blur(${mt.blur.entrance}px)` },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: mt.duration.slow, ease: ease(mt.ease.cinematic) },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: `blur(${mt.blur.entrance}px)` },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: mt.duration.normal, ease: ease(mt.ease.smooth) },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: mt.stagger.normal, delayChildren: 0.2 },
  },
};

export const staggerContainerTight: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: mt.stagger.tight, delayChildren: 0.1 },
  },
};

export const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: mt.scale.hover, transition: { duration: mt.duration.fast } },
  tap: { scale: mt.scale.press },
};

export const wordBlurReveal: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: mt.stagger.dramatic },
  },
};

export const wordBlurChild: Variants = {
  hidden: { opacity: 0, y: 50, filter: `blur(${mt.blur.entrance}px)` },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: mt.duration.slow, ease: ease(mt.ease.cinematic) },
  },
};

export const forestFloat: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
  },
};

export const glowPulse: Variants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    filter: ['blur(40px)', 'blur(60px)', 'blur(40px)'],
    transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
  },
};
