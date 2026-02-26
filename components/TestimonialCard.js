import { Star, Quote } from 'lucide-react';
import Link from 'next/link';

export default function TestimonialCard({ testimonial, featured = false }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(80,0,20,0.12)] border ${
      featured ? 'border-mehndi-500/30 shadow-mehndi' : 'border-maroon-100 shadow-sm'
    }`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={testimonial.image}
          alt={testimonial.couple}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-serif text-white">{testimonial.couple}</h3>
          <p className="text-sm text-white/70">{testimonial.venue}</p>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900 text-xs font-bold rounded-full">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < testimonial.rating ? 'fill-mehndi-500 text-mehndi-500' : 'text-maroon-200'}`}
            />
          ))}
          <span className="ml-2 text-xs text-maroon-400">{testimonial.date}</span>
        </div>

        {/* Quote */}
        <div className="relative">
          <Quote className="absolute -top-2 -left-1 w-7 h-7 text-mehndi-500/20" />
          <p className="text-maroon-600 text-sm leading-relaxed pl-4 line-clamp-4">
            {testimonial.review}
          </p>
        </div>

        {/* Details */}
        <div className="mt-4 pt-4 border-t border-maroon-100 flex items-center justify-between text-sm">
          <div className="flex gap-4">
            <span className="text-maroon-400">
              <span className="font-semibold text-maroon-600">👥 {testimonial.guests}</span> mehmaan
            </span>
            <span className="text-maroon-400">
              <span className="font-semibold text-mehndi-600">💰 {testimonial.budget}</span>
            </span>
          </div>
          <Link 
            href={`/marquees/${testimonial.venueSlug}`}
            className="text-mehndi-600 hover:text-mehndi-700 font-medium"
          >
            Venue Dekhein →
          </Link>
        </div>

        {/* Highlights */}
        {testimonial.highlights && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {testimonial.highlights.map((highlight, i) => (
              <span key={i} className="px-2.5 py-1 bg-cream-100 text-maroon-500 text-xs rounded-full border border-maroon-100">
                {highlight}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
