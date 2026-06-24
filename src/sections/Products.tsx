"use client";
// Products — "The Grove"
// GSAP ScrollTrigger staggers each card in as the section enters viewport.
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ProductCard } from "@/components/ProductCard";
import { BranchSVG } from "@/components/BranchSVG";
import { products } from "@/data/products";

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Card stagger
      const cards = gridRef.current?.querySelectorAll("article");
      if (cards?.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.8, ease: "power3.out", stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="the-grove"
      ref={sectionRef}
      className="relative min-h-screen bg-forest-900 px-6 py-28 md:px-14 lg:px-24"
    >
      {/* Subtle bark texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #1C1410 0px, #1C1410 1.5px, transparent 1.5px, transparent 10px)",
        }}
      />

      {/* Growing branch — left edge */}
      <BranchSVG
        className="absolute left-0 top-0 h-full w-24 opacity-60"
        scrollStart="top 85%"
        scrollEnd="bottom 20%"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="will-change-transform">
          <p className="text-sm font-body text-amber-gold/75 mb-4 tracking-wide">// The Grove</p>
          <h2 className="font-heading italic text-5xl leading-[0.9] tracking-[-2px] text-cream md:text-6xl lg:text-[5rem]">
            Harvested for you.
          </h2>
          <p className="mt-5 max-w-lg text-cream/55 leading-relaxed">
            Every formula is sourced from Supliful&apos;s verified catalog and bottled under your
            forest brand.
          </p>
        </div>

        {/* Product grid */}
        <div ref={gridRef} className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              category={p.category}
              ingredients={p.ingredients}
              price={`$${p.price.toFixed(2)}`}
              accentColor={p.accentColor}
              suplifulSku={p.suplifulSku}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
