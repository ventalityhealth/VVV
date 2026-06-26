import { HeroLogScene } from "@/components/HeroLogScene";
import { BranchTravelScene } from "@/components/BranchTravelScene";
import { ProductWrapScene } from "@/components/ProductWrapScene";

export default function HomePage() {
  return (
    <main className="bg-ink">
      <HeroLogScene />
      <BranchTravelScene />
      <section id="shilajit">
        <ProductWrapScene product="shilajit" />
      </section>
    </main>
  );
}
