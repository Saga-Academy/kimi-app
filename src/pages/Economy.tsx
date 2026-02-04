import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Anchor, Wheat, TrendingUp, Ship, Users, Package, DollarSign } from 'lucide-react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const economicSectors = [
  {
    name: 'Fishing',
    percentage: 80,
    description:
      'The backbone of Cantilan\'s economy, with both municipal and commercial fishing operations. The town\'s waters are rich in tuna, rabbitfish, sea bass, and various other species.',
    icon: Anchor,
    color: '#0070a0',
  },
  {
    name: 'Agriculture',
    percentage: 15,
    description:
      'Coconut farming, rice cultivation, and vegetable gardening support local food security and provide additional income for residents.',
    icon: Wheat,
    color: '#2c90c9',
  },
  {
    name: 'Trade & Services',
    percentage: 5,
    description:
      'Growing sector including retail, transportation, tourism services, and small businesses that support the local economy.',
    icon: TrendingUp,
    color: '#1b9cca',
  },
];

const portStats = [
  { label: 'Registered Fishing Boats', value: '200+' },
  { label: 'Daily Catch (Average)', value: '500kg' },
  { label: 'Fishing Families', value: '1,500+' },
  { label: 'Annual Production', value: '2,000+ tons' },
];

const livelihoodPrograms = [
  {
    title: 'Fisherfolk Registration',
    description:
      'Official registration system for local fishers to access fishing zones and government support programs.',
  },
  {
    title: 'Community Savings Clubs',
    description:
      'Financial literacy and savings programs to help fishing families manage their income and plan for the future.',
  },
  {
    title: 'Sustainable Fishing Training',
    description:
      'Educational programs on responsible fishing practices, seasonal closures, and marine conservation.',
  },
  {
    title: 'Alternative Livelihood',
    description:
      'Skills training and support for aquaculture, tourism services, and other income-generating activities.',
  },
];

export default function Economy() {
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
            Economy & Port
          </h1>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Discover the economic drivers and livelihood opportunities in Cantilan
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Economic Overview */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-item">
              <h2 className="font-serif text-4xl font-bold text-[#1f1f1f] mb-6">
                Economic <span className="text-[#0070a0]">Overview</span>
              </h2>
              <div className="space-y-4 text-[#33383f] leading-relaxed">
                <p>
                  Cantilan's economy is primarily driven by fishing and agriculture,
                  with the local port serving as a vital hub for trade and commerce.
                  The municipality has embraced sustainable practices to ensure the
                  long-term viability of these industries while protecting the
                  environment.
                </p>
                <p>
                  The fishing industry employs approximately 80% of the working
                  population, with both municipal and commercial operations
                  contributing to the local economy. The town's strategic location
                  along the Pacific coast provides access to rich fishing grounds
                  that have supported generations of fishing families.
                </p>
              </div>
            </div>
            <div className="animate-item">
              <img
                src="/economy-port.jpg"
                alt="Cantilan Port"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Economic Sectors */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <DollarSign className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Economic Sectors
            </h2>
          </div>

          <div className="space-y-6">
            {economicSectors.map((sector, index) => (
              <div
                key={index}
                className="animate-item bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${sector.color}20` }}
                  >
                    <sector.icon
                      className="w-8 h-8"
                      style={{ color: sector.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-serif text-xl font-bold text-[#1f1f1f]">
                        {sector.name}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: `${sector.color}20`,
                          color: sector.color,
                        }}
                      >
                        {sector.percentage}%
                      </span>
                    </div>
                    <p className="text-[#33383f] text-sm leading-relaxed">
                      {sector.description}
                    </p>
                  </div>
                  <div className="w-full md:w-48">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${sector.percentage}%`,
                          backgroundColor: sector.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Port Statistics */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Ship className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Cantilan Port
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {portStats.map((stat, index) => (
              <div
                key={index}
                className="animate-item bg-white rounded-xl p-6 text-center shadow-lg"
              >
                <div className="font-serif text-3xl font-bold text-[#0070a0] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#33383f]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="animate-item bg-[#004968] rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  Port Facilities
                </h3>
                <ul className="space-y-3">
                  {[
                    'Fish landing and processing area',
                    'Cold storage facilities',
                    'Boat repair and maintenance services',
                    'Fuel and supply station',
                    'Trading and market area',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <Package className="w-5 h-5 text-[#1b9cca]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  src="/gallery-boats.jpg"
                  alt="Port Activities"
                  className="rounded-xl shadow-lg max-h-[250px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Livelihood Programs */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Livelihood Programs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {livelihoodPrograms.map((program, index) => (
              <div
                key={index}
                className="animate-item bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="font-serif text-xl font-bold text-[#1f1f1f] mb-3">
                  {program.title}
                </h3>
                <p className="text-[#33383f] text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
