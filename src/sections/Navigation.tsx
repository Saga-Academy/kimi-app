import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCMS } from '@/context/CMSContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { data } = useCMS();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/culture', label: 'Culture' },
    { path: '/nature', label: 'Nature' },
    { path: '/economy', label: 'Economy' },
    { path: '/visit', label: 'Visit' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isScrolled ? 'bg-[#0070a0]' : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              <span
                className={`text-lg font-bold ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}
              >
                C
              </span>
            </div>
            <span
              className={`font-serif text-xl font-semibold transition-colors ${
                isScrolled ? 'text-[#004968]' : 'text-white'
              }`}
            >
              {data.siteSettings.siteTitle}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? isScrolled
                      ? 'bg-[#0070a0]/10 text-[#0070a0]'
                      : 'bg-white/20 text-white'
                    : isScrolled
                    ? 'text-[#33383f] hover:bg-[#0070a0]/10 hover:text-[#0070a0]'
                    : 'text-white/90 hover:bg-white/20 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className={`transition-all duration-300 ${
                isScrolled
                  ? 'bg-[#0070a0] hover:bg-[#004968] text-white'
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30'
              }`}
            >
              <Link to="/visit">Plan Your Visit</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X
                className={`w-6 h-6 ${isScrolled ? 'text-[#004968]' : 'text-white'}`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${isScrolled ? 'text-[#004968]' : 'text-white'}`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#0070a0]/10 text-[#0070a0]'
                    : 'text-[#33383f] hover:bg-[#0070a0]/10 hover:text-[#0070a0]'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button
                asChild
                className="w-full bg-[#0070a0] hover:bg-[#004968] text-white"
              >
                <Link to="/visit">Plan Your Visit</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
