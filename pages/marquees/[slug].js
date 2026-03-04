import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { marquees, formatPrice, categoryInfo } from '@/data/marquees';
import { getTestimonialsByVenue, getVenueAverageRating } from '@/data/testimonials';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FavoriteButton from '@/components/FavoriteButton';
import CompareButton from '@/components/CompareButton';
import ImageGallery from '@/components/ImageGallery';
import InquiryForm from '@/components/InquiryForm';
import { useWedding } from '@/context/WeddingContext';
import { Share2, MapPin, Phone, Mail, Calendar, Users, Star, Clock, ChevronRight, ExternalLink, Check, Maximize2, Copy, CheckCircle, Crown, Calculator, Heart, Diamond, ArrowRight } from 'lucide-react';

export default function MarqueeDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { addToRecentlyViewed, recentlyViewed, showNotification } = useWedding();
  const [activeTab, setActiveTab] = useState('overview');
  const [showGallery, setShowGallery] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [copied, setCopied] = useState(false);

  const marquee = marquees.find(m => m.slug === slug);
  const venueTestimonials = marquee ? getTestimonialsByVenue(marquee.name) : [];
  const avgRating = marquee ? getVenueAverageRating(marquee.name) : marquee?.rating;
  const catInfo = marquee ? categoryInfo[marquee.category] : null;

  const relatedVenues = marquees.filter(m => m.slug !== slug && m.location === marquee?.location).slice(0, 3);
  const recentlyViewedVenues = recentlyViewed.filter(s => s !== slug).slice(0, 4).map(s => marquees.find(m => m.slug === s)).filter(Boolean);

  useEffect(() => {
    if (slug && marquee) addToRecentlyViewed(slug);
  }, [slug, marquee]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: marquee.name, text: `Check out ${marquee.name}!`, url }); }
      catch { copyToClipboard(url); }
    } else { copyToClipboard(url); }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showNotification('Link copied! 📋', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!marquee) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center animate-fadeIn">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-primary-300" />
            </div>
            <h1 className="text-2xl font-serif text-primary-800 mb-4">Venue not found 😔</h1>
            <p className="text-primary-500 mb-6">The venue you are looking for is not available.</p>
            <Link href="/marquees" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 font-semibold rounded-xl hover:from-accent-400 hover:to-accent-500 transition-all shadow-lg">
              <ChevronRight className="w-4 h-4 mr-2 rotate-180" /> View all venues
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const galleryImages = [marquee.image, ...marquee.gallery.slice(0, 5)];

  return (
    <>
      <Head>
        <title>{marquee.name} | Wedify</title>
        <meta name="description" content={marquee.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Breadcrumbs */}
      <div className="pt-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center text-sm text-primary-400">
            <Link href="/" className="hover:text-accent-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/marquees" className="hover:text-accent-600 transition-colors">Venues</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-primary-800 font-medium">{marquee.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] rounded-2xl overflow-hidden">
            <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => setShowGallery(true)}>
              <img src={marquee.image} alt={marquee.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {catInfo && (
                <div className={`absolute top-4 left-4 ${catInfo.badgeClass} px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5`}>
                  {catInfo.icon} {catInfo.label}
                </div>
              )}
            </div>
            {galleryImages.slice(1, 5).map((img, idx) => (
              <div key={idx} className="relative group cursor-pointer" onClick={() => setShowGallery(true)}>
                <img src={img} alt={`${marquee.name} ${idx + 2}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                {idx === 3 && galleryImages.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">+{galleryImages.length - 5} photos</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Venue Header */}
          <div className="flex flex-wrap items-start justify-between mt-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                {marquee.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 text-xs font-bold rounded-full">⭐ Featured</span>
                )}
                {catInfo && (
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${catInfo.badgeClass}`}>{catInfo.icon} Category {marquee.category}</span>
                )}
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">✓ Verified</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-primary-800 mb-2">{marquee.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-primary-500 text-sm">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-accent-600" />{marquee.location}</span>
                <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-accent-500 fill-accent-500" />{avgRating || marquee.rating} ({marquee.reviews + venueTestimonials.length} reviews)</span>
                <span className="flex items-center"><Users className="w-4 h-4 mr-1 text-accent-600" />{marquee.capacity.min}-{marquee.capacity.max} guests</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FavoriteButton slug={marquee.slug} size="lg" showLabel />
              <CompareButton slug={marquee.slug} size="lg" showLabel />
              <button onClick={handleShare} className="flex items-center gap-2 px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-100 transition-colors">
                {copied ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5 text-primary-500" />}
                <span className="hidden sm:inline text-sm">{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-20 z-30 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar">
            {['overview', 'packages', 'amenities', 'reviews', 'location'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab ? 'border-accent-500 text-accent-700' : 'border-transparent text-primary-500 hover:text-primary-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div id="overview" className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 scroll-mt-32">
                <h2 className="text-2xl font-serif text-primary-800 mb-4">About This Venue</h2>
                <p className="text-primary-600 leading-relaxed">{marquee.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-neutral-200">
                  {[
                    { label: 'Guest Capacity', value: `${marquee.capacity.min}-${marquee.capacity.max}`, color: 'gold' },
                    { label: 'Per Head', value: `${formatPrice(marquee.pricing.perHead.min)}+`, color: 'maroon' },
                    { label: 'Rating', value: `${marquee.rating}★`, color: 'emerald' },
                    { label: 'Reviews', value: marquee.reviews, color: 'rani' },
                  ].map((stat, i) => (
                    <div key={i} className={`text-center p-4 rounded-xl ${
                      stat.color === 'gold' ? 'bg-accent-500/5' :
                      stat.color === 'maroon' ? 'bg-primary-500/5' :
                      stat.color === 'emerald' ? 'bg-emerald-500/5' : 'bg-rose-500/5'
                    }`}>
                      <p className={`text-2xl font-bold ${
                        stat.color === 'gold' ? 'text-accent-700' :
                        stat.color === 'maroon' ? 'text-primary-700' :
                        stat.color === 'emerald' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>{stat.value}</p>
                      <p className="text-sm text-primary-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div id="amenities" className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 scroll-mt-32">
                <h2 className="text-2xl font-serif text-primary-800 mb-4">Amenities & Facilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {marquee.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center p-3 bg-neutral-50 rounded-xl hover:bg-accent-500/5 transition-colors group border border-neutral-200">
                      <Check className="w-5 h-5 text-accent-600 mr-3 group-hover:scale-110 transition-transform" />
                      <span className="text-primary-700 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Menu Packages */}
              <div id="packages" className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 scroll-mt-32">
                <h2 className="text-2xl font-serif text-primary-800 mb-6">Menu Packages 🍽️</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {marquee.menuPackages.map((pkg, i) => (
                    <div key={i} className="border-2 border-neutral-200 rounded-xl p-6 hover:border-accent-400 hover:shadow-[0_10px_40px_rgba(107,15,24,0.08)] transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-serif font-semibold text-primary-800 group-hover:text-accent-700 transition-colors">{pkg.name}</h3>
                        <span className="text-xl font-bold text-accent-700">{formatPrice(pkg.price)}</span>
                      </div>
                      <p className="text-xs text-primary-400 uppercase tracking-wide mb-3">Per Head</p>
                      <ul className="space-y-2">
                        {pkg.items.map((item, j) => (
                          <li key={j} className="text-sm text-primary-600 flex items-center">
                            <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decor Packages */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
                <h2 className="text-2xl font-serif text-primary-800 mb-6">Decor Packages 🎨</h2>
                <div className="space-y-4">
                  {marquee.decorPackages.map((pkg, i) => (
                    <div key={i} className="border-2 border-neutral-200 rounded-xl p-6 hover:border-rose-400 hover:shadow-[0_10px_40px_rgba(107,15,24,0.08)] transition-all group">
                      <div className="flex flex-wrap justify-between items-start mb-3">
                        <h3 className="text-lg font-serif font-semibold text-primary-800 group-hover:text-rose-600 transition-colors">{pkg.name} Package</h3>
                        <span className="text-xl font-bold text-rose-600">{formatPrice(pkg.price)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pkg.includes.map((item, j) => (
                          <span key={j} className="px-3 py-1 bg-neutral-100 text-primary-600 text-sm rounded-full group-hover:bg-rose-50 transition-colors border border-neutral-200">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div id="reviews" className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 scroll-mt-32">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-primary-800">Reviews ⭐</h2>
                  <Link href="/testimonials" className="text-accent-700 hover:text-accent-800 text-sm font-medium flex items-center">
                    View all <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                {venueTestimonials.length > 0 ? (
                  <div className="space-y-6">
                    {venueTestimonials.slice(0, 3).map((t, i) => (
                      <div key={i} className="border-b border-neutral-200 last:border-0 pb-6 last:pb-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold mr-3">{t.couple.charAt(0)}</div>
                            <div>
                              <p className="font-semibold text-primary-800">{t.couple}</p>
                              <p className="text-sm text-primary-400">{t.date}</p>
                            </div>
                          </div>
                          <div className="flex">{[...Array(5)].map((_, j) => <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`} />)}</div>
                        </div>
                        <p className="text-primary-600 italic">&ldquo;{t.review}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-primary-400">
                    <Star className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                    <p>No reviews yet for this venue</p>
                  </div>
                )}
              </div>

              {/* Location */}
              <div id="location" className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 scroll-mt-32">
                <h2 className="text-2xl font-serif text-primary-800 mb-4">Location 📍</h2>
                <div className="bg-neutral-300 rounded-xl h-64 flex items-center justify-center mb-4 overflow-hidden">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(marquee.name + ', ' + marquee.location)}`}
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" className="rounded-xl"
                  ></iframe>
                </div>
                <div className="flex items-center text-primary-600">
                  <MapPin className="w-5 h-5 mr-2 text-accent-600" />{marquee.location}
                </div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(marquee.name + ', ' + marquee.location)}`}
                  target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-4 text-accent-700 hover:text-accent-800 font-medium text-sm">
                  Get Directions <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(107,15,24,0.08)] border border-neutral-200 sticky top-32 overflow-hidden">
                {catInfo && <div className={`h-1.5 bg-gradient-to-r ${catInfo.gradient}`}></div>}
                <div className="p-6">
                  <h3 className="text-xl font-serif text-primary-800 mb-4">Quick Pricing 💰</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                      <span className="text-primary-500 text-sm">Per Head (Starting)</span>
                      <span className="font-semibold text-accent-700">{formatPrice(marquee.pricing.perHead.min)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                      <span className="text-primary-500 text-sm">Per Head (Premium)</span>
                      <span className="font-semibold text-accent-700">{formatPrice(marquee.pricing.perHead.max)}</span>
                    </div>
                    {marquee.pricing.hallRental > 0 && (
                      <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                        <span className="text-primary-500 text-sm">Hall Rental</span>
                        <span className="font-semibold text-primary-700">{formatPrice(marquee.pricing.hallRental)}</span>
                      </div>
                    )}
                    {marquee.pricing.lawn > 0 && (
                      <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                        <span className="text-primary-500 text-sm">Lawn Rental</span>
                        <span className="font-semibold text-primary-700">{formatPrice(marquee.pricing.lawn)}</span>
                      </div>
                    )}
                  </div>

                  <Link href={`/calculator?venue=${marquee.slug}`}
                    className="flex items-center justify-center w-full mt-6 px-6 py-4 bg-gradient-to-r from-accent-500 via-accent-500 to-accent-600 hover:from-accent-400 hover:via-accent-400 hover:to-accent-500 text-primary-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-lg">
                    <Calculator className="w-5 h-5 mr-2" /> 💰 Calculate Full Budget
                  </Link>
                  <button onClick={() => setShowInquiry(true)}
                    className="w-full mt-3 px-6 py-4 bg-primary-800 hover:bg-primary-700 text-neutral-100 font-semibold rounded-xl transition-all">
                    📩 Send Inquiry
                  </button>

                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <h4 className="font-semibold text-primary-800 mb-3 text-sm">Contact Venue 📞</h4>
                    <a href={`tel:${marquee.contact.phone}`}
                      className="flex items-center p-3 bg-emerald-50 rounded-xl mb-2 hover:bg-emerald-100 transition-colors">
                      <Phone className="w-5 h-5 text-emerald-600 mr-3" />
                      <span className="text-emerald-700 text-sm">{marquee.contact.phone}</span>
                    </a>
                    <a href={`mailto:${marquee.contact.email}`}
                      className="flex items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-blue-700 text-sm truncate">{marquee.contact.email}</span>
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-neutral-200 grid grid-cols-2 gap-3">
                    <Link href="/compare" className="flex flex-col items-center p-3 bg-neutral-50 rounded-xl hover:bg-accent-500/5 transition-colors text-center border border-neutral-200">
                      <Crown className="w-5 h-5 text-primary-500 mb-1" />
                      <span className="text-xs text-primary-600">Compare</span>
                    </Link>
                    <Link href="/checklist" className="flex flex-col items-center p-3 bg-neutral-50 rounded-xl hover:bg-accent-500/5 transition-colors text-center border border-neutral-200">
                      <Check className="w-5 h-5 text-primary-500 mb-1" />
                      <span className="text-xs text-primary-600">Checklist</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedVenues.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif text-primary-800 mb-6">{marquee.location} - More Venues 🏛️</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedVenues.map(v => (
                  <Link key={v.slug} href={`/marquees/${v.slug}`} className="group">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_15px_40px_rgba(107,15,24,0.1)] transition-all border border-neutral-200 group-hover:border-accent-500/20">
                      <div className="relative h-48 overflow-hidden">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-semibold text-primary-800 group-hover:text-accent-700 transition-colors">{v.name}</h3>
                        <p className="text-sm text-primary-400">{formatPrice(v.pricing.perHead.min)}+ per head</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {recentlyViewedVenues.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-serif text-primary-800 mb-6">Recently Viewed 👀</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentlyViewedVenues.map(v => (
                  <Link key={v.slug} href={`/marquees/${v.slug}`} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-[0_10px_30px_rgba(107,15,24,0.08)] transition-all border border-neutral-200">
                      <div className="relative h-32 overflow-hidden">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm text-primary-800 group-hover:text-accent-700 transition-colors truncate">{v.name}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {showGallery && <ImageGallery images={galleryImages} onClose={() => setShowGallery(false)} initialIndex={0} />}

      {showInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="text-xl font-serif text-primary-800">📩 Inquiry — {marquee.name}</h2>
              <button onClick={() => setShowInquiry(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6"><InquiryForm venue={marquee} onSuccess={() => setShowInquiry(false)} /></div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
