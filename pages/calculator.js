import Head from 'next/head';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { marquees, additionalServices, formatPrice, getMarqueeBySlug, categoryInfo } from '@/data/marquees';
import {
  menuCategories, liveCounters, getDishPrice, getCounterPrice,
  calculateMenuPerHead, calculateCountersCost, menuPresets,
  eventTypes, eventMenuPresets, calculateEventMenuPerHead,
  suggestBudgetOptimization, countSelectedDishes, calculateStartersCost,
  getDefaultStarterQuantities
} from '@/data/menu';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Calculator, Crown, Users, Utensils, Palette, Camera, Music, Car, Mail,
  Plus, Minus, ChevronDown, ChevronUp, Printer, Phone, Check, Diamond,
  Sparkles, ArrowRight, X, Zap, Star, Info, Flame, PartyPopper,
  TrendingDown, AlertTriangle, ChevronRight, BarChart3, PieChart, Save,
  Download, Eye, EyeOff
} from 'lucide-react';

// ============================================================
// ANIMATED COUNTER COMPONENT
// ============================================================
function AnimatedPrice({ value, className = '' }) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const duration = 600;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevValue.current = value;
  }, [value]);

  return <span className={className}>{formatPrice(display)}</span>;
}

// ============================================================
// PIE CHART COMPONENT
// ============================================================
function BudgetPieChart({ data, total }) {
  const colors = ['#dda027', '#45091a', '#064e3b', '#4f46e5', '#7a1a37', '#c9a84c', '#0d9488', '#6b0f18'];
  let cumulative = 0;
  const segments = data.filter(d => d.value > 0).map((item, i) => {
    const pct = (item.value / total) * 100;
    const start = cumulative;
    cumulative += pct;
    return { ...item, pct, start, color: colors[i % colors.length] };
  });

  const conicGradient = segments.map(s =>
    `${s.color} ${s.start}% ${s.start + s.pct}%`
  ).join(', ');

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-40 h-40 rounded-full relative shadow-festive"
        style={{ background: `conic-gradient(${conicGradient})` }}
      >
        <div className="absolute inset-[25%] rounded-full bg-shaadi-card flex items-center justify-center">
          <div className="text-center">
            <p className="text-[9px] text-primary-600 uppercase tracking-widest">Total</p>
            <p className="text-sm font-bold text-primary-900">{formatPrice(total)}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-4 w-full">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }}></div>
            <span className="text-primary-700 truncate">{s.label}</span>
            <span className="text-primary-400 ml-auto">{Math.round(s.pct)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// CONFETTI COMPONENT
// ============================================================
function Confetti({ show }) {
  if (!show) return null;
  const colors = ['#dda027', '#e6b43e', '#45091a', '#7a1a37', '#064e3b', '#4f46e5', '#fde68a', '#0d9488'];
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${60 + Math.random() * 40}%`,
            backgroundColor: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random() * 1.5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// MAIN CALCULATOR
// ============================================================
export default function CalculatorPage() {
  const router = useRouter();
  const { venue: venueSlug } = router.query;

  // Core state
  const [selectedVenue, setSelectedVenue] = useState('');
  const [guestCount, setGuestCount] = useState(500);

  // Multi-event system
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const [includeHallRental, setIncludeHallRental] = useState(true);

  // Per-event menu state: { eventId: { categoryId: [dishId, ...] } }
  const [eventMenus, setEventMenus] = useState({});
  // Per-event counters: { eventId: [counterId, ...] }
  const [eventCounters, setEventCounters] = useState({});
  // Per-event guest counts: { eventId: number }
  const [eventGuests, setEventGuests] = useState({});
  // Per-event starter quantities: { eventId: { dishId: number } }
  const [starterQuantities, setStarterQuantities] = useState({});

  const [activeMenuTab, setActiveMenuTab] = useState('starters');

  // Other services (shared across events)
  const [selectedDecorPackage, setSelectedDecorPackage] = useState(null);
  const [selectedPhotoPackage, setSelectedPhotoPackage] = useState(0);
  const [selectedEntertainment, setSelectedEntertainment] = useState(0);
  const [selectedTransport, setSelectedTransport] = useState(0);
  const [selectedInvitations, setSelectedInvitations] = useState(0);
  const [additionalBudget, setAdditionalBudget] = useState(0);

  // UI state
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [budgetTarget, setBudgetTarget] = useState('');
  const [showBudgetSuggestions, setShowBudgetSuggestions] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    if (venueSlug) {
      const venue = getMarqueeBySlug(venueSlug);
      if (venue) setSelectedVenue(venue.slug);
    }
  }, [venueSlug]);

  const currentVenue = useMemo(() => {
    return marquees.find(m => m.slug === selectedVenue) || null;
  }, [selectedVenue]);

  const category = currentVenue?.category || 'B';

  // Initialize event menus when events change (start empty, user builds gradually)
  useEffect(() => {
    const newMenus = { ...eventMenus };
    const newCounters = { ...eventCounters };
    const newGuests = { ...eventGuests };
    const newStarterQty = { ...starterQuantities };
    let changed = false;

    selectedEvents.forEach(eventId => {
      if (!newMenus[eventId]) {
        newMenus[eventId] = {};
        newCounters[eventId] = [];
        const eventInfo = eventTypes[eventId];
        const guests = Math.round(guestCount * (eventInfo?.suggestedGuestRatio || 1));
        newGuests[eventId] = guests;
        newStarterQty[eventId] = {};
        changed = true;
      }
    });

    if (changed) {
      setEventMenus(newMenus);
      setEventCounters(newCounters);
      setEventGuests(newGuests);
      setStarterQuantities(newStarterQty);
    }
  }, [selectedEvents]);

  // Update guest counts when main guest count changes
  useEffect(() => {
    const newGuests = {};
    const newStarterQty = { ...starterQuantities };
    selectedEvents.forEach(eventId => {
      const eventInfo = eventTypes[eventId];
      const guests = Math.round(guestCount * (eventInfo?.suggestedGuestRatio || 1));
      newGuests[eventId] = guests;
      // Recalculate default starter quantities for selected starters
      const eventMenu = eventMenus[eventId] || {};
      const selectedStarters = eventMenu['starters'] || [];
      if (selectedStarters.length > 0) {
        newStarterQty[eventId] = getDefaultStarterQuantities(selectedStarters, guests);
      }
    });
    setEventGuests(newGuests);
    setStarterQuantities(newStarterQty);
  }, [guestCount, selectedEvents]);

  // Toggle event
  const toggleEvent = useCallback((eventId) => {
    setSelectedEvents(prev => {
      if (prev.includes(eventId)) {
        const next = prev.filter(e => e !== eventId);
        if (activeEvent === eventId) setActiveEvent(next[0] || null);
        return next;
      }
      const next = [...prev, eventId];
      if (!activeEvent) setActiveEvent(eventId);
      return next;
    });
  }, [activeEvent]);

  // Toggle dish for current event
  const toggleDish = useCallback((categoryId, dishId) => {
    if (!activeEvent) return;
    setEventMenus(prev => {
      const eventMenu = prev[activeEvent] || {};
      const current = eventMenu[categoryId] || [];
      const cat = menuCategories.find(c => c.id === categoryId);
      if (current.includes(dishId)) {
        // If removing a starter, also clean up its quantity
        if (categoryId === 'starters') {
          setStarterQuantities(sq => {
            const eventQty = { ...(sq[activeEvent] || {}) };
            delete eventQty[dishId];
            return { ...sq, [activeEvent]: eventQty };
          });
        }
        return { ...prev, [activeEvent]: { ...eventMenu, [categoryId]: current.filter(id => id !== dishId) } };
      }
      if (cat && current.length >= cat.maxSelect) return prev;
      // If adding a starter, set default quantity based on guests
      if (categoryId === 'starters') {
        const guests = eventGuests[activeEvent] || guestCount;
        const defaults = getDefaultStarterQuantities([dishId], guests);
        setStarterQuantities(sq => ({
          ...sq,
          [activeEvent]: { ...(sq[activeEvent] || {}), ...defaults }
        }));
      }
      return { ...prev, [activeEvent]: { ...eventMenu, [categoryId]: [...current, dishId] } };
    });
  }, [activeEvent, eventGuests, guestCount]);

  // Update starter quantity for current event
  const updateStarterQty = useCallback((dishId, qty) => {
    if (!activeEvent) return;
    const val = Math.max(0, parseInt(qty) || 0);
    setStarterQuantities(prev => ({
      ...prev,
      [activeEvent]: { ...(prev[activeEvent] || {}), [dishId]: val }
    }));
  }, [activeEvent]);

  // Toggle counter for current event
  const toggleCounter = useCallback((counterId) => {
    if (!activeEvent) return;
    setEventCounters(prev => {
      const current = prev[activeEvent] || [];
      return {
        ...prev,
        [activeEvent]: current.includes(counterId)
          ? current.filter(id => id !== counterId)
          : [...current, counterId]
      };
    });
  }, [activeEvent]);

  // Apply preset to current event
  const applyPresetToEvent = useCallback((presetKey) => {
    if (!activeEvent) return;
    const preset = presetKey === 'event-default'
      ? eventMenuPresets[activeEvent]
      : menuPresets[presetKey];
    if (preset) {
      setEventMenus(prev => ({
        ...prev,
        [activeEvent]: { ...preset.categories }
      }));
      // Initialize starter quantities from preset
      const presetStarters = preset.categories?.starters || [];
      const guests = eventGuests[activeEvent] || guestCount;
      if (presetStarters.length > 0) {
        setStarterQuantities(prev => ({
          ...prev,
          [activeEvent]: getDefaultStarterQuantities(presetStarters, guests)
        }));
      } else {
        setStarterQuantities(prev => ({
          ...prev,
          [activeEvent]: {}
        }));
      }
      if (presetKey === 'event-default' && eventMenuPresets[activeEvent]?.suggestedCounters) {
        setEventCounters(prev => ({
          ...prev,
          [activeEvent]: [...eventMenuPresets[activeEvent].suggestedCounters]
        }));
      }
    }
  }, [activeEvent, eventGuests, guestCount]);

  // Current event's menu data
  const currentEventMenu = eventMenus[activeEvent] || {};
  const currentEventCounters = eventCounters[activeEvent] || [];
  const currentEventGuests = eventGuests[activeEvent] || guestCount;
  const currentEventInfo = eventTypes[activeEvent];

  const currentEventDishCount = useMemo(() => countSelectedDishes(currentEventMenu), [currentEventMenu]);

  const currentEventPerHead = useMemo(() => {
    return calculateEventMenuPerHead(currentEventMenu, category, activeEvent);
  }, [currentEventMenu, category, activeEvent]);

  // ============================================================
  // GRAND CALCULATIONS - Per event + combined
  // ============================================================
  const perEventCalculations = useMemo(() => {
    const results = {};
    selectedEvents.forEach(eventId => {
      const menu = eventMenus[eventId] || {};
      const counters = eventCounters[eventId] || [];
      const guests = eventGuests[eventId] || guestCount;
      const evtStarterQty = starterQuantities[eventId] || {};

      const menuPerHead = calculateEventMenuPerHead(menu, category, eventId);
      const menuTotal = menuPerHead * guests;
      const startersCost = calculateStartersCost(menu, category, evtStarterQty);
      const countersCost = calculateCountersCost(counters, category);
      const venueRental = includeHallRental ? (currentVenue?.pricing?.hallRental || 0) : 0;
      const decorCost = currentVenue?.decorPackages?.[selectedDecorPackage]?.price || 0;

      results[eventId] = {
        menuPerHead,
        menuTotal,
        startersCost,
        countersCost,
        venueRental,
        decorCost,
        guests,
        dishCount: countSelectedDishes(menu),
        counterCount: counters.length,
        eventSubtotal: menuTotal + startersCost + countersCost + venueRental + decorCost,
      };
    });
    return results;
  }, [eventMenus, eventCounters, eventGuests, selectedEvents, guestCount, category, currentVenue, includeHallRental, selectedDecorPackage, starterQuantities]);

  const grandCalculations = useMemo(() => {
    let foodTotal = 0;
    let startersTotal = 0;
    let countersTotal = 0;
    let venueTotal = 0;
    let decorTotal = 0;

    selectedEvents.forEach(eventId => {
      const ev = perEventCalculations[eventId];
      if (ev) {
        foodTotal += ev.menuTotal;
        startersTotal += ev.startersCost;
        countersTotal += ev.countersCost;
        venueTotal += ev.venueRental;
        decorTotal += ev.decorCost;
      }
    });

    const photoCost = additionalServices.photography[selectedPhotoPackage]?.price || 0;
    const entertainmentCost = additionalServices.entertainment[selectedEntertainment]?.price || 0;
    const transportCost = additionalServices.transport[selectedTransport]?.price || 0;
    const invitationCost = additionalServices.invitations[selectedInvitations]?.price || 0;
    const servicesTotal = photoCost + entertainmentCost + transportCost + invitationCost;

    const subtotal = foodTotal + startersTotal + countersTotal + venueTotal + decorTotal + servicesTotal;
    const serviceTax = subtotal * 0.05;
    const contingency = subtotal * 0.10;
    const grandTotal = subtotal + serviceTax + contingency + parseInt(additionalBudget || 0);

    // Total guests across all events for accurate per-guest cost
    const totalGuestsAllEvents = selectedEvents.reduce((sum, eventId) => {
      const ev = perEventCalculations[eventId];
      return sum + (ev ? ev.guests : 0);
    }, 0);

    return {
      foodTotal, startersTotal, countersTotal, venueTotal, decorTotal,
      photoCost, entertainmentCost, transportCost, invitationCost,
      servicesTotal, subtotal, serviceTax, contingency, grandTotal,
      perGuest: totalGuestsAllEvents > 0 ? Math.round(grandTotal / totalGuestsAllEvents) : 0,
      totalGuests: totalGuestsAllEvents,
      eventCount: selectedEvents.length,
    };
  }, [perEventCalculations, selectedEvents, selectedPhotoPackage, selectedEntertainment, selectedTransport, selectedInvitations, additionalBudget, guestCount]);

  const pieData = useMemo(() => [
    { label: 'Food (per head)', value: grandCalculations.foodTotal },
    { label: 'Starters', value: grandCalculations.startersTotal },
    { label: 'Live Counters', value: grandCalculations.countersTotal },
    { label: 'Venue', value: grandCalculations.venueTotal },
    { label: 'Decor', value: grandCalculations.decorTotal },
    { label: 'Photography', value: grandCalculations.photoCost },
    { label: 'Entertainment', value: grandCalculations.entertainmentCost },
    { label: 'Transport', value: grandCalculations.transportCost },
    { label: 'Invitations', value: grandCalculations.invitationCost },
  ].filter(d => d.value > 0), [grandCalculations]);

  // Budget suggestions
  const budgetSuggestions = useMemo(() => {
    if (!budgetTarget || !parseInt(budgetTarget)) return null;
    const target = parseInt(budgetTarget);
    if (grandCalculations.grandTotal <= target) return null;
    return {
      overBy: grandCalculations.grandTotal - target,
      percentage: Math.round(((grandCalculations.grandTotal - target) / target) * 100),
    };
  }, [budgetTarget, grandCalculations.grandTotal]);

  const catInfo = currentVenue ? categoryInfo[currentVenue.category] : null;

  const handleFinalize = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <>
      <Head>
        <title>Budget Calculator | Wedify Planner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Confetti show={showConfetti} />

      {/* ========== HERO - Desi Festive ========== */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #45091a 0%, #7a1a37 40%, #45091a 70%, #2a0510 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400 rounded-full filter blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-wine-700 rounded-full filter blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-500/10 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-sm rounded-full text-accent-300 text-xs tracking-widest uppercase mb-6 border border-accent-500/20">
            <Calculator className="w-3.5 h-3.5" /> Wedding Budget Planner
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Wedding <span className="text-gradient">Budget Calculator</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
            Plan every event separately - Mehndi, Barat, Valima - with authentic Lahore dishes, real-time pricing, and smart budget suggestions.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {Object.values(eventTypes).map(evt => (
              <span key={evt.id} className="px-3 py-1.5 text-xs rounded-full border border-white/10 text-white/60">
                {evt.icon} {evt.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CALCULATOR BODY ========== */}
      <section className="py-12 min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #f5f0e8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ====== LEFT COLUMN - Form ====== */}
            <div className="lg:col-span-2 space-y-6">

              {/* STEP 1: Venue */}
              <StepCard number={1} title="Select Venue" icon={<Crown className="w-5 h-5 text-accent-500" />}>
                <select
                  value={selectedVenue}
                  onChange={(e) => setSelectedVenue(e.target.value)}
                  className="w-full px-5 py-4 border-2 border-accent-300/40 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-primary-800 bg-neutral-50 font-medium transition-all"
                >
                  <option value="">Select a venue first</option>
                  {marquees.map(m => (
                    <option key={m.slug} value={m.slug}>
                      [{m.category}] {m.name} - {m.area} (from {formatPrice(m.pricing.perHead.min)}/head)
                    </option>
                  ))}
                </select>
                {currentVenue && (
                  <div className="mt-5 p-5 bg-neutral-50 rounded-xl border border-accent-200/50">
                    <div className="flex items-start gap-5">
                      <img src={currentVenue.image} alt={currentVenue.name} className="w-28 h-28 object-cover rounded-xl shadow-sm" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-serif font-semibold text-primary-900 text-lg">{currentVenue.name}</h3>
                          {catInfo && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${catInfo.badgeClass}`}>{catInfo.icon} {catInfo.label}</span>
                          )}
                        </div>
                        <p className="text-sm text-primary-500">{currentVenue.location}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-accent-700 font-medium"><Users className="w-3.5 h-3.5 inline mr-1" />{currentVenue.capacity.min}-{currentVenue.capacity.max}</span>
                          <span className="text-accent-600">â­ {currentVenue.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </StepCard>

              {/* STEP 2: Events Selection + Guest Count */}
              <StepCard number={2} title="Select Events & Guests" icon={<PartyPopper className="w-5 h-5 text-rose-500" />}>
                <p className="text-sm text-primary-500 mb-4">Choose which events to plan - each gets its own menu & budget</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
                  {Object.values(eventTypes).map(evt => {
                    const isActive = selectedEvents.includes(evt.id);
                    return (
                      <button
                        key={evt.id}
                        onClick={() => toggleEvent(evt.id)}
                        className={`relative p-4 rounded-xl border-2 text-center transition-all duration-300 group ${
                          isActive
                            ? `border-${evt.color}-400 bg-${evt.color}-50 shadow-sm`
                            : 'border-neutral-300 bg-white hover:border-accent-300'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{evt.icon}</span>
                        <span className={`text-xs font-semibold ${isActive ? `text-${evt.color}-700` : 'text-primary-500'}`}>{evt.name}</span>
                        {isActive && (
                          <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 ${evt.badgeBg} rounded-full flex items-center justify-center`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Master guest count */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-primary-700">Base Guest Count</label>
                    <span className="text-3xl font-serif font-bold text-gradient">{guestCount}</span>
                  </div>
                  <input
                    type="range" min="100" max="4000" step="50"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-primary-400 mt-2">
                    <span>100</span><span>1000</span><span>2000</span><span>3000</span><span>4000</span>
                  </div>
                </div>

                {/* Per-event guest adjustment */}
                <div className="bg-neutral-50 rounded-xl p-4 border border-accent-200/30">
                  <p className="text-xs text-primary-500 mb-3 font-medium">
                    <Info className="w-3 h-3 inline mr-1" />
                    Guests auto-adjust per event type (editable below)
                  </p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedEvents.map(eventId => {
                      const evt = eventTypes[eventId];
                      return (
                        <div key={eventId} className={`flex items-center gap-2 p-2 rounded-lg border ${evt.borderColor} bg-white`}>
                          <span className="text-sm">{evt.icon}</span>
                          <span className="text-xs text-primary-600 font-medium flex-1">{evt.name}</span>
                          <input
                            type="number" min="50" max="4000" step="50"
                            value={eventGuests[eventId] || guestCount}
                            onChange={(e) => setEventGuests(prev => ({ ...prev, [eventId]: parseInt(e.target.value) || guestCount }))}
                            className="w-20 px-2 py-1 text-sm border border-accent-200 rounded-lg text-center bg-neutral-50 font-semibold text-primary-800"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <label className="flex items-center cursor-pointer group mt-5">
                  <input type="checkbox" checked={includeHallRental} onChange={(e) => setIncludeHallRental(e.target.checked)}
                    className="w-5 h-5 text-accent-500 rounded border-primary-300 focus:ring-accent-500"
                  />
                  <span className="ml-3 text-primary-700 group-hover:text-primary-900 transition-colors text-sm">
                    Include Hall Rental <span className="text-accent-600 font-medium">({formatPrice(currentVenue?.pricing?.hallRental || 0)} per event)</span>
                  </span>
                </label>
              </StepCard>

              {/* ============================================================
                  STEP 3: MULTI-EVENT MENU BUILDER
                  ============================================================ */}
              <div className="bg-shaadi-card rounded-2xl shadow-festive border border-accent-200/30 overflow-hidden">
                <div className="p-8 pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-9 h-9 bg-gradient-to-br from-accent-500 to-accent-600 text-primary-950 rounded-xl flex items-center justify-center text-sm font-bold shadow-gold">3</span>
                    <Utensils className="w-5 h-5 text-accent-500" />
                    <h2 className="text-xl font-serif text-primary-900">Build Menu Per Event</h2>
                  </div>
                  <p className="text-sm text-primary-400 ml-12 mb-4">
                    Each event has its own menu - switch tabs to customize
                  </p>

                  {/* Event switcher tabs */}
                  <div className="flex gap-2 ml-12 mb-4 flex-wrap">
                    {selectedEvents.map(eventId => {
                      const evt = eventTypes[eventId];
                      const isActive = activeEvent === eventId;
                      const evCalc = perEventCalculations[eventId];
                      return (
                        <button
                          key={eventId}
                          onClick={() => setActiveEvent(eventId)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                            isActive
                              ? `bg-gradient-to-r ${evt.gradient} text-white shadow-lg`
                              : `${evt.bgColor} ${evt.textColor} border ${evt.borderColor}`
                          }`}
                        >
                          <span>{evt.icon}</span>
                          {evt.name}
                          {evCalc && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-white'}`}>
                              {evCalc.dishCount} dishes
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Current event info banner */}
                  {currentEventInfo && (
                    <div className={`ml-12 mb-4 p-4 rounded-xl border ${currentEventInfo.borderColor} ${currentEventInfo.bgColor}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-xs ${currentEventInfo.textColor} font-semibold uppercase tracking-wider`}>
                            {currentEventInfo.icon} {currentEventInfo.name} Menu - {currentEventInfo.urdu}
                          </p>
                          <p className="text-xs text-primary-400 mt-0.5">{currentEventInfo.menuStyle}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-primary-400">Per Head</p>
                          <AnimatedPrice value={currentEventPerHead} className="text-lg font-bold text-gradient" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Menu Per-Head Ticker */}
                  <div className="ml-12 mb-6 bg-primary-950 rounded-xl p-4 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute inset-0 sparkles-bg opacity-30"></div>
                    <div className="relative z-10">
                      <p className="text-xs text-white/40 tracking-widest uppercase">{currentEventInfo?.name} - Per Head</p>
                      <AnimatedPrice value={currentEventPerHead} className="text-2xl font-bold text-gradient mt-0.5" />
                    </div>
                    <div className="relative z-10 text-right">
                      <p className="text-xs text-white/40">{currentEventDishCount} dishes Â· {currentEventCounters.length} counters</p>
                      <p className="text-sm text-accent-300 font-medium mt-0.5">
                        {formatPrice(currentEventPerHead * currentEventGuests)} total
                      </p>
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div className="ml-12 mb-6">
                    <p className="text-xs text-primary-400 mb-2 tracking-wide uppercase">Quick Presets</p>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => applyPresetToEvent('event-default')}
                        className={`px-4 py-2 ${currentEventInfo?.bgColor} border ${currentEventInfo?.borderColor} rounded-lg text-sm ${currentEventInfo?.textColor} transition-all hover:shadow-sm`}
                      >
                        <Zap className="w-3 h-3 inline mr-1.5" />
                        {currentEventInfo?.name} Default
                      </button>
                      {Object.entries(menuPresets).map(([key, preset]) => (
                        <button key={key} onClick={() => applyPresetToEvent(key)}
                          className="px-4 py-2 bg-neutral-100 hover:bg-accent-50 border border-neutral-300 hover:border-accent-300 rounded-lg text-sm text-primary-600 hover:text-accent-700 transition-all"
                        >
                          {preset.name} <span className="text-primary-400 text-xs">({preset.targetDishes})</span>
                        </button>
                      ))}
                      <button onClick={() => setEventMenus(prev => ({ ...prev, [activeEvent]: {} }))}
                        className="px-4 py-2 bg-royal-50 hover:bg-royal-100 border border-royal-200 rounded-lg text-sm text-royal-500 transition-all"
                      >
                        <X className="w-3 h-3 inline mr-1" /> Clear
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category Tabs */}
                {selectedEvents.length > 0 && (
                  <div className="border-t border-neutral-200 bg-neutral-50/50">
                    <div className="flex overflow-x-auto hide-scrollbar px-4 pt-3">
                      {menuCategories.map(cat => {
                        const count = (currentEventMenu[cat.id] || []).length;
                        return (
                          <button
                            key={cat.id}
                            onClick={() => setActiveMenuTab(cat.id)}
                            className={`whitespace-nowrap px-4 py-3 text-sm font-medium rounded-t-xl transition-all flex items-center gap-1.5 border-b-2 ${
                              activeMenuTab === cat.id
                                ? 'bg-white border-accent-500 text-primary-800 shadow-sm'
                                : 'border-transparent text-primary-400 hover:text-primary-600 hover:bg-white/50'
                            }`}
                          >
                            <span>{cat.icon}</span>
                            <span className="hidden sm:inline">{cat.name}</span>
                            {count > 0 && (
                              <span className="ml-1 w-5 h-5 bg-accent-500 text-primary-950 text-[10px] font-bold rounded-full flex items-center justify-center">{count}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Dish Grid */}
                <div className="p-6 bg-shaadi-card">
                  {selectedEvents.length === 0 ? (
                    <div className="p-6 rounded-xl border border-neutral-200 bg-neutral-50 text-center text-primary-500 text-sm">
                      Select at least one event to start building menu items.
                    </div>
                  ) : menuCategories.filter(cat => cat.id === activeMenuTab).map(cat => {
                    const selected = currentEventMenu[cat.id] || [];
                    const atMax = selected.length >= cat.maxSelect;
                    return (
                      <div key={cat.id}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-serif font-semibold text-primary-800">{cat.icon} {cat.name}</h3>
                            <p className="text-xs text-primary-400 mt-0.5">{cat.description}</p>
                          </div>
                          <span className={`text-sm font-medium ${atMax ? 'text-royal-500' : 'text-primary-500'}`}>
                            {selected.length}/{cat.maxSelect}
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {cat.dishes.map(dish => {
                            const isSelected = selected.includes(dish.id);
                            const price = getDishPrice(dish.basePrice, category);
                            const disabled = !isSelected && atMax;
                            const isStarter = cat.id === 'starters';
                            const currentQty = isStarter && isSelected ? (starterQuantities[activeEvent]?.[dish.id] || 0) : 0;
                            const totalDishCost = isStarter && isSelected ? price * currentQty : 0;
                            return (
                              <div
                                key={dish.id}
                                className={`relative text-left rounded-xl border-2 transition-all duration-300 group ${
                                  isSelected
                                    ? 'border-accent-400 bg-accent-50/50 shadow-sm'
                                    : disabled
                                      ? 'border-neutral-200 bg-neutral-50 opacity-50 cursor-not-allowed'
                                      : 'border-neutral-200 hover:border-accent-300 bg-white hover:bg-neutral-50'
                                }`}
                              >
                                <button
                                  onClick={() => !disabled && toggleDish(cat.id, dish.id)}
                                  disabled={disabled}
                                  className="w-full text-left p-4"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                        isSelected ? 'bg-accent-500 border-accent-500' : 'border-primary-300 group-hover:border-accent-400'
                                      }`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                      </div>
                                      <p className="font-medium text-primary-800 text-sm truncate">
                                        {dish.name}
                                        {dish.popular && <Star className="w-3 h-3 text-accent-500 fill-accent-500 inline ml-1.5" />}
                                      </p>
                                    </div>
                                    <div className="text-right ml-2 flex-shrink-0">
                                      <span className={`text-sm font-bold whitespace-nowrap ${isSelected ? 'text-accent-600' : 'text-primary-500'}`}>
                                        {formatPrice(price)}
                                      </span>
                                      {dish.unit && (
                                        <span className="block text-[10px] text-primary-400 whitespace-nowrap">{dish.unit}</span>
                                      )}
                                    </div>
                                  </div>
                                </button>
                                {/* Quantity controls for starters */}
                                {isStarter && isSelected && (
                                  <div className="px-4 pb-3 pt-0" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center justify-between gap-2 bg-neutral-100 rounded-lg px-3 py-2 border border-accent-200/50">
                                      <span className="text-[11px] text-primary-500 font-medium">Qty ({dish.unit || 'units'}):</span>
                                      <div className="flex items-center gap-1.5">
                                        <button
                                          onClick={(e) => { e.stopPropagation(); updateStarterQty(dish.id, currentQty - (dish.unit === 'per kg' ? 1 : 50)); }}
                                          className="w-7 h-7 rounded-md bg-white border border-neutral-300 hover:border-accent-400 flex items-center justify-center text-primary-600 hover:text-accent-600 transition-colors"
                                        >
                                          <Minus className="w-3 h-3" />
                                        </button>
                                        <input
                                          type="number"
                                          min="0"
                                          value={currentQty}
                                          onChange={(e) => updateStarterQty(dish.id, e.target.value)}
                                          onClick={(e) => e.stopPropagation()}
                                          className="w-16 text-center text-sm font-bold text-primary-800 bg-white border border-neutral-300 rounded-md py-1 focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
                                        />
                                        <button
                                          onClick={(e) => { e.stopPropagation(); updateStarterQty(dish.id, currentQty + (dish.unit === 'per kg' ? 1 : 50)); }}
                                          className="w-7 h-7 rounded-md bg-white border border-neutral-300 hover:border-accent-400 flex items-center justify-center text-primary-600 hover:text-accent-600 transition-colors"
                                        >
                                          <Plus className="w-3 h-3" />
                                        </button>
                                      </div>
                                      <span className="text-[11px] font-semibold text-accent-600 whitespace-nowrap">= {formatPrice(totalDishCost)}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 4: Live Counters for Current Event */}
              <StepCard number={4} title={`Live Counters - ${currentEventInfo?.name || ''}`} icon={<Flame className="w-5 h-5 text-orange-500" />} subtitle="Add live food stations for this event">
                {selectedEvents.length === 0 ? (
                  <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-center text-primary-500 text-sm">
                    Select an event first to enable live counters.
                  </div>
                ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {liveCounters.map(counter => {
                    const isSelected = currentEventCounters.includes(counter.id);
                    const price = getCounterPrice(counter.baseCost, category);
                    return (
                      <button
                        key={counter.id}
                        onClick={() => toggleCounter(counter.id)}
                        className={`text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-accent-400 bg-accent-50/50 shadow-sm'
                            : 'border-neutral-200 hover:border-accent-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{counter.icon}</span>
                            <h4 className="font-semibold text-primary-800 text-sm">{counter.name}</h4>
                          </div>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-accent-500 border-accent-500' : 'border-primary-300'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <p className="text-xs text-primary-400 mb-2">{counter.description}</p>
                        <p className="text-sm font-bold text-accent-600">{formatPrice(price)} <span className="text-primary-400 font-normal text-xs">/ event</span></p>
                      </button>
                    );
                  })}
                </div>
                )}
              </StepCard>

              {/* STEP 5: Decor Package */}
              <StepCard number={5} title="Decor Package" icon={<Palette className="w-5 h-5 text-rose-600" />}>
                <div className="space-y-3">
                  {currentVenue?.decorPackages?.map((pkg, index) => (
                    <div key={index} onClick={() => setSelectedDecorPackage(index)}
                      className={`cursor-pointer border-2 rounded-xl p-5 transition-all duration-300 ${
                        selectedDecorPackage === index
                          ? 'border-rose-400 bg-rose-50 shadow-sm'
                          : 'border-neutral-200 hover:border-rose-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-primary-800">{pkg.name} Package</h3>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {pkg.includes.slice(0, 4).map((item, i) => (
                              <span key={i} className="text-xs px-2.5 py-1 bg-neutral-100 rounded-full text-primary-500 border border-neutral-300">{item}</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xl font-bold text-rose-600 ml-4 whitespace-nowrap">{formatPrice(pkg.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </StepCard>

              {/* STEP 6: Additional Services */}
              <StepCard number={6} title="Additional Services" icon={<Sparkles className="w-5 h-5 text-accent-500" />} subtitle="Select 'None' if not required - it removes the cost from your budget">
                {[
                  { key: 'photography', label: 'ðŸ“¸ Photography & Videography', state: selectedPhotoPackage, setState: setSelectedPhotoPackage },
                  { key: 'entertainment', label: 'ðŸŽµ Entertainment', state: selectedEntertainment, setState: setSelectedEntertainment },
                  { key: 'transport', label: 'ðŸš— Bridal Transport', state: selectedTransport, setState: setSelectedTransport },
                  { key: 'invitations', label: 'ðŸ’Œ Wedding Invitations', state: selectedInvitations, setState: setSelectedInvitations },
                ].map((service) => (
                  <div key={service.key} className="mb-8 last:mb-0">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-primary-700 text-sm">{service.label}</h3>
                      {service.state === 0 && (
                        <span className="text-xs px-2.5 py-1 bg-neutral-200 text-primary-400 rounded-full border border-neutral-300">Not included</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {additionalServices[service.key].map((pkg, index) => {
                        const isNone = pkg.isNone;
                        const isSelected = service.state === index;
                        return (
                          <div key={index} onClick={() => service.setState(index)}
                            className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-300 ${
                              isSelected && isNone
                                ? 'border-primary-400 bg-neutral-50 shadow-sm'
                                : isSelected
                                  ? 'border-accent-400 bg-accent-50/50 shadow-sm'
                                  : isNone
                                    ? 'border-dashed border-neutral-300 hover:border-primary-300 bg-neutral-50/50'
                                    : 'border-neutral-200 hover:border-accent-300 bg-white'
                            }`}
                          >
                            {isNone && <X className="w-4 h-4 mx-auto mb-1 text-primary-400" />}
                            <p className={`font-semibold text-sm ${isNone ? 'text-primary-500' : 'text-primary-800'}`}>{pkg.name}</p>
                            <p className={`font-bold mt-1 ${isNone ? 'text-primary-400 text-xs' : 'text-accent-600'}`}>
                              {isNone ? 'Free' : formatPrice(pkg.price)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </StepCard>

              {/* STEP 7: Additional Budget + Budget Target */}
              <StepCard number={7} title="Budget & Extras" icon={<TrendingDown className="w-5 h-5 text-emerald-600" />}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-600 mb-2">Additional Budget (Jewelry, Outfits, etc.)</label>
                    <input type="number" value={additionalBudget} onChange={(e) => setAdditionalBudget(e.target.value)}
                      placeholder="Enter amount in PKR"
                      className="w-full px-5 py-4 border-2 border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-neutral-50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-600 mb-2">
                      Budget Target
                      <span className="text-primary-400 font-normal ml-1">(optional - get suggestions)</span>
                    </label>
                    <input type="number" value={budgetTarget} onChange={(e) => setBudgetTarget(e.target.value)}
                      placeholder="Your maximum budget"
                      className="w-full px-5 py-4 border-2 border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-neutral-50 transition-all"
                    />
                    {budgetSuggestions && (
                      <div className="mt-3 p-3 bg-royal-50 border border-royal-200 rounded-lg">
                        <p className="text-xs text-royal-600 font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Over budget by {formatPrice(budgetSuggestions.overBy)} ({budgetSuggestions.percentage}%)
                        </p>
                        <p className="text-[10px] text-royal-400 mt-1">
                          Consider: reducing guest count, choosing fewer dishes, or selecting a different venue category.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </StepCard>
            </div>

            {/* ====== RIGHT COLUMN - Sidebar ====== */}
            <div className="lg:col-span-1">
              <div className="print-area bg-shaadi-card rounded-2xl shadow-festive border border-accent-200/30 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar">
                {/* Header */}
                <div className="relative overflow-hidden p-6 text-center" style={{ background: 'linear-gradient(135deg, #45091a 0%, #7a1a37 50%, #45091a 100%)' }}>
                  <div className="absolute inset-0 texture-paisley opacity-[0.05]"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/15 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <Calculator className="w-6 h-6 text-accent-300 mx-auto mb-2" />
                    <h2 className="text-xl font-serif text-white">Budget <span className="text-gradient">Summary</span></h2>
                    <p className="text-xs text-white/40 mt-1">{selectedEvents.length} events Â· {grandCalculations.totalGuests} total guests</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Venue Info */}
                  <div className="bg-neutral-100 rounded-xl p-4 mb-5 border border-accent-200/30">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif font-semibold text-primary-800 text-sm">{currentVenue?.name}</h3>
                      {catInfo && <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${catInfo.badgeClass}`}>{catInfo.icon}</span>}
                    </div>
                  </div>

                  {/* Per-Event Breakdown */}
                  <div className="mb-5">
                    <h4 className="text-xs font-medium text-primary-500 mb-3 tracking-widest uppercase flex items-center gap-2">
                      <BarChart3 className="w-3 h-3" /> Per-Event Cost
                    </h4>
                    {selectedEvents.map(eventId => {
                      const evt = eventTypes[eventId];
                      const evCalc = perEventCalculations[eventId];
                      if (!evCalc) return null;
                      return (
                        <div key={eventId} className={`mb-2 p-3 rounded-lg border ${evt.borderColor} ${evt.bgColor}`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-semibold ${evt.textColor} flex items-center gap-1`}>
                              {evt.icon} {evt.name}
                              <span className="text-[10px] font-normal text-primary-400">({evCalc.guests} guests)</span>
                            </span>
                            <span className="text-sm font-bold text-primary-800">{formatPrice(evCalc.eventSubtotal)}</span>
                          </div>
                          <div className="flex gap-3 mt-1 text-[10px] text-primary-400">
                            <span>ðŸ½ {formatPrice(evCalc.menuPerHead)}/head</span>
                            <span>{evCalc.dishCount} dishes</span>
                            {evCalc.counterCount > 0 && <span>{evCalc.counterCount} counters</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Combined Line Items */}
                  <div className="space-y-2.5 mb-5 text-sm border-t border-neutral-300 pt-4">
                    <LineItem label="Food - per head (All Events)" value={grandCalculations.foodTotal} />
                    {grandCalculations.startersTotal > 0 && <LineItem label="Starters (qty based)" value={grandCalculations.startersTotal} />}
                    {grandCalculations.countersTotal > 0 && <LineItem label="Live Counters" value={grandCalculations.countersTotal} />}
                    {grandCalculations.venueTotal > 0 && <LineItem label={`Venue (Ã—${selectedEvents.length})`} value={grandCalculations.venueTotal} />}
                    <LineItem label={`Decor (Ã—${selectedEvents.length})`} value={grandCalculations.decorTotal} />
                    {grandCalculations.photoCost > 0 && <LineItem label="Photography" value={grandCalculations.photoCost} />}
                    {grandCalculations.entertainmentCost > 0 && <LineItem label="Entertainment" value={grandCalculations.entertainmentCost} />}
                    {grandCalculations.transportCost > 0 && <LineItem label="Transport" value={grandCalculations.transportCost} />}
                    {grandCalculations.invitationCost > 0 && <LineItem label="Invitations" value={grandCalculations.invitationCost} />}
                    <div className="border-t border-neutral-300 pt-2.5">
                      <LineItem label="Subtotal" value={grandCalculations.subtotal} bold />
                    </div>
                    <LineItem label="Service Tax (5%)" value={grandCalculations.serviceTax} />
                    <LineItem label="Contingency (10%)" value={grandCalculations.contingency} />
                    {parseInt(additionalBudget) > 0 && <LineItem label="Additional" value={parseInt(additionalBudget)} />}
                  </div>

                  {/* Grand Total */}
                  <div className="bg-primary-950 rounded-xl p-6 text-center mb-5 relative overflow-hidden">
                    <div className="absolute inset-0 sparkles-bg opacity-30"></div>
                    <div className="relative z-10">
                      <p className="text-xs text-white/50 mb-1 tracking-widest uppercase">Estimated Grand Total</p>
                      <AnimatedPrice value={grandCalculations.grandTotal} className="text-3xl font-bold text-gradient" />
                      <p className="text-sm text-accent-300/80 mt-2">~{formatPrice(grandCalculations.perGuest)} per guest <span className="text-xs text-white/40">({grandCalculations.totalGuests} total)</span></p>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  <div className="mb-5">
                    <button onClick={() => setShowBreakdown(!showBreakdown)}
                      className="w-full flex items-center justify-between text-xs font-medium text-primary-500 mb-3 tracking-widest uppercase hover:text-accent-600 transition-colors"
                    >
                      <span className="flex items-center gap-2"><PieChart className="w-3 h-3" /> Visual Breakdown</span>
                      {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {showBreakdown && (
                      <div className="animate-fadeIn">
                        <BudgetPieChart data={pieData} total={grandCalculations.subtotal} />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button onClick={handleFinalize}
                      className="w-full py-4 btn-glow rounded-xl flex items-center justify-center gap-2 text-sm"
                    >
                      <PartyPopper className="w-4 h-4" /> Finalize Budget
                    </button>
                    <button onClick={() => window.print()}
                      className="w-full py-3.5 bg-neutral-100 hover:bg-neutral-200 text-primary-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm border border-neutral-300"
                    >
                      <Printer className="w-4 h-4" /> Print Estimate
                    </button>
                    <a href={`tel:${currentVenue?.contact?.phone}`}
                      className="block w-full py-3.5 border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-accent-200 font-semibold rounded-xl transition-all text-center text-sm"
                    >
                      <Phone className="w-4 h-4 inline mr-2" /> Call Venue
                    </a>
                  </div>

                  <p className="text-[10px] text-primary-400 text-center mt-5">
                    * Based on 2025-26 Lahore market rates. Contact venue for exact quotes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ============================================================
// REUSABLE SUB-COMPONENTS
// ============================================================
function StepCard({ number, title, icon, subtitle, children }) {
  return (
    <div className="bg-shaadi-card rounded-2xl p-8 shadow-sm border border-accent-200/30 hover:shadow-festive transition-shadow duration-500">
      <h2 className="text-xl font-serif text-primary-900 mb-2 flex items-center gap-2">
        <span className="w-9 h-9 bg-gradient-to-br from-accent-500 to-accent-600 text-primary-950 rounded-xl flex items-center justify-center text-sm font-bold shadow-gold">{number}</span>
        {icon}
        {title}
      </h2>
      {subtitle && <p className="text-sm text-primary-400 ml-12 mb-4">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function LineItem({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span className={`text-primary-500 ${bold ? 'font-semibold' : ''}`}>{label}</span>
      <span className={`text-primary-700 ${bold ? 'font-bold' : 'font-medium'}`}>{formatPrice(value)}</span>
    </div>
  );
}
