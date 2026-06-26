/**
 * Dependency-free PNG placeholder generator.
 *
 * The real raster art (hero plate, bottle composites, wet-stone, mist, glow,
 * leaf cluster) lives in Google Drive under `ventalityassetmd/assets/` and is
 * too large to transfer through the build session. This script writes
 * size-correct, on-palette PLACEHOLDER PNGs at the exact paths the brief
 * (CLAUDE.md) specifies, so the app builds and looks coherent. Drop the real
 * files in over these to finish — no code changes needed.
 *
 * Run: `node scripts/gen-placeholders.mjs`
 */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public', 'assets');

// ---- minimal PNG (RGBA, 8-bit) encoder -------------------------------------
function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}
function encodePNG(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // rows are length-prefixed with a 0 filter byte
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
// paint(width, height, fn(x,y) -> [r,g,b,a]) -> writes file
function paint(relPath, width, height, fn) {
  const rgba = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = fn(x, y);
      const i = (y * width + x) * 4;
      rgba[i] = r | 0;
      rgba[i + 1] = g | 0;
      rgba[i + 2] = b | 0;
      rgba[i + 3] = a == null ? 255 : a | 0;
    }
  }
  const out = join(PUB, relPath);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, encodePNG(width, height, rgba));
  console.log('  +', relPath, `(${width}x${height})`);
}

// ---- helpers ----------------------------------------------------------------
const clamp = (n, lo = 0, hi = 255) => Math.max(lo, Math.min(hi, n));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

console.log('Generating placeholder rasters...');

// ---- hero-log-base.png : dark forest plate, warm horizon glow --------------
paint('hero-log/background/hero-log-base.png', 1024, 576, (x, y) => {
  const v = y / 576;
  // vertical: deep green-black top -> near-black bottom
  let r = lerp(10, 4, v);
  let g = lerp(22, 8, v);
  let b = lerp(14, 6, v);
  // warm horizon glow around mid-lower third
  const horizon = Math.exp(-((v - 0.62) ** 2) / 0.012);
  const cx = Math.exp(-(((x / 1024) - 0.5) ** 2) / 0.18);
  const glow = horizon * cx * 0.7;
  r += glow * 120;
  g += glow * 80;
  b += glow * 30;
  // soft vignette
  const vig = 1 - 0.5 * (((x / 1024 - 0.5) ** 2) + ((v - 0.5) ** 2));
  return [clamp(r * vig), clamp(g * vig), clamp(b * vig), 255];
});

// ---- wet-stone-base.png : wet black stone -----------------------------------
paint('products/shilajit/backgrounds/wet-stone-base.png', 1024, 1024, (x, y) => {
  const u = x / 1024, v = y / 1024;
  const base = 8 + 10 * Math.exp(-(((u - 0.5) ** 2 + (v - 0.4) ** 2)) / 0.1);
  // faint procedural mottling
  const n = Math.sin(u * 40) * Math.cos(v * 37) + Math.sin((u + v) * 23);
  const s = base + n * 3;
  return [clamp(s * 0.9), clamp(s), clamp(s * 0.95), 255];
});

// ---- mist-overlay.png : atmospheric mist (transparent, screen blend) --------
paint('global/botanical-kit/fog/mist-overlay.png', 1024, 1024, (x, y) => {
  const v = y / 1024;
  const band = Math.exp(-((v - 0.5) ** 2) / 0.05);
  const wisp = 0.5 + 0.5 * Math.sin(x / 90 + v * 6);
  const a = clamp(band * wisp * 90, 0, 120);
  return [200, 215, 210, a];
});

// ---- golden-light-sweep.png : warm diagonal sweep (transparent) -------------
paint('global/botanical-kit/glow/golden-light-sweep.png', 1024, 1024, (x, y) => {
  const u = x / 1024, v = y / 1024;
  const d = Math.abs((u + v) / 2 - 0.5);
  const sweep = Math.exp(-(d ** 2) / 0.02);
  const a = clamp(sweep * 150, 0, 160);
  return [255, 196, 110, a];
});

