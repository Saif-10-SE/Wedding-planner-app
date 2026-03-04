import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube, Send, ArrowUp, Crown, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWedding } from '@/context/WeddingContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { showNotification } = useWedding();
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showNotification('Welcome to the Shaadi family! 🎉💌', 'success');
      setEmail('');
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* ─── Subscribe Section ─── */}
      <div className="relative bg-primary-950 py-16 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/20 to-transparent"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary-800/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-md">
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                Subscribe for <span className="text-accent-400 italic font-light">Ideas</span>
              </h3>
              <p className="text-white/30 text-sm leading-relaxed font-light">
                Inspiration, planning tips, and exclusive venue updates delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto">
              <div className="relative flex w-full lg:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 lg:w-80 px-5 py-3.5 rounded-l-xl bg-white/5 border border-white/10 border-r-0 text-white placeholder-white/25 focus:outline-none focus:border-accent-500/40 focus:bg-white/8 transition-all duration-300 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-accent-500 hover:bg-accent-400 text-white font-medium rounded-r-xl transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-gold whitespace-nowrap text-sm tracking-wide"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* ─── Main Footer ─── */}
      <div className="bg-primary-950 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-14">
            
            {/* Contact Info */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex items-center space-x-2.5 mb-5">
                <div className="w-10 h-10 bg-white/8 rounded-xl flex items-center justify-center border border-white/10">
                  <Crown className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white tracking-wide">
                    Lahore <span className="text-accent-400 italic font-light">Shaadi</span>
                  </h3>
                </div>
              </div>
              <p className="text-white/30 mb-6 text-sm leading-relaxed font-light max-w-xs">
                Lahore's premium wedding planning platform — curated venues, trusted vendors, and smart tools for your perfect day.
              </p>
              
              {/* Contact Details */}
              <ul className="space-y-3 mb-6">
                <li>
                  <a href="tel:+923001234567" className="flex items-center gap-2.5 text-white/35 hover:text-accent-400 transition-colors text-sm group">
                    <Phone className="w-3.5 h-3.5 text-white/20 group-hover:text-accent-400/60 transition-colors" />
                    +92 300 1234567
                  </a>
                </li>
                <li>
                  <a href="mailto:info@lahoreshaadi.pk" className="flex items-center gap-2.5 text-white/35 hover:text-accent-400 transition-colors text-sm group">
                    <Mail className="w-3.5 h-3.5 text-white/20 group-hover:text-accent-400/60 transition-colors" />
                    info@lahoreshaadi.pk
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-2.5 text-white/35 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-white/20" />
                    Lahore, Punjab, Pakistan
                  </div>
                </li>
              </ul>
              
              {/* Social Links */}
              <div className="flex gap-2">
                {[
                  { Icon: Facebook, label: 'Facebook' },
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Twitter, label: 'Twitter' },
                  { Icon: Youtube, label: 'Youtube' },
                ].map(({ Icon, label }) => (
                  <a key={label} href="#" className="w-9 h-9 bg-white/5 hover:bg-accent-500/15 border border-white/8 hover:border-accent-500/25 rounded-lg flex items-center justify-center transition-all duration-300 group" aria-label={label}>
                    <Icon className="w-4 h-4 text-white/30 group-hover:text-accent-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Venues */}
            <div>
              <h4 className="text-[11px] font-medium mb-6 text-white/60 uppercase tracking-[0.2em]">Venues</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Browse Venues', href: '/marquees' },
                  { name: 'Compare Venues', href: '/compare' },
                  { name: 'Photo Gallery', href: '/gallery' },
                  { name: 'Mall Road', href: '/marquees?area=Mall%20Road' },
                  { name: 'Gulberg', href: '/marquees?area=Gulberg' },
                  { name: 'DHA', href: '/marquees?area=DHA' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/30 hover:text-accent-400 transition-colors text-sm font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Planning */}
            <div>
              <h4 className="text-[11px] font-medium mb-6 text-white/60 uppercase tracking-[0.2em]">Planning</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Budget Calculator', href: '/calculator' },
                  { name: 'Wedding Checklist', href: '/checklist' },
                  { name: 'Find Vendors', href: '/vendors' },
                  { name: 'Favorites', href: '/favorites' },
                  { name: 'Testimonials', href: '/testimonials' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/30 hover:text-accent-400 transition-colors text-sm font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-[11px] font-medium mb-6 text-white/60 uppercase tracking-[0.2em]">About</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '#' },
                  { name: 'How It Works', href: '#' },
                  { name: 'Privacy Policy', href: '#' },
                  { name: 'Terms of Service', href: '#' },
                  { name: 'FAQ', href: '#' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/30 hover:text-accent-400 transition-colors text-sm font-light">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 pt-6 border-t border-white/8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/20 text-xs font-light">
                © {new Date().getFullYear()} Wedify. All rights reserved.
              </p>
              <p className="text-white/20 text-xs flex items-center font-light">
                Made with <Heart className="w-3 h-3 text-rose-500 mx-1 fill-rose-500" /> in Lahore
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-11 h-11 bg-primary-900 hover:bg-primary-800 text-accent-400 rounded-xl shadow-luxury hover:shadow-luxury-md flex items-center justify-center transition-all duration-500 hover:-translate-y-1 z-40 border border-white/10 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
