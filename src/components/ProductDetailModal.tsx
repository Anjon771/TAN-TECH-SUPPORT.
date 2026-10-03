import React, { useState } from 'react';
import { X, ShoppingCart, Zap, Star, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onInstantOrder: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantOrder,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0d2d4e] text-white p-4 flex items-center justify-between border-b border-yellow-400">
          <div>
            <span className="text-[10px] text-yellow-300 uppercase tracking-widest font-bold">
              Product Overview
            </span>
            <h3 className="font-extrabold text-lg text-[#ffe600] leading-tight">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 text-slate-700 text-sm">
          {/* Product Image */}
          {product.image && (
            <div className="w-full h-44 sm:h-52 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Price & Rating Banner */}
          <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div>
              <span className="text-2xl font-black text-[#0d2d4e] font-mono">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-xs text-slate-400 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-white px-2 py-1 rounded shadow-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">
              {product.banglaName}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          {product.specs && product.specs.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-800 mb-1.5">
                Key Features &amp; Specifications:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d2d4e]"></span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warranty & Availability */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-t border-b border-slate-100 py-2">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine &amp; Official</span>
            </span>
            <span>
              Stock: <strong className="text-slate-700">{product.stock} units left</strong>
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Quantity:</span>
            <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
              >
                -
              </button>
              <span className="px-4 py-1.5 font-mono font-bold text-slate-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={handleAdd}
              className={`py-2.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-[#0d2d4e]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onInstantOrder(product, quantity);
                onClose();
              }}
              className="py-2.5 px-3 bg-[#0d2d4e] hover:bg-[#133c66] text-[#ffe600] rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer active:scale-98"
            >
              <Zap className="w-4 h-4 text-[#ffe600]" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
