import React from 'react';
import { Menu, ShoppingCart, Sparkles } from 'lucide-react';

interface NavbarProps {
  onToggleDrawer: () => void;
  onOpenCart: () => void;
  cartCount: number;
  cartTotal: number;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleDrawer,
  onOpenCart,
  cartCount,
  cartTotal,
  activeSection,
  onNavigate,
}) => {
  return (
    <nav className="flex items-center bg-[#ffd633] h-10 px-2 sm:px-4 shadow-sm sticky top-0 z-30 select-none">
      {/* Hamburger Menu Icon */}
      <button
        onClick={onToggleDrawer}
        className="flex items-center justify-center w-8 h-8 rounded text-[#0d2d4e] hover:bg-yellow-400 active:scale-95 transition-all cursor-pointer"
        title="Open menu"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 font-bold" />
      </button>

      {/* Spacer */}
      <div className="flex-1 px-2 hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#0d2d4e]">
        <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
        <span>Tan Tech Support - Genuine Products & Trusted Services</span>
      </div>
      <div className="flex-1 md:hidden"></div>

      {/* Links container */}
      <div className="flex items-center bg-[#a89a1c] h-full px-2 sm:px-4 gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm font-medium">
        <button
          onClick={() => onNavigate('top')}
          className={`text-white hover:text-[#ffe600] transition-colors py-1 cursor-pointer ${
            activeSection === 'top' ? 'text-[#ffe600] font-bold underline underline-offset-4' : ''
          }`}
        >
          Home
        </button>

        <button
          onClick={onToggleDrawer}
          className="text-white hover:text-[#ffe600] transition-colors py-1 cursor-pointer"
        >
          Menu
        </button>

        <button
          onClick={() => onNavigate('print')}
          className={`text-white hover:text-[#ffe600] transition-colors py-1 cursor-pointer ${
            activeSection === 'print' ? 'text-[#ffe600] font-bold underline underline-offset-4' : ''
          }`}
        >
          Printing Service
        </button>

        <button
          onClick={() => onNavigate('products')}
          className={`text-white hover:text-[#ffe600] transition-colors py-1 cursor-pointer ${
            activeSection === 'products' ? 'text-[#ffe600] font-bold underline underline-offset-4' : ''
          }`}
        >
          Products
        </button>
      </div>

      {/* Cart Button */}
      <button
        onClick={onOpenCart}
        id="cartBtn"
        className="bg-[#0d2d4e] text-[#ffe600] h-full px-3 sm:px-4 ml-1 flex items-center gap-1.5 font-bold text-xs sm:text-sm hover:bg-[#123861] active:scale-95 transition-all cursor-pointer border-l-2 border-yellow-400"
      >
        <ShoppingCart className="w-4 h-4" />
        <span className="hidden sm:inline">Cart</span>
        <span className="bg-[#ffe600] text-[#0d2d4e] text-xs px-1.5 py-0.2 rounded-full font-black min-w-[20px] text-center">
          {cartCount}
        </span>
        {cartTotal > 0 && (
          <span className="hidden md:inline text-white/90 text-xs font-mono ml-1">
            ৳{cartTotal.toLocaleString()}
          </span>
        )}
      </button>
    </nav>
  );
};
