import Link from 'next/link';
import { formatPriceShort, getCategoryBadge } from '@/data/marquees';
import FavoriteButton from './FavoriteButton';
import CompareButton from './CompareButton';
import { MapPin, Users, Star, ArrowRight } from 'lucide-react';

export default function MarqueeCard({ marquee }) {
  const catInfo = getCategoryBadge(marquee.category);
  
  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden card-luxury ${catInfo.cardClass}`}>
      {/* Category accent line on top */}
      <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{
        background: marquee.category === 'A+' 
          ? 'linear-gradient(90deg, #c9a84c, #e8d5a3, #c9a84c)' 
          : marquee.category === 'A'
          ? 'linear-gradient(90deg, #5a0a1e, #8a1538, #5a0a1e)'
          : marquee.category === 'B'
          ? 'linear-gradient(90deg, #d63384, #e685b5, #d63384)'
          : 'linear-gradient(90deg, #047857, #34d399, #047857)'
      }}></div>

      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={marquee.image} 
          alt={marquee.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/70 via-black/20 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ${catInfo.badgeClass}`}>
            <span>{catInfo.icon}</span>
            {catInfo.label}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <FavoriteButton slug={marquee.slug} size="sm" />
          <CompareButton slug={marquee.slug} size="sm" />
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-maroon-900/60 backdrop-blur-sm rounded-lg border border-white/10">
            <Star className="w-3.5 h-3.5 text-mehndi-400 fill-mehndi-400" />
            <span className="text-sm font-bold text-white">{marquee.rating}</span>
          </div>
          <span className="text-xs text-white/60">({marquee.reviews} reviews)</span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-maroon-900/60 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
            <p className="text-[10px] text-white/50 uppercase tracking-wider">From</p>
            <p className="text-sm font-bold text-mehndi-400">{formatPriceShort(marquee.pricing.perHead.min)}<span className="text-white/50 font-normal text-xs">/head</span></p>
          </div>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 shimmer"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-serif font-semibold text-maroon-800 mb-1.5 group-hover:text-mehndi-600 transition-colors duration-300 line-clamp-1">
          {marquee.name}
        </h3>
        
        <div className="flex items-center text-maroon-400 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-mehndi-500/60" />
          {marquee.location}
        </div>

        <p className="text-maroon-500 text-sm mb-5 line-clamp-2 leading-relaxed">
          {marquee.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5 py-4 border-t border-b border-maroon-100">
          <div>
            <p className="text-[10px] text-maroon-400 uppercase tracking-widest mb-0.5">Gunjaish 👥</p>
            <p className="text-sm font-semibold text-maroon-700 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-mehndi-500/70" />
              {marquee.capacity.min.toLocaleString()} - {marquee.capacity.max.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-maroon-400 uppercase tracking-widest mb-0.5">Qeemat 💰</p>
            <p className="text-sm font-semibold text-mehndi-600">
              {formatPriceShort(marquee.pricing.perHead.min)} - {formatPriceShort(marquee.pricing.perHead.max)}
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {marquee.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 bg-cream-100 text-maroon-600 text-[11px] rounded-lg font-medium"
            >
              {amenity}
            </span>
          ))}
          {marquee.amenities.length > 3 && (
            <span className="px-2.5 py-1 bg-mehndi-50 text-mehndi-700 text-[11px] rounded-lg font-medium">
              +{marquee.amenities.length - 3} aur
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link 
            href={`/marquees/${marquee.slug}`}
            className="flex-1 px-4 py-3 bg-maroon-800 hover:bg-maroon-700 text-white text-center font-semibold rounded-xl transition-all duration-300 text-sm group/btn flex items-center justify-center gap-2"
          >
            🏛️ Details Dekhein
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href={`/calculator?venue=${marquee.slug}`}
            className="px-4 py-3 border-2 border-mehndi-500/30 text-mehndi-600 hover:bg-mehndi-50 hover:border-mehndi-500/50 font-semibold rounded-xl transition-all duration-300 text-sm"
          >
            💰 Budget
          </Link>
        </div>
      </div>
    </div>
  );
}
