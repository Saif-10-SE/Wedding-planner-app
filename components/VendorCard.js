import Link from 'next/link';
import { Star, MapPin, Phone } from 'lucide-react';
import { formatPrice } from '@/data/marquees';

export default function VendorCard({ vendor }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-700 border border-neutral-200/60 group hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent"></div>
        {vendor.featured && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent-500 text-white text-xs font-medium rounded-full tracking-wide">
            Top Rated
          </div>
        )}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-lg flex items-center gap-1.5 border border-white/10">
          <Star className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
          <span className="text-sm font-semibold text-white">{vendor.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-white/15 backdrop-blur-md text-white text-xs rounded-lg border border-white/10 font-medium">
            {vendor.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-serif font-semibold text-primary-900 mb-1 group-hover:text-accent-700 transition-colors duration-500">{vendor.name}</h3>
        <p className="text-primary-400 text-sm mb-4 line-clamp-2 font-light">{vendor.description}</p>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vendor.services.slice(0, 3).map((service, index) => (
            <span key={index} className="px-2.5 py-1 bg-neutral-100 text-primary-600 text-xs rounded-lg font-medium">
              {service}
            </span>
          ))}
          {vendor.services.length > 3 && (
            <span className="px-2.5 py-1 bg-accent-50 text-accent-700 text-xs rounded-lg font-medium">
              +{vendor.services.length - 3} more
            </span>
          )}
        </div>

        {/* Price & Reviews */}
        <div className="flex items-center justify-between py-3 border-t border-neutral-200/60">
          <div>
            <p className="text-[10px] text-primary-400 uppercase tracking-widest">Starting from</p>
            <p className="text-lg font-serif font-semibold text-primary-900">
              {formatPrice(vendor.priceRange.min)}
              {vendor.priceType && <span className="text-xs font-normal text-primary-400">/{vendor.priceType}</span>}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-primary-400 uppercase tracking-widest">Reviews</p>
            <p className="text-lg font-semibold text-primary-700">{vendor.reviews}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-3">
          <Link
            href={`/vendors/${vendor.slug}`}
            className="flex-1 px-4 py-2.5 bg-primary-950 hover:bg-primary-800 text-white text-center font-medium rounded-xl transition-all duration-500 text-sm"
          >
            View Profile
          </Link>
          <a
            href={`tel:${vendor.contact.phone}`}
            className="flex items-center justify-center w-11 h-11 border border-neutral-300 text-primary-500 hover:bg-accent-50 hover:border-accent-300 hover:text-accent-600 rounded-xl transition-all duration-500"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
