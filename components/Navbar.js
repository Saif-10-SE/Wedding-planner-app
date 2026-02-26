import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWedding } from '@/context/WeddingContext';
import { Search, Heart, Calendar, Menu, X, ChevronDown, Sparkles, GitCompare, ListChecks, Camera, Users, Star, Crown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const { setIsSearchOpen, favorites, weddingDate, getDaysUntilWedding, compareList } = useWedding();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const daysLeft = getDaysUntilWedding();

  const navLinks = [
    { 
      name: 'Venues', 
      href: '/marquees',
      dropdown: [
        { name: 'All Marquees', href: '/marquees', icon: <Crown className="w-4 h-4" />, desc: 'Browse Lahore\'s finest halls' },
        { name: 'Compare Venues', href: '/compare', icon: <GitCompare className="w-4 h-4" />, desc: 'Side-by-side comparison' },
        { name: 'Gallery', href: '/gallery', icon: <Camera className="w-4 h-4" />, desc: 'Real wedding photos' },
      ]
    },
    { 
      name: 'Planning', 
      href: '/calculator',
      dropdown: [
        { name: 'Budget Calculator', href: '/calculator', icon: <Sparkles className="w-4 h-4" />, desc: 'Multi-event menu planner' },
        { name: 'Checklist', href: '/checklist', icon: <ListChecks className="w-4 h-4" />, desc: 'Track your shaadi prep' },
        { name: 'Vendors', href: '/vendors', icon: <Users className="w-4 h-4" />, desc: 'Photographers, decor & more' },
      ]
    },
    { name: 'Testimonials', href: '/testimonials' },
  ];

  const isHomePage = router.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-maroon-900/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(80,0,20,0.4)] border-b border-mehndi-500/20' 
        : isHomePage 
          ? 'bg-gradient-to-b from-maroon-900/80 to-transparent' 
          : 'bg-maroon-900/90 backdrop-blur-md'
    }`}>
      {/* Decorative top border - Mughal style */}
      <div className="h-1 bg-gradient-to-r from-mehndi-600 via-gold-500 to-rani-500"></div>
      
      {/* Announcement Bar */}
      {daysLeft && daysLeft > 0 && daysLeft <= 30 && (
        <div className="bg-gradient-to-r from-mehndi-600 via-haldi-500 to-mehndi-600 text-maroon-900 py-2 px-4 text-center text-sm">
          <Sparkles className="inline w-4 h-4 mr-2 animate-sparkle" />
          <span className="font-bold">{daysLeft} din</span> baaki hain aapki shaadi mein! ✨
          <Link href="/checklist" className="underline ml-2 font-semibold hover:opacity-80">Checklist dekhen →</Link>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 bg-gradient-to-br from-mehndi-500 via-gold-500 to-haldi-500 rounded-2xl flex items-center justify-center shadow-mehndi group-hover:shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
              <Crown className="w-7 h-7 text-maroon-900" />
              {/* Sparkle dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-rani-500 rounded-full border-2 border-maroon-900 animate-pulse"></div>
            </div>
            <div>
              <h1 className="font-serif text-xl text-cream-100 tracking-wide">
                Lahore <span className="bg-gradient-to-r from-mehndi-400 via-gold-400 to-haldi-400 bg-clip-text text-transparent font-bold">Shaadi</span>
              </h1>
              <p className="text-[10px] text-mehndi-500/80 tracking-[0.25em] uppercase -mt-0.5 font-medium">✦ Desi Weddings ✦</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setShowDropdown(link.name)}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Link 
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 ${
                    router.pathname.startsWith(link.href) 
                      ? 'text-mehndi-400 bg-mehndi-500/15 border border-mehndi-500/20' 
                      : 'text-cream-200/80 hover:text-mehndi-400 hover:bg-cream-100/5'
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showDropdown === link.name ? 'rotate-180' : ''}`} />}
                </Link>
                
                {/* Dropdown */}
                {link.dropdown && showDropdown === link.name && (
                  <div className="absolute top-full left-0 pt-3 w-72 animate-fadeIn">
                    <div className="bg-maroon-800/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(80,0,20,0.5)] border border-mehndi-500/15 py-2 overflow-hidden">
                      {/* Decorative top line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-mehndi-500 via-gold-500 to-rani-500"></div>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 px-5 py-3.5 hover:bg-mehndi-500/10 transition-all duration-300 group"
                        >
                          <span className="w-9 h-9 bg-mehndi-500/10 group-hover:bg-mehndi-500/20 rounded-xl flex items-center justify-center transition-all text-mehndi-500/60 group-hover:text-mehndi-400">
                            {item.icon}
                          </span>
                          <div>
                            <span className="text-sm font-medium text-cream-200/90 group-hover:text-mehndi-400 transition-colors block">{item.name}</span>
                            <span className="text-xs text-cream-200/40">{item.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-1.5">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-cream-200/50 hover:text-mehndi-400 hover:bg-mehndi-500/10 rounded-xl transition-all duration-300"
              title="Search (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link 
              href="/compare"
              className="relative p-2.5 text-cream-200/50 hover:text-mehndi-400 hover:bg-mehndi-500/10 rounded-xl transition-all duration-300"
              title="Compare Venues"
            >
              <GitCompare className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-rani-500 to-rani-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse shadow-rani">
                  {compareList.length}
                </span>
              )}
            </Link>

            <Link 
              href="/favorites"
              className="relative p-2.5 text-cream-200/50 hover:text-rani-400 hover:bg-rani-500/10 rounded-xl transition-all duration-300"
              title="Favorites"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rani-500 text-rani-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rani-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {weddingDate && (
              <Link 
                href="/checklist"
                className="flex items-center gap-2 px-3.5 py-2 bg-mehndi-500/10 text-mehndi-400 rounded-xl text-sm border border-mehndi-500/20 hover:border-mehndi-500/40 hover:bg-mehndi-500/15 transition-all duration-300"
                title="Your Wedding Date"
              >
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">{daysLeft}d</span>
              </Link>
            )}

            <Link 
              href="/calculator"
              className="ml-2 px-6 py-2.5 bg-gradient-to-r from-mehndi-500 via-gold-500 to-haldi-500 hover:from-mehndi-400 hover:via-gold-400 hover:to-haldi-400 text-maroon-900 font-bold rounded-xl transition-all duration-300 shadow-mehndi hover:shadow-lg text-sm tracking-wide hover:-translate-y-0.5 hover:scale-105"
            >
              🎉 Plan Shaadi
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2.5 hover:bg-mehndi-500/10 rounded-xl transition-all text-cream-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-mehndi-500/15 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {[
                { name: '🏠 Home', href: '/' },
                { name: '🏛️ All Venues', href: '/marquees' },
                { name: '💰 Budget Calculator', href: '/calculator' },
                { name: '⚖️ Compare', href: '/compare', badge: compareList.length },
                { name: '✅ Checklist', href: '/checklist' },
                { name: '👥 Vendors', href: '/vendors' },
                { name: '📸 Gallery', href: '/gallery' },
                { name: '⭐ Testimonials', href: '/testimonials' },
                { name: '❤️ Favorites', href: '/favorites', badge: favorites.length, badgeColor: 'rani' },
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all ${
                    router.pathname === item.href
                      ? 'text-mehndi-400 bg-mehndi-500/10 border border-mehndi-500/15'
                      : 'text-cream-200/70 hover:text-mehndi-400 hover:bg-cream-100/5'
                  }`}
                >
                  {item.name}
                  {item.badge > 0 && (
                    <span className={`px-2.5 py-0.5 ${item.badgeColor === 'rani' ? 'bg-rani-500 text-white' : 'bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900'} text-xs font-bold rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              
              <button 
                onClick={() => { setIsSearchOpen(true); setIsOpen(false); }}
                className="px-4 py-3.5 text-cream-200/70 hover:text-mehndi-400 hover:bg-cream-100/5 rounded-xl font-medium text-left flex items-center gap-2 transition-all"
              >
                <Search className="w-5 h-5" />
                Search
              </button>

              <div className="pt-4">
                <Link 
                  href="/calculator"
                  className="block mx-4 px-6 py-4 bg-gradient-to-r from-mehndi-500 via-gold-500 to-haldi-500 text-maroon-900 font-bold rounded-xl text-center shadow-mehndi hover:shadow-lg transition-all text-lg"
                >
                  🎉 Start Planning Your Shaadi
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
