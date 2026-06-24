// lib/gsap.ts
// Single import point for GSAP. Registers all plugins once.
// Import from here — never directly from "gsap/*" in components.
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
export { useGSAP } from "@gsap/react";
