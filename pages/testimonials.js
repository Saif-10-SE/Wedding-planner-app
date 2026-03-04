import Head from 'next/head';
import { useState } from 'react';
import { testimonials, getFeaturedTestimonials } from '@/data/testimonials';
import { marquees } from '@/data/marquees';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCard from '@/components/TestimonialCard';
import { Star, Quote, Filter, Heart, Users, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredTestimonials = testimonials
    .filter(t => selectedVenue === 'all' || t.venueSlug === selectedVenue)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'guests') return b.guests - a.guests;
      return 0;
    });

  const featuredTestimonials = getFeaturedTestimonials();
  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1);
  const totalGuests = testimonials.reduce((acc, t) => acc + t.guests, 0);

  return (
    <>
      <Head>
        <title>Real Wedding Stories 💕 | Wedify</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Hear from couples who celebrated their wedding at Lahore's finest venues." />
      </Head>

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-[0.06]">
          <Quote className="absolute top-16 left-16 w-72 h-72 text-emerald-400" />
          <Quote className="absolute bottom-16 right-16 w-72 h-72 text-emerald-400 rotate-180" />
        </div>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full filter blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 backdrop-blur-sm rounded-full text-emerald-300 text-xs tracking-widest uppercase mb-6 border border-emerald-500/20">
            <Heart className="w-3.5 h-3.5 fill-current" /> Real Love Stories
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Wedding <span className="text-gradient-emerald">Stories</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto text-lg mb-10 font-light">
            Hear from real couples about their experience at Lahore's finest venues
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-4xl font-bold text-accent-400">
                <Star className="w-7 h-7 fill-current" />
                {averageRating}
              </div>
              <p className="text-white/40 text-sm mt-1">Avg Rating</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-400">{testimonials.length}+</div>
              <p className="text-white/40 text-sm mt-1">Happy Couples</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-4xl font-bold text-accent-400">
                <Users className="w-7 h-7" />
                {(totalGuests / 1000).toFixed(0)}K+
              </div>
              <p className="text-white/40 text-sm mt-1">Guests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      {featuredTestimonials[0] && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-br from-neutral-50 to-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-accent-200 shadow-lg">
              <Quote className="absolute top-4 right-4 w-32 h-32 text-accent-100" />
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <img
                  src={featuredTestimonials[0]?.image}
                  alt={featuredTestimonials[0]?.couple}
                  className="w-48 h-48 rounded-full object-cover border-4 border-accent-400 shadow-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-primary-700 italic leading-relaxed mb-6 font-display">
                    &ldquo;{featuredTestimonials[0]?.review}&rdquo;
                  </p>
                  <div>
                    <p className="text-lg font-serif font-semibold text-primary-800">{featuredTestimonials[0]?.couple}</p>
                    <p className="text-accent-600 font-medium">{featuredTestimonials[0]?.venue}</p>
                    <p className="text-primary-400 text-sm">{featuredTestimonials[0]?.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-4 bg-white/80 backdrop-blur-md border-y border-accent-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-primary-300" />
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-primary-700 text-sm"
              >
                <option value="all">🏛️ All Venues</option>
                {marquees.map(m => (
                  <option key={m.slug} value={m.slug}>{m.name}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent bg-white text-primary-700 text-sm"
              >
                <option value="recent">🕐 Most Recent</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="guests">👥 Most Guests</option>
              </select>
            </div>
            <span className="text-primary-400 text-sm bg-neutral-100 px-3 py-1 rounded-full">💬 {filteredTestimonials.length} reviews</span>
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-12 min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #f5f0e8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, i) => (
              <div key={testimonial.id} className="animate-fadeIn" style={{ animationDelay: `${i * 0.05}s` }}>
                <TestimonialCard
                  testimonial={testimonial}
                  featured={testimonial.rating === 5}
                />
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Quote className="w-10 h-10 text-primary-300" />
              </div>
              <p className="text-primary-500">No reviews found for this venue 😔</p>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500 rounded-full filter blur-[120px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Heart className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Share Your Wedding Story
          </h2>
          <p className="text-white/40 mb-8 max-w-lg mx-auto font-light">
            Recently married? We'd love to hear about your experience and feature your story
          </p>
          <a
            href="mailto:stories@lahoreshaadi.pk?subject=My Wedding Story"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 font-bold rounded-xl shadow-lg hover:shadow-gold transition-all"
          >
            <Quote className="w-5 h-5" /> Submit Your Review
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
