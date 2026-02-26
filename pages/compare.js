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
        <title>Venues Ka Muqabla | Lahore Shaadi 🎊</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-maroon-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mehndi-500 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rani-500 rounded-full filter blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mehndi-500/10 backdrop-blur-sm rounded-full text-mehndi-400 text-xs tracking-widest uppercase mb-6 border border-mehndi-500/20">
            <Crown className="w-3.5 h-3.5" /> ⚖️ Muqabla Karein
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Venues Ka <span className="bg-gradient-to-r from-mehndi-400 via-gold-400 to-haldi-400 bg-clip-text text-transparent">Muqabla</span> 🏆
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
            Lahore ke behtareen marquees ko side-by-side compare karein aur apni shaadi ke liye perfect jagah chunein ✨
          </p>
        </div>
      </section>

      {/* Venue Selectors */}
      <section className="py-6 bg-white border-b border-mehndi-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <select key={index} value={selectedVenues[index] || ''} onChange={(e) => handleVenueChange(index, e.target.value)}
                className="px-4 py-3.5 border-2 border-maroon-200 rounded-xl focus:ring-2 focus:ring-mehndi-500 focus:border-mehndi-500 font-medium text-maroon-700 bg-cream-50 transition-all"
              >
                <option value="">🏛️ Venue {index + 1} Chunein</option>
                {marquees.map(m => (
                  <option key={m.slug} value={m.slug}>[{m.category}] {m.name}</option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-cream-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {compareVenues.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(80,0,20,0.08)] overflow-hidden border border-maroon-100">
              {/* Images */}
              <div className="grid grid-cols-3">
                {compareVenues.map((venue, i) => (
                  <div key={i} className="relative">
                    <img src={venue.image} alt={venue.name} className="w-full h-52 object-cover" />
                    {venue.featured && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900 text-xs font-bold rounded-full">⭐ Featured</span>
                    )}
                    {categoryInfo[venue.category] && (
                      <span className={`absolute top-4 right-4 px-2.5 py-1 text-[10px] font-medium rounded-full ${categoryInfo[venue.category].badgeClass}`}>{categoryInfo[venue.category].icon} {venue.category}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Names */}
              <div className="grid grid-cols-3 border-b border-maroon-100">
                {compareVenues.map((venue, i) => (
                  <div key={i} className="p-6 text-center border-r border-maroon-100 last:border-r-0">
                    <h3 className="text-xl font-serif font-semibold text-maroon-800">{venue.name}</h3>
                    <p className="text-sm text-maroon-400 mt-1 flex items-center justify-center"><MapPin className="w-3.5 h-3.5 mr-1 text-mehndi-600" />{venue.location}</p>
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
                        <Star className="w-5 h-5 text-mehndi-500 fill-mehndi-500" />
                        <span className="text-xl font-bold text-maroon-800">{venue.rating}</span>
                      </div>
                      <p className="text-sm text-maroon-400 mt-1">({venue.reviews} reviews)</p>
                    </div>
                  )
                },
                {
                  label: '👥 Mehmanon Ki Gunjaish',
                  render: (venue) => (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-maroon-800">{venue.capacity.min} - {venue.capacity.max}</p>
                      <p className="text-sm text-maroon-400">mehmaan</p>
                    </div>
                  )
                },
                {
                  label: '💰 Per Head Kharcha',
                  render: (venue) => (
                    <div className="text-center">
                      <p className="text-lg font-bold text-mehndi-600">{formatPrice(venue.pricing.perHead.min)} - {formatPrice(venue.pricing.perHead.max)}</p>
                    </div>
                  )
                },
                {
                  label: '🏛️ Hall Kiraya',
                  render: (venue) => (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-maroon-700">
                        {venue.pricing.hallRental > 0 ? formatPrice(venue.pricing.hallRental) : <span className="text-emerald-600">✅ Shamil hai</span>}
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
                          <span className="text-maroon-500">{pkg.name}</span>
                          <span className="font-medium text-maroon-700">{formatPrice(pkg.price)}</span>
                        </li>
                      ))}
                    </ul>
                  )
                },
                {
                  label: '🌸 Sajawat Packages',
                  render: (venue) => (
                    <ul className="space-y-2">
                      {venue.decorPackages.map((pkg, i) => (
                        <li key={i} className="flex justify-between text-sm">
                          <span className="text-maroon-500">{pkg.name}</span>
                          <span className="font-medium text-maroon-700">{formatPrice(pkg.price)}</span>
                        </li>
                      ))}
                    </ul>
                  )
                },
                {
                  label: '✨ Suholiyaat',
                  render: (venue) => (
                    <div className="flex flex-wrap gap-1.5">
                      {venue.amenities.map((a, i) => (
                        <span key={i} className="px-2 py-1 bg-cream-100 text-maroon-600 text-xs rounded-full border border-maroon-100">{a}</span>
                      ))}
                    </div>
                  )
                },
                {
                  label: '📞 Raabta',
                  render: (venue) => (
                    <div className="text-center text-sm">
                      <p className="text-maroon-600">{venue.contact.phone}</p>
                      <p className="text-maroon-400 truncate">{venue.contact.email}</p>
                    </div>
                  )
                },
              ].map((row, ri) => (
                <div key={ri}>
                  <div className="grid grid-cols-3 border-b border-maroon-100 bg-cream-50">
                    <div className="col-span-3 px-6 py-2.5 bg-gradient-to-r from-maroon-800 to-maroon-900 text-white text-sm font-medium tracking-wide">{row.label}</div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-maroon-100">
                    {compareVenues.map((venue, vi) => (
                      <div key={vi} className="p-5 border-r border-maroon-100 last:border-r-0">{row.render(venue)}</div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Actions */}
              <div className="grid grid-cols-3">
                {compareVenues.map((venue, i) => (
                  <div key={i} className="p-6 border-r border-maroon-100 last:border-r-0 space-y-3">
                    <Link href={`/marquees/${venue.slug}`}
                      className="block w-full py-3.5 bg-maroon-800 hover:bg-maroon-700 text-white text-center font-semibold rounded-xl transition-all"
                    >
                      🏛️ Details Dekhein
                    </Link>
                    <Link href={`/calculator?venue=${venue.slug}`}
                      className="block w-full py-3.5 bg-gradient-to-r from-mehndi-500 to-gold-500 hover:from-mehndi-400 hover:to-gold-400 text-maroon-900 text-center font-bold rounded-xl transition-all shadow-mehndi"
                    >
                      💰 Budget Nikalein
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-maroon-300" />
              </div>
              <h3 className="text-xl font-serif text-maroon-700 mb-2">Venues select karein compare karne ke liye ⚖️</h3>
              <p className="text-maroon-400">Upar se 3 venues chunein</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
