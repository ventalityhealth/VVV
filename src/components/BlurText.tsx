"use client";
// Word-by-word blur reveal driven by GSAP (triggered by IntersectionObserver).
// Smooth enough for the hero headline; readable without JS.
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface BlurTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;      // initial delay in seconds
  stagger?: number;    // per-word stagger in seconds
  align?: "center" | "start";
}

export function BlurText({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
  stagger = 0.1,
  align = "center",
}: BlurTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLSpanElement>(".word");

    gsap.set(spans, { opacity: 0, y: 40, filter: "blur(10px)" });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, stagger]);

  const justifyClass = align === "center" ? "justify-center" : "justify-start";

  return (
    // @ts-expect-error — dynamic tag with ref is fine here
    <Tag ref={containerRef} className={`flex flex-wrap ${justifyClass} gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="word inline-block mr-[0.28em] will-change-transform">
          {word}
        </span>
      ))}
    </Tag>
  );
}
