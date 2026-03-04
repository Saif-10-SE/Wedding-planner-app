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
        <title>Wedding Vendors 🎊 | Wedify</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Find the best wedding vendors in Lahore - photographers, decorators, caterers, makeup artists and much more." />
      </Head>

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0920 0%, #1e1b4b 50%, #0a0920 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full filter blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 backdrop-blur-sm rounded-full text-indigo-300 text-xs tracking-widest uppercase mb-6 border border-indigo-500/20">
            <Crown className="w-3.5 h-3.5" /> Top Professionals
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Wedding <span className="bg-gradient-to-r from-indigo-400 via-accent-400 to-indigo-400 bg-clip-text text-transparent">Vendors</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto mb-8 font-light">
            Find the best wedding professionals in Lahore. From photographers to caterers,
            build the perfect team for your wedding
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search by vendor name or service..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-primary-800 bg-white/95 backdrop-blur-sm focus:ring-2 focus:ring-accent-500 focus:outline-none shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Buttons */}
      <section className="py-6 bg-white border-b border-accent-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all text-sm ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 shadow-lg'
                  : 'bg-neutral-100 text-primary-600 hover:bg-neutral-200'
              }`}
            >
              All Vendors
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 text-sm ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 shadow-lg'
                    : 'bg-neutral-100 text-primary-600 hover:bg-neutral-200'
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
      <section className="py-12 bg-gradient-to-b from-neutral-50/50 to-white" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #ffffff 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-5 h-5 text-accent-500" />
              <h2 className="text-2xl font-serif text-primary-800">⭐ Top Rated Vendors</h2>
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
      <section className="py-3 bg-white/80 backdrop-blur-md border-b border-accent-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-primary-300" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-primary-700 text-sm"
              >
                <option value="rating">⭐ Highest Rated</option>
                <option value="reviews">💬 Most Reviews</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
              </select>
              <span className="text-primary-400 text-sm">{filteredVendors.length} vendors found</span>
            </div>
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-accent-600' : 'text-primary-400'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-accent-600' : 'text-primary-400'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vendors Grid / List */}
      <section className="py-12 min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #f5f0e8 100%)' }}>
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
                  className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5 flex gap-6 hover:shadow-md transition-all animate-fadeIn"
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
                        <h3 className="text-lg font-serif font-semibold text-primary-800">{vendor.name}</h3>
                        <p className="text-sm text-primary-400">{vendor.type}</p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 text-accent-500 fill-current" />
                        <span className="font-semibold text-primary-700 text-sm">{vendor.rating}</span>
                        <span className="text-primary-400 text-xs">({vendor.reviews})</span>
                      </div>
                    </div>
                    <p className="text-primary-500 text-sm mt-2 line-clamp-2">{vendor.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {vendor.services.slice(0, 4).map((service, si) => (
                        <span key={si} className="px-2.5 py-1 bg-neutral-100 text-primary-600 text-xs rounded-lg">
                          {service}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-accent-600 font-bold">
                        Starting from {formatPrice(vendor.priceRange.min)}
                        {vendor.priceType && <span className="text-xs font-normal text-primary-400">/{vendor.priceType}</span>}
                      </p>
                      <a
                        href={`tel:${vendor.contact.phone}`}
                        className="px-5 py-2 bg-primary-950 hover:bg-maroon-800 text-white font-medium rounded-xl transition-colors text-sm shadow-lg hover:shadow-maroon"
                      >
                        Contact Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredVendors.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-primary-300" />
              </div>
              <p className="text-xl text-primary-500 mb-2">No vendors found 😔</p>
              <p className="text-primary-400">Try changing your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0920 0%, #1e1b4b 50%, #0a0920 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500 rounded-full filter blur-[120px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Crown className="w-10 h-10 text-accent-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Are You a Wedding Vendor?
          </h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto font-light">
            Join Wedify and reach thousands of couples planning their dream wedding
          </p>
          <a
            href="mailto:vendors@lahoreshaadi.pk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 font-bold rounded-xl shadow-lg hover:shadow-gold transition-all"
          >
            List Your Business
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
