import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slide in
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image scale on scroll
      const imgElement = imageRef.current?.querySelector('img');
      if (imgElement) {
        gsap.fromTo(
          imgElement,
          { scale: 1.1 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Content fade in
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.animate-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // SVG Path draw
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Calendar, value: 300, suffix: '+', label: 'Years of History' },
    { icon: MapPin, value: 17, suffix: '', label: 'Barangays' },
    { icon: Users, value: 34, suffix: 'k+', label: 'Residents' },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#f7f9fa] overflow-hidden">
      {/* SVG River Flow Path */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M-100 100 Q 300 150, 600 200 T 1300 300"
          stroke="#0070a0"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/about-boat.jpg"
                alt="Fishing in Cantilan"
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#004968]/40 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6">
              <div className="text-center">
                <span className="block font-serif text-4xl font-bold text-[#0070a0]">
                  1782
                </span>
                <span className="text-sm text-[#33383f]">Founded</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="animate-item inline-block text-[#0070a0] font-semibold text-sm uppercase tracking-wider mb-4">
              About Cantilan
            </span>

            <h2 className="animate-item font-serif text-4xl sm:text-5xl font-bold text-[#1f1f1f] mb-6 leading-tight">
              The Cradle of Towns in{' '}
              <span className="text-[#0070a0]">Surigao del Sur</span>
            </h2>

            <div className="animate-item space-y-4 text-[#33383f] leading-relaxed">
              <p>
                Founded in <strong>1782</strong> by Fray Valero de San Agustin,
                Cantilan is one of the oldest settlements in the Caraga region of
                Mindanao. Known as "The Cradle of Towns," it has played a pivotal
                role in the historical and cultural development of northeastern
                Mindanao.
              </p>
              <p>
                The town has withstood the test of time, surviving typhoons,
                earthquakes, and even a devastating hurricane in{' '}
                <strong>1856</strong> that completely destroyed the old town. The
                resilient people of Cantilan rebuilt their community across the
                river, creating the vibrant municipality we see today.
              </p>
              <p>
                With its rich fishing heritage, sustainable practices, and warm
                community spirit, Cantilan continues to be a beacon of resilience
                and progress in the region.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#0070a0]/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-[#0070a0]" />
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span
                      className="stat-number font-serif text-4xl font-bold text-[#1f1f1f]"
                      data-target={stat.value}
                    >
                      0
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#0070a0]">
                      {stat.suffix}
                    </span>
                  </div>
                  <span className="text-[#33383f]">{stat.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
