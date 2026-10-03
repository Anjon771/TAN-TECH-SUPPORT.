import React from 'react';
import { X, Home, Printer, ShoppingBag, Smartphone, Laptop, Keyboard, Mouse, Car, PhoneCall, Truck } from 'lucide-react';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  onSelectCategoryItem: (keyword: string) => void;
  onOpenShowroomOrder: () => void;
  onOpenTracker: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectCategoryItem,
  onOpenShowroomOrder,
  onOpenTracker,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#ffd633] text-[#222] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-4 bg-[#e6c12c] flex items-center justify-between border-b border-yellow-600/30">
          <div>
            <h3 className="font-serif font-black text-lg text-[#0d2d4e]">
              TAN TECH SUPPORT
            </h3>
            <p className="text-[11px] text-slate-800 font-medium">Menu &amp; Categories</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#0d2d4e] hover:bg-yellow-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links from prototype */}
        <div className="flex-1 overflow-y-auto py-2 divide-y divide-yellow-600/20 text-sm font-semibold">
          <div className="py-1">
            <button
              onClick={() => {
                onNavigate('top');
                onClose();
              }}
              className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-[#111]"
            >
              <Home className="w-4 h-4 text-[#0d2d4e]" />
              <span>🏠 Home</span>
            </button>

            <button
              onClick={() => {
                onNavigate('print');
                onClose();
              }}
              className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-[#111]"
            >
              <Printer className="w-4 h-4 text-[#0d2d4e]" />
              <span>🖨 Printing Service</span>
            </button>

            <button
              onClick={() => {
                onNavigate('products');
                onClose();
              }}
              className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-[#111]"
            >
              <ShoppingBag className="w-4 h-4 text-[#0d2d4e]" />
              <span>🛍 All Products</span>
            </button>
          </div>

          {/* Direct Category jumps matching original prototype data-cat */}
          <div className="py-1">
            <div className="px-4 py-1 text-[11px] font-bold text-yellow-900 uppercase tracking-wider">
              Quick Categories
            </div>

            <button
              onClick={() => {
                onSelectCategoryItem('moballe');
                onClose();
              }}
              className="w-full text-left px-4 py-2 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-slate-800 text-xs"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#0d2d4e]" />
              <span>📱 Mobile Phones</span>
            </button>

            <button
              onClick={() => {
                onSelectCategoryItem('computer');
                onClose();
              }}
              className="w-full text-left px-4 py-2 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-slate-800 text-xs"
            >
              <Laptop className="w-3.5 h-3.5 text-[#0d2d4e]" />
              <span>💻 Desktop Computers</span>
            </button>

            <button
              onClick={() => {
                onSelectCategoryItem('kyboord');
                onClose();
              }}
              className="w-full text-left px-4 py-2 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-slate-800 text-xs"
            >
              <Keyboard className="w-3.5 h-3.5 text-[#0d2d4e]" />
              <span>⌨ Keyboards</span>
            </button>

            <button
              onClick={() => {
                onSelectCategoryItem('mouse');
                onClose();
              }}
              className="w-full text-left px-4 py-2 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-slate-800 text-xs"
            >
              <Mouse className="w-3.5 h-3.5 text-[#0d2d4e]" />
              <span>🖱 Mouse &amp; Pointing Devices</span>
            </button>

            <button
              onClick={() => {
                onSelectCategoryItem('online mini ups');
                onClose();
              }}
              className="w-full text-left px-4 py-2 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-slate-800 text-xs"
            >
              <span>⚡ Online Mini UPS</span>
            </button>
          </div>

          {/* Showroom & Tracker */}
          <div className="py-1">
            <button
              onClick={() => {
                onOpenShowroomOrder();
                onClose();
              }}
              className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-[#111]"
            >
              <Car className="w-4 h-4 text-[#0d2d4e]" />
              <span>🚗 Showroom Vehicles</span>
            </button>

            <button
              onClick={() => {
                onOpenTracker();
                onClose();
              }}
              className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 hover:bg-[#c9b21c] transition-colors cursor-pointer text-[#111]"
            >
              <Truck className="w-4 h-4 text-[#0d2d4e]" />
              <span>📦 Track Live Order</span>
            </button>
          </div>
        </div>

        {/* Footer Helpline */}
        <div className="p-3 bg-[#e6c12c] text-xs space-y-1 text-slate-900 border-t border-yellow-600/30">
          <p className="font-bold flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-[#0d2d4e]" />
            <span>Direct Hotline &amp; Orders:</span>
          </p>
          <a
            href="tel:+8801700000000"
            className="block font-mono font-bold text-sm text-[#0d2d4e] hover:underline"
          >
            +880 1700-000000
          </a>
          <p className="text-[10px] text-slate-700">
            Open: Sat - Thu (9:00 AM - 10:00 PM)
          </p>
        </div>
      </aside>
    </div>
  );
};
