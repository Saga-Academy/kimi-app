import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Droplets, Fish, TreePine, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const natureFeatures = [
  {
    icon: TreePine,
    title: 'Mangrove Forests',
    description: 'Protected coastal ecosystems that serve as nurseries for marine life',
  },
  {
    icon: Droplets,
    title: 'Pristine Beaches',
    description: 'White sand shores with crystal-clear waters perfect for swimming',
  },
  {
    icon: Fish,
    title: 'Marine Sanctuary',
    description: 'Protected waters around Ayoke Island with abundant sea life',
  },
  {
    icon: Leaf,
    title: 'Conservation',
    description: 'Community-led efforts to protect and preserve natural resources',
  },
];

export default function Nature() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Deep parallax for background
      gsap.to(bgRef.current, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Cards slide up
      gsap.fromTo(
        cardsRef.current?.querySelectorAll('.feature-card') || [],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating leaves animation
      const leaves = leavesRef.current?.querySelectorAll('.floating-leaf');
      leaves?.forEach((leaf, index) => {
        gsap.to(leaf, {
          y: '100vh',
          x: `+=${Math.sin(index) * 50}`,
          rotation: Math.random() * 360,
          duration: 10 + Math.random() * 10,
          repeat: -1,
          ease: 'none',
          delay: index * 2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background Image with Deep Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/nature-forest.jpg"
          alt="Cantilan Nature"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#004968]/90 via-[#004968]/70 to-[#004968]/50" />
      </div>

      {/* Floating Leaves */}
      <div ref={leavesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-leaf absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-50px`,
            }}
          >
            <Leaf
              className="w-6 h-6 text-white"
              style={{ transform: `rotate(${Math.random() * 360}deg)` }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-white">
            <span className="inline-block text-[#1b9cca] font-semibold text-sm uppercase tracking-wider mb-4">
              Nature & Environment
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Preserving Our{' '}
              <span className="text-[#1b9cca]">Natural Heritage</span>
            </h2>

            <p className="text-white/80 text-lg leading-relaxed mb-8">
              From lush mangrove forests to pristine beaches, Cantilan is blessed
              with abundant natural beauty. Our community is committed to
              protecting these precious ecosystems for future generations.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-white text-[#004968] hover:bg-white/90 font-semibold px-6 py-3 rounded-full"
              >
                <Link to="/visit" className="flex items-center gap-2">
                  Explore Nature
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10 rounded-full"
              >
                View Conservation Projects
              </Button>
            </div>
          </div>

          {/* Right Feature Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {natureFeatures.map((feature, index) => (
              <div
                key={index}
                className="feature-card group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105"
              >
                <div className="w-12 h-12 bg-[#1b9cca]/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1b9cca]/50 transition-colors">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