// ---- leaf-cluster-dark.png : kept transparent (leaf-shapes.svg drives leaves)
paint('global/botanical-kit/leaves/leaf-cluster-dark.png', 1024, 1024, () => [0, 0, 0, 0]);

// ---- shilajit label (flat) : parchment band placeholder ---------------------
paint('products/shilajit/bottle/shilajit-label-flat.png', 1200, 400, (x, y) => {
  const u = x / 1200, v = y / 400;
  let r = 226, g = 214, b = 188; // parchment
  // top/bottom forest accent rules
  if (v < 0.06 || v > 0.94) { r = 45; g = 90; b = 39; }
  // centered darker "text" blocks
  const inText = v > 0.35 && v < 0.62 && u > 0.18 && u < 0.82;
  if (inText && (Math.floor(x / 26) % 2 === 0)) { r = 60; g = 50; b = 38; }
  return [r, g, b, 255];
});

// ---- bottle silhouette helper ----------------------------------------------
// amber body + dark cap; optional parchment label band (composite)
function bottle(relPath, withLabel) {
  const W = 576, H = 1024;
  const cx = W / 2;
  const capTop = 70, capBot = 180, capHalf = 86;
  const neckBot = 220, neckHalf = 70;
  const shoulderBot = 300;
  const bodyTop = 300, bodyBot = 968, bodyHalf = 168, rad = 52;
  const labelTop = 470, labelBot = 812;

  const halfAt = (y) => {
    if (y < capTop || y > bodyBot) return -1;
    if (y <= capBot) return capHalf;                       // cap
    if (y <= neckBot) return neckHalf;                     // neck
    if (y <= shoulderBot)                                  // shoulder flare
      return lerp(neckHalf, bodyHalf, smooth((y - neckBot) / (shoulderBot - neckBot)));
    if (y >= bodyBot - rad) {                              // rounded bottom
      const dy = rad - (bodyBot - y);
      return bodyHalf - (rad - Math.sqrt(Math.max(0, rad * rad - dy * dy)));
    }
    return bodyHalf;
  };

  paint(relPath, W, H, (x, y) => {
    const half = halfAt(y);
    if (half < 0) return [0, 0, 0, 0];
    const dx = x - cx;
    if (Math.abs(dx) > half) return [0, 0, 0, 0];
    const t = (dx / half + 1) / 2;             // 0..1 across width
    const shade = Math.sin(t * Math.PI);       // cylinder shading
    if (y <= capBot) {                         // dark cap
      const c = lerp(18, 46, shade);
      return [clamp(c), clamp(c - 2), clamp(c - 4), 255];
    }
    // amber body
    let r = clamp(lerp(70, 214, shade));
    let g = clamp(lerp(34, 126, shade));
    let b = clamp(lerp(14, 56, shade));
    // slight vertical darkening toward base
    const vd = 1 - 0.12 * ((y - bodyTop) / (bodyBot - bodyTop));
    r *= vd; g *= vd; b *= vd;
    if (withLabel && y >= labelTop && y <= labelBot) {
      let lr = 226, lg = 214, lb = 188;
      const lv = (y - labelTop) / (labelBot - labelTop);
      if (lv < 0.04 || lv > 0.96) { lr = 45; lg = 90; lb = 39; }
      const inText = lv > 0.3 && lv < 0.7 && t > 0.2 && t < 0.8;
      if (inText && Math.floor(x / 24) % 2 === 0) { lr = 60; lg = 50; lb = 38; }
      // wrap shading onto label so it follows the cylinder
      return [clamp(lr * (0.7 + 0.3 * shade)), clamp(lg * (0.7 + 0.3 * shade)), clamp(lb * (0.7 + 0.3 * shade)), 255];
    }
    return [clamp(r), clamp(g), clamp(b), 255];
  });
}

bottle('products/shilajit/bottle/shilajit-bottle-blank.png', false);
bottle('products/shilajit/bottle/shilajit-bottle-composite.png', true);

console.log('Done. NOTE: these are PLACEHOLDERS — replace with the real Drive assets.');
