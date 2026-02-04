import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { data } = useCMS();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const visibleImages = data.gallery
    .filter((img) => img.isVisible)
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid items fade in
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.gallery-item') || [],
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
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
  }, [visibleImages.length]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex =
      direction === 'prev'
        ? selectedImage === 0
          ? visibleImages.length - 1
          : selectedImage - 1
        : selectedImage === visibleImages.length - 1
        ? 0
        : selectedImage + 1;
    setSelectedImage(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#f7f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#0070a0] font-semibold text-sm uppercase tracking-wider mb-4">
            Gallery
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1f1f1f] mb-6">
            Capturing <span className="text-[#0070a0]">Cantilan</span>
          </h2>
          <p className="text-[#33383f] text-lg max-w-2xl mx-auto">
            A visual journey through our town's natural beauty, culture, and daily life
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {visibleImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item group relative overflow-hidden rounded-xl cursor-pointer ${
                index === 0 || index === 5
                  ? 'col-span-2 row-span-2'
                  : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 || index === 5
                    ? 'h-[400px] md:h-[500px]'
                    : 'h-[200px] md:h-[240px]'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#004968]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-[#0070a0]/80 text-white text-xs rounded-full mb-2 capitalize">
                    {image.category.replace('-', ' ')}
                  </span>
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[80vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={visibleImages[selectedImage].url}
              alt={visibleImages[selectedImage].caption}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 bg-[#0070a0]/80 text-white text-sm rounded-full mb-2 capitalize">
                {visibleImages[selectedImage].category.replace('-', ' ')}
              </span>
              <p className="text-white text-lg">
                {visibleImages[selectedImage].caption}
              </p>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {selectedImage + 1} / {visibleImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
