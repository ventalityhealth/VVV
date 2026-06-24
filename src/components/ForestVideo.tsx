// components/ForestVideo.tsx
//
// Atmospheric looping background video with cross-fade between loops / sources.
// Fails gracefully: if no source loads, opacity stays 0 and whatever sits
// behind it (the CSS atmosphere layers) shows through.
import { useRef, useState } from 'react';

interface ForestVideoProps {
  src: string | string[];
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ForestVideo({ src, poster, className = '', style }: ForestVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = Array.isArray(src) ? src : [src];

  const fadeTo = (from: number, to: number, duration: number) => {
    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setOpacity(from + (to - from) * progress);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const fadeIn = () => fadeTo(0, 1, 500);
  const fadeOut = () => fadeTo(1, 0, 550);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (video.duration - video.currentTime <= 0.55) {
      fadeOut();
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    if (sources.length === 1) {
      video.currentTime = 0;
      void video.play();
      fadeIn();
    } else {
      setSrcIndex((prev) => (prev + 1) % sources.length);
      video.load();
      void video.play();
      fadeIn();
    }
  };

  return (
    <video
      ref={videoRef}
      src={sources[srcIndex]}
      poster={poster}
      autoPlay
      muted
      loop={sources.length === 1}
      playsInline
      preload="auto"
      onLoadedData={fadeIn}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
      className={className}
      style={{ ...style, opacity }}
    />
  );
}
