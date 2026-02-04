import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Anchor, Wheat, TrendingUp, Ship } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const economicSectors = [
  { label: 'Fishing', value: 80, color: '#0070a0', icon: Anchor },
  { label: 'Agriculture', value: 15, color: '#2c90c9', icon: Wheat },
  { label: 'Other', value: 5, color: '#1b9cca', icon: TrendingUp },
];

const hotspots = [
  { x: 30, y: 40, label: 'Daily Catch', value: '500kg+' },
  { x: 60, y: 60, label: 'Fishing Boats', value: '200+' },
  { x: 45, y: 25, label: 'Employment', value: '80%' },
];

export default function Economy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<SVGCircleElement[]>([]);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circular reveal for stats
      circlesRef.current.forEach((circle, index) => {
        if (circle) {
          const circumference = 2 * Math.PI * 54;
          const offset = circumference - (economicSectors[index].value / 100) * circumference;

          gsap.set(circle, {
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
          });

          gsap.to(circle, {
            strokeDashoffset: offset,
            duration: 1.5,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });

      // Content fade in
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.animate-content') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#f7f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="animate-content inline-block text-[#0070a0] font-semibold text-sm uppercase tracking-wider mb-4">
              Economy & Livelihood
            </span>

            <h2 className="animate-content font-serif text-4xl sm:text-5xl font-bold text-[#1f1f1f] mb-6 leading-tight">
              Driven by the <span className="text-[#0070a0]">Sea</span> &{' '}
              <span className="text-[#0070a0]">Land</span>
            </h2>

            <p className="animate-content text-[#33383f] text-lg leading-relaxed mb-8">
              Cantilan's economy is primarily driven by fishing and agriculture,
              with the local port serving as a vital hub for trade and commerce.
              The community has embraced sustainable practices to ensure the
              long-term viability of these industries.
            </p>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6">
              {economicSectors.map((sector, index) => (
                <div key={index} className="animate-content text-center">
                  <div className="relative w-28 h-28 mx-auto mb-3">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="56"
                        cy="56"
                        r="54"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        ref={(el) => {
                          if (el) circlesRef.current[index] = el;
                        }}
                        cx="56"
                        cy="56"
                        r="54"
                        fill="none"
                        stroke={sector.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <sector.icon
                        className="w-6 h-6 mb-1"
                        style={{ color: sector.color }}
                      />
                      <span
                        className="text-xl font-bold"
                        style={{ color: sector.color }}
                      >
                        {sector.value}%
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-[#33383f] font-medium">
                    {sector.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image with Hotspots */}
          <div className="animate-content relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/economy-port.jpg"
                alt="Cantilan Port"
                className="w-full h-[500px] object-cover"
              />

              {/* Hotspots */}
              {hotspots.map((hotspot, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  onMouseEnter={() => setActiveHotspot(index)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  {/* Pulsing circle */}
                  <div className="relative">
                    <div className="w-4 h-4 bg-[#0070a0] rounded-full animate-ping absolute" />
                    <div className="w-4 h-4 bg-[#0070a0] rounded-full relative cursor-pointer hover:scale-125 transition-transform" />
                  </div>

                  {/* Tooltip */}
                  {activeHotspot === index && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl p-3 whitespace-nowrap z-10 animate-in fade-in zoom-in duration-200">
                      <div className="text-xs text-[#33383f]">{hotspot.label}</div>
                      <div className="text-lg font-bold text-[#0070a0]">
                        {hotspot.value}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#004968]/30 to-transparent pointer-events-none" />
            </div>

            {/* Port badge */}
            <div className="absolute -bottom-4 -left-4 bg-[#0070a0] text-white rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-2">
                <Ship className="w-5 h-5" />
                <span className="font-semibold">Cantilan Port</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Facts */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Registered Fishers', value: '1,500+' },
            { label: 'Marine Sanctuary', value: '2 km²' },
            { label: 'Annual Catch', value: '2,000+ tons' },
            { label: 'Coastline', value: '19 km' },
          ].map((fact, index) => (
            <div
              key={index}
              className="animate-content bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="font-serif text-3xl font-bold text-[#0070a0] mb-1">
                {fact.value}
              </div>
              <div className="text-sm text-[#33383f]">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
