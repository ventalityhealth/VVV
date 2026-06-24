// components/BlurText.tsx
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { wordBlurChild, staggerContainer } from '@/lib/motion-variants';

interface BlurTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  /** Override container justification; defaults to centered. */
  align?: 'center' | 'start';
}

export function BlurText({
  text,
  className = '',
  as: Tag = 'h1',
  align = 'center',
}: BlurTextProps) {
  const { ref, isInView } = useScrollReveal();
  const words = text.split(' ');
  const justify = align === 'center' ? 'justify-center' : 'justify-start';

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`flex flex-wrap ${justify} ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordBlurChild}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
