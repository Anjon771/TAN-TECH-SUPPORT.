import React, { useState } from 'react';
import { Printer, Eye, Camera, Sparkles, Image as ImageIcon } from 'lucide-react';
import { PRINT_DESIGNS } from '../data/mockData';
import { PrintDesign } from '../types';

interface GallerySectionProps {
  onSelectPrintDesign: (design: PrintDesign) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onSelectPrintDesign,
}) => {
  // Active preview image index per print design
  const [activeImageMap, setActiveImageMap] = useState<Record<string, number>>({});

  const handleThumbnailHover = (e: React.MouseEvent, designId: string, idx: number) => {
    e.stopPropagation();
    setActiveImageMap((prev) => ({ ...prev, [designId]: idx }));
  };

  return (
    <div className="bg-[#5a768e] p-3 sm:p-4 rounded-tl-lg shadow-inner">
      <div className="flex items-center justify-between mb-3 pb-1 border-b border-sky-300/30">
        <div className="flex items-center gap-2">
          <Printer className="w-5 h-5 text-[#ffe600]" />
          <h2 className="text-white font-bold text-sm sm:text-base">
            Printing Service Gallery &amp; Custom Designs
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-yellow-200 bg-sky-950/70 border border-yellow-400/30 px-2 py-0.5 rounded shadow-sm">
            <Camera className="w-3 h-3 text-[#ffe600]" />
            Upload Your Own Photo &amp; Art
          </span>
          <span className="text-[11px] font-semibold text-yellow-300 bg-sky-950/60 px-2 py-0.5 rounded">
            Click to Customize
          </span>
        </div>
      </div>

      {/* Grid matching g1 to g7 from original prototype */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {PRINT_DESIGNS.map((design, idx) => {
          const isLarge = idx === 6; // g7 spans 2 columns
          const images = design.galleryImages && design.galleryImages.length > 0 
            ? design.galleryImages 
            : [design.imageKey];
          const activeIndex = activeImageMap[design.id] || 0;
          const currentImg = images[activeIndex] || design.imageKey;

          return (
            <div
              key={design.id}
              onClick={() => onSelectPrintDesign(design)}
              className={`group relative bg-[#0d2d4e] rounded-md overflow-hidden border border-sky-400/40 hover:border-[#ffe600] transition-all cursor-pointer shadow hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between ${
                isLarge ? 'col-span-2' : 'col-span-1'
              }`}
            >
              {/* Image Container - 1st div child */}
              <div className={`w-full overflow-hidden bg-slate-900 relative ${isLarge ? 'h-36 sm:h-44' : 'h-28 sm:h-36'}`}>
                <img
                  src={currentImg}
                  alt={design.title}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                {/* Top Tags & Badges */}
                <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none z-10">
                  <span className="bg-[#ffd633] text-[#0d2d4e] text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                    {design.category}
                  </span>
                  {design.badge && (
                    <span className="bg-red-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                      {design.badge}
                    </span>
                  )}
                </div>

                {/* Multiple Images Indicator / Thumbnail Selector */}
                {images.length > 1 && (
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between z-10 pointer-events-auto">
                    <span className="bg-black/70 backdrop-blur-xs text-yellow-300 text-[9px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1 shadow">
                      <ImageIcon className="w-2.5 h-2.5" />
                      <span>{images.length} Photos</span>
                    </span>
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-full">
                      {images.map((img, imgIdx) => (
                        <button
                          key={imgIdx}
                          type="button"
                          onMouseEnter={(e) => handleThumbnailHover(e, design.id, imgIdx)}
                          onClick={(e) => handleThumbnailHover(e, design.id, imgIdx)}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            activeIndex === imgIdx
                              ? 'bg-[#ffe600] scale-125'
                              : 'bg-white/60 hover:bg-white'
                          }`}
                          title={`View photo ${imgIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hover / Interactive Action Overlay - 2nd div child (Target of CSS selector) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a47]/95 via-[#0b2a47]/60 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-end p-2 pb-2.5 text-center text-white backdrop-blur-[1px]">
                <p className="text-xs font-bold text-[#ffe600] line-clamp-1 mb-1 drop-shadow-sm">
                  {design.title}
                </p>
                <div className="flex items-center gap-1.5 bg-[#ffd633] hover:bg-[#ffe600] text-[#0d2d4e] px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-md active:scale-95 transition-transform">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Customize &amp; Order</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-sky-200 mt-1">
                  <Camera className="w-3 h-3 text-[#ffe600]" />
                  <span>Add your photo &amp; logo</span>
                </div>
              </div>

              {/* Footer Label - 3rd div child */}
              <div className="p-1.5 bg-[#0b233a] flex items-center justify-between text-[11px] border-t border-sky-900/60">
                <span className="text-slate-200 font-medium truncate pr-1">
                  {design.title}
                </span>
                <span className="text-[#ffe600] font-bold font-mono shrink-0">
                  ৳{design.basePrice}/{design.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
