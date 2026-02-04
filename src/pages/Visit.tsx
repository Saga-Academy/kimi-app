import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar,
  MapPin,
  Hotel,
  Lightbulb,
  Bus,
  Sun,
  Umbrella,
  Camera,
  Heart,
  Phone,
} from 'lucide-react';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { useCMS } from '@/context/CMSContext';

gsap.registerPlugin(ScrollTrigger);

const bestMonths = [
  { month: 'March', weather: 'Hot & Dry', activity: 'Beach Activities' },
  { month: 'April', weather: 'Hot & Dry', activity: 'Festival Season' },
  { month: 'May', weather: 'Warm & Dry', activity: 'Island Hopping' },
];

const gettingHere = [
  {
    mode: 'By Air',
    details: 'Fly to Butuan Airport (BWX), then take a bus or van to Cantilan (3-4 hours).',
  },
  {
    mode: 'By Land',
    details: 'Buses and vans are available from Butuan City and Tandag City.',
  },
  {
    mode: 'By Sea',
    details: 'Boat services connect Cantilan to nearby coastal towns and islands.',
  },
];

const accommodations = [
  {
    type: 'Beach Resorts',
    description: 'Beachfront properties with stunning ocean views and modern amenities.',
  },
  {
    type: 'Guesthouses',
    description: 'Affordable and comfortable lodging options in the town proper.',
  },
  {
    type: 'Homestays',
    description: 'Experience local hospitality by staying with Cantilan families.',
  },
];

const tips = [
  {
    icon: Sun,
    title: 'Pack Light',
    description: 'Bring light, breathable clothing and plenty of sunscreen.',
  },
  {
    icon: Umbrella,
    title: 'Rain Gear',
    description: 'Pack a light rain jacket if visiting during the wet season.',
  },
  {
    icon: Camera,
    title: 'Capture Memories',
    description: 'Don\'t forget your camera - Cantilan offers countless photo opportunities.',
  },
  {
    icon: Heart,
    title: 'Respect Local Culture',
    description: 'Be mindful of local customs and dress modestly when visiting communities.',
  },
];

export default function Visit() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { data } = useCMS();

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
            Visit Cantilan
          </h1>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Everything you need to know to plan your perfect trip
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Image */}
        <section className="mb-20">
          <div className="animate-item relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/visit-boat.jpg"
              alt="Visit Cantilan"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#004968]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-6 h-6 text-[#1b9cca]" />
                <span className="text-white/80">Cantilan, Surigao del Sur</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-white">
                Experience Authentic Coastal Living
              </h2>
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Best Time to Visit
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-item">
              <p className="text-[#33383f] leading-relaxed mb-6">
                {data.visitInfo.bestTimeToVisit}
              </p>

              <div className="space-y-4">
                {bestMonths.map((month, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white rounded-xl p-4 shadow"
                  >
                    <div className="w-16 h-16 bg-[#0070a0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-lg font-bold text-[#0070a0]">
                        {month.month.slice(0, 3)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1f1f1f]">
                        {month.month}
                      </h4>
                      <p className="text-sm text-[#33383f]">
                        {month.weather} • {month.activity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-item">
              <img
                src="/gallery-beach.jpg"
                alt="Best Time to Visit"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* How to Get Here */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Bus className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              How to Get Here
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gettingHere.map((option, index) => (
              <div
                key={index}
                className="animate-item bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="font-serif text-xl font-bold text-[#1f1f1f] mb-3">
                  {option.mode}
                </h3>
                <p className="text-[#33383f] text-sm leading-relaxed">
                  {option.details}
                </p>
              </div>
            ))}
          </div>

          <div className="animate-item mt-8 bg-[#0070a0]/10 rounded-xl p-6">
            <p className="text-[#33383f]">
              <strong>Travel Tip:</strong> {data.visitInfo.howToGetThere}
            </p>
          </div>
        </section>

        {/* Where to Stay */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Hotel className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Where to Stay
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accommodations.map((accommodation, index) => (
              <div
                key={index}
                className="animate-item bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="font-serif text-xl font-bold text-[#1f1f1f] mb-3">
                  {accommodation.type}
                </h3>
                <p className="text-[#33383f] text-sm leading-relaxed">
                  {accommodation.description}
                </p>
              </div>
            ))}
          </div>

          <div className="animate-item mt-8">
            <p className="text-[#33383f]">{data.visitInfo.whereToStay}</p>
          </div>
        </section>

        {/* Local Tips */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="w-6 h-6 text-[#0070a0]" />
            <h2 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Local Tips
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="animate-item flex items-start gap-4 bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-[#0070a0]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <tip.icon className="w-6 h-6 text-[#0070a0]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1f1f1f] mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-[#33383f] text-sm">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-item mt-8 bg-[#004968] rounded-2xl p-8">
            <p className="text-white/90 leading-relaxed">
              {data.visitInfo.localTips}
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="bg-[#0070a0] rounded-2xl p-8 md:p-12 text-center">
            <Phone className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Need More Information?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Contact the Municipal Tourism Office for assistance with planning
              your visit to Cantilan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${data.siteSettings.contactEmail}`}
                className="bg-white text-[#0070a0] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                Email Us
              </a>
              <a
                href={`tel:${data.siteSettings.contactPhone}`}
                className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
