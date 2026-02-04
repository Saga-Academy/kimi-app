import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TreePine, Droplets, Fish, Leaf, Waves, Sun, Wind } from 'lucide-react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const conservationProjects = [
  {
    title: 'Marine Protected Areas',
    description:
      'Designated zones where fishing is restricted to allow marine life to thrive and replenish populations.',
    icon: Fish,
  },
  {
    title: 'Mangrove Reforestation',
    description:
      'Ongoing efforts to restore and expand mangrove forests along the coastline.',
    icon: TreePine,
  },
  {
    title: 'Sustainable Fishing',
    description:
      'Community programs promoting responsible fishing practices and seasonal closures.',
    icon: Waves,
  },
  {
    title: 'Coastal Cleanups',
    description:
      'Regular community-led initiatives to keep beaches and waters clean.',
    icon: Sun,
  },
];

const naturalAttractions = [
  {
    name: 'Ayoke Island',
    description:
      'A small island with a marine sanctuary, perfect for snorkeling and experiencing pristine underwater ecosystems.',
    image: '/gallery-beach.jpg',
  },
  {
    name: 'Mangrove Forests',
    description:
      'Dense coastal mangrove forests that serve as nurseries for fish and habitats for various wildlife.',
    image: '/gallery-mangroves.jpg',
  },
  {
    name: 'Cantilan River',
    description:
      'A serene waterway perfect for kayaking and experiencing the tranquil beauty of the countryside.',
    image: '/about-boat.jpg',
  },
  {
    name: 'Coastal Beaches',
    description:
      'Pristine beaches with white sand and clear waters, ideal for swimming and relaxation.',
    image: '/culture-beach.jpg',
  },
];

export default function Nature() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current?.querySelectorAll('.animate-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#f7f9fa]">
      <Navigation />

      {/* Page Header */}
      <div className="relative pt-32 pb-20 bg-[#004968]">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6">
            Nature & Environment
          </h1>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Discover the natural wonders and conservation efforts of Cantilan
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-item">
              <img
                src="/nature-forest.jpg"
                alt="Cantilan Nature"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div className="animate-item">
              <h2 className="font-serif text-4xl font-bold text-[#1f1f1f] mb-6">
                Preserving Our <span className="text-[#0070a0]">Natural Heritage</span>
              </h2>
              <div className="space-y-4 text-[#33383f] leading-relaxed">
                <p>
                  Cantilan is blessed with abundant natural beauty, from lush
                  mangrove forests to pristine beaches and crystal-clear waters.
                  The municipality's 19-kilometer coastline is home to diverse
                  marine ecosystems that support both the local economy and the
                  environment.
                </p>
                <p>
                  The community has embraced sustainable practices to protect these
                  precious resources. Through marine protected areas, mangrove
                  reforestation, and responsible fishing, Cantilan is ensuring that
                  its natural heritage will be preserved for future generations.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: '19km', label: 'Coastline' },
                  { value: '2km²', label: 'Marine Sanctuary' },
                  { value: '1000+', label: 'Mangrove Hectares' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-serif text-2xl font-bold text-[#0070a0]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#33383f]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conservation Projects */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Conservation Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conservationProjects.map((project, index) => (
              <div
                key={index}
                className="animate-item bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#0070a0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <project.icon className="w-7 h-7 text-[#0070a0]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1f1f1f] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[#33383f] text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Natural Attractions */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Droplets className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Natural Attractions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {naturalAttractions.map((attraction, index) => (
              <div
                key={index}
                className="animate-item group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="h-[300px]">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#004968]/90 via-[#004968]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {attraction.name}
                  </h3>
                  <p className="text-white/80 text-sm">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Climate */}
        <section>
          <div className="bg-[#004968] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Wind className="w-6 h-6 text-[#1b9cca]" />
                  <span className="text-[#1b9cca] font-semibold uppercase tracking-wider">
                    Climate
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-white mb-4">
                  Tropical Weather
                </h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  Cantilan enjoys a tropical climate with two distinct seasons. The
                  dry season runs from April to September, while the wet season
                  extends from October to March. The municipality receives an
                  average monthly precipitation of 308.66 mm during its wettest
                  months.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <span className="text-white/60 text-sm">Dry Season</span>
                    <p className="text-white font-semibold">April - September</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <span className="text-white/60 text-sm">Wet Season</span>
                    <p className="text-white font-semibold">October - March</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-6 text-center">
                    <Sun className="w-8 h-8 text-[#1b9cca] mx-auto mb-2" />
                    <span className="text-white/60 text-sm">Avg. Temperature</span>
                    <p className="text-white font-semibold text-xl">27-32°C</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 text-center">
                    <Droplets className="w-8 h-8 text-[#1b9cca] mx-auto mb-2" />
                    <span className="text-white/60 text-sm">Humidity</span>
                    <p className="text-white font-semibold text-xl">75-85%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
