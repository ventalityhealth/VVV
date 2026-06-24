// hooks/use-scroll-reveal.ts
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MotionTokens } from '@/lib/motion-config';

export function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: MotionTokens.reveal.once,
    amount: MotionTokens.reveal.threshold,
    margin: MotionTokens.reveal.rootMargin,
  });
  return { ref, isInView };
}
