import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { formatPriceShort, getCategoryBadge } from '@/data/marquees';
import FavoriteButton from './FavoriteButton';
import CompareButton from './CompareButton';
import { MapPin, Users, Star, ArrowRight, ImageOff } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80&fit=crop&auto=format';

export default function MarqueeCard({ marquee }) {
  const catInfo = getCategoryBadge(marquee.category);
  const [imgSrc, setImgSrc] = useState(marquee.image);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setImgSrc(marquee.image);
    setImgLoaded(false);
    setImgError(false);
  }, [marquee.image]);

  useEffect(() => {
    const imageElement = imgRef.current;
    if (!imageElement) return;

    if (imageElement.complete && imageElement.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [imgSrc]);

  const handleImageError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgLoaded(false);
      setImgError(false);
      setImgSrc(FALLBACK_IMAGE);
    } else {
      setImgLoaded(true);
      setImgError(true);
    }
  };
  
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200/60 shadow-luxury hover:shadow-luxury-lg transition-all duration-700 hover:-translate-y-1">

      {/* Image */}
      <div className="relative h-60 overflow-hidden bg-neutral-100">
        {/* Skeleton shimmer while loading */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-pulse" />
        )}
        
        {/* Error state */}
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 text-neutral-400">
            <ImageOff className="w-10 h-10 mb-2 opacity-50" />
            <span className="text-xs font-medium">Image unavailable</span>
          </div>
        ) : (
          <img 
            ref={imgRef}
            src={imgSrc} 
            alt={marquee.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={handleImageError}
          />
        )}
        
        {/* Gradient Overlay - darkens on hover for CTA reveal */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-primary-950/10 to-transparent transition-opacity duration-400 group-hover:from-primary-950/80 group-hover:via-primary-950/20"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-sm ${
            marquee.category === 'A+' 
              ? 'bg-accent-500/90 text-white' 
              : marquee.category === 'A'
              ? 'bg-primary-950/70 text-white border border-white/10'
              : marquee.category === 'B'
              ? 'bg-white/80 text-primary-900'
              : 'bg-white/60 text-primary-700'
          }`}>
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
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-lg border border-white/10">
            <Star className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
            <span className="text-sm font-semibold text-white">{marquee.rating}</span>
          </div>
          <span className="text-xs text-white/50">({marquee.reviews} reviews)</span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-white/15 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/10">
            <p className="text-[10px] text-white/45 uppercase tracking-wider">From</p>
            <p className="text-sm font-semibold text-white">{formatPriceShort(marquee.pricing.perHead.min)}<span className="text-white/40 font-normal text-xs">/head</span></p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-serif font-semibold text-primary-900 mb-1.5 group-hover:text-accent-700 transition-colors duration-500 line-clamp-1">
          {marquee.name}
        </h3>
        
        <div className="flex items-center text-primary-400 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary-300" />
          {marquee.location}
        </div>

        <p className="text-primary-400 text-sm mb-5 line-clamp-2 leading-relaxed font-light">
          {marquee.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5 py-4 border-t border-b border-neutral-200/60">
          <div>
            <p className="text-[10px] text-primary-400 uppercase tracking-widest mb-0.5">Capacity</p>
            <p className="text-sm font-semibold text-primary-700 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-primary-300" />
              {marquee.capacity.min.toLocaleString()} - {marquee.capacity.max.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-primary-400 uppercase tracking-widest mb-0.5">Price Range</p>
            <p className="text-sm font-semibold text-primary-600">
              {formatPriceShort(marquee.pricing.perHead.min)} - {formatPriceShort(marquee.pricing.perHead.max)}
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {marquee.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 bg-neutral-100 text-primary-600 text-[11px] rounded-lg font-medium"
            >
              {amenity}
            </span>
          ))}
          {marquee.amenities.length > 3 && (
            <span className="px-2.5 py-1 bg-accent-50 text-accent-700 text-[11px] rounded-lg font-medium">
              +{marquee.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link 
            href={`/marquees/${marquee.slug}`}
            className="flex-1 px-4 py-3 bg-primary-950 hover:bg-primary-800 text-white text-center font-medium rounded-xl transition-all duration-500 text-sm group/btn flex items-center justify-center gap-2"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link 
            href={`/calculator?venue=${marquee.slug}`}
            className="px-4 py-3 border border-neutral-300 text-primary-600 hover:bg-neutral-50 hover:border-primary-400 font-medium rounded-xl transition-all duration-500 text-sm"
          >
            Calculate
          </Link>
        </div>
      </div>
    </div>
  );
}
