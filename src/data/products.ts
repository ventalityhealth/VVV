// data/products.ts
//
// ⚠️  COMPLIANCE / SUPLIFUL LOCK
// These are PLACEHOLDERS. Before going live, replace every `description`,
// `ingredients`, `benefits`, `servingSize`, `servingsPerContainer` and
// `warnings` field with the EXACT verbatim text from the matching Supliful
// product page, and map `suplifulSku` to a real SKU in your Supliful
// dashboard. Do not extrapolate or upgrade any claim.
// Source of truth: https://supliful.com/catalog

import type { SuplifulProduct } from '@/types/product';

export const products: SuplifulProduct[] = [
  {
    id: 'vnt-001',
    suplifulSku: 'SUPL-MUSH-001',
    name: 'Mycelium Mind',
    category: 'Adaptogens',
    description:
      'A comprehensive blend of functional mushrooms to support cognitive clarity and daily resilience.',
    ingredients: [
      "Lion's Mane Extract",
      'Reishi Extract',
      'Cordyceps Extract',
      'Chaga Extract',
    ],
    benefits: [
      'Supports cognitive function',
      'Promotes stress resilience',
      'Supports immune health',
    ],
    price: 34.99,
    servingSize: '2 capsules',
    servingsPerContainer: 30,
    warnings:
      'Consult a physician before use if pregnant, nursing, or taking medication.',
    images: ['/products/mycelium-mind.svg'],
  },
  {
    id: 'vnt-002',
    suplifulSku: 'SUPL-COLL-002',
    name: 'Forest Renewal Collagen',
    category: 'Beauty',
    description:
      'Hydrolyzed marine collagen peptides to support skin elasticity, hair, and nails.',
    ingredients: [
      'Hydrolyzed Marine Collagen',
      'Hyaluronic Acid',
      'Vitamin C',
    ],
    benefits: [
      'Supports skin elasticity',
      'Supports healthy hair and nails',
      'Supports joint comfort',
    ],
    price: 39.99,
    servingSize: '1 scoop',
    servingsPerContainer: 30,
    warnings:
      'Consult a physician before use if pregnant, nursing, or taking medication. Contains fish.',
    images: ['/products/forest-renewal-collagen.svg'],
  },
  {
    id: 'vnt-003',
    suplifulSku: 'SUPL-ASHW-003',
    name: 'Rooted Calm',
    category: 'Stress',
    description:
      'A calming adaptogen blend formulated to help the body manage everyday stress.',
    ingredients: ['KSM-66 Ashwagandha', 'L-Theanine', 'Magnesium'],
    benefits: [
      'Helps manage everyday stress',
      'Promotes a sense of calm',
      'Supports relaxation',
    ],
    price: 29.99,
    servingSize: '2 capsules',
    servingsPerContainer: 30,
    warnings:
      'Consult a physician before use if pregnant, nursing, or taking medication.',
    images: ['/products/rooted-calm.svg'],
  },
  {
    id: 'vnt-004',
    suplifulSku: 'SUPL-SLEEP-004',
    name: 'Nightfall Ritual',
    category: 'Sleep',
    description:
      'A soothing nighttime formula to support restful, restorative sleep.',
    ingredients: [
      'Melatonin',
      'Valerian Root',
      'Chamomile',
      'Magnesium Glycinate',
    ],
    benefits: [
      'Supports restful sleep',
      'Promotes relaxation before bed',
      'Helps you wake refreshed',
    ],
    price: 27.99,
    servingSize: '2 capsules',
    servingsPerContainer: 30,
    warnings:
      'Do not drive or operate machinery after use. Consult a physician before use if pregnant, nursing, or taking medication.',
    images: ['/products/nightfall-ritual.svg'],
  },
  {
    id: 'vnt-005',
    suplifulSku: 'SUPL-GREENS-005',
    name: 'Verdant Greens',
    category: 'Wellness',
    description:
      'A nutrient-dense greens blend to support daily vitality and whole-body wellness.',
    ingredients: ['Spirulina', 'Chlorella', 'Wheatgrass', 'Barley Grass'],
    benefits: [
      'Supports daily nutrition',
      'Supports natural energy',
      'Supports overall wellness',
    ],
    price: 32.99,
    servingSize: '1 scoop',
    servingsPerContainer: 30,
    warnings:
      'Consult a physician before use if pregnant, nursing, or taking medication.',
    images: ['/products/verdant-greens.svg'],
  },
  {
    id: 'vnt-006',
    suplifulSku: 'SUPL-OMEGA-006',
    name: 'Deep Roots Omega-3',
    category: 'Heart',
    description:
      'Plant-based algal omega-3 (DHA/EPA) to support heart and brain health.',
    ingredients: ['Algal Oil DHA/EPA', 'Vitamin E'],
    benefits: [
      'Supports heart health',
      'Supports brain health',
      'Vegan source of omega-3',
    ],
    price: 28.99,
    servingSize: '2 softgels',
    servingsPerContainer: 30,
    warnings:
      'Consult a physician before use if pregnant, nursing, or taking medication.',
    images: ['/products/deep-roots-omega.svg'],
  },
];
