import { Navigation } from "@/components/Navigation";
import { Hero } from "@/sections/Hero";
import { Products } from "@/sections/Products";
import { Ingredients } from "@/sections/Ingredients";
import { ForestExperience } from "@/sections/ForestExperience";
import { Footer } from "@/sections/Footer";

export default function Page() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Ingredients />
        <ForestExperience />
      </main>
      <Footer />
    </>
  );
}
