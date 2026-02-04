import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Hotel, Lightbulb, Bus } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

gsap.registerPlugin(ScrollTrigger);

export default function Visit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { data } = useCMS();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Path line draw
      gsap.fromTo(
        pathRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards fade in from sides
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const xOffset = index % 2 === 0 ? -50 : 50;

          gsap.fromTo(
            card,
            { x: xOffset, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 50%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const visitCards = [
    {
      icon: Calendar,
      title: 'Best Time to Visit',
      content: data.visitInfo.bestTimeToVisit,
      side: 'left',
    },
    {
      icon: Bus,
      title: 'How to Get Here',
      content: data.visitInfo.howToGetThere,
      side: 'right',
    },
    {
      icon: Hotel,
      title: 'Where to Stay',
      content: data.visitInfo.whereToStay,
      side: 'left',
    },
    {
      icon: Lightbulb,
      title: 'Local Tips',
      content: data.visitInfo.localTips,
      side: 'right',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[#004968] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#1b9cca] font-semibold text-sm uppercase tracking-wider mb-4">
            Plan Your Trip
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
            Visit <span className="text-[#1b9cca]">Cantilan</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Everything you need to know to plan your visit to our beautiful town
          </p>
        </div>

        {/* Journey Path Layout */}
        <div className="relative">
          {/* Central Glowing Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
            <div
              ref={pathRef}
              className="w-full h-full bg-gradient-to-b from-[#1b9cca] via-[#0070a0] to-[#1b9cca] rounded-full origin-top"
              style={{ boxShadow: '0 0 20px rgba(27, 156, 202, 0.5)' }}
            />
          </div>

          {/* Cards */}
          <div className="space-y-12">
            {visitCards.map((card, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`relative flex ${
                  card.side === 'left'
                    ? 'md:justify-start'
                    : 'md:justify-end'
                }`}
              >
                {/* Card */}
                <div
                  className={`w-full md:w-[45%] bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 ${
                    card.side === 'left' ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1b9cca]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {card.content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center Dot (desktop only) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#1b9cca] rounded-full border-4 border-[#004968] z-10" />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div className="mt-20 relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/visit-boat.jpg"
            alt="Experience Cantilan"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#004968]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-[#1b9cca]" />
              <span className="text-white/80">Cantilan, Surigao del Sur</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-white">
              Experience Authentic Coastal Living
            </h3>
          </div>
        </div>
      </div>

      {/* Decorative Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#004968"
          />
        </svg>
      </div>
    </section>
  );
}
