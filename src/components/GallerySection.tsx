import React from 'react';
import { Printer, Eye, ShoppingBag } from 'lucide-react';
import { PRINT_DESIGNS } from '../data/mockData';
import { PrintDesign } from '../types';

interface GallerySectionProps {
  onSelectPrintDesign: (design: PrintDesign) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onSelectPrintDesign,
}) => {
  return (
    <div className="bg-[#5a768e] p-3 sm:p-4 rounded-tl-lg shadow-inner">
      <div className="flex items-center justify-between mb-3 pb-1 border-b border-sky-300/30">
        <div className="flex items-center gap-2">
          <Printer className="w-5 h-5 text-[#ffe600]" />
          <h2 className="text-white font-bold text-sm sm:text-base">
            Printing Service Gallery & Custom Designs
          </h2>
        </div>
        <span className="text-[11px] text-yellow-200 bg-sky-950/60 px-2 py-0.5 rounded">
          Click to Customize
        </span>
      </div>

      {/* Grid matching g1 to g7 from original prototype */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {PRINT_DESIGNS.map((design, idx) => {
          const isLarge = idx === 6; // g7 spans 2 columns
          return (
            <div
              key={design.id}
              onClick={() => onSelectPrintDesign(design)}
              className={`group relative bg-[#0d2d4e] rounded-md overflow-hidden border border-sky-400/40 hover:border-[#ffe600] transition-all cursor-pointer shadow hover:shadow-lg hover:-translate-y-0.5 ${
                isLarge ? 'col-span-2' : 'col-span-1'
              }`}
            >
              {/* Image Container */}
              <div className={`w-full overflow-hidden bg-slate-900 relative ${isLarge ? 'h-32 sm:h-36' : 'h-24 sm:h-28'}`}>
                <img
                  src={design.imageKey}
                  alt={design.title}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                <span className="absolute top-1.5 right-1.5 bg-[#ffd633]/90 text-[#0d2d4e] text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm backdrop-blur-xs">
                  {design.category}
                </span>
              </div>

              {/* Hover / Interactive Action Overlay - Target of CSS selector */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2a47]/95 via-[#0b2a47]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-end p-2 pb-3 text-center text-white backdrop-blur-[2px]">
                <p className="text-xs font-bold text-[#ffe600] line-clamp-1 mb-1 drop-shadow-sm">
                  {design.bengaliTitle}
                </p>
                <div className="flex items-center gap-1.5 bg-[#ffd633] hover:bg-[#ffe600] text-[#0d2d4e] px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-md active:scale-95 transition-transform">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Customize & Order</span>
                </div>
              </div>

              {/* Footer Label */}
              <div className="p-1.5 bg-[#0b233a] flex items-center justify-between text-[11px]">
                <span className="text-slate-200 font-medium truncate pr-1">
                  {design.bengaliTitle}
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
