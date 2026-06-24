"use client";
import { useRef, useState } from "react";

interface ForestVideoProps {
  src: string | string[];
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ForestVideo({ src, poster, className = "", style }: ForestVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = Array.isArray(src) ? src : [src];

  const fadeTo = (from: number, to: number, ms: number) => {
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / ms, 1);
      setOpacity(from + (to - from) * p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <video
      ref={videoRef}
      src={sources[srcIndex]}
      poster={poster}
      autoPlay muted loop={sources.length === 1} playsInline preload="auto"
      onLoadedData={() => fadeTo(0, 1, 500)}
      onTimeUpdate={() => {
        const v = videoRef.current;
        if (v && v.duration && v.duration - v.currentTime <= 0.55) fadeTo(1, 0, 500);
      }}
      onEnded={() => {
        const v = videoRef.current;
        if (!v) return;
        if (sources.length === 1) { v.currentTime = 0; void v.play(); fadeTo(0, 1, 500); }
        else { setSrcIndex(i => (i + 1) % sources.length); v.load(); void v.play(); fadeTo(0, 1, 500); }
      }}
      className={className}
      style={{ ...style, opacity }}
    />
  );
}
