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
        <title>Mere Pasandeedah 💖 | Lahore Shaadi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-maroon-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-0 right-0 w-96 h-96 bg-rani-500 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rani-500/10 backdrop-blur-sm rounded-full text-rani-300 text-xs tracking-widest uppercase mb-6 border border-rani-500/20">
            <Heart className="w-3.5 h-3.5 fill-current" /> 💖 Aapke Pasandeedah
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Mere <span className="bg-gradient-to-r from-rani-400 via-mehndi-400 to-gold-400 bg-clip-text text-transparent">Pasandeedah</span> 💝
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">Apne favourite venues yahin save karein aur aasani se compare karein</p>
        </div>
      </section>

      <section className="py-12 bg-cream-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          {favoriteVenues.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-maroon-600 text-sm">
                  <Heart className="inline w-5 h-5 text-rani-500 mr-2 fill-current" />
                  {favoriteVenues.length} venue{favoriteVenues.length !== 1 ? 's' : ''} save hain 💖
                </p>
                <Link href="/compare" className="flex items-center gap-2 px-5 py-2.5 bg-maroon-800 hover:bg-maroon-700 text-white rounded-xl transition-colors text-sm font-medium">
                  ⚖️ Sab Compare Karein <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteVenues.map((marquee) => (
                  <div key={marquee.id} className="relative">
                    <MarqueeCard marquee={marquee} />
                    <button onClick={() => toggleFavorite(marquee.slug)} className="absolute top-4 right-4 p-2.5 bg-rani-500 text-white rounded-full hover:bg-rani-600 transition-colors z-10 shadow-lg" title="Hatayein">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-maroon-300" />
              </div>
              <h2 className="text-2xl font-serif text-maroon-700 mb-3">Abhi koi favourite nahi hai 😔</h2>
              <p className="text-maroon-400 mb-8">Venues explore karein aur dil ❤️ ka button daba kar favourite mein shamil karein</p>
              <Link href="/marquees" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900 font-bold rounded-xl shadow-mehndi">
                <Sparkles className="w-5 h-5" /> 🏛️ Venues Dekhein
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
