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
      className="forest-glass rounded-[1.5rem] overflow-hidden cursor-pointer group"
    >
      {/* Product visual */}
      <div className="relative h-[280px] overflow-hidden flex items-center justify-center bg-forest-800/40">
        {/* Ambient glow behind bottle */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${accentColor}55, transparent 65%)`,
          }}
        />
        <ProductBottle
          name={name}
          category={category}
          accentColor={accentColor}
          className="relative z-10 h-[85%] w-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 to-transparent" />
      </div>

      {/* Card content */}
      <div className="p-6">
        <span className="forest-glass inline-block rounded-full px-3 py-1 text-[11px] text-amber-gold font-body">
          {category}
        </span>
        <h3 className="font-heading italic text-2xl text-cream mt-3 leading-tight">{name}</h3>
        <p className="text-sm text-cream/55 mt-1 leading-snug">{ingredients.join(", ")}</p>
        <div className="flex items-center justify-between mt-5">
          <span className="text-amber-gold font-body font-semibold text-lg">{price}</span>
          <motion.button
            variants={buttonTap}
            whileTap="tap"
            className="inline-flex items-center gap-1.5 text-cream text-sm underline underline-offset-4 hover:text-amber-gold transition-colors"
          >
            Add to Ritual
            <ArrowUpRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
