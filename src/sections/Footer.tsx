import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  const { data } = useCMS();
  const { siteSettings } = data;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer rise up
      gsap.fromTo(
        footerRef.current,
        { y: 100 },
        {
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Wave animation
      if (waveRef.current) {
        gsap.to(waveRef.current, {
          attr: { d: getWavePath(1) },
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Generate wave path
  const getWavePath = (phase: number) => {
    const points = [];
    for (let i = 0; i <= 1440; i += 40) {
      const y = 60 + Math.sin((i / 1440) * Math.PI * 4 + phase) * 20;
      points.push(`${i},${y}`);
    }
    return `M0,120 L0,60 ${points.map((p, i) => `${i === 0 ? 'L' : 'L'}${p}`).join(' ')} L1440,60 L1440,120 Z`;
  };

  const footerLinks = {
    site: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Culture', path: '/culture' },
      { label: 'Nature', path: '/nature' },
      { label: 'Economy', path: '/economy' },
      { label: 'Visit', path: '/visit' },
    ],
    admin: [
      { label: 'Admin Login', path: '/admin/login' },
    ],
    contact: [
      { icon: Mail, label: siteSettings.contactEmail, href: `mailto:${siteSettings.contactEmail}` },
      { icon: Phone, label: siteSettings.contactPhone, href: `tel:${siteSettings.contactPhone}` },
      { icon: MapPin, label: 'Cantilan, Surigao del Sur', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: siteSettings.socialLinks.facebook, label: 'Facebook' },
    { icon: Instagram, href: siteSettings.socialLinks.instagram, label: 'Instagram' },
    { icon: Twitter, href: siteSettings.socialLinks.twitter, label: 'Twitter' },
    { icon: Youtube, href: siteSettings.socialLinks.youtube, label: 'YouTube' },
  ].filter((link) => link.href);

  return (
    <footer ref={footerRef} className="relative bg-[#004968] overflow-hidden">
      {/* Wave SVG */}
      <div className="absolute -top-20 left-0 right-0 h-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            ref={waveRef}
            d={getWavePath(0)}
            fill="#004968"
          />
        </svg>
      </div>

      <div className="relative z-10 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">C</span>
                </div>
                <span className="font-serif text-xl font-bold text-white">
                  {siteSettings.siteTitle}
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {siteSettings.tagline}
              </p>
              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Site Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Site</h4>
              <ul className="space-y-2">
                {footerLinks.site.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin */}
            <div>
              <h4 className="font-semibold text-white mb-4">Admin</h4>
              <ul className="space-y-2">
                {footerLinks.admin.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                {footerLinks.contact.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/50 text-sm text-center md:text-left">
                {siteSettings.footerText}
              </p>
              <p className="text-white/50 text-sm">
                Powered by{' '}
                <span className="text-[#1b9cca]">Smile AI</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
