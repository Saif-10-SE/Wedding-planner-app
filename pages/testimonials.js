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
        <title>Asli Shaadi Kahaniyaan 💕 | Lahore Shaadi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Un jodoon ki kahaniyaan sunein jinhon ne Lahore ke behtareen venues mein apni shaadi manayi." />
      </Head>

      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-maroon-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <Quote className="absolute top-16 left-16 w-72 h-72 text-mehndi-400" />
          <Quote className="absolute bottom-16 right-16 w-72 h-72 text-mehndi-400 rotate-180" />
        </div>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mehndi-500 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rani-500 rounded-full filter blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rani-500/10 backdrop-blur-sm rounded-full text-rani-300 text-xs tracking-widest uppercase mb-6 border border-rani-500/20">
            <Heart className="w-3.5 h-3.5 fill-current" /> 💕 Asli Muhabbat Ki Kahaniyaan
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Shaadi <span className="bg-gradient-to-r from-rani-400 via-mehndi-400 to-gold-400 bg-clip-text text-transparent">Kahaniyaan</span> 💖
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg mb-10">
            Asli jodon se sunein ke Lahore ke mashoor venues mein unka tajurba kaisa raha ✨
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-4xl font-bold text-mehndi-400">
                <Star className="w-7 h-7 fill-current" />
                {averageRating}
              </div>
              <p className="text-white/40 text-sm mt-1">Ausat Rating ⭐</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-mehndi-400">{testimonials.length}+</div>
              <p className="text-white/40 text-sm mt-1">Khush Jode 💑</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-4xl font-bold text-mehndi-400">
                <Users className="w-7 h-7" />
                {(totalGuests / 1000).toFixed(0)}K+
              </div>
              <p className="text-white/40 text-sm mt-1">Mehmaan 👥</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      {featuredTestimonials[0] && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-br from-cream-50 to-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-mehndi-200 shadow-lg">
              <Quote className="absolute top-4 right-4 w-32 h-32 text-mehndi-100" />
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <img
                  src={featuredTestimonials[0]?.image}
                  alt={featuredTestimonials[0]?.couple}
                  className="w-48 h-48 rounded-full object-cover border-4 border-mehndi-400 shadow-mehndi"
                />
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-mehndi-500 text-mehndi-500" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-maroon-700 italic leading-relaxed mb-6 font-display">
                    &ldquo;{featuredTestimonials[0]?.review}&rdquo;
                  </p>
                  <div>
                    <p className="text-lg font-serif font-semibold text-maroon-800">{featuredTestimonials[0]?.couple}</p>
                    <p className="text-mehndi-600 font-medium">{featuredTestimonials[0]?.venue}</p>
                    <p className="text-maroon-400 text-sm">{featuredTestimonials[0]?.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-4 bg-white/80 backdrop-blur-md border-y border-mehndi-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-maroon-300" />
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="px-4 py-2 border border-maroon-200 rounded-xl focus:ring-2 focus:ring-mehndi-500 focus:border-transparent bg-white text-maroon-700 text-sm"
              >
                <option value="all">🏛️ Sab Venues</option>
                {marquees.map(m => (
                  <option key={m.slug} value={m.slug}>{m.name}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-maroon-200 rounded-xl focus:ring-2 focus:ring-mehndi-500 focus:border-transparent bg-white text-maroon-700 text-sm"
              >
                <option value="recent">🕐 Sabse Nayi</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="guests">👥 Zyada Mehmaan</option>
              </select>
            </div>
            <span className="text-maroon-400 text-sm bg-cream-100 px-3 py-1 rounded-full">💬 {filteredTestimonials.length} reviews</span>
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-12 bg-cream-50 min-h-screen">
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
              <div className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Quote className="w-10 h-10 text-maroon-300" />
              </div>
              <p className="text-maroon-500">Is venue ke liye koi review nahi mila 😔</p>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-20 bg-maroon-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mehndi-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Heart className="w-10 h-10 text-rani-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
            Apni Shaadi Ki Kahani Sunayein 💕
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Haal hi mein shaadi hui? Hum aapka tajurba sun'na chahte hain aur aapki kahani feature karna chahte hain! 🌟
          </p>
          <a
            href="mailto:stories@lahoreshaadi.pk?subject=Meri Shaadi Ki Kahani"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900 font-bold rounded-xl shadow-mehndi hover:shadow-lg transition-all"
          >
            <Quote className="w-5 h-5" /> 📝 Apna Review Bhejein
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
