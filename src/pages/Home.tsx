import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Highlights from '@/sections/Highlights';
import About from '@/sections/About';
import Culture from '@/sections/Culture';
import Nature from '@/sections/Nature';
import Economy from '@/sections/Economy';
import Visit from '@/sections/Visit';
import Gallery from '@/sections/Gallery';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f9fa]">
      <Navigation />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Culture />
        <Nature />
        <Economy />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
