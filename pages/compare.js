import Head from 'next/head';
import { useState, useMemo } from 'react';
import { marquees, formatPrice, categoryInfo } from '@/data/marquees';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Crown, Star, Users, MapPin, Check, Calculator, ArrowRight, Diamond } from 'lucide-react';

export default function Compare() {
  const [selectedVenues, setSelectedVenues] = useState(['royal-palm', 'pc-marquee', 'falettis']);

  const handleVenueChange = (index, value) => {
    const newSelection = [...selectedVenues];
    newSelection[index] = value;
    setSelectedVenues(newSelection);
  };

  const compareVenues = useMemo(() => {
    return selectedVenues.map(slug => marquees.find(m => m.slug === slug)).filter(Boolean);
  }, [selectedVenues]);

  return (
    <>
      <Head>
        <title>Venue Comparison | Wedify 🎊</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0920 0%, #1e1b4b 50%, #0a0920 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full filter blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 backdrop-blur-sm rounded-full text-indigo-300 text-xs tracking-widest uppercase mb-6 border border-indigo-500/20">
            <Crown className="w-3.5 h-3.5" /> Compare Venues
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Venue <span className="bg-gradient-to-r from-indigo-400 via-accent-400 to-indigo-400 bg-clip-text text-transparent">Comparison</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
            Compare Lahore's finest marquees side-by-side and choose the perfect venue for your wedding
          </p>
        </div>
      </section>

      {/* Venue Selectors */}
      <section className="py-6 bg-white border-b border-accent-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <select key={index} value={selectedVenues[index] || ''} onChange={(e) => handleVenueChange(index, e.target.value)}
                className="px-4 py-3.5 border-2 border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 font-medium text-primary-700 bg-neutral-50 transition-all"
              >
                <option value="">🏛️ Select Venue {index + 1}</option>
                {marquees.map(m => (
                  <option key={m.slug} value={m.slug}>[{m.category}] {m.name}</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 min-h-screen" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #f5f0e8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          {compareVenues.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(107,15,24,0.08)] overflow-hidden border border-neutral-200">
              {/* Images */}
              <div className="grid grid-cols-3">
                {compareVenues.map((venue, i) => (
                  <div key={i} className="relative">
                    <img src={venue.image} alt={venue.name} className="w-full h-52 object-cover" />
                    {venue.featured && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 text-xs font-bold rounded-full">⭐ Featured</span>
                    )}
                    {categoryInfo[venue.category] && (
                      <span className={`absolute top-4 right-4 px-2.5 py-1 text-[10px] font-medium rounded-full ${categoryInfo[venue.category].badgeClass}`}>{categoryInfo[venue.category].icon} {venue.category}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Names */}
              <div className="grid grid-cols-3 border-b border-neutral-200">
                {compareVenues.map((venue, i) => (
                  <div key={i} className="p-6 text-center border-r border-neutral-200 last:border-r-0">
                    <h3 className="text-xl font-serif font-semibold text-primary-800">{venue.name}</h3>
                    <p className="text-sm text-primary-400 mt-1 flex items-center justify-center"><MapPin className="w-3.5 h-3.5 mr-1 text-accent-600" />{venue.location}</p>
                  </div>
                ))}
              </div>

              {/* Comparison rows */}
              {[
                {
                  label: '⭐ Rating & Reviews',
                  render: (venue) => (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-5 h-5 text-accent-500 fill-accent-500" />
                        <span className="text-xl font-bold text-primary-800">{venue.rating}</span>
                      </div>
                      <p className="text-sm text-primary-400 mt-1">({venue.reviews} reviews)</p>
                    </div>
                  )
                },
                {
                  label: '👥 Guest Capacity',
                  render: (venue) => (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-primary-800">{venue.capacity.min} - {venue.capacity.max}</p>
                      <p className="text-sm text-primary-400">guests</p>
                    </div>
                  )
                },
                {
                  label: '💰 Per Head Cost',
                  render: (venue) => (
                    <div className="text-center">
                      <p className="text-lg font-bold text-accent-600">{formatPrice(venue.pricing.perHead.min)} - {formatPrice(venue.pricing.perHead.max)}</p>
                    </div>
                  )
                },
                {
                  label: '🏛️ Hall Rental',
                  render: (venue) => (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-primary-700">
                        {venue.pricing.hallRental > 0 ? formatPrice(venue.pricing.hallRental) : <span className="text-emerald-600">✅ Included</span>}
                      </p>
                    </div>
                  )
                },
                {
                  label: '🍽️ Menu Packages',
                  render: (venue) => (
                    <ul className="space-y-2">
                      {venue.menuPackages.map((pkg, i) => (
                        <li key={i} className="flex justify-between text-sm">
                          <span className="text-primary-500">{pkg.name}</span>
                          <span className="font-medium text-primary-700">{formatPrice(pkg.price)}</span>
                        </li>
                      ))}
                    </ul>
                  )
                },
                {
                  label: '🌸 Decor Packages',
                  render: (venue) => (
                    <ul className="space-y-2">
                      {venue.decorPackages.map((pkg, i) => (
                        <li key={i} className="flex justify-between text-sm">
                          <span className="text-primary-500">{pkg.name}</span>
                          <span className="font-medium text-primary-700">{formatPrice(pkg.price)}</span>
                        </li>
                      ))}
                    </ul>
                  )
                },
                {
                  label: '✨ Amenities',
                  render: (venue) => (
                    <div className="flex flex-wrap gap-1.5">
                      {venue.amenities.map((a, i) => (
                        <span key={i} className="px-2 py-1 bg-neutral-100 text-primary-600 text-xs rounded-full border border-neutral-200">{a}</span>
                      ))}
                    </div>
                  )
                },
                {
                  label: '📞 Contact',
                  render: (venue) => (
                    <div className="text-center text-sm">
                      <p className="text-primary-600">{venue.contact.phone}</p>
                      <p className="text-primary-400 truncate">{venue.contact.email}</p>
                    </div>
                  )
                },
              ].map((row, ri) => (
                <div key={ri}>
                  <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-50">
                    <div className="col-span-3 px-6 py-2.5 text-white text-sm font-medium tracking-wide" style={{ background: 'linear-gradient(90deg, #0a0920 0%, #1e1b4b 100%)' }}>{row.label}</div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-neutral-200">
                    {compareVenues.map((venue, vi) => (
                      <div key={vi} className="p-5 border-r border-neutral-200 last:border-r-0">{row.render(venue)}</div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Actions */}
              <div className="grid grid-cols-3">
                {compareVenues.map((venue, i) => (
                  <div key={i} className="p-6 border-r border-neutral-200 last:border-r-0 space-y-3">
                    <Link href={`/marquees/${venue.slug}`}
                      className="block w-full py-3.5 bg-primary-950 hover:bg-maroon-800 text-white text-center font-semibold rounded-xl transition-all shadow-lg hover:shadow-maroon"
                    >
                      🏛️ View Details
                    </Link>
                    <Link href={`/calculator?venue=${venue.slug}`}
                      className="block w-full py-3.5 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-primary-900 text-center font-bold rounded-xl transition-all shadow-lg"
                    >
                      💰 Calculate Budget
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-primary-300" />
              </div>
              <h3 className="text-xl font-serif text-primary-700 mb-2">Select venues to compare ⚖️</h3>
              <p className="text-primary-400">Choose 3 venues from above</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
