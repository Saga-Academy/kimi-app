import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Users, Landmark, History, Shield } from 'lucide-react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: '1521',
    title: 'First European Contact',
    description:
      'Antonio Pigafetta, chronicler of Magellan\'s voyage, recorded the region as "Calagan" among the best ports for provisions and trade.',
  },
  {
    year: '1622',
    title: 'Evangelization Begins',
    description:
      'The systematic evangelization of Caraga Province began with the arrival of eight Recoletos from Manila, establishing Calagdan (Cantilan) as a priory.',
  },
  {
    year: '1767',
    title: 'Defense Against Pirates',
    description:
      'Cantilan fighters led by Francisco Arreza and Santiago Arizobal helped defend Tandag Fort against Moro pirates, bringing 200 warriors on seven sailboats.',
  },
  {
    year: '1782',
    title: 'Foundation as Parish',
    description:
      'Fray Valero de San Agustin founded Cantilan as a regular parish at "Daan Lungsod" (Old Town), establishing it as a permanent settlement.',
  },
  {
    year: '1856',
    title: 'The Great Hurricane',
    description:
      'A devastating hurricane with massive tidal waves destroyed the old town. Survivors crossed the river to establish present-day Cantilan.',
  },
  {
    year: 'Present',
    title: 'Modern Cantilan',
    description:
      'Today, Cantilan thrives as a progressive municipality with 17 barangays, preserving its heritage while embracing sustainable development.',
  },
];

const barangays = [
  'Bugsukan',
  'Buntalid',
  'Cabangahan',
  'Cabas-an',
  'Calagdaan',
  'Consuelo',
  'General Island',
  'Lininti-an',
  'Lobo',
  'Magasang',
  'Magosilom',
  'Pag-antayan',
  'Palasao',
  'Parang',
  'San Pedro',
  'Tapi',
  'Tigabong',
];

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline items animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      timelineItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
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
            About Cantilan
          </h1>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Discover the rich history and heritage of the Cradle of Towns
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-[#1f1f1f] mb-6">
                The <span className="text-[#0070a0]">Cradle</span> of Towns
              </h2>
              <div className="space-y-4 text-[#33383f] leading-relaxed">
                <p>
                  Cantilan holds a special place in the history of Surigao del Sur
                  and the entire Caraga region. As one of the oldest settlements in
                  northeastern Mindanao, it has witnessed centuries of transformation
                  while maintaining its unique cultural identity.
                </p>
                <p>
                  The town's nickname, "The Cradle of Towns," reflects its historical
                  significance as a founding settlement from which neighboring
                  communities emerged and developed. Its strategic coastal location
                  made it a vital center for trade, fishing, and cultural exchange.
                </p>
                <p>
                  Today, Cantilan stands as a testament to the resilience and
                  adaptability of its people, who have preserved their heritage while
                  embracing modern sustainable practices.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/about-boat.jpg"
                alt="Cantilan Heritage"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#0070a0] text-white rounded-xl p-6 shadow-xl">
                <div className="text-center">
                  <span className="block font-serif text-4xl font-bold">243+</span>
                  <span className="text-sm">Years of History</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Calendar, value: '1782', label: 'Founded' },
              { icon: MapPin, value: '17', label: 'Barangays' },
              { icon: Users, value: '34,060', label: 'Population (2020)' },
              { icon: Landmark, value: '1st', label: 'Class Municipality' },
            ].map((fact, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <fact.icon className="w-8 h-8 text-[#0070a0] mx-auto mb-3" />
                <div className="font-serif text-3xl font-bold text-[#1f1f1f]">
                  {fact.value}
                </div>
                <div className="text-sm text-[#33383f]">{fact.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Historical Timeline */}
        <section className="mb-20">
          <h2 className="font-serif text-4xl font-bold text-[#1f1f1f] mb-12 text-center">
            Historical <span className="text-[#0070a0]">Timeline</span>
          </h2>

          <div ref={timelineRef} className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#0070a0]/20 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`timeline-item relative flex ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center gap-8`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <span className="inline-block px-3 py-1 bg-[#0070a0]/10 text-[#0070a0] text-sm font-semibold rounded-full mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#1f1f1f] mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-[#33383f] text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0070a0] rounded-full border-4 border-[#f7f9fa] z-10" />

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Barangays */}
        <section className="mb-20">
          <h2 className="font-serif text-4xl font-bold text-[#1f1f1f] mb-8 text-center">
            Our <span className="text-[#0070a0]">Barangays</span>
          </h2>
          <p className="text-[#33383f] text-center max-w-2xl mx-auto mb-12">
            Cantilan is composed of 17 barangays, each with its own unique character
            and contribution to the municipality's vibrant community.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {barangays.map((barangay, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 text-center shadow hover:shadow-md transition-shadow"
              >
                <span className="text-[#33383f] font-medium">{barangay}</span>
              </div>
            ))}
          </div>
        </section>

        {/* LGU Section */}
        <section>
          <div className="bg-[#004968] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-[#1b9cca]" />
                  <span className="text-[#1b9cca] font-semibold uppercase tracking-wider">
                    Local Government
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-white mb-4">
                  Municipality of Cantilan
                </h2>
                <p className="text-white/80 leading-relaxed mb-6">
                  The Local Government Unit of Cantilan is committed to serving the
                  people with transparency, efficiency, and dedication. Under the
                  leadership of Mayor Rodrigo L. Eleazar and Vice Mayor Liberty G.
                  Cale, the municipality continues to pursue sustainable development
                  while preserving its rich cultural heritage.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 rounded-lg px-4 py-2">
                    <span className="text-white/60 text-sm">Mayor</span>
                    <p className="text-white font-semibold">Rodrigo L. Eleazar</p>
                  </div>
                  <div className="bg-white/10 rounded-lg px-4 py-2">
                    <span className="text-white/60 text-sm">Vice Mayor</span>
                    <p className="text-white font-semibold">Liberty G. Cale</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                    <History className="w-24 h-24 text-white/30" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[#0070a0] rounded-xl p-4">
                    <span className="text-white font-semibold">LGU Cantilan</span>
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
