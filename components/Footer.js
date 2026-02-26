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
      showNotification('Shaadi family mein khush aamdeed! 🎉💌', 'success');
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
      {/* Mughal Border Top */}
      <div className="h-2 bg-gradient-to-r from-mehndi-600 via-gold-500 to-rani-500"></div>

      {/* Newsletter Section */}
      <div className="relative bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-900 py-20 overflow-hidden">
        {/* Decorative Patterns */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
          <div className="w-full h-full border-2 border-mehndi-500 rounded-full"></div>
          <div className="absolute inset-4 border-2 border-gold-500 rounded-full"></div>
          <div className="absolute inset-8 border-2 border-rani-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full border-2 border-mehndi-500 rounded-full"></div>
          <div className="absolute inset-4 border-2 border-gold-500 rounded-full"></div>
          <div className="absolute inset-8 border-2 border-rani-500 rounded-full"></div>
        </div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-mehndi-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-rani-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-md">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mehndi-500/10 rounded-full text-mehndi-400 text-xs tracking-widest uppercase mb-4 border border-mehndi-500/20">
                <Sparkles className="w-3.5 h-3.5 animate-sparkle" />
                Shaadi Inspiration
              </div>
              <h3 className="text-3xl md:text-4xl font-serif text-cream-100 mb-3">
                Dulhan ki <span className="bg-gradient-to-r from-mehndi-400 via-gold-400 to-haldi-400 bg-clip-text text-transparent">Diary</span> 💍
              </h3>
              <p className="text-cream-200/50 leading-relaxed">
                Subscribe for exclusive shaadi tips, mehndi designs, trending decor ideas, seasonal offers & early access to premium venue packages.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto">
              <div className="relative flex w-full lg:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Apna email daalen..."
                  className="flex-1 lg:w-96 px-6 py-4 rounded-l-2xl bg-cream-100/5 border border-mehndi-500/20 border-r-0 text-cream-100 placeholder-cream-200/30 focus:outline-none focus:border-mehndi-500/50 focus:bg-cream-100/10 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-mehndi-500 via-gold-500 to-haldi-500 hover:from-mehndi-400 hover:via-gold-400 hover:to-haldi-400 text-maroon-900 font-bold rounded-r-2xl transition-all duration-300 flex items-center gap-2 shadow-mehndi hover:shadow-lg whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="bg-maroon-900 relative">
        {/* Ornamental divider */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-mehndi-500/30"></div>
          <span className="px-4 text-mehndi-500/40 text-sm">✦ ✦ ✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-mehndi-500/30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-14">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-mehndi-500 via-gold-500 to-haldi-500 rounded-2xl flex items-center justify-center shadow-mehndi">
                  <Crown className="w-7 h-7 text-maroon-900" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-cream-100 tracking-wide">
                    Lahore <span className="bg-gradient-to-r from-mehndi-400 to-gold-400 bg-clip-text text-transparent font-bold">Shaadi</span>
                  </h3>
                  <p className="text-[10px] text-mehndi-500/60 tracking-[0.25em] uppercase -mt-0.5 font-medium">✦ Desi Weddings ✦</p>
                </div>
              </div>
              <p className="text-cream-200/40 mb-8 leading-relaxed max-w-sm">
                Lahore ke behtareen marquees, caterers aur wedding vendors — sab ek jagah. Grand, festive aur desi — kyunke aapki shaadi behtareen honi chahiye! 🎊
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, label: 'Facebook', hoverBg: 'hover:bg-blue-500/20 hover:border-blue-500/30', hoverText: 'group-hover:text-blue-400' },
                  { Icon: Instagram, label: 'Instagram', hoverBg: 'hover:bg-rani-500/20 hover:border-rani-500/30', hoverText: 'group-hover:text-rani-400' },
                  { Icon: Twitter, label: 'Twitter', hoverBg: 'hover:bg-sky-500/20 hover:border-sky-500/30', hoverText: 'group-hover:text-sky-400' },
                  { Icon: Youtube, label: 'Youtube', hoverBg: 'hover:bg-red-500/20 hover:border-red-500/30', hoverText: 'group-hover:text-red-400' },
                ].map(({ Icon, label, hoverBg, hoverText }) => (
                  <a key={label} href="#" className={`w-11 h-11 bg-cream-100/5 ${hoverBg} border border-cream-100/10 rounded-xl flex items-center justify-center transition-all duration-300 group`} aria-label={label}>
                    <Icon className={`w-4.5 h-4.5 text-cream-200/40 ${hoverText} transition-colors duration-300`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg mb-6 text-cream-100 flex items-center gap-2">
                <span className="text-mehndi-500">✦</span> Quick Links
              </h4>
              <ul className="space-y-3.5">
                {[
                  { name: 'Browse Venues', href: '/marquees' },
                  { name: 'Budget Calculator', href: '/calculator' },
                  { name: 'Compare Venues', href: '/compare' },
                  { name: 'Find Vendors', href: '/vendors' },
                  { name: 'Planning Checklist', href: '/checklist' },
                  { name: 'Photo Gallery', href: '/gallery' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-cream-200/40 hover:text-mehndi-400 transition-all duration-300 flex items-center group text-sm">
                      <span className="w-1.5 h-1.5 bg-mehndi-500/30 rounded-full mr-3 group-hover:w-2.5 group-hover:bg-mehndi-400 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Areas */}
            <div>
              <h4 className="font-serif text-lg mb-6 text-cream-100 flex items-center gap-2">
                <span className="text-rani-500">✦</span> Popular Areas
              </h4>
              <ul className="space-y-3.5">
                {['Mall Road', 'Gulberg', 'DHA', 'Cantt', 'Canal Road', 'Walton'].map((area) => (
                  <li key={area}>
                    <Link href={`/marquees?area=${encodeURIComponent(area)}`} className="text-cream-200/40 hover:text-mehndi-400 transition-all duration-300 flex items-center text-sm group">
                      <MapPin className="w-3 h-3 mr-2 text-rani-500/30 group-hover:text-rani-400 transition-colors" />
                      {area}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-lg mb-6 text-cream-100 flex items-center gap-2">
                <span className="text-gold-500">✦</span> Contact
              </h4>
              <ul className="space-y-5">
                <li>
                  <a href="tel:+923001234567" className="flex items-start hover:text-mehndi-400 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-mehndi-500/5 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-mehndi-500/10 border border-mehndi-500/10 group-hover:border-mehndi-500/20 transition-all duration-300">
                      <Phone className="w-4 h-4 text-mehndi-500/60 group-hover:text-mehndi-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-cream-200/30 uppercase tracking-wider">Call karein</p>
                      <p className="text-cream-200/50 group-hover:text-mehndi-400 text-sm transition-colors">+92 300 1234567</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@lahoreshaadi.pk" className="flex items-start hover:text-mehndi-400 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-mehndi-500/5 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-mehndi-500/10 border border-mehndi-500/10 group-hover:border-mehndi-500/20 transition-all duration-300">
                      <Mail className="w-4 h-4 text-mehndi-500/60 group-hover:text-mehndi-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-cream-200/30 uppercase tracking-wider">Email bhejein</p>
                      <p className="text-cream-200/50 group-hover:text-mehndi-400 text-sm transition-colors break-all">info@lahoreshaadi.pk</p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-rani-500/5 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 border border-rani-500/10">
                      <MapPin className="w-4 h-4 text-rani-500/60" />
                    </div>
                    <div>
                      <p className="text-[10px] text-cream-200/30 uppercase tracking-wider">Location</p>
                      <p className="text-cream-200/50 text-sm">Lahore, Punjab, Pakistan 🇵🇰</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 relative">
            {/* Ornamental divider */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-mehndi-500/20"></div>
              <span className="px-3 text-mehndi-500/30 text-xs">❋</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-mehndi-500/20"></div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-cream-200/25 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Lahore Shaadi. Sab haqooq mahfooz hain.
              </p>
              <div className="flex items-center gap-8 text-sm text-cream-200/25">
                <Link href="#" className="hover:text-mehndi-400 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-mehndi-400 transition-colors">Terms</Link>
                <Link href="#" className="hover:text-mehndi-400 transition-colors">FAQs</Link>
              </div>
              <p className="text-cream-200/25 text-sm flex items-center">
                Made with <Heart className="w-3.5 h-3.5 text-rani-500 mx-1.5 fill-rani-500" /> in Lahore 🇵🇰
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-mehndi-500 via-gold-500 to-haldi-500 text-maroon-900 rounded-2xl shadow-mehndi hover:shadow-lg flex items-center justify-center transition-all duration-500 hover:-translate-y-1 hover:scale-110 z-40 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
