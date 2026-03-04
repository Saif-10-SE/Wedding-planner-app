import Head from 'next/head';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { marquees, getAreas, formatPrice, categoryInfo, getCategories } from '@/data/marquees';
import Navbar from '@/components/Navbar';
import MarqueeCard from '@/components/MarqueeCard';
import Footer from '@/components/Footer';
import { Crown, MapPin, Filter, X, Grid, LayoutList, SlidersHorizontal, Award, Diamond, Sparkles } from 'lucide-react';

export default function Marquees() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: '',
    area: '',
    minCapacity: '',
    maxBudget: '',
    sortBy: 'rating'
  });
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    if (router.query.category) setFilters(f => ({ ...f, category: router.query.category }));
    if (router.query.area) setFilters(f => ({ ...f, area: router.query.area }));
  }, [router.query]);

  const areas = getAreas();
  const categories = getCategories();
  const activeFilterCount = [filters.category, filters.area, filters.minCapacity, filters.maxBudget].filter(Boolean).length;

  const filteredMarquees = useMemo(() => {
    let result = [...marquees];
    if (filters.category) result = result.filter(m => m.category === filters.category);
    if (filters.area) result = result.filter(m => m.area === filters.area);
    if (filters.minCapacity) result = result.filter(m => m.capacity.max >= parseInt(filters.minCapacity));
    if (filters.maxBudget) result = result.filter(m => m.pricing.perHead.min <= parseInt(filters.maxBudget));
    switch (filters.sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'price-low': result.sort((a, b) => a.pricing.perHead.min - b.pricing.perHead.min); break;
      case 'price-high': result.sort((a, b) => b.pricing.perHead.min - a.pricing.perHead.min); break;
      case 'capacity': result.sort((a, b) => b.capacity.max - a.capacity.max); break;
    }
    return result;
  }, [filters]);

  const clearFilters = () => setFilters({ category: '', area: '', minCapacity: '', maxBudget: '', sortBy: 'rating' });

  return (
    <>
      <Head>
        <title>All Marquees | Wedify</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero — Royal Maroon */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #45091a 0%, #7a1a37 50%, #45091a 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full filter blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-wine-700 rounded-full filter blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-500/10 backdrop-blur-md rounded-full text-accent-300 text-xs tracking-widest uppercase mb-6 border border-accent-500/20">
            <Crown className="w-3.5 h-3.5" />
            Premium Collection
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-neutral-100 mb-4">
            Discover <span className="text-gradient-gold">Premium Marquees</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
            Lahore's finest marquees — from ultra-luxury 5-star venues to budget-friendly elegant halls
          </p>
        </div>
      </section>

      {/* Category Quick Filters */}
      <section className="bg-white border-b border-neutral-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilters(f => ({ ...f, category: '' }))}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm ${
                !filters.category
                  ? 'bg-gradient-to-r from-primary-950 to-maroon-800 text-white shadow-maroon'
                  : 'bg-neutral-100 text-primary-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              All Venues ({marquees.length})
            </button>
            {categories.map(cat => {
              const info = categoryInfo[cat];
              const count = marquees.filter(m => m.category === cat).length;
              return (
                <button key={cat}
                  onClick={() => setFilters(f => ({ ...f, category: cat }))}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm inline-flex items-center gap-2 ${
                    filters.category === cat
                      ? 'bg-gradient-to-r from-primary-950 to-maroon-800 text-white shadow-maroon'
                      : 'bg-neutral-100 text-primary-700 hover:bg-neutral-200 border border-neutral-200'
                  }`}
                >
                  <span className="text-xs">{info.icon}</span> {info.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="bg-cream-100 border-b border-neutral-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <SlidersHorizontal className="w-4 h-4 text-primary-500" />
            <select value={filters.area} onChange={(e) => setFilters({ ...filters, area: e.target.value })}
              className="px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm bg-white text-primary-700"
            >
              <option value="">All Areas</option>
              {areas.map(area => <option key={area} value={area}>{area}</option>)}
            </select>

            <select value={filters.minCapacity} onChange={(e) => setFilters({ ...filters, minCapacity: e.target.value })}
              className="px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm bg-white text-primary-700"
            >
              <option value="">Any Capacity</option>
              <option value="500">500+ Guests</option>
              <option value="1000">1000+ Guests</option>
              <option value="1500">1500+ Guests</option>
              <option value="2000">2000+ Guests</option>
            </select>

            <select value={filters.maxBudget} onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
              className="px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm bg-white text-primary-700"
            >
              <option value="">Any Budget</option>
              <option value="2500">Up to PKR 2,500/head</option>
              <option value="3500">Up to PKR 3,500/head</option>
              <option value="5000">Up to PKR 5,000/head</option>
              <option value="7000">Up to PKR 7,000/head</option>
            </select>

            <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm bg-white text-primary-700"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="capacity">Capacity: High → Low</option>
            </select>

            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="px-4 py-2.5 text-rose-600 hover:text-rose-800 text-sm font-medium flex items-center gap-1.5 transition-colors">
                <X className="w-3.5 h-3.5" /> Clear ({activeFilterCount})
              </button>
            )}

            <div className="ml-auto flex items-center gap-2">
              <span className="text-primary-500 text-sm mr-2">{filteredMarquees.length} venues</span>
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-neutral-300">
                <button onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary-950 text-accent-300' : 'text-primary-400 hover:text-primary-700'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary-950 text-accent-300' : 'text-primary-400 hover:text-primary-700'}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquees Grid */}
      <section className="py-12 min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #f5f0e8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Category info banner */}
          {filters.category && categoryInfo[filters.category] && (
            <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${categoryInfo[filters.category].gradient} bg-opacity-10 border border-white/20`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{categoryInfo[filters.category].icon}</span>
                <div>
                  <h2 className="text-xl font-serif text-white font-semibold">Category {filters.category} — {categoryInfo[filters.category].label}</h2>
                  <p className="text-white/70 text-sm">{categoryInfo[filters.category].tagline}</p>
                </div>
              </div>
            </div>
          )}

          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
            {filteredMarquees.map((marquee, index) => (
              <div key={marquee.id} className="animate-fadeIn opacity-0" style={{ animationDelay: `${index * 0.08}s` }}>
                <MarqueeCard marquee={marquee} />
              </div>
            ))}
          </div>

          {filteredMarquees.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-primary-300" />
              </div>
              <h3 className="text-xl font-serif text-primary-800 mb-2">No venue found 😔</h3>
              <p className="text-primary-500 mb-6">Try adjusting your filters and search again</p>
              <button onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-primary-900 font-semibold rounded-xl transition-all shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
