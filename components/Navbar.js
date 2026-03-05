import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWedding } from '@/context/WeddingContext';
import { Search, Heart, Calendar, Menu, X, ChevronDown, GitCompare, ListChecks, Camera, Crown, Calculator, Sparkles, Bot, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const { setIsSearchOpen, favorites, weddingDate, getDaysUntilWedding, compareList } = useWedding();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [router.pathname]);

  const daysLeft = getDaysUntilWedding();
  const isHomePage = router.pathname === '/';
  const isDark = isHomePage && !isScrolled && !isOpen;

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Venues', 
      href: '/marquees',
      dropdown: [
        { name: 'All Marquees', href: '/marquees', icon: <Crown className="w-4 h-4" />, desc: "Browse Lahore's finest halls" },
        { name: 'Compare Venues', href: '/compare', icon: <GitCompare className="w-4 h-4" />, desc: 'Side-by-side comparison' },
        { name: 'Photo Gallery', href: '/gallery', icon: <Camera className="w-4 h-4" />, desc: 'Real wedding photos' },
      ]
    },
    { name: 'Vendors', href: '/vendors' },
    { 
      name: 'Planning Tools', 
      href: '/calculator',
      dropdown: [
        { name: 'Budget Calculator', href: '/calculator', icon: <Calculator className="w-4 h-4" />, desc: 'Multi-event menu planner' },
        { name: 'Wedding Checklist', href: '/checklist', icon: <ListChecks className="w-4 h-4" />, desc: 'Track your wedding prep' },
        { name: 'AI Assistant', href: '/assistant', icon: <Bot className="w-4 h-4" />, desc: 'Smart venue and decor ideas' },
        { name: 'Inquiry Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" />, desc: 'Track and manage inquiries' },
      ]
    },
    { name: 'Blog', href: '/testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
      isOpen 
        ? 'bg-white shadow-luxury-md' 
        : isScrolled 
          ? 'bg-white/95 backdrop-blur-2xl shadow-[0_1px_0_rgba(69,9,26,0.06)]' 
          : isHomePage 
            ? 'bg-transparent' 
            : 'bg-white shadow-[0_1px_0_rgba(69,9,26,0.06)]'
    }`}>
      {/* Top accent — gold line */}
      <div className={`h-[2px] transition-opacity duration-700 ${isScrolled || !isHomePage || isOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(90deg, transparent, #dda027, #e6b43e, #dda027, transparent)' }}></div>

      {/* Countdown bar */}
      {daysLeft && daysLeft > 0 && daysLeft <= 30 && (
        <div className="bg-gradient-to-r from-primary-950 via-maroon-800 to-primary-950 text-white/80 py-2 px-4 text-center text-xs font-light tracking-wider">
          <span className="text-accent-400 font-medium">{daysLeft} days</span> until your celebration
          <Link href="/checklist" className="underline underline-offset-4 ml-3 text-white/60 hover:text-accent-300 transition-colors">View Checklist</Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative w-9 h-9 rounded-lg flex items-center justify-center font-serif font-semibold text-base tracking-tight transition-all duration-500 ${
              isDark 
                ? 'bg-white/10 backdrop-blur-sm border border-white/15 text-white' 
                : 'bg-gradient-to-br from-primary-950 to-maroon-800 text-accent-300'
            }`}>
              W
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-serif text-[17px] font-medium tracking-wide transition-colors duration-500 ${isDark ? 'text-white' : 'text-primary-950'}`}>
                <span className="font-semibold text-accent-600">Wedify</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href || (link.href !== '/' && router.pathname.startsWith(link.href));
              return (
                <div 
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setShowDropdown(link.name)}
                  onMouseLeave={() => setShowDropdown(null)}
                >
                  <Link 
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-normal text-[13px] tracking-wide transition-all duration-300 ${
                      isActive
                        ? isDark ? 'text-accent-300 bg-white/10' : 'text-primary-950 font-medium'
                        : isDark ? 'text-white/70 hover:text-accent-300' : 'text-neutral-600 hover:text-primary-900'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showDropdown === link.name ? 'rotate-180' : ''}`} />}
                  </Link>
                  
                  {/* Dropdown */}
                  {link.dropdown && showDropdown === link.name && (
                    <div className="absolute top-full left-0 pt-3 w-64 animate-fadeIn z-50">
                      <div className="bg-white rounded-2xl shadow-luxury-lg border border-neutral-200/60 py-2 overflow-hidden">
                        <div className="h-[2px] mx-4 mb-2" style={{ background: 'linear-gradient(90deg, #dda027, #e6b43e, transparent)' }}></div>
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-5 py-3 hover:bg-cream-100 transition-all duration-200 group/dd"
                          >
                            <span className="w-9 h-9 bg-cream-200 group-hover/dd:bg-accent-100 rounded-xl flex items-center justify-center transition-all text-primary-700 group-hover/dd:text-accent-700">
                              {item.icon}
                            </span>
                            <div>
                              <span className="text-sm font-medium text-primary-800 group-hover/dd:text-primary-950 transition-colors block">{item.name}</span>
                              <span className="text-[11px] text-neutral-500">{item.desc}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                isDark ? 'text-white/60 hover:text-accent-300 hover:bg-white/10' : 'text-neutral-500 hover:text-primary-800 hover:bg-cream-100'
              }`}
              title="Search (Ctrl+K)"
            >
              <Search className="w-[17px] h-[17px]" />
            </button>

            <Link 
              href="/compare"
              className={`relative p-2.5 rounded-lg transition-all duration-300 ${
                isDark ? 'text-white/60 hover:text-accent-300 hover:bg-white/10' : 'text-neutral-500 hover:text-primary-800 hover:bg-cream-100'
              }`}
              title="Compare Venues"
            >
              <GitCompare className="w-[17px] h-[17px]" />
              {compareList.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-500 text-primary-950 text-[9px] font-bold rounded-full flex items-center justify-center shadow-gold">
                  {compareList.length}
                </span>
              )}
            </Link>

            <Link 
              href="/favorites"
              className={`relative p-2.5 rounded-lg transition-all duration-300 ${
                isDark ? 'text-white/60 hover:text-rose-400 hover:bg-white/10' : 'text-neutral-500 hover:text-rose-500 hover:bg-cream-100'
              }`}
              title="Favorites"
            >
              <Heart className={`w-[17px] h-[17px] ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {weddingDate && (
              <Link 
                href="/checklist"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/10 text-accent-300 border-accent-500/20 hover:bg-white/15' 
                    : 'bg-accent-50 text-accent-700 border-accent-200 hover:border-accent-400'
                }`}
                title="Days until wedding"
              >
                <Calendar className="w-3.5 h-3.5" />
                {daysLeft}d
              </Link>
            )}

            {/* Book Now CTA */}
            <Link
              href="/assistant"
              className={`ml-1 px-4 py-2.5 font-medium rounded-full transition-all duration-500 text-sm tracking-wide inline-flex items-center gap-1.5 ${
                isDark
                  ? 'bg-white/15 text-accent-200 border border-white/20 hover:bg-white/20'
                  : 'bg-accent-100 text-primary-900 border border-accent-300 hover:bg-accent-200'
              }`}
            >
              <Bot className="w-4 h-4" /> AI Assistant
            </Link>

            {/* Book Now CTA */}
            <Link 
              href="/calculator"
              className={`ml-2 px-6 py-2.5 font-medium rounded-full transition-all duration-500 text-sm tracking-wide ${
                isDark 
                  ? 'bg-gradient-to-r from-accent-500 to-accent-400 text-primary-950 hover:shadow-gold-lg hover:-translate-y-0.5'
                  : 'bg-gradient-to-r from-primary-950 to-maroon-800 text-white hover:shadow-maroon hover:-translate-y-0.5'
              }`}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden p-2.5 rounded-lg transition-all ${isDark ? 'text-white hover:bg-white/10' : 'text-primary-700 hover:bg-cream-100'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-accent-200/30 animate-fadeIn">
            <div className="flex flex-col gap-0.5">
              {[
                { name: 'Home', href: '/' },
                { name: 'All Venues', href: '/marquees' },
                { name: 'Budget Calculator', href: '/calculator' },
                { name: 'AI Assistant', href: '/assistant' },
                { name: 'Inquiry Dashboard', href: '/dashboard' },
                { name: 'Logo Concepts', href: '/logos' },
                { name: 'Compare Venues', href: '/compare', badge: compareList.length },
                { name: 'Wedding Checklist', href: '/checklist' },
                { name: 'Vendors', href: '/vendors' },
                { name: 'Photo Gallery', href: '/gallery' },
                { name: 'Testimonials', href: '/testimonials' },
                { name: 'Favorites', href: '/favorites', badge: favorites.length, badgeColor: 'rose' },
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-normal text-sm transition-all ${
                    router.pathname === item.href
                      ? 'text-primary-950 bg-accent-50 font-medium'
                      : 'text-neutral-600 hover:text-primary-900 hover:bg-cream-100'
                  }`}
                >
                  {item.name}
                  {item.badge > 0 && (
                    <span className={`px-2 py-0.5 ${item.badgeColor === 'rose' ? 'bg-rose-500' : 'bg-primary-900'} text-white text-xs font-medium rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              
              <button 
                onClick={() => { setIsSearchOpen(true); setIsOpen(false); }}
                className="px-4 py-3 text-neutral-500 hover:text-primary-900 hover:bg-cream-100 rounded-xl text-sm text-left flex items-center gap-2 transition-all"
              >
                <Search className="w-4 h-4" />
                Search Venues
              </button>

              <div className="pt-4 px-4">
                <Link 
                  href="/calculator"
                  className="block px-6 py-3.5 bg-gradient-to-r from-primary-950 to-maroon-800 hover:shadow-maroon text-white font-medium rounded-full text-center shadow-sm transition-all text-sm tracking-wide"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
