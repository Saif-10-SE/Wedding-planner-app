import { useWedding } from '@/context/WeddingContext';
import { X, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { formatPrice } from '@/data/marquees';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, searchQuery, searchResults, performSearch } = useWedding();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-primary-950/60 backdrop-blur-md flex items-start justify-center pt-20 px-4"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-luxury-xl overflow-hidden animate-fadeIn border border-neutral-200/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-neutral-200 px-4">
          <Search className="w-5 h-5 text-primary-300" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => performSearch(e.target.value)}
            placeholder="Search venues, locations, amenities..."
            className="flex-1 px-4 py-4 text-lg outline-none text-primary-900 placeholder:text-primary-300 font-light"
          />
          <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-primary-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {searchQuery && searchResults.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-primary-500">No results found for &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-sm mt-2 text-primary-400 font-light">Try searching by venue name, area, or amenities</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="p-4">
              <p className="text-sm text-primary-400 mb-3 font-light">{searchResults.length} venues found</p>
              <div className="space-y-1">
                {searchResults.map((venue) => (
                  <Link
                    key={venue.id}
                    href={`/marquees/${venue.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                  >
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-semibold text-primary-900 truncate group-hover:text-accent-700 transition-colors">{venue.name}</h3>
                      <p className="text-sm text-primary-400 truncate font-light">{venue.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-neutral-100 text-primary-600 rounded-full">{venue.area}</span>
                        <span className="text-xs text-primary-400 font-light">from {formatPrice(venue.pricing.perHead.min)}/head</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-accent-500">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="font-semibold text-primary-700">{venue.rating}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!searchQuery && (
            <div className="p-6">
              <p className="text-[11px] text-primary-400 mb-4 uppercase tracking-[0.2em] font-medium">Quick Search</p>
              <div className="flex flex-wrap gap-2">
                {['Royal Palm', 'PC Marquee', 'DHA', 'Gulberg', 'Mall Road', '5-Star', 'Lawn', 'Budget Friendly'].map((term) => (
                  <button
                    key={term}
                    onClick={() => performSearch(term)}
                    className="px-4 py-2 bg-neutral-100 hover:bg-accent-50 hover:text-accent-700 text-primary-600 rounded-full text-sm transition-colors font-light"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 px-4 py-3 bg-neutral-50 flex items-center justify-between text-xs text-primary-400">
          <span className="font-light">Press <kbd className="px-2 py-1 bg-white rounded border border-neutral-200 text-primary-600 font-medium">Esc</kbd> to close</span>
          <span className="font-light"><kbd className="px-2 py-1 bg-white rounded border border-neutral-200 text-primary-600 font-medium">Ctrl</kbd> + <kbd className="px-2 py-1 bg-white rounded border border-neutral-200 text-primary-600 font-medium">K</kbd> to search</span>
        </div>
      </div>
    </div>
  );
}

function Star({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
