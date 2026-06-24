// components/ProductCard.tsx
import { motion } from 'framer-motion';
import { fadeUp, scaleOnHover } from '@/lib/motion-variants';
import { ArrowUpRight } from './icons';

interface ProductCardProps {
  name: string;
  category: string;
  ingredients: string[];
  price: string;
  image: string;
  suplifulSku: string; // Link to real Supliful product
}

export function ProductCard({
  name,
  category,
  ingredients,
  price,
  image,
}: ProductCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover="hover"
      animate="rest"
      className="forest-glass rounded-[1.5rem] overflow-hidden group cursor-pointer transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(74,124,89,0.25)]"
    >
      <motion.div
        variants={scaleOnHover}
        className="h-[280px] relative overflow-hidden"
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
      </motion.div>
      <div className="p-6">
        <span className="forest-glass rounded-full px-3 py-1 text-[11px] text-amber-gold font-body">
          {category}
        </span>
        <h3 className="font-heading italic text-2xl text-cream mt-3">{name}</h3>
        <p className="text-sm text-cream/60 mt-1">{ingredients.join(', ')}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-amber-gold font-body font-medium">{price}</span>
          <span className="inline-flex items-center gap-1 text-cream text-sm underline underline-offset-4 hover:text-amber-gold transition-colors">
            Add to Ritual
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
