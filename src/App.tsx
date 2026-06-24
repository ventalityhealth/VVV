import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { Products } from './sections/Products';
import { Ingredients } from './sections/Ingredients';
import { ForestExperience } from './sections/ForestExperience';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-forest-900 font-body text-cream antialiased">
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Ingredients />
        <ForestExperience />
      </main>
      <Footer />
    </div>
  );
}
