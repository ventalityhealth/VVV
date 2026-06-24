// types/product.ts
export interface SuplifulProduct {
  id: string;
  suplifulSku: string; // Real Supliful SKU — map to your Supliful dashboard
  name: string; // Ventality-branded name
  category: string;
  description: string; // From Supliful — verbatim
  ingredients: string[]; // From Supliful — verbatim
  benefits: string[]; // From Supliful — verbatim
  price: number;
  compareAtPrice?: number;
  images: string[]; // Supliful mockups + forest overlays
  servingSize: string; // From Supliful
  servingsPerContainer: number; // From Supliful
  warnings: string; // From Supliful — verbatim
  supplementFactsImage?: string; // Supliful label image
}
