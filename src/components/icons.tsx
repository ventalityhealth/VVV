// Forest-themed custom SVG icon set. 24×24, stroke-based.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  width: 24, height: 24, viewBox: "0 0 24 24",
  fill: "none", stroke: "currentColor",
  strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

export const ArrowUpRight  = (p: P) => <svg {...base} {...p}><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>;
export const ArrowRight    = (p: P) => <svg {...base} {...p}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>;
export const Leaf          = (p: P) => <svg {...base} {...p}><path d="M5 19c0-8 6-13 14-13 0 8-6 13-14 13Z"/><path d="M5 19c3-5 6-8 10-10"/></svg>;
export const Tree          = (p: P) => <svg {...base} {...p}><path d="M12 3 6 11h3l-3 4h12l-3-4h3L12 3Z"/><path d="M12 15v6"/></svg>;
export const Acorn         = (p: P) => <svg {...base} {...p}><path d="M6 9a6 6 0 0 1 12 0Z"/><path d="M7 9a5 6 0 0 0 10 0"/><path d="M12 21v-3"/></svg>;
export const Owl           = (p: P) => <svg {...base} {...p}><circle cx="9" cy="10" r="3"/><circle cx="15" cy="10" r="3"/><path d="m12 12 1.5 2h-3Z"/><path d="M5 7c1-2 3-3 7-3s6 1 7 3"/></svg>;
export const Spore         = (p: P) => <svg {...base} {...p}><circle cx="12" cy="12" r="3"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"/></svg>;
export const MenuIcon      = (p: P) => <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
export const CloseIcon     = (p: P) => <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
export const PlusIcon      = (p: P) => <svg {...base} {...p}><path d="M12 5v14M5 12h14"/></svg>;
export const FlaskIcon     = (p: P) => <svg {...base} {...p}><path d="M9 3h6M9 3v6l-4 9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1l-4-9V3"/><path d="M9 15h6"/></svg>;
export const ShieldIcon    = (p: P) => <svg {...base} {...p}><path d="M12 2 3 7v5c0 5.25 3.75 10.15 9 11.25C18.25 22.15 22 17.25 22 12V7z"/></svg>;
