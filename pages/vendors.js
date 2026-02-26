import Head from 'next/head';
import { useState } from 'react';
import { vendors, getAllVendors, getFeaturedVendors, getVendorCategories, getVendorsByType } from '@/data/vendors';
import { formatPrice } from '@/data/marquees';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VendorCard from '@/components/VendorCard';
import { Star, Search, Filter, Grid, List, Crown, Sparkles } from 'lucide-react';

export default function Vendors() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');

  const categories = getVendorCategories();
  const featuredVendors = getFeaturedVendors();

  const filteredVendors = getAllVendors()
    .filter(vendor => {
      const matchesCategory = selectedCategory === 'all' ||
        vendor.type.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      if (sortBy === 'price-low') return a.priceRange.min - b.priceRange.min;
      if (sortBy === 'price-high') return b.priceRange.min - a.priceRange.min;
      return 0;
    });

  return (
    <>
      <Head>
        <title>Shaadi Ke Vendors 🎊 | Lahore Shaadi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Lahore ke behtareen shaadi vendors dhoondhein - photographers, decorators, caterers, makeup artists aur bahut kuch." />
      </Head>

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-maroon-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mehndi-500 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rani-500 rounded-full filter blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mehndi-500/10 backdrop-blur-sm rounded-full text-mehndi-400 text-xs tracking-widest uppercase mb-6 border border-mehndi-500/20">
            <Crown className="w-3.5 h-3.5" /> ✨ Behtareen Professionals
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Shaadi Ke <span className="bg-gradient-to-r from-mehndi-400 via-gold-400 to-haldi-400 bg-clip-text text-transparent">Vendors</span> 🎉
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto mb-8">
            Lahore ke behtareen shaadi professionals dhoondhein. Photographers se le kar caterers tak,
            apni shaadi ke liye perfect team banaein 💫
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Vendor naam ya service se dhoondhein..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-maroon-800 bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-mehndi-500 focus:outline-none shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Buttons */}
      <section className="py-6 bg-white border-b border-mehndi-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all text-sm ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900 shadow-mehndi'
                  : 'bg-cream-100 text-maroon-600 hover:bg-cream-200'
              }`}
            >
              Sab Vendors
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 text-sm ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900 shadow-mehndi'
                    : 'bg-cream-100 text-maroon-600 hover:bg-cream-200'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      {selectedCategory === 'all' && searchQuery === '' && (
        <section className="py-12 bg-gradient-to-b from-cream-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-5 h-5 text-mehndi-500" />
              <h2 className="text-2xl font-serif text-maroon-800">⭐ Top Rated Vendors</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVendors.slice(0, 4).map(vendor => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sort & View Bar */}
      <section className="py-3 bg-white/80 backdrop-blur-md border-b border-mehndi-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-maroon-300" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-maroon-200 rounded-xl focus:ring-2 focus:ring-mehndi-500 focus:border-transparent bg-white text-maroon-700 text-sm"
              >
                <option value="rating">⭐ Highest Rated</option>
                <option value="reviews">💬 Most Reviews</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
              </select>
              <span className="text-maroon-400 text-sm">{filteredVendors.length} vendors milein</span>
            </div>
            <div className="flex items-center gap-1 bg-cream-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-mehndi-600' : 'text-maroon-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-mehndi-600' : 'text-maroon-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vendors Grid / List */}
      <section className="py-12 bg-cream-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVendors.map((vendor, i) => (
                <div key={vendor.id} className="animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
                  <VendorCard vendor={vendor} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVendors.map((vendor, i) => (
                <div
                  key={vendor.id}
                  className="bg-white rounded-2xl shadow-sm border border-maroon-100 p-5 flex gap-6 hover:shadow-md transition-all animate-fadeIn"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-36 h-36 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-serif font-semibold text-maroon-800">{vendor.name}</h3>
                        <p className="text-sm text-maroon-400">{vendor.type}</p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-cream-100 px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 text-mehndi-500 fill-current" />
                        <span className="font-semibold text-maroon-700 text-sm">{vendor.rating}</span>
                        <span className="text-maroon-400 text-xs">({vendor.reviews})</span>
                      </div>
                    </div>
                    <p className="text-maroon-500 text-sm mt-2 line-clamp-2">{vendor.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {vendor.services.slice(0, 4).map((service, si) => (
                        <span key={si} className="px-2.5 py-1 bg-cream-100 text-maroon-600 text-xs rounded-lg">
                          {service}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-mehndi-600 font-bold">
                        Starting from {formatPrice(vendor.priceRange.min)}
                        {vendor.priceType && <span className="text-xs font-normal text-maroon-400">/{vendor.priceType}</span>}
                      </p>
                      <a
                        href={`tel:${vendor.contact.phone}`}
                        className="px-5 py-2 bg-maroon-800 hover:bg-maroon-700 text-white font-medium rounded-xl transition-colors text-sm"
                      >
                        📞 Raabta Karein
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredVendors.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-maroon-300" />
              </div>
              <p className="text-xl text-maroon-500 mb-2">Koi vendor nahi mila 😔</p>
              <p className="text-maroon-400">Search ya filters change kar ke dekhein</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-maroon-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mehndi-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Crown className="w-10 h-10 text-mehndi-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Kya Aap Shaadi Vendor Hain? 🤝
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Lahore Shaadi se jurein aur hazaron couples tak apni services pohanchain jo apni dream wedding plan kar rahe hain 🌟
          </p>
          <a
            href="mailto:vendors@lahoreshaadi.pk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900 font-bold rounded-xl shadow-mehndi hover:shadow-lg transition-all"
          >
            📋 Apna Business List Karein
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
