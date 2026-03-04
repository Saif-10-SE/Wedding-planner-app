import { Star, Quote } from 'lucide-react';
import Link from 'next/link';

export default function TestimonialCard({ testimonial, featured = false, darkMode = false }) {
  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-1 border ${
      darkMode 
        ? 'bg-white/5 border-white/8 hover:border-white/15 hover:bg-white/8 hover:shadow-luxury' 
        : featured 
          ? 'bg-white border-accent-200 shadow-luxury-md hover:shadow-luxury-lg' 
          : 'bg-white border-neutral-200/60 shadow-luxury hover:shadow-luxury-md'
    }`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={testimonial.image}
          alt={testimonial.couple}
          className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-serif text-white">{testimonial.couple}</h3>
          <p className="text-sm text-white/50 font-light">{testimonial.venue}</p>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-accent-500 text-white text-xs font-medium rounded-full tracking-wide">
            Featured
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
              className={`w-4 h-4 ${i < testimonial.rating 
                ? 'fill-accent-500 text-accent-500' 
                : darkMode ? 'text-white/15' : 'text-neutral-200'
              }`}
            />
          ))}
          <span className={`ml-2 text-xs ${darkMode ? 'text-white/30' : 'text-primary-400'} font-light`}>{testimonial.date}</span>
        </div>

        {/* Quote */}
        <div className="relative">
          <Quote className={`absolute -top-2 -left-1 w-7 h-7 ${darkMode ? 'text-accent-400/15' : 'text-accent-500/15'}`} />
          <p className={`text-sm leading-relaxed pl-4 line-clamp-4 font-light ${darkMode ? 'text-white/45' : 'text-primary-500'}`}>
            {testimonial.review}
          </p>
        </div>

        {/* Details */}
        <div className={`mt-4 pt-4 border-t flex items-center justify-between text-sm ${darkMode ? 'border-white/8' : 'border-neutral-200/60'}`}>
          <div className="flex gap-4">
            <span className={`${darkMode ? 'text-white/30' : 'text-primary-400'} font-light`}>
              <span className={`font-medium ${darkMode ? 'text-white/50' : 'text-primary-600'}`}>👥 {testimonial.guests}</span> guests
            </span>
            <span className={`${darkMode ? 'text-white/30' : 'text-primary-400'} font-light`}>
              <span className={`font-medium ${darkMode ? 'text-accent-400' : 'text-accent-600'}`}>💰 {testimonial.budget}</span>
            </span>
          </div>
          <Link 
            href={`/marquees/${testimonial.venueSlug}`}
            className={`font-medium text-xs ${darkMode ? 'text-accent-400 hover:text-accent-300' : 'text-accent-600 hover:text-accent-700'} transition-colors`}
          >
            View Venue →
          </Link>
        </div>

        {/* Highlights */}
        {testimonial.highlights && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {testimonial.highlights.map((highlight, i) => (
              <span key={i} className={`px-2.5 py-1 text-xs rounded-full ${
                darkMode 
                  ? 'bg-white/5 text-white/35 border border-white/8' 
                  : 'bg-neutral-100 text-primary-500 border border-neutral-200/50'
              }`}>
                {highlight}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
