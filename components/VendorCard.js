import Link from 'next/link';
import { Star, MapPin, Phone } from 'lucide-react';
import { formatPrice } from '@/data/marquees';

export default function VendorCard({ vendor }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-maroon-100 group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 via-transparent to-transparent"></div>
        {vendor.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900 text-xs font-bold rounded-full tracking-wide uppercase">
            ⭐ Top Rated
          </div>
        )}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-maroon-900/60 backdrop-blur-sm rounded-full flex items-center gap-1 border border-white/10">
          <Star className="w-3.5 h-3.5 text-mehndi-400 fill-current" />
          <span className="text-sm font-semibold text-white">{vendor.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-maroon-800/80 backdrop-blur-sm text-cream-100 text-xs rounded-full border border-white/10">
            {vendor.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-serif font-semibold text-maroon-800 mb-1 group-hover:text-mehndi-600 transition-colors">{vendor.name}</h3>
        <p className="text-maroon-400 text-sm mb-4 line-clamp-2">{vendor.description}</p>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vendor.services.slice(0, 3).map((service, index) => (
            <span key={index} className="px-2.5 py-1 bg-cream-100 text-maroon-600 text-xs rounded-lg">
              {service}
            </span>
          ))}
          {vendor.services.length > 3 && (
            <span className="px-2.5 py-1 bg-mehndi-50 text-mehndi-700 text-xs rounded-lg font-medium">
              +{vendor.services.length - 3} aur
            </span>
          )}
        </div>

        {/* Price & Reviews */}
        <div className="flex items-center justify-between py-3 border-t border-maroon-100">
          <div>
            <p className="text-xs text-maroon-400">Starting from</p>
            <p className="text-lg font-bold text-mehndi-600">
              {formatPrice(vendor.priceRange.min)}
              {vendor.priceType && <span className="text-xs font-normal text-maroon-400">/{vendor.priceType}</span>}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-maroon-400">Reviews</p>
            <p className="text-lg font-semibold text-maroon-700">{vendor.reviews}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-3">
          <Link
            href={`/vendors/${vendor.slug}`}
            className="flex-1 px-4 py-2.5 bg-maroon-800 hover:bg-maroon-700 text-white text-center font-medium rounded-xl transition-all text-sm"
          >
            👤 Profile Dekhein
          </Link>
          <a
            href={`tel:${vendor.contact.phone}`}
            className="flex items-center justify-center w-11 h-11 border-2 border-mehndi-400 text-mehndi-600 hover:bg-mehndi-50 rounded-xl transition-all"
            title="Call karein"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
