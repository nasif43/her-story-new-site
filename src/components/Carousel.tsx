import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CarouselProps {
  images: string[];
}

export const PhotoCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', dragFree: true },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );
  
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Handle escape key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedImage(null);
    };
    if (expandedImage) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedImage]);

  return (
    <div className="relative group">
      {/* Viewport */}
      <div className="overflow-hidden py-4" ref={emblaRef}>
        <div className="flex touch-pan-y flex-row ml-[-1rem]">
          {images.map((src, index) => (
            <div 
              key={index} 
              className="min-w-0 flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_35%] pl-4"
            >
              <div 
                className="relative h-64 md:h-80 overflow-hidden rounded-2xl cursor-pointer shadow-lg border border-white/10"
                onClick={() => setExpandedImage(src)}
              >
                <img
                  src={src}
                  alt={`Carousel slide ${index + 1}`}
                  className="absolute block top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 border border-white/20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 border border-white/20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Expanded Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 animate-in fade-in"
          onClick={() => setExpandedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={expandedImage} 
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
            alt="Expanded view" 
          />
          <div className="text-white/80 font-space text-sm mt-4 tracking-wider uppercase text-center bg-white/5 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/10">
            Photo Credit: Shadab Shahrokh Hai / HerStory Foundation
          </div>
        </div>
      )}
    </div>
  );
};
