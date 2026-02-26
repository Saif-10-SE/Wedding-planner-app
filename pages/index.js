import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { getFeaturedMarquees, formatPriceShort, getAreas, marquees, categoryInfo, getCategories } from '@/data/marquees';
import { getFeaturedVendors, getVendorCategories } from '@/data/vendors';
import { getFeaturedTestimonials } from '@/data/testimonials';
import { useWedding } from '@/context/WeddingContext';
import Navbar from '@/components/Navbar';
import MarqueeCard from '@/components/MarqueeCard';
import TestimonialCard from '@/components/TestimonialCard';
import CountdownTimer from '@/components/CountdownTimer';
import WeddingDateModal from '@/components/WeddingDateModal';
import Footer from '@/components/Footer';
import { Heart, Calendar, Calculator, MapPin, Users, Star, ArrowRight, CheckCircle, Sparkles, Camera, Palette, ChevronRight, Crown, Award, Diamond, TrendingUp } from 'lucide-react';

// Animated Counter Component
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function Home() {
  const featuredMarquees = getFeaturedMarquees();
  const featuredTestimonials = getFeaturedTestimonials().slice(0, 3);
  const vendorCategories = getVendorCategories();
  const areas = getAreas();
  const categories = getCategories();
  
  const { weddingDate, recentlyViewed, favorites } = useWedding();
  const [showDateModal, setShowDateModal] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const recentlyViewedVenues = recentlyViewed
    .slice(0, 4)
    .map(s => marquees.find(m => m.slug === s))
    .filter(Boolean);

  const heroImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920',
    'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1920'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Lahore Shaadi | Desi Wedding Planner & Marquee Guide</title>
        <meta name="description" content="Lahore ke behtareen marquees aur shaadi ka complete budget calculator. Grand venues, festive planning tools aur trusted vendors — sab ek jagah!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      {/* ============================================
          FESTIVE HERO SECTION — Desi Shaadi
          ============================================ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-maroon-900">
        {/* Background Images with Ken Burns */}
        {heroImages.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-all duration-[2000ms] ${
              idx === heroIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{ 
              backgroundImage: `url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/80 via-maroon-900/40 to-maroon-900"></div>
          </div>
        ))}
        
        {/* Festive particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${6 + i * 2}s`,
            }}></div>
          ))}
        </div>

        {/* Decorative Mughal corners */}
        <div className="absolute top-32 left-8 w-28 h-28 border-l-2 border-t-2 border-mehndi-500/30 rounded-tl-3xl"></div>
        <div className="absolute top-32 right-8 w-28 h-28 border-r-2 border-t-2 border-rani-500/30 rounded-tr-3xl"></div>
        <div className="absolute bottom-32 left-8 w-28 h-28 border-l-2 border-b-2 border-rani-500/30 rounded-bl-3xl"></div>
        <div className="absolute bottom-32 right-8 w-28 h-28 border-r-2 border-b-2 border-mehndi-500/30 rounded-br-3xl"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center pb-28">
          {/* Festive Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-mehndi-500/10 backdrop-blur-md rounded-full text-mehndi-400 text-sm mb-8 animate-fadeIn border border-mehndi-500/20">
            <span className="animate-sparkle">✨</span>
            <span className="tracking-[0.15em] uppercase text-xs font-medium">Lahore ki Shaan — Desi Shaadi Platform</span>
            <span className="animate-sparkle">✨</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream-100 mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <span className="block font-light text-cream-100/90">Apni Khwaabon Ki</span>
            <span className="block bg-gradient-to-r from-mehndi-400 via-gold-400 to-haldi-400 bg-clip-text text-transparent font-bold mt-2">
              Shaadi Planein 🎊
            </span>
          </h1>
          
          {/* Ornamental Divider — desi style */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-mehndi-500/60"></div>
            <span className="text-mehndi-500/60 text-lg">✦</span>
            <Diamond className="w-4 h-4 text-gold-500/60" />
            <span className="text-mehndi-500/60 text-lg">✦</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-mehndi-500/60"></div>
          </div>
          
          <p className="text-lg md:text-xl text-cream-200/60 mb-10 font-light max-w-2xl mx-auto leading-relaxed animate-slideUp" style={{ animationDelay: '0.4s' }}>
            Lahore ke top marquees, multi-event menu calculator, mehndi se valima tak — har function ka budget ek hi jagah plan karein 💍
          </p>
          
          {/* Wedding Date Countdown */}
          {weddingDate && (
            <div className="mb-10 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <CountdownTimer />
            </div>
          )}
          
          {/* CTA Buttons — desi style */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full animate-slideUp" style={{ animationDelay: '0.6s' }}>
            <Link 
              href="/marquees"
              className="group w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-mehndi-500 via-gold-500 to-haldi-500 hover:from-mehndi-400 hover:via-gold-400 hover:to-haldi-400 text-maroon-900 font-bold rounded-xl transition-all duration-500 shadow-mehndi hover:shadow-lg inline-flex items-center justify-center hover:-translate-y-1 text-lg"
            >
              🏛️ Marquees Dekhein
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link 
              href="/calculator"
              className="w-full sm:w-auto px-10 py-5 bg-cream-100/5 backdrop-blur-md hover:bg-cream-100/10 text-cream-100 font-bold rounded-xl border border-mehndi-500/20 hover:border-mehndi-500/40 transition-all duration-500 inline-flex items-center justify-center hover:-translate-y-1 text-lg"
            >
              <Calculator className="w-5 h-5 mr-2" />
              💰 Budget Calculator
            </Link>
          </div>
          
          {/* Wedding Date */}
          {!weddingDate && (
            <button
              onClick={() => setShowDateModal(true)}
              className="mt-6 mb-2 px-6 py-3 text-cream-200/40 hover:text-mehndi-400 transition-all duration-300 inline-flex items-center gap-2 group"
            >
              <Calendar className="w-5 h-5 group-hover:text-mehndi-400" />
              <span className="text-sm tracking-wide">Apni Shaadi Ki Date Set Karein 📅</span>
            </button>
          )}
        </div>

        {/* Bottom area */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-5 pb-6 pointer-events-none z-20">
          {/* Carousel Indicators */}
          <div className="flex gap-3 pointer-events-auto">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className={`transition-all duration-500 rounded-full ${
                  idx === heroIndex ? 'w-10 h-2 bg-gradient-to-r from-mehndi-500 to-gold-500' : 'w-2 h-2 bg-cream-200/30 hover:bg-cream-200/60'
                }`}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="pointer-events-auto">
            <div className="w-6 h-10 border-2 border-mehndi-500/30 rounded-full flex items-start justify-center p-1.5">
              <div className="w-1 h-2.5 bg-mehndi-500/60 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS SECTION — Desi Animated Counters
          ============================================ */}
      <section className="relative py-20 bg-maroon-900 overflow-hidden">
        {/* Mughal border top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mehndi-600 via-gold-500 to-rani-500"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mehndi-500/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 10, suffix: '+', label: 'Premium Marquees', icon: Crown, emoji: '🏛️' },
              { value: 500, suffix: '+', label: 'Khush Shaadiyaan', icon: Heart, emoji: '💍' },
              { value: 50, suffix: 'L+', label: 'Budget Range', icon: TrendingUp, emoji: '💰' },
              { value: 4.8, suffix: '★', label: 'Average Rating', icon: Star, isDecimal: true, emoji: '⭐' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 bg-mehndi-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-mehndi-500/20 border border-mehndi-500/15 group-hover:border-mehndi-500/30 transition-all duration-500">
                  <span className="text-2xl">{stat.emoji}</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif bg-gradient-to-r from-mehndi-400 via-gold-400 to-haldi-400 bg-clip-text text-transparent mb-2">
                  {stat.isDecimal ? stat.value : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                  {stat.isDecimal && stat.suffix}
                </h3>
                <p className="text-cream-200/40 text-sm tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CATEGORY SHOWCASE — Desi Style
          ============================================ */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mehndi-500/10 rounded-full text-mehndi-700 text-xs tracking-widest uppercase mb-4 border border-mehndi-500/20">
              <Award className="w-3.5 h-3.5" />
              Venue Categories
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-maroon-800 mb-4">
              Apna <span className="bg-gradient-to-r from-mehndi-600 to-gold-600 bg-clip-text text-transparent">Perfect Tier</span> Chunein
            </h2>
            <p className="text-maroon-600/70 max-w-2xl mx-auto leading-relaxed">
              Ultra-luxury 5-star experience se lekar budget-friendly elegance tak — har shaadi ka apna perfect venue hai ✦
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const info = categoryInfo[cat];
              const venueCount = marquees.filter(m => m.category === cat).length;
              const minPrice = Math.min(...marquees.filter(m => m.category === cat).map(m => m.pricing.perHead.min));
              
              return (
                <Link
                  key={cat}
                  href={`/marquees?category=${encodeURIComponent(cat)}`}
                  className="group relative bg-white rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(80,0,20,0.12)] border border-maroon-100 hover:border-mehndi-500/30 overflow-hidden"
                >
                  {/* Top accent — desi gradient */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${info.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs mb-6 ${info.badgeClass}`}>
                    {info.icon} {info.label}
                  </div>
                  
                  <h3 className="text-2xl font-serif text-maroon-800 mb-2">Category {cat}</h3>
                  <p className="text-maroon-500/70 text-sm mb-6 leading-relaxed">{info.tagline}</p>
                  
                  <div className="flex items-center justify-between text-sm border-t border-maroon-100 pt-4">
                    <span className="text-maroon-500">{venueCount} venues</span>
                    <span className="text-mehndi-700 font-semibold">From {formatPriceShort(minPrice)}/head</span>
                  </div>

                  <ArrowRight className="absolute bottom-8 right-8 w-5 h-5 text-maroon-300 group-hover:text-mehndi-600 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURED VENUES — Desi Style
          ============================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-mehndi-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-rani-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mehndi-500/10 rounded-full text-mehndi-700 text-xs tracking-widest uppercase mb-4 border border-mehndi-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Hamaari Pasand
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-maroon-800 mb-4">
              Featured <span className="bg-gradient-to-r from-mehndi-600 to-gold-600 bg-clip-text text-transparent">Marquees</span> 🏛️
            </h2>
            <p className="text-maroon-600/70 max-w-2xl mx-auto leading-relaxed">
              Lahore ke sab se shaaandaar wedding destinations — har ek khud dekh kar chuna gaya hai
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMarquees.slice(0, 6).map((marquee, index) => (
              <div key={marquee.id} className="animate-fadeIn opacity-0" style={{ animationDelay: `${index * 0.15}s` }}>
                <MarqueeCard marquee={marquee} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/marquees"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-maroon-800 to-maroon-700 hover:from-maroon-700 hover:to-maroon-600 text-cream-100 font-semibold rounded-xl transition-all duration-300 shadow-maroon hover:shadow-lg hover:-translate-y-1"
            >
              Saare Marquees Dekhein 🏛️
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS — Desi Style  
          ============================================ */}
      <section className="py-24 bg-maroon-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mehndi-600 via-gold-500 to-rani-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mehndi-500/10 rounded-full text-mehndi-400 text-xs tracking-widest uppercase mb-4 border border-mehndi-500/20">
              <Sparkles className="w-3.5 h-3.5 animate-sparkle" />
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream-100 mb-4">
              Kaise <span className="bg-gradient-to-r from-mehndi-400 via-gold-400 to-haldi-400 bg-clip-text text-transparent">Kaam Karta Hai</span> ✨
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-px bg-gradient-to-r from-mehndi-500/30 via-gold-500/50 to-rani-500/30"></div>
            
            {[
              { num: '01', title: 'Marquees Dekhein', desc: 'Lahore ke curated marquees explore karein — full details, photos aur pricing ke saath.', icon: Crown, emoji: '🏛️' },
              { num: '02', title: 'Compare & Save', desc: 'Venues ko side by side compare karein, favorites mein save karein.', icon: Heart, emoji: '❤️' },
              { num: '03', title: 'Budget Banayein', desc: 'Smart calculator se har event ka accurate cost estimate nikalein.', icon: Calculator, emoji: '💰' },
              { num: '04', title: 'Book & Celebrate!', desc: 'Venues se seedha contact karein aur apni perfect shaadi plan karein!', icon: Sparkles, emoji: '🎉' },
            ].map((step, i) => (
              <div key={i} className="text-center relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-mehndi-500 via-gold-500 to-haldi-500 rounded-2xl flex items-center justify-center mx-auto mb-8 relative z-10 shadow-mehndi group-hover:shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-3">
                  <span className="text-2xl">{step.emoji}</span>
                </div>
                <span className="text-[10px] text-mehndi-500/40 tracking-widest uppercase mb-3 block">Step {step.num}</span>
                <h3 className="text-xl font-serif text-cream-100 mb-3">{step.title}</h3>
                <p className="text-cream-200/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          BROWSE BY AREA — Desi Style
          ============================================ */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-maroon-800 mb-3">
              Browse by <span className="bg-gradient-to-r from-mehndi-600 to-gold-600 bg-clip-text text-transparent">Area</span> 📍
            </h2>
            <p className="text-maroon-600/70">Lahore mein apne pasandeedah area ka perfect venue dhundhein</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <Link 
                key={area}
                href={`/marquees?area=${encodeURIComponent(area)}`}
                className="group px-6 py-3.5 bg-white hover:bg-gradient-to-r hover:from-maroon-800 hover:to-maroon-700 text-maroon-700 hover:text-cream-100 rounded-xl transition-all duration-300 font-medium text-sm border border-maroon-100 hover:border-maroon-800 shadow-sm hover:shadow-maroon"
              >
                <MapPin className="w-4 h-4 inline mr-2 text-mehndi-600/60 group-hover:text-mehndi-400" />
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          VENDOR CATEGORIES — Desi Style
          ============================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mehndi-500/10 rounded-full text-mehndi-700 text-xs tracking-widest uppercase mb-4 border border-mehndi-500/20">
              <Users className="w-3.5 h-3.5" />
              Trusted Partners
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-maroon-800 mb-4">
              Shaadi <span className="bg-gradient-to-r from-mehndi-600 to-gold-600 bg-clip-text text-transparent">Services</span> 💫
            </h2>
            <p className="text-maroon-600/70 max-w-2xl mx-auto">
              Verified aur top-rated vendors se connect karein — har cheez perfect banaane ke liye
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {vendorCategories.slice(0, 8).map((category) => {
              const emojis = {
                photographers: '📸', decorators: '🎨', caterers: '🍽️',
                'makeup-artists': '💄', entertainment: '🎵', invitations: '💌',
                jewelry: '💍', mehndi: '🌿'
              };
              
              return (
                <Link 
                  key={category.slug}
                  href={`/vendors?category=${category.slug}`}
                  className="group bg-cream-50 hover:bg-white p-8 rounded-2xl transition-all duration-500 text-center border border-transparent hover:border-mehndi-500/20 hover:shadow-[0_20px_60px_rgba(80,0,20,0.08)] hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-white group-hover:bg-mehndi-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-500 shadow-sm group-hover:shadow-mehndi">
                    <span className="text-3xl">{emojis[category.slug] || '✨'}</span>
                  </div>
                  <h3 className="font-serif font-semibold text-maroon-800 group-hover:text-mehndi-700 transition-colors mb-1">{category.name}</h3>
                  <p className="text-sm text-maroon-500/70">{category.count} vendors</p>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/vendors" className="inline-flex items-center text-mehndi-700 hover:text-mehndi-800 font-medium group">
              Saare Vendors Dekhein <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS — Desi Style
          ============================================ */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rani-500/10 rounded-full text-rani-700 text-xs tracking-widest uppercase mb-4 border border-rani-500/20">
              <Heart className="w-3.5 h-3.5" />
              Love Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-maroon-800 mb-4">
              Real <span className="bg-gradient-to-r from-rani-600 to-maroon-600 bg-clip-text text-transparent">Experiences</span> 💕
            </h2>
            <p className="text-maroon-600/70 max-w-2xl mx-auto">
              Un couples ki kahaniyaan jinhen ne apni perfect shaadi Lahore Shaadi ke saath plan ki
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <div key={index} className="animate-fadeIn opacity-0" style={{ animationDelay: `${index * 0.15}s` }}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials" className="inline-flex items-center text-rani-700 hover:text-rani-800 font-medium group">
              Mazeed Stories Parrhein <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          RECENTLY VIEWED — Desi Style
          ============================================ */}
      {recentlyViewedVenues.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif text-maroon-800">Haal Hi Mein Dekhe Gaye 👀</h2>
              <Link href="/marquees" className="text-mehndi-700 hover:text-mehndi-800 text-sm font-medium flex items-center group">
                Saare dekhein <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentlyViewedVenues.map((venue) => (
                <Link key={venue.slug} href={`/marquees/${venue.slug}`} className="group">
                  <div className="bg-cream-50 rounded-2xl overflow-hidden hover:shadow-[0_15px_40px_rgba(80,0,20,0.1)] transition-all duration-500 border border-maroon-100 hover:border-mehndi-500/20 group-hover:-translate-y-1">
                    <div className="relative h-36 overflow-hidden">
                      <img 
                        src={venue.image} 
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/50 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-medium text-maroon-800 group-hover:text-mehndi-700 transition-colors truncate">{venue.name}</h3>
                      <p className="text-sm text-maroon-500/70 mt-1">{formatPriceShort(venue.pricing.perHead.min)}+ /head</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          PLANNING TOOLS — Desi Style
          ============================================ */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-maroon-800 mb-3">
              Planning <span className="bg-gradient-to-r from-mehndi-600 to-gold-600 bg-clip-text text-transparent">Tools</span> 🛠️
            </h2>
            <p className="text-maroon-600/70">Har cheez jo aapko apni perfect shaadi plan karne ke liye chahiye</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: '/calculator', icon: Calculator, emoji: '💰', color: 'mehndi', title: 'Budget Calculator', desc: 'Multi-event menu planner — mehndi, barat, valima sab ka detailed cost nikalein.' },
              { href: '/compare', icon: Crown, emoji: '⚖️', color: 'maroon', title: 'Venue Comparison', desc: 'Marquees ko side by side compare karein aur best choose karein.' },
              { href: '/checklist', icon: CheckCircle, emoji: '✅', color: 'emerald', title: 'Shaadi Checklist', desc: 'Comprehensive planning checklist se organized rahein.' },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="group bg-white p-10 rounded-2xl shadow-sm hover:shadow-[0_20px_60px_rgba(80,0,20,0.1)] transition-all duration-500 border border-maroon-100 hover:border-mehndi-500/20 hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:-translate-y-1 ${
                  tool.color === 'mehndi' ? 'bg-mehndi-500/10 group-hover:bg-mehndi-500/20' :
                  tool.color === 'maroon' ? 'bg-maroon-500/10 group-hover:bg-maroon-500/20' :
                  'bg-emerald-500/10 group-hover:bg-emerald-500/20'
                }`}>
                  <span className="text-3xl">{tool.emoji}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-maroon-800 mb-3 group-hover:text-mehndi-700 transition-colors">{tool.title}</h3>
                <p className="text-maroon-500/70 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION — Grand Desi Finale
          ============================================ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-maroon-900"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/80 via-maroon-900/60 to-maroon-900/80"></div>
        
        {/* Mughal corner ornaments */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-mehndi-500/30 rounded-tl-2xl"></div>
        <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-rani-500/30 rounded-tr-2xl"></div>
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-rani-500/30 rounded-bl-2xl"></div>
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-mehndi-500/30 rounded-br-2xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-mehndi-500/60"></div>
            <span className="text-mehndi-500/60 text-lg">✦</span>
            <Crown className="w-6 h-6 text-gold-500/60" />
            <span className="text-mehndi-500/60 text-lg">✦</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-mehndi-500/60"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream-100 mb-6 leading-tight">
            Tayaar Hain Apni <br/>
            <span className="bg-gradient-to-r from-mehndi-400 via-gold-400 to-haldi-400 bg-clip-text text-transparent">
              Dream Shaadi Plan Karne Ko? 🎊
            </span>
          </h2>
          <p className="text-cream-200/50 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Aaj hi shuru karein. Budget calculate karein, venues compare karein, aur apne shaadi ke khwaab ko haqeeqat banayein! 💍
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/calculator"
              className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-mehndi-500 via-gold-500 to-haldi-500 hover:from-mehndi-400 hover:via-gold-400 hover:to-haldi-400 text-maroon-900 font-bold rounded-xl transition-all duration-500 shadow-mehndi hover:shadow-lg text-lg hover:-translate-y-1"
            >
              <Calculator className="w-6 h-6 mr-3" />
              💰 Budget Calculator
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setShowDateModal(true)}
              className="inline-flex items-center px-12 py-5 bg-cream-100/5 backdrop-blur-md hover:bg-cream-100/10 text-cream-100 font-bold rounded-xl transition-all duration-500 border border-mehndi-500/20 hover:border-mehndi-500/40 text-lg hover:-translate-y-1"
            >
              <Calendar className="w-6 h-6 mr-3" />
              📅 Shaadi Date Set Karein
            </button>
          </div>
        </div>
      </section>

      {/* Wedding Date Modal */}
      {showDateModal && (
        <WeddingDateModal onClose={() => setShowDateModal(false)} />
      )}

      <Footer />
    </>
  );
}
