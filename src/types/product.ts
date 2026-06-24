export interface SuplifulProduct {
  id: string;
  suplifulSku: string;
  name: string;
  category: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  price: number;
  compareAtPrice?: number;
  images: string[];
  servingSize: string;
  servingsPerContainer: number;
  warnings: string;
  supplementFactsImage?: string;
  /** Accent color for the product's visual identity */
  accentColor: string;
}
