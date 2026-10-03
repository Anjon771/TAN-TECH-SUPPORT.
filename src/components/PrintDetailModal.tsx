import React, { useState } from 'react';
import { X, Printer, Upload, Check, ShoppingCart, Zap, Sparkles } from 'lucide-react';
import { PrintDesign, Product } from '../types';

interface PrintDetailModalProps {
  design: PrintDesign | null;
  onClose: () => void;
  onAddToCart: (customProduct: Product) => void;
  onInstantOrder: (customProduct: Product) => void;
}

export const PrintDetailModal: React.FC<PrintDetailModalProps> = ({
  design,
  onClose,
  onAddToCart,
  onInstantOrder,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  if (!design) return null;

  // Bulk discount: 10% off for 10+, 20% off for 50+
  const discountRate = quantity >= 50 ? 0.2 : quantity >= 10 ? 0.1 : 0;
  const unitPrice = Math.round(design.basePrice * (1 - discountRate));
  const totalPrice = unitPrice * quantity;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  const createCustomProduct = (): Product => {
    return {
      id: `custom-print-${Date.now()}`,
      name: `${design.title} (${quantity} ${design.unit})`,
      banglaName: `${design.bengaliTitle} (Custom Print)`,
      category: 'stationery',
      price: totalPrice,
      rating: 5.0,
      reviewsCount: 1,
      stock: 999,
      badge: 'Custom Print',
      description: `Custom Print Order: ${customText || 'Ready to Print'} | File: ${selectedFile || 'Will be shared offline'}`,
      specs: [`Quantity: ${quantity} ${design.unit}`, `Category: ${design.category}`],
    };
  };

  const handleAdd = () => {
    const prod = createCustomProduct();
    onAddToCart(prod);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const handleOrder = () => {
    const prod = createCustomProduct();
    onInstantOrder(prod);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0d2d4e] text-white p-4 flex items-center justify-between border-b border-yellow-400">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#ffe600]" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#ffe600] leading-tight">
                {design.bengaliTitle}
              </h3>
              <p className="text-[11px] text-sky-200">{design.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 max-h-[80vh] overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm">
          {/* Image & Price */}
          <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 h-44 sm:h-52">
            <img
              src={design.imageKey}
              alt={design.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-[#ffd633] text-[#0d2d4e] font-black text-xs px-2.5 py-1 rounded shadow">
              Base Rate: ৳{design.basePrice}/{design.unit}
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {design.description}
          </p>

          {/* Quantity and Dynamic Calculation */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">
                Print Quantity ({design.unit}):
              </span>
              <div className="flex items-center border border-slate-300 rounded bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 text-center font-mono font-bold text-xs focus:outline-none"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {discountRate > 0 && (
              <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Wholesale Discount: {discountRate * 100}% off applied!</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-1 border-t border-slate-200 text-sm font-bold text-[#0d2d4e]">
              <span>Total Estimated Cost:</span>
              <span className="text-emerald-700 font-mono text-base">
                ৳{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Custom Information Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Custom Requirements, Names, or Dimensions:
            </label>
            <textarea
              rows={2}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. Company name, color preference, specific dimensions"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0d2d4e] focus:outline-none resize-none"
            />
          </div>

          {/* File Upload Simulator */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Upload Design or Logo Artwork (Optional):
            </label>
            <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-500 hover:text-slate-700 transition-colors">
              <Upload className="w-4 h-4 text-[#0d2d4e]" />
              <span className="text-xs">
                {selectedFile ? `Selected File: ${selectedFile}` : 'Choose image, PDF or vector file'}
              </span>
              <input type="file" onChange={handleFileChange} className="hidden" accept="image/*,.pdf,.doc,.docx" />
            </label>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={handleAdd}
              className={`py-2.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-yellow-400 hover:bg-yellow-500 text-[#0d2d4e]'
              }`}
            >
              {added ? (
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
              onClick={handleOrder}
              className="py-2.5 px-3 bg-[#0d2d4e] hover:bg-[#133c66] text-[#ffe600] rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer active:scale-98"
            >
              <Zap className="w-4 h-4 text-[#ffe600]" />
              <span>Order Directly</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
