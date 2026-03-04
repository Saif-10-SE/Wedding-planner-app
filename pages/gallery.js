import Head from 'next/head';
import { useState } from 'react';
import { marquees } from '@/data/marquees';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import { Camera, Filter, Grid, LayoutGrid, Sparkles } from 'lucide-react';

export default function Gallery() {
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const getAllImages = () => {
    if (selectedVenue === 'all') {
      return marquees.flatMap(m =>
        m.gallery.map(img => ({
          url: img,
          venue: m.name,
          slug: m.slug
        }))
      );
    }
    const venue = marquees.find(m => m.slug === selectedVenue);
    return venue ? venue.gallery.map(img => ({
      url: img,
      venue: venue.name,
      slug: venue.slug
    })) : [];
  };

  const images = getAllImages();
  const imageUrls = images.map(img => img.url);

  const featuredImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200',
    'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=1200',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200'
  ];

  return (
    <>
      <Head>
        <title>Wedding Gallery 📸 | Wedify</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="View the finest wedding photos in Lahore. Envision your dream wedding." />
      </Head>

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #45091a 0%, #6b0f18 50%, #45091a 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500 rounded-full filter blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-500/10 backdrop-blur-sm rounded-full text-accent-300 text-xs tracking-widest uppercase mb-6 border border-accent-500/20">
            <Camera className="w-3.5 h-3.5" /> Real Wedding Photos
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Wedding <span className="text-gradient-gold">Gallery</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">
            Browse real wedding photos from Lahore's finest venues and envision your dream wedding
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-4 bg-white/80 backdrop-blur-md border-b border-accent-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-primary-300" />
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-primary-700"
              >
                <option value="all">🏛️ All Venues</option>
                {marquees.map(m => (
                  <option key={m.slug} value={m.slug}>{m.name}</option>
                ))}
              </select>
              <span className="text-primary-400 text-sm">{imageUrls.length} photos 📷</span>
            </div>
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-accent-600' : 'text-primary-400 hover:text-primary-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'masonry' ? 'bg-white shadow-sm text-accent-600' : 'text-primary-400 hover:text-primary-600'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="py-12 min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #f5f0e8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          {selectedVenue === 'all' ? (
            <>
              {/* Featured Section */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="w-5 h-5 text-accent-500" />
                  <h2 className="text-2xl font-serif text-primary-800">
                    Special <span className="text-accent-600">Moments</span>
                  </h2>
                </div>
                <ImageGallery images={featuredImages} title="Featured Wedding Photos" />
              </div>

              {/* By Venue Sections */}
              {marquees.filter(m => m.gallery.length > 0).map(venue => (
                <div key={venue.slug} className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-serif text-primary-800">🏛️ {venue.name}</h2>
                    <span className="text-sm text-primary-400 bg-neutral-100 px-3 py-1 rounded-full">{venue.gallery.length} photos</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {venue.gallery.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group shadow-sm hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedVenue(venue.slug)}
                      >
                        <img
                          src={img}
                          alt={`${venue.name} photo ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                          <span className="text-white font-medium text-sm tracking-wide">View All &rarr;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <ImageGallery images={imageUrls} title={marquees.find(m => m.slug === selectedVenue)?.name} />
          )}
        </div>
      </section>

      {/* Event Type Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-primary-800 mb-3 text-center">
            Browse by <span className="text-accent-600">Event Type</span>
          </h2>
          <p className="text-primary-400 text-center mb-12 max-w-xl mx-auto">View beautiful photos from each event type</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: '🟡 Mehndi', image: 'https://images.unsplash.com/photo-1560800452-f2d475982b96?w=600', count: 45 },
              { name: '🔴 Barat', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', count: 62 },
              { name: '🟢 Walima', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600', count: 38 },
              { name: '💍 Engagement', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600', count: 24 }
            ].map((category) => (
              <div
                key={category.name}
                className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-serif text-white mb-1">{category.name}</h3>
                  <p className="text-white/60 text-sm">{category.count} photos</p>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary-900/50 backdrop-blur-sm rounded-full text-accent-400 text-xs font-medium border border-accent-500/20">
                  View →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #45091a 0%, #6b0f18 50%, #45091a 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500 rounded-full filter blur-[120px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Camera className="w-10 h-10 text-accent-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Share Your Wedding Photos
          </h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto font-light">
            Recently married? Share your beautiful memories in our gallery and inspire others
          </p>
          <a
            href="mailto:gallery@lahoreshaadi.pk"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 font-bold rounded-xl shadow-lg hover:shadow-gold transition-all"
          >
            <Camera className="w-5 h-5" /> Submit Photos
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
