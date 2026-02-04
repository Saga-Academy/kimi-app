import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Utensils, HandHeart, Users, Calendar, Sparkles } from 'lucide-react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const festivals = [
  {
    name: 'Sirong Festival',
    date: 'August 14',
    description:
      'The Sirong Festival is Cantilan\'s premier cultural celebration, held annually on August 14th in honor of the town\'s patron saint. The festival features vibrant street dances, colorful costumes, and traditional music that showcase the community\'s rich heritage.',
    activities: ['Street Dancing', 'Cultural Shows', 'Religious Processions', 'Food Fairs'],
  },
];

const traditions = [
  {
    icon: HandHeart,
    title: 'Basket Weaving',
    description:
      'Local artisans continue the tradition of weaving baskets and other items from natural materials, passing down skills through generations.',
  },
  {
    icon: Users,
    title: 'Community Bayanihan',
    description:
      'The spirit of bayanihan (community cooperation) remains strong, with residents coming together to help neighbors in need.',
  },
  {
    icon: Sparkles,
    title: 'Fishing Traditions',
    description:
      'Traditional fishing methods are still practiced alongside modern techniques, preserving the community\'s connection to the sea.',
  },
];

const delicacies = [
  {
    name: 'Fresh Oysters',
    description: 'Plump, juicy oysters harvested from local waters, best enjoyed grilled or fresh.',
  },
  {
    name: 'Grilled Fish',
    description: 'Daily catch grilled to perfection, served with local dipping sauces.',
  },
  {
    name: 'Kinilaw',
    description: 'Fresh fish marinated in vinegar with onions, ginger, and chili.',
  },
  {
    name: 'Seafood Paella',
    description: 'A local twist on the Spanish classic, loaded with fresh seafood.',
  },
];

export default function Culture() {
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
            Culture & Life
          </h1>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Experience the vibrant traditions and warm hospitality of Cantilan
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Festivals Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Festivals & Celebrations
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {festivals.map((festival, index) => (
              <div
                key={index}
                className="animate-item lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-[300px] md:h-auto">
                    <img
                      src="/culture-festival.jpg"
                      alt={festival.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Music className="w-5 h-5 text-[#0070a0]" />
                      <span className="text-[#0070a0] font-semibold">
                        {festival.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#1f1f1f] mb-4">
                      {festival.name}
                    </h3>
                    <p className="text-[#33383f] leading-relaxed mb-6">
                      {festival.description}
                    </p>
                    <div>
                      <span className="text-sm text-[#33383f] font-semibold mb-3 block">
                        Festival Activities:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {festival.activities.map((activity, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#0070a0]/10 text-[#0070a0] text-sm rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Traditions Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <HandHeart className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Living Traditions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {traditions.map((tradition, index) => (
              <div
                key={index}
                className="animate-item bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-[#0070a0]/10 rounded-xl flex items-center justify-center mb-4">
                  <tradition.icon className="w-7 h-7 text-[#0070a0]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1f1f1f] mb-3">
                  {tradition.title}
                </h3>
                <p className="text-[#33383f] text-sm leading-relaxed">
                  {tradition.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Local Cuisine Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Utensils className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Local Cuisine
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-item">
              <img
                src="/culture-food.jpg"
                alt="Local Cuisine"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div className="animate-item">
              <p className="text-[#33383f] leading-relaxed mb-6">
                Cantilan's coastal location provides an abundance of fresh seafood,
                which forms the foundation of local cuisine. From simple grilled
                preparations to more elaborate dishes, the food reflects the
                community's deep connection to the sea.
              </p>

              <div className="space-y-4">
                {delicacies.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-[#1f1f1f] mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[#33383f] text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Crafts Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Traditional Crafts
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-item order-2 lg:order-1">
              <p className="text-[#33383f] leading-relaxed mb-6">
                The artisans of Cantilan keep traditional crafts alive through
                practices like basket weaving, net mending, and boat building.
                These skills are passed down from generation to generation,
                preserving the community's cultural heritage.
              </p>
              <p className="text-[#33383f] leading-relaxed mb-6">
                Visitors can often observe these crafts being practiced in the
                town proper and coastal barangays, providing a glimpse into the
                daily life and traditions of Cantilan's residents.
              </p>
              <div className="bg-[#0070a0]/10 rounded-xl p-6">
                <h4 className="font-semibold text-[#0070a0] mb-2">
                  Did You Know?
                </h4>
                <p className="text-[#33383f] text-sm">
                  Many of the woven baskets used for fishing and daily activities
                  in Cantilan are made using techniques that have remained
                  unchanged for centuries.
                </p>
              </div>
            </div>
            <div className="animate-item order-1 lg:order-2">
              <img
                src="/culture-crafts.jpg"
                alt="Traditional Crafts"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
