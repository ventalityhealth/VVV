// sections/Products.tsx — "The Grove"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { fadeUp } from '@/lib/motion-variants';
import { MotionTokens } from '@/lib/motion-config';

const fmtPrice = (n: number) =>
  `$${n.toFixed(2)}`;

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // Subtle parallax drift on the bark texture background.
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, MotionTokens.parallax.depth * MotionTokens.parallax.bgSpeed]
  );

  return (
    <section
      id="the-grove"
      ref={sectionRef}
      className="relative min-h-screen bg-forest-900 px-6 py-24 md:px-16 lg:px-24"
    >
      {/* Parallax bark texture */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(90deg,#1C1410_0px,#1C1410_2px,transparent_2px,transparent_9px)]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="mb-4 text-sm font-body text-amber-gold/80">// The Grove</p>
          <h2 className="font-heading italic text-5xl leading-[0.9] tracking-[-2px] text-cream md:text-6xl lg:text-[5rem]">
            Harvested for you.
          </h2>
          <p className="mt-4 max-w-lg text-cream/60">
            Every formula is sourced from Supliful&apos;s verified catalog and
            bottled under your forest brand.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              category={p.category}
              ingredients={p.ingredients}
              price={fmtPrice(p.price)}
              image={p.images[0]}
              suplifulSku={p.suplifulSku}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
