import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { getFeaturedMarquees, formatPriceShort, marquees } from '@/data/marquees';
import { getFeaturedTestimonials } from '@/data/testimonials';
import { blogArticles } from '@/data/blog';
import { useWedding } from '@/context/WeddingContext';
import Navbar from '@/components/Navbar';
import MarqueeCard from '@/components/MarqueeCard';
import TestimonialCard from '@/components/TestimonialCard';
import CountdownTimer from '@/components/CountdownTimer';
import WeddingDateModal from '@/components/WeddingDateModal';
import Footer from '@/components/Footer';
import { 
  Heart, Calendar, Calculator, MapPin, Users, Star, ArrowRight, 
  CheckCircle, Sparkles, Camera, Crown, TrendingUp, ChevronRight, 
  PieChart, ListChecks, UserPlus, BookOpen, Shield, Zap, Check, 
  ChevronLeft, ArrowUpRight, Play
} from 'lucide-react';

/* ─── Animated Counter ─── */
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

/* ─── Section Reveal Hook ─── */
function useSectionReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

/* ─── Section Wrapper ─── */
function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useSectionReveal();
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-luxury ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE — LUXURY REDESIGN
   ═══════════════════════════════════════════════ */
export default function Home() {
  const featuredMarquees = getFeaturedMarquees();
  const featuredTestimonials = getFeaturedTestimonials().slice(0, 3);
  const { weddingDate, favorites } = useWedding();
  const [showDateModal, setShowDateModal] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

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
        <title>Lahore Shaadi | Premium Wedding Planner & Venue Guide</title>
        <meta name="description" content="Elegant Venue Discovery & Seamless Wedding Management for the Modern Couple. Discover Lahore's finest marquees, plan your budget, and create your dream wedding." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
          ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-950">
        {/* Background Images — Smooth crossfade with subtle scale */}
        {heroImages.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-all duration-[2500ms] ease-luxury ${
              idx === heroIndex ? 'opacity-100 scale-[1.03]' : 'opacity-0 scale-100'
            }`}
            style={{ 
              backgroundImage: `url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}

        {/* Refined dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-950/40 to-primary-950/90"></div>
        <div className="absolute inset-0 bg-primary-950/20"></div>

        {/* Subtle grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }}></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Overline */}
          <div className="animate-fadeIn opacity-0" style={{ animationDelay: '0.2s' }}>
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-white/50 font-light mb-8">
              <span className="w-8 h-[1px] bg-accent-400/60"></span>
              Premium Wedding Planning
              <span className="w-8 h-[1px] bg-accent-400/60"></span>
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-[1.06] animate-fadeIn opacity-0 tracking-tight" style={{ animationDelay: '0.4s' }}>
            Where Every Detail
            <br />
            Becomes a <span className="italic font-light text-accent-300">Memory</span>
          </h1>
          
          <p className="text-base md:text-lg text-white/50 mb-12 max-w-xl mx-auto leading-relaxed font-light animate-fadeIn opacity-0" style={{ animationDelay: '0.6s' }}>
            Curated venues, trusted vendors, and intelligent planning tools — all in one elegant platform.
          </p>

          {/* Wedding Countdown */}
          {weddingDate && (
            <div className="mb-10 animate-fadeIn opacity-0" style={{ animationDelay: '0.7s' }}>
              <CountdownTimer />
            </div>
          )}
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0" style={{ animationDelay: '0.8s' }}>
            <Link 
              href="/marquees"
              className="group px-8 py-4 bg-white text-primary-950 font-medium rounded-full transition-all duration-500 shadow-sm hover:shadow-luxury-md inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 text-sm tracking-wide"
            >
              Explore Venues
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link 
              href="/calculator"
              className="px-8 py-4 text-white font-normal rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-500 inline-flex items-center justify-center text-sm tracking-wide"
            >
              Plan Your Budget
            </Link>
          </div>

          {/* Set Wedding Date */}
          {!weddingDate && (
            <button
              onClick={() => setShowDateModal(true)}
              className="mt-8 text-white/30 hover:text-white/60 transition-all duration-300 inline-flex items-center gap-2 text-xs tracking-wider animate-fadeIn opacity-0"
              style={{ animationDelay: '1s' }}
            >
              <Calendar className="w-3.5 h-3.5" />
              Set Your Wedding Date
            </button>
          )}
        </div>

        {/* Carousel Indicators — minimal dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`transition-all duration-700 rounded-full ${
                idx === heroIndex ? 'w-8 h-1 bg-white' : 'w-1 h-1 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
          <div className="w-[18px] h-7 border border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-0.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — FEATURE BAR (floating)
          ══════════════════════════════════════════ */}
      <div className="relative z-20 -mt-14">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-luxury-md p-8 md:p-10 border border-neutral-200/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {[
                { icon: <Crown className="w-5 h-5" />, label: 'Curated Venues', desc: 'Handpicked locations' },
                { icon: <Users className="w-5 h-5" />, label: 'Trusted Vendors', desc: 'Verified professionals' },
                { icon: <Camera className="w-5 h-5" />, label: 'Visual Stories', desc: 'Real celebration shots' },
                { icon: <Sparkles className="w-5 h-5" />, label: 'Smart Planning', desc: 'Intelligent budgeting' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                  <div className="w-12 h-12 bg-neutral-100 group-hover:bg-accent-50 rounded-xl flex items-center justify-center mb-3.5 text-primary-600 group-hover:text-accent-600 transition-all duration-500">
                    {item.icon}
                  </div>
                  <h4 className="font-medium text-primary-900 text-sm mb-0.5">{item.label}</h4>
                  <p className="text-xs text-primary-400 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 3 — STATS
          ══════════════════════════════════════════ */}
      <section className="pt-28 pb-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-accent-600 font-medium mb-4">Why Choose Us</span>
              <h2 className="text-display-md md:text-display-lg font-serif text-primary-950 mb-5">
                Trusted by <span className="italic font-light">Hundreds</span> of Couples
              </h2>
              <p className="text-primary-400 max-w-lg mx-auto leading-relaxed font-light">
                Elegant venue discovery and premium wedding management for the modern couple.
              </p>
            </div>
          </RevealSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 10, suffix: '+', label: 'Premium Venues', desc: 'Handpicked marquees', icon: Crown, link: '/marquees', linkText: 'Explore' },
              { value: 500, suffix: '+', label: 'Happy Couples', desc: 'Celebrations planned', icon: Heart, link: '/testimonials', linkText: 'Read Stories' },
              { value: 50, suffix: 'L+', label: 'Budget Range', desc: 'Flexible tiers', icon: TrendingUp, link: '/calculator', linkText: 'Calculate' },
              { value: 4.8, suffix: '★', label: 'Average Rating', desc: 'Consistently top-rated', icon: Star, isDecimal: true, link: '/testimonials', linkText: 'See Reviews' },
            ].map((stat, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-7 text-center shadow-luxury hover:shadow-luxury-md transition-all duration-700 border border-neutral-200/60 group hover:-translate-y-1">
                  <div className="w-11 h-11 mx-auto mb-5 bg-neutral-100 group-hover:bg-accent-50 rounded-xl flex items-center justify-center transition-colors duration-500">
                    <stat.icon className="w-5 h-5 text-primary-500 group-hover:text-accent-600 transition-colors duration-500" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-primary-950 mb-1">
                    {stat.isDecimal ? stat.value : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                    {stat.isDecimal && stat.suffix}
                  </h3>
                  <p className="text-sm font-medium text-primary-700 mb-0.5">{stat.label}</p>
                  <p className="text-xs text-primary-400 font-light mb-4">{stat.desc}</p>
                  <Link href={stat.link} className="text-xs text-accent-600 hover:text-accent-700 font-medium transition-colors inline-flex items-center gap-1">
                    {stat.linkText} <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — FEATURED MARQUEES
          ══════════════════════════════════════════ */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-accent-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-neutral-200/40 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-accent-600 font-medium mb-4">Featured Venues</span>
                <h2 className="text-display-md md:text-display-lg font-serif text-primary-950">
                  Extraordinary <span className="italic font-light">Spaces</span>
                </h2>
                <p className="text-primary-400 max-w-lg mt-3 leading-relaxed font-light">
                  Each venue hand-selected for its exceptional ambiance, service, and attention to detail.
                </p>
              </div>
              <Link 
                href="/marquees"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-neutral-300 text-primary-700 font-medium rounded-full transition-all duration-500 hover:border-primary-950 hover:text-primary-950 text-sm self-start md:self-auto"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMarquees.slice(0, 6).map((marquee, index) => (
              <RevealSection key={marquee.id} delay={index * 80}>
                <MarqueeCard marquee={marquee} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — PLANNING PROCESS
          ══════════════════════════════════════════ */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-accent-600 font-medium mb-4">How It Works</span>
              <h2 className="text-display-md md:text-display-lg font-serif text-primary-950">
                Planning Made <span className="italic font-light">Effortless</span>
              </h2>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                num: '01', 
                image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
                title: 'Discover & Curate', 
                desc: 'Browse our hand-picked collection of venues, explore detailed galleries, and build your shortlist.' 
              },
              { 
                num: '02', 
                image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
                title: 'Build Your Team', 
                desc: 'Connect with trusted vendors — photographers, decorators, caterers — to assemble your dream team.' 
              },
              { 
                num: '03', 
                image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600',
                title: 'Plan & Execute', 
                desc: 'Use intelligent budgeting tools, checklists, and timeline management to orchestrate every detail.' 
              },
            ].map((step, i) => (
              <RevealSection key={i} delay={i * 120}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-700 hover:-translate-y-1 border border-neutral-200/50 group">
                  <div className="relative h-56 overflow-hidden">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000 ease-luxury" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/50 to-transparent"></div>
                    <div className="absolute bottom-5 left-5">
                      <span className="text-3xl font-serif font-light text-white/80">{step.num}</span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-serif text-primary-950 mb-3 group-hover:text-accent-700 transition-colors duration-500">{step.title}</h3>
                    <p className="text-primary-400 text-sm leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 6 — SMART TOOLS
          ══════════════════════════════════════════ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-accent-600 font-medium mb-4">Planning Suite</span>
              <h2 className="text-display-md md:text-display-lg font-serif text-primary-950 mb-5">
                Intelligent <span className="italic font-light">Tools</span>
              </h2>
              <p className="text-primary-400 max-w-lg mx-auto font-light">
                Comprehensive planning tools designed to simplify every aspect of your celebration.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {/* Checklist Manager */}
            <RevealSection delay={0}>
              <div className="bg-neutral-50 rounded-2xl p-7 border border-neutral-200/60 hover:border-accent-200/60 hover:shadow-luxury-md transition-all duration-700 hover:-translate-y-1 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft border border-neutral-200/50">
                    <ListChecks className="w-5 h-5 text-primary-600" />
                  </div>
                  <h4 className="font-serif text-lg text-primary-950">Checklist</h4>
                </div>
                <div className="space-y-3">
                  {['Book venue & finalize date', 'Hire photographer & videographer', 'Send invitations to guests', 'Final dress fitting & alteration', 'Confirm catering menu items'].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 text-sm text-primary-600 cursor-pointer group/item">
                      <div className={`w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${i < 2 ? 'bg-primary-950 border-primary-950' : 'border-neutral-300 group-hover/item:border-primary-400'}`}>
                        {i < 2 && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`${i < 2 ? 'line-through text-primary-300' : ''} transition-colors`}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </RevealSection>

            {/* Budget Calculator */}
            <RevealSection delay={100}>
              <div className="bg-neutral-50 rounded-2xl p-7 border border-neutral-200/60 hover:border-accent-200/60 hover:shadow-luxury-md transition-all duration-700 hover:-translate-y-1 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft border border-neutral-200/50">
                    <PieChart className="w-5 h-5 text-accent-600" />
                  </div>
                  <h4 className="font-serif text-lg text-primary-950">Budget</h4>
                </div>
                {/* Mini Donut Chart */}
                <div className="flex items-center justify-center py-4">
                  <div className="relative w-36 h-36">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#eae8e1" strokeWidth="12" />
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#282421" strokeWidth="12" 
                        strokeDasharray="211 301" strokeDashoffset="0" strokeLinecap="round" />
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#dda027" strokeWidth="12" 
                        strokeDasharray="90 301" strokeDashoffset="-211" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-[10px] text-primary-400 uppercase tracking-widest font-medium">Total</p>
                      <p className="text-lg font-serif font-semibold text-primary-950">Rs 10L</p>
                    </div>
                  </div>
                </div>
                {/* Summary */}
                <div className="flex justify-between text-sm border-t border-neutral-200 pt-4 mt-2">
                  <div className="text-center">
                    <p className="text-[10px] text-primary-400 uppercase tracking-widest mb-0.5">Budget</p>
                    <p className="font-semibold text-primary-950">Rs 10L</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-primary-400 uppercase tracking-widest mb-0.5">Spent</p>
                    <p className="font-semibold text-accent-600">Rs 7L</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-primary-400 uppercase tracking-widest mb-0.5">Left</p>
                    <p className="font-semibold text-rose-600">Rs 3L</p>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Guest List */}
            <RevealSection delay={200}>
              <div className="bg-neutral-50 rounded-2xl p-7 border border-neutral-200/60 hover:border-accent-200/60 hover:shadow-luxury-md transition-all duration-700 hover:-translate-y-1 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft border border-neutral-200/50">
                      <UserPlus className="w-5 h-5 text-sage-600" />
                    </div>
                    <h4 className="font-serif text-lg text-primary-950">Guests</h4>
                  </div>
                  <div className="flex gap-1">
                    <button className="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-primary-400 hover:bg-neutral-100 hover:text-primary-600 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-primary-400 hover:bg-neutral-100 hover:text-primary-600 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Ahmed & Fatima Family', count: 45, status: 'confirmed' },
                    { name: 'Close Friends Circle', count: 30, status: 'confirmed' },
                    { name: 'Office Colleagues', count: 25, status: 'pending' },
                    { name: 'Extended Relatives', count: 60, status: 'pending' },
                    { name: 'University Friends', count: 20, status: 'confirmed' },
                  ].map((group, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${group.status === 'confirmed' ? 'bg-sage-500' : 'bg-accent-400'}`}></div>
                        <span className="text-primary-600 truncate max-w-[160px]">{group.name}</span>
                      </div>
                      <span className="text-primary-500 font-medium">{group.count}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-3 border-t border-neutral-200 flex justify-between items-center">
                  <span className="text-xs text-primary-400">Total Guests</span>
                  <span className="font-serif font-semibold text-primary-950">180</span>
                </div>
              </div>
            </RevealSection>
          </div>

          <div className="text-center">
            <Link 
              href="/calculator"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-950 text-white font-medium rounded-full transition-all duration-500 shadow-sm hover:shadow-luxury-md hover:-translate-y-0.5 text-sm tracking-wide"
            >
              Explore Planning Suite
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 7 — TESTIMONIALS
          ══════════════════════════════════════════ */}
      <section className="py-32 bg-primary-950 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }}></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-accent-400 font-medium mb-4">Testimonials</span>
              <h2 className="text-display-md md:text-display-lg font-serif text-white mb-5">
                Love <span className="italic font-light text-accent-300">Stories</span>
              </h2>
              <p className="text-white/40 max-w-lg mx-auto font-light">
                Hear from couples who trusted us with their most important day.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <RevealSection key={index} delay={index * 100}>
                <TestimonialCard testimonial={testimonial} darkMode={true} />
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={300}>
            <div className="text-center mt-16">
              <Link href="/testimonials" className="inline-flex items-center text-accent-400 hover:text-accent-300 font-medium group transition-colors text-sm tracking-wide">
                Read More Stories <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 8 — IDEAS & ARTICLES
          ══════════════════════════════════════════ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-accent-600 font-medium mb-4">Journal</span>
                <h2 className="text-display-md md:text-display-lg font-serif text-primary-950">
                  Ideas & <span className="italic font-light">Inspiration</span>
                </h2>
              </div>
              <Link 
                href="/testimonials"
                className="group inline-flex items-center gap-2 text-primary-500 hover:text-primary-900 font-medium text-sm transition-colors self-start md:self-auto"
              >
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </RevealSection>

          {/* Top Row — 2 large cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {blogArticles.slice(0, 2).map((article, i) => (
              <RevealSection key={article.id} delay={i * 100}>
                <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-luxury hover:shadow-luxury-lg transition-all duration-700">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000 ease-luxury"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-white/15 backdrop-blur-sm text-white text-xs rounded-full font-medium border border-white/10">{article.category}</span>
                      <span className="text-white/50 text-xs">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-serif text-white group-hover:text-accent-300 transition-colors duration-500 leading-snug">{article.title}</h3>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Bottom Row — 3 smaller cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {blogArticles.slice(2, 5).map((article, i) => (
              <RevealSection key={article.id} delay={(i + 2) * 80}>
                <div className="group relative rounded-2xl overflow-hidden h-56 cursor-pointer shadow-luxury hover:shadow-luxury-lg transition-all duration-700">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000 ease-luxury"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-white/50 text-xs block mb-2">{article.date}</span>
                    <h3 className="text-sm font-serif text-white group-hover:text-accent-300 transition-colors duration-500 line-clamp-2 leading-snug">{article.title}</h3>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 9 — PREMIUM CTA
          ══════════════════════════════════════════ */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-accent-600 font-medium mb-4">Membership</span>
              <h2 className="text-display-md md:text-display-lg font-serif text-primary-950 mb-5">
                Start Planning <span className="italic font-light">Today</span>
              </h2>
              <p className="text-primary-400 max-w-lg mx-auto font-light">
                Choose the plan that fits your vision. Upgrade anytime for exclusive features.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Essence — Free */}
            <RevealSection delay={0}>
              <div className="bg-white rounded-2xl p-9 border border-neutral-200/60 hover:border-accent-200 transition-all duration-700 hover:shadow-luxury-md group h-full">
                <div className="mb-8">
                  <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-primary-400 font-medium mb-3">Essence</span>
                  <h3 className="text-3xl font-serif text-primary-950 mb-2">Free</h3>
                  <p className="text-primary-400 text-sm font-light">Everything to get started</p>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    'Browse all venue listings',
                    'Basic budget calculator',
                    'Wedding planning checklist',
                    'Vendor directory access',
                    'Community inspiration',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-primary-600">
                      <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-500" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/calculator" className="block w-full py-3.5 text-center border border-primary-950 text-primary-950 font-medium rounded-full hover:bg-primary-950 hover:text-white transition-all duration-500 text-sm tracking-wide">
                  Get Started
                </Link>
              </div>
            </RevealSection>

            {/* Signature — Premium */}
            <RevealSection delay={100}>
              <div className="bg-primary-950 rounded-2xl p-9 relative overflow-hidden group h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-500/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="mb-8">
                    <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-accent-400 font-medium mb-3">
                      <Crown className="w-3 h-3" /> Signature
                    </span>
                    <h3 className="text-3xl font-serif text-white mb-2">Premium</h3>
                    <p className="text-white/35 text-sm font-light">The complete wedding experience</p>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {[
                      'Priority venue bookings',
                      'Advanced budget analytics',
                      'Personalized recommendations',
                      'Premium vendor connections',
                      'Expert planning consultation',
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/55">
                        <div className="w-5 h-5 rounded-full bg-accent-500/15 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-accent-400" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/calculator" className="block w-full py-3.5 text-center bg-accent-500 hover:bg-accent-400 text-white font-medium rounded-full transition-all duration-500 shadow-gold hover:shadow-gold-lg text-sm tracking-wide">
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </RevealSection>
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
