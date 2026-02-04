import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Utensils, HandHeart, Waves } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cultureItems = [
  {
    image: '/culture-festival.jpg',
    title: 'Sirong Festival',
    description:
      'Held every August 14th, the Sirong Festival is a vibrant celebration honoring Cantilan\'s patron saint. The festival features traditional dances, music, and colorful costumes that showcase the town\'s rich cultural heritage.',
    icon: Music,
  },
  {
    image: '/culture-food.jpg',
    title: 'Local Cuisine',
    description:
      'Cantilan\'s coastal location provides an abundance of fresh seafood. From grilled oysters to traditional kinilaw, the local cuisine reflects the community\'s deep connection to the sea.',
    icon: Utensils,
  },
  {
    image: '/culture-crafts.jpg',
    title: 'Traditional Crafts',
    description:
      'Local artisans keep traditional crafts alive through basket weaving and other handiwork. These skills are passed down through generations, preserving Cantilan\'s cultural identity.',
    icon: HandHeart,
  },
  {
    image: '/culture-beach.jpg',
    title: 'Coastal Life',
    description:
      'The daily rhythm of Cantilan is shaped by the sea. Fishermen head out at dawn, families gather along the shore, and the community maintains a harmonious relationship with the ocean.',
    icon: Waves,
  },
];

export default function Culture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scatter in animation for images
      imagesRef.current.forEach((img, index) => {
        if (img) {
          const randomX = (Math.random() - 0.5) * 200;
          const randomY = (Math.random() - 0.5) * 100;
          const randomRotation = (Math.random() - 0.5) * 30;

          gsap.fromTo(
            img,
            {
              x: randomX,
              y: randomY,
              rotation: randomRotation,
              opacity: 0,
              scale: 0.8,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#f7f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#0070a0] font-semibold text-sm uppercase tracking-wider mb-4">
            Culture & Life
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1f1f1f] mb-6">
            Experience Our <span className="text-[#0070a0]">Heritage</span>
          </h2>
          <p className="text-[#33383f] text-lg max-w-2xl mx-auto">
            Discover the vibrant traditions, delicious cuisine, and warm hospitality
            that define life in Cantilan
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cultureItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) imagesRef.current[index] = el;
              }}
              className={`group relative ${
                index === 0 || index === 3 ? 'md:row-span-1' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="relative h-[300px] md:h-[350px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004968]/90 via-[#004968]/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {item.description}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#0070a0]/50 rounded-2xl transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Cultural Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0070a0]/10 rounded-full px-6 py-3">
            <Music className="w-5 h-5 text-[#0070a0]" />
            <span className="text-[#33383f]">
              Sirong Festival - August 14th • Experience the vibrant culture of
              Cantilan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
