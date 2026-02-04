import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Fish, Building2, Palmtree, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  fish: Fish,
  building: Building2,
  palmtree: Palmtree,
};

export default function Highlights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { data } = useCMS();
  const visibleHighlights = data.highlights.filter((h) => h.isVisible).sort((a, b) => a.order - b.order);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section background wipe
      gsap.fromTo(
        sectionRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards 3D flip entrance
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { rotateX: 90, opacity: 0, transformOrigin: 'center bottom' },
            {
              rotateX: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Parallax effect on scroll
          const yOffset = [-50, -100, -30][index] || -50;
          gsap.to(card, {
            y: yOffset,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleHighlights.length]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[#004968] overflow-hidden"
    >
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-[#0070a0] rounded-full filter blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-[#1b9cca] rounded-full filter blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Highlights
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover what makes Cantilan a unique destination in Surigao del Sur
          </p>
        </div>

        {/* Cards Grid - Floating Archipelago Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleHighlights.map((highlight, index) => {
            const IconComponent = iconMap[highlight.icon] || Palmtree;
            const verticalOffset = index === 1 ? 'md:mt-16' : '';

            return (
              <div
                key={highlight.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`group ${verticalOffset}`}
                style={{ perspective: '1000px' }}
              >
                <Link to={highlight.link}>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#0070a0]/30">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                      <IconComponent className="w-8 h-8 text-white group-hover:rotate-[360deg] transition-transform duration-700" />
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-2xl font-bold text-white mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {highlight.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0070a0]/0 via-[#0070a0]/0 to-[#0070a0]/0 group-hover:from-[#0070a0]/10 group-hover:via-[#1b9cca]/10 group-hover:to-[#0070a0]/10 transition-all duration-500" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#f7f9fa"
          />
        </svg>
      </div>
    </section>
  );
}
