import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(imageRef.current, { scale: 1.2, filter: 'blur(10px)' });
      gsap.set(headingRef.current?.querySelectorAll('.word') || [], {
        y: '100%',
        opacity: 0,
      });
      gsap.set(subheadingRef.current, { y: 20, opacity: 0 });
      gsap.set(ctaRef.current, { scale: 0, opacity: 0 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(imageRef.current, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power2.out',
      })
        .to(
          headingRef.current?.querySelectorAll('.word') || [],
          {
            y: '0%',
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=1'
        )
        .to(
          subheadingRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        .to(
          ctaRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.3'
        );

      // Scroll parallax
      gsap.to(imageRef.current, {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Split heading into words
  const headingWords = 'Cantilan: The Cradle of Towns'.split(' ');

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Cantilan Coastal Sunset"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#004968]/40 via-transparent to-[#004968]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#004968]/30 to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ willChange: 'transform' }}
      >
        <div className="overflow-hidden mb-6">
          <h1
            ref={headingRef}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
          >
            {headingWords.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-4">
                <span className="word inline-block">{word}</span>
              </span>
            ))}
          </h1>
        </div>

        <p
          ref={subheadingRef}
          className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light"
        >
          Discover the heritage, sustainability, and community of{' '}
          <span className="font-semibold text-white">Surigao del Sur</span>
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-[#004968] hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <Link to="/about" className="flex items-center gap-2">
              Explore Our Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-full backdrop-blur-sm"
          >
            <Link to="/visit">Plan Your Visit</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f7f9fa] to-transparent z-10" />
    </section>
  );
}
