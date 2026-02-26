import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export default function ImageGallery({ images, title = 'Gallery' }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') navigateImage(1);
      if (e.key === 'ArrowLeft') navigateImage(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const navigateImage = (direction) => {
    setSelectedIndex(prev => {
      const newIndex = prev + direction;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
    setIsZoomed(false);
  };

  const openLightbox = (index) => {
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group shadow-sm hover:shadow-lg transition-all"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <ZoomIn className="text-white w-8 h-8 drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 bg-maroon-900/95 backdrop-blur-sm flex items-center justify-center"
          onClick={(e) => e.target === modalRef.current && setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-50 p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="absolute top-4 left-4 px-4 py-2 bg-maroon-800/60 backdrop-blur-sm rounded-full text-white text-sm border border-white/10">
            📷 {selectedIndex + 1} / {images.length}
          </div>

          <button
            onClick={() => navigateImage(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={() => navigateImage(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          <div
            className={`transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={images[selectedIndex]}
              alt={`${title} ${selectedIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => { setSelectedIndex(index); setIsZoomed(false); }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === selectedIndex ? 'border-mehndi-400 opacity-100 shadow-mehndi' : 'border-transparent opacity-40 hover:opacity-70'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
