import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { MistOverlay } from "./MistOverlay";

/**
 * Full-viewport atmospheric hero. Dark wood-log plate + drifting mist.
 * No marketing copy — purely the entry mood. The `.hero-section` class is the
 * scroll anchor referenced by the vine timeline.
 */
export function HeroLogScene() {
  return (
    <section className="hero-section relative h-screen w-full overflow-hidden bg-ink">
      {/* z-10: background plate (preloaded for first paint) */}
      <Image
        src={ASSETS.hero.plate}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* z-0/atmosphere: drifting mist (screen blend, desktop only) */}
      <MistOverlay />

      {/* bottom fade into the next scene */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-ink" />

      {/* scroll cue */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <svg
          className="scroll-cue h-7 w-7 text-parchment/60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-label="Scroll down"
        >
          <path d="M12 4v14M6 12l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
