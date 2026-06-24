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
      className="relative bg-forest-900 px-6 py-32 md:px-14 lg:px-24"
    >
      {/* Growing branch — left edge, faint accent */}
      <BranchSVG
        className="pointer-events-none absolute left-0 top-0 h-full w-20 opacity-25"
        scrollStart="top 85%"
        scrollEnd="bottom 20%"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl will-change-transform">
          <p className="eyebrow mb-5">The Grove · Catalog</p>
          <h2 className="font-heading text-4xl leading-[1.04] tracking-[-0.02em] text-cream md:text-5xl lg:text-[3.75rem]">
            Harvested for you.
          </h2>
          <p className="mt-6 max-w-md text-cream/55 leading-relaxed">
            Every formula is sourced from Supliful&apos;s verified catalog and bottled under the
            Ventality name — full provenance, no proprietary blends.
          </p>
        </div>

        {/* Product grid */}
        <div ref={gridRef} className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
