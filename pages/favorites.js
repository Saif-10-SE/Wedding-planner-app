import Head from 'next/head';
import Link from 'next/link';
import { useWedding } from '@/context/WeddingContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarqueeCard from '@/components/MarqueeCard';
import { Heart, Trash2, ArrowRight, Sparkles, Crown } from 'lucide-react';

export default function Favorites() {
  const { favorites, getFavoriteVenues, toggleFavorite } = useWedding();
  const favoriteVenues = getFavoriteVenues();

  return (
    <>
      <Head>
        <title>My Favorites 💖 | Wedify</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e0338 0%, #4a0e2b 50%, #1e0338 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-20"><div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-[120px] translate-x-1/2 -translate-y-1/2"></div><div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500 rounded-full filter blur-[100px] -translate-x-1/2 translate-y-1/2"></div></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 backdrop-blur-sm rounded-full text-pink-300 text-xs tracking-widest uppercase mb-6 border border-pink-500/20">
            <Heart className="w-3.5 h-3.5 fill-current" /> Your Favorites
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            My <span className="bg-gradient-to-r from-pink-400 via-accent-400 to-pink-400 bg-clip-text text-transparent">Favorites</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto font-light">Save your favourite venues here and easily compare them</p>
        </div>
      </section>

      <section className="py-12 min-h-[60vh]" style={{ background: 'linear-gradient(180deg, #f8f6f2 0%, #f5f0e8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          {favoriteVenues.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-primary-600 text-sm">
                  <Heart className="inline w-5 h-5 text-rose-500 mr-2 fill-current" />
                  {favoriteVenues.length} venue{favoriteVenues.length !== 1 ? 's' : ''} saved
                </p>
                <Link href="/compare" className="flex items-center gap-2 px-5 py-2.5 bg-primary-950 hover:bg-maroon-800 text-white rounded-xl transition-colors text-sm font-medium shadow-lg hover:shadow-maroon">
                  Compare All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteVenues.map((marquee) => (
                  <div key={marquee.id} className="relative">
                    <MarqueeCard marquee={marquee} />
                    <button onClick={() => toggleFavorite(marquee.slug)} className="absolute top-4 right-4 p-2.5 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors z-10 shadow-lg" title="Remove">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-primary-300" />
              </div>
              <h2 className="text-2xl font-serif text-primary-700 mb-3">No favorites yet 😔</h2>
              <p className="text-primary-400 mb-8">Explore venues and tap the ❤️ button to add to your favorites</p>
              <Link href="/marquees" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 font-bold rounded-xl shadow-lg">
                <Sparkles className="w-5 h-5" /> 🏛️ View Venues
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
