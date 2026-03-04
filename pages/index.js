import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip } from 'recharts';
import { getFeaturedMarquees, formatPriceShort, marquees } from '@/data/marquees';
import {
  eventTypes,
  eventMenuPresets,
  menuCategories,
  liveCounters,
  calculateEventMenuPerHead,
  calculateStartersCost,
  calculateCountersCost,
  getDefaultStarterQuantities,
  getDishPrice,
} from '@/data/menu';
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
  PieChart as PieChartIcon, ListChecks, UserPlus, BookOpen, Shield, Zap, Check, 
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

function AnimatedCurrency({ value }) {
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(Math.round(value));

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => setDisplay(latest));
    const controls = animate(motionValue, value, { duration: 0.7, ease: 'easeOut' });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [value, motionValue, rounded]);

  return <span>{formatPriceShort(display)}</span>;
}

function HeroBudgetCalculator() {
  const [guestCount, setGuestCount] = useState(700);
  const [activeEvent, setActiveEvent] = useState('barat');
  const [cateringTier, setCateringTier] = useState('premium');
  const [decorTier, setDecorTier] = useState('signature');
  const [eventMenus, setEventMenus] = useState({});
  const [eventCounters, setEventCounters] = useState({});
  const [starterQuantities, setStarterQuantities] = useState({});
  const [activeCategory, setActiveCategory] = useState('starters');

  const eventKeys = ['mehndi', 'barat', 'valima'];
  const venueBaseByEvent = { mehndi: 190000, barat: 320000, valima: 250000 };
  const categoryBand = 'A';

  const cateringConfig = {
    signature: { label: 'Signature', factor: 0.9 },
    premium: { label: 'Premium', factor: 1.0 },
    couture: { label: 'Couture', factor: 1.15 },
  };

  const decorConfig = {
    elegant: { label: 'Elegant', base: 260000 },
    signature: { label: 'Signature', base: 490000 },
    royal: { label: 'Royal', base: 840000 },
  };

  useEffect(() => {
    const nextMenus = {};
    const nextCounters = {};
    const nextStarterQty = {};

    eventKeys.forEach((eventId) => {
      const preset = eventMenuPresets[eventId];
      nextMenus[eventId] = preset ? { ...preset.categories } : {};
      nextCounters[eventId] = preset ? [...preset.suggestedCounters] : [];

      const guests = Math.round(guestCount * (eventTypes[eventId]?.suggestedGuestRatio || 1));
      const starterIds = preset?.categories?.starters || [];
      nextStarterQty[eventId] = getDefaultStarterQuantities(starterIds, guests);
    });

    setEventMenus(nextMenus);
    setEventCounters(nextCounters);
    setStarterQuantities(nextStarterQty);
  }, []);

  useEffect(() => {
    setStarterQuantities((prev) => {
      const updated = { ...prev };
      eventKeys.forEach((eventId) => {
        const guests = Math.round(guestCount * (eventTypes[eventId]?.suggestedGuestRatio || 1));
        const selectedStarters = eventMenus[eventId]?.starters || [];
        updated[eventId] = { ...(updated[eventId] || {}), ...getDefaultStarterQuantities(selectedStarters, guests) };
      });
      return updated;
    });
  }, [guestCount, eventMenus]);

  const toggleDish = (eventId, categoryId, dishId) => {
    setEventMenus((prev) => {
      const currentEvent = prev[eventId] || {};
      const selected = currentEvent[categoryId] || [];
      const category = menuCategories.find((cat) => cat.id === categoryId);
      const maxSelect = category?.maxSelect || 6;
      const exists = selected.includes(dishId);

      let nextSelected;
      if (exists) nextSelected = selected.filter((id) => id !== dishId);
      else nextSelected = selected.length >= maxSelect ? selected : [...selected, dishId];

      return {
        ...prev,
        [eventId]: {
          ...currentEvent,
          [categoryId]: nextSelected,
        },
      };
    });
  };

  const toggleCounter = (eventId, counterId) => {
    setEventCounters((prev) => {
      const selected = prev[eventId] || [];
      const exists = selected.includes(counterId);
      return {
        ...prev,
        [eventId]: exists ? selected.filter((id) => id !== counterId) : [...selected, counterId],
      };
    });
  };

  const eventSummary = useMemo(() => {
    return eventKeys.map((key) => {
      const info = eventTypes[key];
      const guests = Math.round(guestCount * (info?.suggestedGuestRatio || 1));
      const menuSelection = eventMenus[key] || {};
      const perHeadMenu = calculateEventMenuPerHead(menuSelection, categoryBand, key);
      const catering = Math.round(guests * perHeadMenu * (cateringConfig[cateringTier]?.factor || 1));
      const starters = Math.round(calculateStartersCost(menuSelection, categoryBand, starterQuantities[key] || {}));
      const counters = Math.round(calculateCountersCost(eventCounters[key] || [], categoryBand));
      const decor = Math.round(decorConfig[decorTier].base * (info?.pricingMultiplier || 1));
      const venue = venueBaseByEvent[key] || 180000;
      const logistics = Math.round(guests * 320);
      const total = Math.round(catering + starters + counters + decor + venue + logistics);

      return {
        key,
        label: info?.name || key,
        guests,
        perHeadMenu,
        catering,
        starters,
        counters,
        decor,
        venue,
        logistics,
        total,
      };
    });
  }, [guestCount, cateringTier, decorTier, eventMenus, eventCounters, starterQuantities]);

  const selectedEvent = eventSummary.find((item) => item.key === activeEvent) || eventSummary[1];
  const grandTotal = eventSummary.reduce((sum, item) => sum + item.total, 0);

  const chartData = [
    { name: 'Catering', value: selectedEvent.catering, color: '#dda027' },
    { name: 'Starters', value: selectedEvent.starters, color: '#7a1a37' },
    { name: 'Live Counters', value: selectedEvent.counters, color: '#0d9488' },
    { name: 'Decor', value: selectedEvent.decor, color: '#064e3b' },
    { name: 'Venue', value: selectedEvent.venue, color: '#45091a' },
    { name: 'Logistics', value: selectedEvent.logistics, color: '#4338ca' },
  ];

  const visibleCategories = ['starters', 'chicken', 'rice', 'bbq', 'desserts'];
  const activeCategoryConfig = menuCategories.find((cat) => cat.id === activeCategory);
  const activeCategoryDishes = (activeCategoryConfig?.dishes || []).slice(0, 8);
  const selectedForActiveCategory = eventMenus[activeEvent]?.[activeCategory] || [];

  const topCounters = liveCounters.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="relative w-full max-w-xl mx-auto"
    >
      <motion.div
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-4 bg-gradient-to-br from-accent-500/30 via-accent-400/10 to-emerald-500/20 rounded-[28px] blur-2xl"
      />

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-2xl border border-accent-300/35 bg-white/10 backdrop-blur-xl shadow-[0_24px_70px_rgba(0,0,0,0.45)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-primary-950/15 pointer-events-none" />
        <div className="p-6 md:p-7 relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-accent-300/80 mb-1">Live Budget Studio</p>
              <h3 className="text-xl md:text-2xl font-serif text-white">Plan in Real Time</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-400 flex items-center justify-center shadow-gold">
              <Calculator className="w-5 h-5 text-primary-950" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mb-5">
            {eventKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveEvent(key)}
                className={`relative px-3 py-2.5 rounded-xl text-xs md:text-sm transition-all duration-300 border ${
                  activeEvent === key
                    ? 'bg-white text-primary-950 border-accent-300 shadow-lg'
                    : 'text-white/70 border-white/15 hover:border-accent-300/50 hover:text-white'
                }`}
              >
                {eventTypes[key]?.name || key}
              </button>
            ))}
          </div>

          <div className="space-y-4 mb-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-widest text-white/55">Guest Count</label>
                <span className="text-sm text-accent-300 font-medium">{guestCount}</span>
              </div>
              <input
                type="range"
                min="150"
                max="2500"
                step="50"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-accent-400 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs text-white/60">
                Catering Tier
                <select
                  value={cateringTier}
                  onChange={(e) => setCateringTier(e.target.value)}
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl bg-white/15 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-400"
                >
                  {Object.entries(cateringConfig).map(([key, item]) => (
                    <option key={key} value={key} className="text-primary-950">{item.label}</option>
                  ))}
                </select>
              </label>

              <label className="text-xs text-white/60">
                Decor Tier
                <select
                  value={decorTier}
                  onChange={(e) => setDecorTier(e.target.value)}
                  className="mt-1.5 w-full px-3 py-2.5 rounded-xl bg-white/15 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-400"
                >
                  {Object.entries(decorConfig).map(([key, item]) => (
                    <option key={key} value={key} className="text-primary-950">{item.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 mb-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {visibleCategories.map((categoryId) => (
                <button
                  key={categoryId}
                  onClick={() => setActiveCategory(categoryId)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] tracking-wide transition-all border ${
                    activeCategory === categoryId
                      ? 'bg-accent-500/20 border-accent-400/50 text-accent-200'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {menuCategories.find((cat) => cat.id === categoryId)?.name?.replace('Main Course — ', '')}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeEvent}-${activeCategory}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 gap-2"
              >
                {activeCategoryDishes.map((dish) => {
                  const selected = selectedForActiveCategory.includes(dish.id);
                  return (
                    <button
                      key={dish.id}
                      onClick={() => toggleDish(activeEvent, activeCategory, dish.id)}
                      className={`text-left p-2.5 rounded-lg border transition-all ${
                        selected
                          ? 'bg-emerald-500/15 border-emerald-400/40 text-white'
                          : 'bg-white/5 border-white/10 text-white/70 hover:border-accent-400/40'
                      }`}
                    >
                      <p className="text-xs truncate">{dish.name}</p>
                      <p className="text-[10px] text-white/45 mt-0.5">{formatPriceShort(getDishPrice(dish.basePrice, categoryBand))}</p>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-white/45 mb-2">Live Counters</p>
              <div className="flex flex-wrap gap-1.5">
                {topCounters.map((counter) => {
                  const selected = (eventCounters[activeEvent] || []).includes(counter.id);
                  return (
                    <button
                      key={counter.id}
                      onClick={() => toggleCounter(activeEvent, counter.id)}
                      className={`px-2 py-1 rounded-md text-[10px] border transition-all ${
                        selected
                          ? 'bg-accent-500/20 border-accent-400/50 text-accent-200'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {counter.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-accent-300/30 bg-primary-950/40 p-4 mb-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-1">{selectedEvent.label} Estimate</p>
            <p className="text-2xl md:text-3xl font-serif text-gradient-gold">
              <AnimatedCurrency value={selectedEvent.total} />
            </p>
            <p className="text-xs text-white/45 mt-1">{selectedEvent.guests} guests · Menu/head {formatPriceShort(selectedEvent.perHeadMenu)} · Full projection <span className="text-accent-300"><AnimatedCurrency value={grandTotal} /></span></p>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-2 mb-4">
            <ResponsiveContainer width="100%" height={160}>
              <RePieChart>
                <Pie data={chartData} dataKey="value" innerRadius={42} outerRadius={68} paddingAngle={3}>
                  {chartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => formatPriceShort(val)}
                  contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: '#fff' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2.5">
            {eventSummary.map((row) => (
              <AnimatePresence key={row.key} mode="wait">
                <motion.div
                  initial={{ opacity: 0.7, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 border ${
                    activeEvent === row.key ? 'border-accent-300/60 bg-accent-500/10' : 'border-white/10 bg-white/5'
                  }`}
                >
                  <span className="text-sm text-white/75">{row.label}</span>
                  <span className="text-sm font-medium text-accent-200">{formatPriceShort(row.total)}</span>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE — ROYAL DESI LUXURY
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
        <title>Wedify | Premium Wedding Planner & Venue Guide</title>
        <meta name="description" content="Elegant Venue Discovery & Seamless Wedding Management for the Modern Couple. Discover Lahore's finest marquees, plan your budget, and create your dream wedding." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO  (Royal Maroon & Gold)
          ══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-start overflow-hidden bg-primary-950 pt-28 pb-16 lg:pt-32 lg:pb-20">
        {/* Background Images — Smooth crossfade */}
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

        {/* Cinematic overlay — deep maroon/wine gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/85 via-[#45091a]/50 to-primary-950/95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-wine-950/30 via-transparent to-midnight-950/20"></div>

        {/* Paisley texture overlay */}
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>

        {/* Gold accent glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-500/8 rounded-full blur-[120px]"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 items-start gap-10 lg:gap-14 xl:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center lg:text-left max-w-xl mx-auto lg:mx-0 space-y-7 self-start"
            >
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-accent-400/80 font-light">
                <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-accent-400/60"></span>
                <Crown className="w-3.5 h-3.5" />
                Luxury Desi Planning
                <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-accent-400/60"></span>
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-tight tracking-tight">
                Build Your <span className="italic font-light text-gradient-gold">Wedding Budget</span>
                <br />Before You Book Anything
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/45 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Wedify turns guesswork into clarity. Model guest count, event style, catering and decor tiers instantly with premium cost intelligence.
              </p>

              {weddingDate && (
                <div className="max-w-xl mx-auto lg:mx-0">
                  <CountdownTimer />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/calculator"
                  className="group px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-400 text-primary-950 font-semibold rounded-full transition-all duration-500 shadow-gold hover:shadow-gold-lg inline-flex items-center justify-center gap-2 hover:-translate-y-1 text-sm tracking-wide"
                >
                  <Calculator className="w-4 h-4" />
                  Open Full Calculator
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/marquees"
                  className="px-8 py-4 text-white font-normal rounded-full border border-accent-500/30 hover:border-accent-400/60 hover:bg-accent-500/10 transition-all duration-500 inline-flex items-center justify-center text-sm tracking-wide backdrop-blur-sm"
                >
                  Explore Venues
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                {['Real-time event totals', 'Menu-level costing', 'Instant breakdown chart'].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full text-[10px] tracking-wide uppercase border border-accent-400/25 bg-white/5 text-white/60">
                    {badge}
                  </span>
                ))}
              </div>

              {!weddingDate && (
                <button
                  onClick={() => setShowDateModal(true)}
                  className="text-white/25 hover:text-accent-400/70 transition-all duration-300 inline-flex items-center gap-2 text-xs tracking-wider"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Set Your Wedding Date
                </button>
              )}

              <div className="rounded-2xl border border-white/12 bg-white/5 backdrop-blur-sm p-4 sm:p-5 text-left">
                <p className="text-[10px] uppercase tracking-[0.24em] text-accent-300/75 mb-3">Luxury Promise</p>
                <div className="space-y-2.5">
                  {[
                    'Every estimate is event-wise, menu-aware, and instantly recalculated',
                    'Designed for premium Desi weddings where detail, prestige, and control matter',
                    'Turn uncertainty into confident decisions before booking any vendor'
                  ].map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0"></span>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{line}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
                    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
                    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600'
                  ].map((imageUrl, idx) => (
                    <div key={idx} className="h-14 rounded-lg overflow-hidden border border-white/10">
                      <img src={imageUrl} alt="Luxury wedding moment" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="relative flex justify-center lg:justify-end w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-accent-500/15 to-wine-500/20 blur-3xl rounded-[30px]"></div>
              <HeroBudgetCalculator />
            </div>
          </div>
        </div>

        {/* Carousel Indicators — gold themed */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`transition-all duration-700 rounded-full ${
                idx === heroIndex ? 'w-8 h-1 bg-accent-400' : 'w-1 h-1 bg-white/25 hover:bg-accent-400/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-[18px] h-7 border border-accent-400/30 rounded-full flex items-start justify-center p-1">
            <div className="w-0.5 h-1.5 bg-accent-400/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { value: '2,500+', label: 'Budgets Simulated' },
            { value: 'PKR 5M+', label: 'Average Planned Spend' },
            { value: '4.9/5', label: 'Planner Satisfaction' },
            { value: 'Real-Time', label: 'Cost Recalculation' },
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl border border-neutral-200/70 bg-cream-100/50 px-4 py-4 text-center">
              <p className="text-xl md:text-2xl font-serif text-primary-950">{item.value}</p>
              <p className="text-xs uppercase tracking-widest text-primary-400 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — FEATURE BAR (Jewel-toned icons)
          ══════════════════════════════════════════ */}
      <div className="relative z-10 mt-8 md:mt-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-luxury-lg p-8 md:p-10 border border-neutral-200/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {[
                { icon: <Crown className="w-5 h-5" />, label: 'Curated Venues', desc: 'Handpicked locations', color: 'from-primary-950 to-maroon-800', text: 'text-accent-300' },
                { icon: <Users className="w-5 h-5" />, label: 'Trusted Vendors', desc: 'Verified professionals', color: 'from-emerald-800 to-emerald-700', text: 'text-emerald-200' },
                { icon: <Camera className="w-5 h-5" />, label: 'Visual Stories', desc: 'Real celebration shots', color: 'from-midnight-900 to-midnight-800', text: 'text-indigo-300' },
                { icon: <Sparkles className="w-5 h-5" />, label: 'Smart Planning', desc: 'Intelligent budgeting', color: 'from-wine-900 to-wine-800', text: 'text-pink-300' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-3.5 ${item.text} shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
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
          SECTION 3 — STATS  (Emerald accent identity)
          ══════════════════════════════════════════ */}
      <section className="pt-28 pb-32 bg-neutral-50 relative overflow-hidden">
        {/* Subtle emerald glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-emerald-600 font-medium mb-4">
                <span className="w-6 h-[1px] bg-emerald-400"></span>
                Why Choose Us
                <span className="w-6 h-[1px] bg-emerald-400"></span>
              </span>
              <h2 className="text-display-md md:text-display-lg font-serif text-primary-950 mb-5">
                Trusted by <span className="italic font-light text-emerald-700">Hundreds</span> of Couples
              </h2>
              <p className="text-primary-400 max-w-lg mx-auto leading-relaxed font-light">
                Elegant venue discovery and premium wedding management for the modern couple.
              </p>
            </div>
          </RevealSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 10, suffix: '+', label: 'Premium Venues', desc: 'Handpicked marquees', icon: Crown, accent: 'accent', shadow: 'shadow-card-gold', link: '/marquees', linkText: 'Explore' },
              { value: 500, suffix: '+', label: 'Happy Couples', desc: 'Celebrations planned', icon: Heart, accent: 'emerald', shadow: 'shadow-card-emerald', link: '/testimonials', linkText: 'Read Stories' },
              { value: 50, suffix: 'L+', label: 'Budget Range', desc: 'Flexible tiers', icon: TrendingUp, accent: 'midnight', shadow: 'shadow-card-midnight', link: '/calculator', linkText: 'Calculate' },
              { value: 4.8, suffix: '★', label: 'Average Rating', desc: 'Consistently top-rated', icon: Star, isDecimal: true, accent: 'wine', shadow: 'shadow-card-wine', link: '/testimonials', linkText: 'See Reviews' },
            ].map((stat, i) => {
              const accentMap = {
                accent: { bg: 'group-hover:bg-accent-50', icon: 'group-hover:text-accent-600', bar: 'bg-accent-500', link: 'text-accent-600 hover:text-accent-700' },
                emerald: { bg: 'group-hover:bg-emerald-50', icon: 'group-hover:text-emerald-600', bar: 'bg-emerald-500', link: 'text-emerald-600 hover:text-emerald-700' },
                midnight: { bg: 'group-hover:bg-indigo-50', icon: 'group-hover:text-indigo-600', bar: 'bg-indigo-500', link: 'text-indigo-600 hover:text-indigo-700' },
                wine: { bg: 'group-hover:bg-pink-50', icon: 'group-hover:text-pink-600', bar: 'bg-pink-500', link: 'text-pink-600 hover:text-pink-700' },
              };
              const a = accentMap[stat.accent];
              return (
                <RevealSection key={i} delay={i * 100}>
                  <div className={`bg-white rounded-2xl p-7 text-center ${stat.shadow} hover:shadow-lg transition-all duration-700 border border-neutral-200/60 group hover:-translate-y-2 relative overflow-hidden`}>
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${a.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className={`w-11 h-11 mx-auto mb-5 bg-neutral-100 ${a.bg} rounded-xl flex items-center justify-center transition-colors duration-500`}>
                      <stat.icon className={`w-5 h-5 text-primary-500 ${a.icon} transition-colors duration-500`} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif text-primary-950 mb-1">
                      {stat.isDecimal ? stat.value : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                      {stat.isDecimal && stat.suffix}
                    </h3>
                    <p className="text-sm font-medium text-primary-700 mb-0.5">{stat.label}</p>
                    <p className="text-xs text-primary-400 font-light mb-4">{stat.desc}</p>
                    <Link href={stat.link} className={`text-xs ${a.link} font-medium transition-colors inline-flex items-center gap-1`}>
                      {stat.linkText} <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — FEATURED MARQUEES (Gold accent)
          ══════════════════════════════════════════ */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Decorative elements — warm gold radials */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-accent-100/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-cream-200/40 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-accent-600 font-medium mb-4">
                  <Crown className="w-3.5 h-3.5" />
                  Featured Venues
                </span>
                <h2 className="text-display-md md:text-display-lg font-serif text-primary-950">
                  Extraordinary <span className="italic font-light text-accent-700">Spaces</span>
                </h2>
                <p className="text-primary-400 max-w-lg mt-3 leading-relaxed font-light">
                  Each venue hand-selected for its exceptional ambiance, service, and attention to detail.
                </p>
              </div>
              <Link 
                href="/marquees"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-950 to-maroon-800 text-white font-medium rounded-full transition-all duration-500 hover:shadow-maroon hover:-translate-y-0.5 text-sm self-start md:self-auto"
              >
                View All Venues
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
          SECTION 5 — PLANNING PROCESS (Midnight accent)
          ══════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #f0ede6 100%)' }}>
        {/* Decorative midnight glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-midnight-500/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-midnight-600 font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                How It Works
              </span>
              <h2 className="text-display-md md:text-display-lg font-serif text-primary-950">
                Planning Made <span className="italic font-light text-midnight-700">Effortless</span>
              </h2>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                num: '01', 
                image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
                title: 'Discover & Curate', 
                desc: 'Browse our hand-picked collection of venues, explore detailed galleries, and build your shortlist.',
                accent: 'from-accent-500 to-accent-400',
                numColor: 'text-accent-400'
              },
              { 
                num: '02', 
                image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
                title: 'Build Your Team', 
                desc: 'Connect with trusted vendors — photographers, decorators, caterers — to assemble your dream team.',
                accent: 'from-emerald-600 to-emerald-500',
                numColor: 'text-emerald-400'
              },
              { 
                num: '03', 
                image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600',
                title: 'Plan & Execute', 
                desc: 'Use intelligent budgeting tools, checklists, and timeline management to orchestrate every detail.',
                accent: 'from-midnight-700 to-midnight-600',
                numColor: 'text-indigo-400'
              },
            ].map((step, i) => (
              <RevealSection key={i} delay={i * 120}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-700 hover:-translate-y-2 border border-neutral-200/50 group">
                  <div className="relative h-56 overflow-hidden">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000 ease-luxury" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent"></div>
                    {/* Accent gradient strip at bottom of image */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.accent}`}></div>
                    <div className="absolute bottom-5 left-5">
                      <span className={`text-3xl font-serif font-light ${step.numColor}`}>{step.num}</span>
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
          SECTION 6 — SMART TOOLS (Jewel-toned cards)
          ══════════════════════════════════════════ */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-wine-600 font-medium mb-4">
                <Zap className="w-3.5 h-3.5" />
                Planning Suite
              </span>
              <h2 className="text-display-md md:text-display-lg font-serif text-primary-950 mb-5">
                Intelligent <span className="italic font-light text-wine-700">Tools</span>
              </h2>
              <p className="text-primary-400 max-w-lg mx-auto font-light">
                Comprehensive planning tools designed to simplify every aspect of your celebration.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {/* Checklist — Emerald accent */}
            <RevealSection delay={0}>
              <div className="rounded-2xl p-7 border border-emerald-200/40 bg-gradient-to-br from-emerald-50/50 to-white hover:shadow-card-emerald transition-all duration-700 hover:-translate-y-1 h-full group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-60"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-700 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <ListChecks className="w-5 h-5 text-emerald-200" />
                  </div>
                  <h4 className="font-serif text-lg text-primary-950">Checklist</h4>
                </div>
                <div className="space-y-3">
                  {['Book venue & finalize date', 'Hire photographer & videographer', 'Send invitations to guests', 'Final dress fitting & alteration', 'Confirm catering menu items'].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 text-sm text-primary-600 cursor-pointer group/item">
                      <div className={`w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${i < 2 ? 'bg-emerald-600 border-emerald-600' : 'border-emerald-300 group-hover/item:border-emerald-500'}`}>
                        {i < 2 && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`${i < 2 ? 'line-through text-primary-300' : ''} transition-colors`}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </RevealSection>

            {/* Budget — Gold accent */}
            <RevealSection delay={100}>
              <div className="rounded-2xl p-7 border border-accent-200/40 bg-gradient-to-br from-accent-50/50 to-white hover:shadow-card-gold transition-all duration-700 hover:-translate-y-1 h-full group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-600 to-accent-400 opacity-60"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-600 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                    <PieChartIcon className="w-5 h-5 text-accent-100" />
                  </div>
                  <h4 className="font-serif text-lg text-primary-950">Budget</h4>
                </div>
                {/* Mini Donut Chart — maroon & gold */}
                <div className="flex items-center justify-center py-4">
                  <div className="relative w-36 h-36">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#f5f0e8" strokeWidth="12" />
                      <circle cx="60" cy="60" r="48" fill="none" stroke="#45091a" strokeWidth="12" 
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
                <div className="flex justify-between text-sm border-t border-accent-200/40 pt-4 mt-2">
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

            {/* Guest List — Midnight accent */}
            <RevealSection delay={200}>
              <div className="rounded-2xl p-7 border border-indigo-200/40 bg-gradient-to-br from-indigo-50/50 to-white hover:shadow-card-midnight transition-all duration-700 hover:-translate-y-1 h-full group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-midnight-700 to-indigo-500 opacity-60"></div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-midnight-800 to-midnight-700 rounded-xl flex items-center justify-center shadow-lg">
                      <UserPlus className="w-5 h-5 text-indigo-300" />
                    </div>
                    <h4 className="font-serif text-lg text-primary-950">Guests</h4>
                  </div>
                  <div className="flex gap-1">
                    <button className="w-7 h-7 rounded-lg bg-white border border-indigo-200/60 flex items-center justify-center text-primary-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-white border border-indigo-200/60 flex items-center justify-center text-primary-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
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
                        <div className={`w-1.5 h-1.5 rounded-full ${group.status === 'confirmed' ? 'bg-emerald-500' : 'bg-indigo-400'}`}></div>
                        <span className="text-primary-600 truncate max-w-[160px]">{group.name}</span>
                      </div>
                      <span className="text-primary-500 font-medium">{group.count}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-3 border-t border-indigo-200/40 flex justify-between items-center">
                  <span className="text-xs text-primary-400">Total Guests</span>
                  <span className="font-serif font-semibold text-primary-950">180</span>
                </div>
              </div>
            </RevealSection>
          </div>

          <div className="text-center">
            <Link 
              href="/calculator"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-950 to-maroon-800 text-white font-medium rounded-full transition-all duration-500 shadow-sm hover:shadow-maroon hover:-translate-y-0.5 text-sm tracking-wide"
            >
              Explore Planning Suite
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 7 — TESTIMONIALS (Deep emerald backdrop)
          ══════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #022c22 0%, #0a3a2a 30%, #0d3d2d 60%, #022c22 100%)' }}>
        {/* Texture + glow */}
        <div className="absolute inset-0 texture-paisley opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-emerald-400 font-medium mb-4">
                <Heart className="w-3.5 h-3.5" />
                Testimonials
              </span>
              <h2 className="text-display-md md:text-display-lg font-serif text-white mb-5">
                Love <span className="italic font-light text-emerald-300">Stories</span>
              </h2>
              <p className="text-white/35 max-w-lg mx-auto font-light">
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
              <Link href="/testimonials" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium group transition-colors text-sm tracking-wide">
                Read More Stories <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 8 — IDEAS & ARTICLES (Wine accent)
          ══════════════════════════════════════════ */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-wine-500/5 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-wine-600 font-medium mb-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  Journal
                </span>
                <h2 className="text-display-md md:text-display-lg font-serif text-primary-950">
                  Ideas & <span className="italic font-light text-wine-700">Inspiration</span>
                </h2>
              </div>
              <Link 
                href="/testimonials"
                className="group inline-flex items-center gap-2 text-primary-500 hover:text-wine-700 font-medium text-sm transition-colors self-start md:self-auto"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-wine-950/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-accent-500/20 backdrop-blur-sm text-accent-300 text-xs rounded-full font-medium border border-accent-400/20">{article.category}</span>
                      <span className="text-white/40 text-xs">{article.date}</span>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-wine-950/15 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-white/40 text-xs block mb-2">{article.date}</span>
                    <h3 className="text-sm font-serif text-white group-hover:text-accent-300 transition-colors duration-500 line-clamp-2 leading-snug">{article.title}</h3>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 9 — PREMIUM CTA (Royal maroon & gold)
          ══════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #f5f0e8 100%)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-500/8 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <RevealSection>
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-accent-600 font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Membership
              </span>
              <h2 className="text-display-md md:text-display-lg font-serif text-primary-950 mb-5">
                Start Planning <span className="italic font-light text-accent-700">Today</span>
              </h2>
              <p className="text-primary-400 max-w-lg mx-auto font-light">
                Choose the plan that fits your vision. Upgrade anytime for exclusive features.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Essence — Free */}
            <RevealSection delay={0}>
              <div className="bg-white rounded-2xl p-9 border border-neutral-200/60 hover:border-emerald-300/40 transition-all duration-700 hover:shadow-card-emerald group h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-8">
                  <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-emerald-600 font-medium mb-3">Essence</span>
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
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/calculator" className="block w-full py-3.5 text-center border-2 border-primary-950 text-primary-950 font-medium rounded-full hover:bg-primary-950 hover:text-white transition-all duration-500 text-sm tracking-wide">
                  Get Started
                </Link>
              </div>
            </RevealSection>

            {/* Signature — Premium */}
            <RevealSection delay={100}>
              <div className="rounded-2xl p-9 relative overflow-hidden group h-full" style={{ background: 'linear-gradient(135deg, #45091a 0%, #7a1a37 50%, #45091a 100%)' }}>
                <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500/15 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-500/8 rounded-full blur-3xl"></div>
                {/* Gold border accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-400 to-transparent"></div>
                
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
                        <div className="w-5 h-5 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-accent-400" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/calculator" className="block w-full py-3.5 text-center bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-400 hover:to-accent-300 text-primary-950 font-semibold rounded-full transition-all duration-500 shadow-gold hover:shadow-gold-lg text-sm tracking-wide">
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
