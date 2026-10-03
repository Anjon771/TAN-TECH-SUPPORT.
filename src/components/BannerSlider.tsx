import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { SLIDE_IMGS } from '../data/assets';

interface BannerSliderProps {
  onExploreProducts: () => void;
  onExplorePrinting: () => void;
  onExploreShowroom: () => void;
}

export const BannerSlider: React.FC<BannerSliderProps> = ({
  onExploreProducts,
  onExplorePrinting,
  onExploreShowroom,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slidesData = [
    {
      img: SLIDE_IMGS[0],
      title: 'Mega Tech & Computer Deals',
      subtitle: 'Get genuine accessories & hardware with up to 35% discount',
      badge: '10% - 35% OFF',
      btnText: 'Explore Products',
      action: onExploreProducts,
    },
    {
      img: SLIDE_IMGS[1],
      title: 'Digital Printing Solutions',
      subtitle: 'Custom smart ID cards, banners, ceramic mugs & t-shirts',
      badge: 'HD Print Quality',
      btnText: 'Printing Services',
      action: onExplorePrinting,
    },
    {
      img: SLIDE_IMGS[2],
      title: 'Showroom Vehicles & Power Units',
      subtitle: 'Smart electric bikes, cargo vans & mobile solar hubs',
      badge: 'Showroom Booking',
      btnText: 'Book Showroom',
      action: onExploreShowroom,
    },
  ];

  // Auto slide effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, slidesData.length]);

  return (
    <div
      className="px-2 sm:px-4 pt-3 pb-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3-column / Featured Carousel Grid as in original layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {slidesData.map((slide, idx) => {
          const isActive = currentSlide === idx;
          return (
            <div
              key={idx}
              className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-md ${
                isActive
                  ? 'border-[#ffe600] ring-2 ring-yellow-400/40 scale-[1.01]'
                  : 'border-sky-800/60 opacity-85 hover:opacity-100 hover:border-yellow-200'
              }`}
            >
              <div className="h-40 sm:h-44 w-full relative overflow-hidden bg-slate-900 group">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a47] via-[#0b2a47]/50 to-transparent"></div>

                {/* Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#ffd633] text-[#0d2d4e] px-2 py-0.5 rounded text-[11px] font-bold shadow">
                  <Tag className="w-3 h-3" />
                  <span>{slide.badge}</span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="font-bold text-sm text-[#ffe600] line-clamp-1">
                    {slide.title}
                  </h4>
                  <p className="text-[11px] text-sky-200 line-clamp-1 mb-1.5">
                    {slide.subtitle}
                  </p>
                  <button
                    onClick={slide.action}
                    className="flex items-center gap-1 bg-[#0d2d4e] hover:bg-[#163f69] text-[#ffe600] border border-yellow-400/60 px-2.5 py-1 rounded text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                  >
                    <span>{slide.btnText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide controller indicators */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length)}
          className="p-1 rounded-full bg-sky-950/70 hover:bg-sky-900 text-yellow-300 transition-colors"
          title="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {slidesData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === i ? 'w-6 bg-[#ffe600]' : 'w-2 bg-sky-700 hover:bg-sky-500'
              }`}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slidesData.length)}
          className="p-1 rounded-full bg-sky-950/70 hover:bg-sky-900 text-yellow-300 transition-colors"
          title="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
