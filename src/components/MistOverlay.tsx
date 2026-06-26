import Image from "next/image";
import { ASSETS } from "@/lib/assets";

/**
 * Atmospheric mist layer — CSS `screen` blend + slow drift keyframe.
 * Hidden on small screens per the brief (performance + visibility).
 */
export function MistOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 hidden mix-blend-screen md:block ${className}`}
      aria-hidden="true"
    >
      <Image
        src={ASSETS.botanical.mist}
        alt=""
        fill
        sizes="100vw"
        className="mist-drift object-cover"
        priority={false}
      />
    </div>
  );
}
