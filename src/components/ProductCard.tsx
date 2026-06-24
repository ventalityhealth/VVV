"use client";
// Motion for React powers the hover lift + tap feedback.
// GSAP ScrollTrigger stagger is handled by the parent Products section.
import { motion } from "motion/react";
import { ProductBottle } from "./ProductBottle";
import { ArrowUpRight } from "./icons";
import { cardHover, buttonTap } from "@/lib/motion-tokens";

interface ProductCardProps {
  name: string;
  category: string;
  ingredients: string[];
  price: string;
  accentColor: string;
  suplifulSku: string;
}

export function ProductCard({
  name, category, ingredients, price, accentColor,
}: ProductCardProps) {
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="forest-glass group cursor-pointer overflow-hidden rounded-2xl"
    >
      {/* Product visual */}
      <div className="relative flex h-[300px] items-center justify-center overflow-hidden bg-forest-950">
        {/* faint accent wash behind bottle */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            background: `radial-gradient(circle at 50% 62%, ${accentColor}, transparent 60%)`,
          }}
        />
        <ProductBottle
          name={name}
          category={category}
          accentColor={accentColor}
          className="relative z-10 h-[84%] w-auto transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Card content */}
      <div className="border-t border-[color:var(--line)] p-6">
        <span className="eyebrow text-[0.62rem]">{category}</span>
        <h3 className="mt-3 font-heading text-xl leading-tight text-cream">{name}</h3>
        <p className="mt-2 text-sm leading-snug text-cream/45">{ingredients.join(" · ")}</p>
        <div className="mt-6 flex items-center justify-between">
          <span className="font-heading text-lg text-cream">{price}</span>
          <motion.button
            variants={buttonTap}
            whileTap="tap"
            className="inline-flex items-center gap-1.5 text-sm text-cream/80 transition-colors hover:text-amber-gold"
          >
            Add to cart
            <ArrowUpRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
