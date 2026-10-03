import React from 'react';
import { Search, ShoppingCart, Phone, Truck, X } from 'lucide-react';
import { LOGO_IMG } from '../data/assets';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenTracker,
  onLogoClick,
}) => {
  return (
    <header className="bg-[#0b2a47] text-white pt-3 pb-2 px-3 sm:px-6 relative border-b border-sky-900/40">
      {/* Top Banner / Hotline */}
      <div className="flex flex-wrap items-center justify-between text-xs text-sky-200 pb-2 mb-2 border-b border-sky-900/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Showroom & Express Home Delivery Available</span>
          </span>
          <span className="hidden sm:inline text-sky-400">|</span>
          <span className="hidden sm:inline">Open 9:00 AM - 10:00 PM</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenTracker}
            className="flex items-center gap-1.5 hover:text-[#ffe600] transition-colors cursor-pointer text-xs"
          >
            <Truck className="w-3.5 h-3.5 text-[#ffe600]" />
            <span>Track Order</span>
          </button>
          <a
            href="tel:+8801700000000"
            className="flex items-center gap-1 hover:text-[#ffe600] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#ffe600]" />
            <span className="font-mono">+880 1700-000000</span>
          </a>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Title */}
        <div
          onClick={onLogoClick}
          className="flex-1 cursor-pointer select-none"
        >
          <h1 className="font-serif font-black text-xl sm:text-2xl md:text-3xl tracking-wider text-white uppercase drop-shadow leading-tight">
            WELCOM TO <span className="text-[#ffe600] drop-shadow-md">TAN TECH SUPPORT</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-sky-300 font-medium tracking-normal mt-0.5">
            Computers, Smart Gadgets, Showroom Vehicles & Digital Printing
          </p>
        </div>

        {/* Logo */}
        <div
          onClick={onLogoClick}
          className="shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          title="Tan Tech Support Home"
        >
          <img
            src={LOGO_IMG}
            alt="Tan Tech Support Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border-2 border-[#ffe600] shadow-md"
          />
        </div>
      </div>

      {/* Search Bar Row */}
      <div className="mt-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anything (Computer, Mobile, Mini UPS, Printing...)"
            className="w-full bg-[#5f7a94] text-white placeholder-slate-200 text-sm rounded-full pl-10 pr-9 py-2 border border-sky-400/30 focus:outline-none focus:ring-2 focus:ring-[#ffe600] focus:bg-[#526b83] transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-200 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Cart Button on Mobile Header */}
        <button
          onClick={onOpenCart}
          className="sm:hidden flex items-center justify-center gap-1.5 bg-[#ffd633] text-[#0d2d4e] px-3 py-2 rounded-full font-bold text-xs shadow-md active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{cartCount}</span>
        </button>
      </div>
    </header>
  );
};
