// Generates premium forest-themed SVG placeholder mockups for each product.
// Run with: node scripts/gen-product-images.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/products');
mkdirSync(outDir, { recursive: true });

const items = [
  { file: 'mycelium-mind', name: 'Mycelium Mind', cat: 'Adaptogens', accent: '#C9A96E' },
  { file: 'forest-renewal-collagen', name: 'Forest Renewal', cat: 'Beauty', accent: '#E8D5B5' },
  { file: 'rooted-calm', name: 'Rooted Calm', cat: 'Stress', accent: '#8FBC9F' },
  { file: 'nightfall-ritual', name: 'Nightfall Ritual', cat: 'Sleep', accent: '#6B9E7C' },
  { file: 'verdant-greens', name: 'Verdant Greens', cat: 'Wellness', accent: '#4A7C59' },
  { file: 'deep-roots-omega', name: 'Deep Roots', cat: 'Heart', accent: '#C9A96E' },
];

const svg = ({ name, cat, accent }) => `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="none">
  <defs>
    <radialGradient id="bg" cx="50%" cy="35%" r="80%">
      <stop offset="0%" stop-color="#1E331E"/>
      <stop offset="60%" stop-color="#142614"/>
      <stop offset="100%" stop-color="#0B1A0B"/>
    </radialGradient>
    <linearGradient id="bottle" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#1C1410" stop-opacity="0.95"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <ellipse cx="300" cy="470" rx="240" ry="120" fill="url(#glow)"/>
  <!-- bottle -->
  <g>
    <rect x="225" y="150" width="150" height="40" rx="8" fill="#1C1410"/>
    <rect x="240" y="120" width="120" height="40" rx="6" fill="#1C1410"/>
    <rect x="210" y="185" width="180" height="265" rx="26" fill="url(#bottle)"/>
    <rect x="210" y="185" width="180" height="265" rx="26" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="1.5"/>
    <!-- label -->
    <rect x="232" y="250" width="136" height="150" rx="12" fill="#0B1A0B" fill-opacity="0.55" stroke="${accent}" stroke-opacity="0.4"/>
    <text x="300" y="300" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#F5F0E6" text-anchor="middle">V</text>
    <line x1="252" y1="320" x2="348" y2="320" stroke="${accent}" stroke-opacity="0.4"/>
    <text x="300" y="350" font-family="Georgia, serif" font-size="13" fill="#F5F0E6" fill-opacity="0.85" text-anchor="middle">${name}</text>
    <text x="300" y="375" font-family="Arial, sans-serif" font-size="9" letter-spacing="2" fill="${accent}" text-anchor="middle">${cat.toUpperCase()}</text>
  </g>
  <!-- drifting spores -->
  <circle cx="140" cy="200" r="3" fill="${accent}" fill-opacity="0.5"/>
  <circle cx="470" cy="260" r="4" fill="${accent}" fill-opacity="0.4"/>
  <circle cx="430" cy="160" r="2.5" fill="#F5F0E6" fill-opacity="0.4"/>
  <circle cx="170" cy="320" r="2" fill="#F5F0E6" fill-opacity="0.3"/>
</svg>`;

for (const item of items) {
  writeFileSync(resolve(outDir, `${item.file}.svg`), svg(item));
}
console.log(`Generated ${items.length} product images in ${outDir}`);
