import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white text-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="bg-[#0d2d4e] text-white p-4 flex items-center justify-between border-b border-yellow-400/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ffe600]" />
            <h2 className="font-bold text-lg text-[#ffe600]">Your Shopping Cart</h2>
            <span className="bg-[#ffd633] text-[#0d2d4e] text-xs font-black px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-bold text-base text-slate-700">Your Cart is Empty</p>
              <p className="text-xs text-slate-500 mt-1">
                Browse products and click "Add" to start shopping.
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-[#0d2d4e] text-[#ffe600] font-bold text-xs py-2 px-4 rounded-md shadow"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs text-slate-500">
                <span>Selected Items ({items.length})</span>
                <button
                  onClick={onClearCart}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 shadow-sm"
                >
                  {item.product.image && (
                    <div className="w-12 h-12 rounded bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#0d2d4e] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {item.product.banglaName}
                    </p>
                    <p className="text-xs font-bold text-emerald-700 font-mono mt-0.5">
                      ৳{item.product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded bg-white overflow-hidden shadow-xs">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="p-1 hover:bg-slate-100 text-slate-700 transition-colors"
                      title="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center font-mono font-bold text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="p-1 hover:bg-slate-100 text-slate-700 transition-colors"
                      title="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Total & Remove */}
                  <div className="text-right flex flex-col items-end">
                    <span className="font-bold text-sm text-[#0d2d4e] font-mono">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors mt-1 p-0.5"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="space-y-1.5 text-xs text-slate-600 mb-3">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold font-mono text-slate-800">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping Fee:</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#0d2d4e] pt-1 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-emerald-700 font-mono">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full bg-[#0d2d4e] hover:bg-[#133c66] text-[#ffe600] font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
