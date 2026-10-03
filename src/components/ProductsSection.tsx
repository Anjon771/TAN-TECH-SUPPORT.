import React, { useState } from 'react';
import { ShoppingCart, Zap, Star, Check, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductsSectionProps {
  products: Product[];
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  onProductClick: (product: Product) => void;
  highlightedProductId: string | null;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  searchQuery,
  onAddToCart,
  onQuickOrder,
  onProductClick,
  highlightedProductId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'computers', label: 'Computers & IT' },
    { id: 'electronics', label: 'Mobile Phones' },
    { id: 'gadgets', label: 'Smart Gadgets' },
    { id: 'power', label: 'Mini UPS & Power' },
    { id: 'stationery', label: 'Bags & Accessories' },
  ];

  // Filter products by category and search
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      prod.name.toLowerCase().includes(query) ||
      prod.banglaName.toLowerCase().includes(query) ||
      prod.description.toLowerCase().includes(query) ||
      prod.price.toString().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <div id="products" className="bg-[#5a768e] p-3 sm:p-4 rounded-b-lg shadow-inner">
      {/* Category filter bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2 border-b border-sky-300/30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffe600]"></span>
          <h3 className="text-white font-bold text-base sm:text-lg">
            Product Showroom &amp; Tech Accessories
          </h3>
          <span className="text-xs text-sky-200">
            ({filteredProducts.length} items available)
          </span>
        </div>

        {/* Categories segmented buttons */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#ffe600] text-[#0d2d4e] font-bold shadow'
                  : 'bg-[#0d2d4e]/70 text-sky-100 hover:bg-[#0d2d4e]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: 5 columns on desktop, 2-3 on tablet/mobile as in original CSS */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#0b2a47]/50 rounded-lg p-8 text-center text-white">
          <p className="text-base font-semibold text-[#ffe600]">
            No products found matching "{searchQuery}"
          </p>
          <p className="text-xs text-slate-300 mt-1">
            Please check the spelling or try searching with a different keyword.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
          {filteredProducts.map((prod) => {
            const isHighlighted = highlightedProductId === prod.id;
            const isJustAdded = addedItemMap[prod.id];

            return (
              <div
                key={prod.id}
                onClick={() => onProductClick(prod)}
                className={`card relative bg-[#fff200] text-[#222] rounded flex flex-col justify-between overflow-hidden shadow transition-all duration-200 cursor-pointer select-none min-h-[120px] sm:min-h-[128px] ${
                  isHighlighted ? 'ring-4 ring-red-600 scale-105 z-10' : 'hover:scale-[1.02] hover:shadow-lg'
                }`}
              >
                {/* Badge if available */}
                {prod.badge && (
                  <span className="absolute top-1.5 left-1.5 z-10 bg-[#0d2d4e] text-[#ffe600] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                    {prod.badge}
                  </span>
                )}

                {/* Info indicator */}
                <span className="absolute top-1.5 right-1.5 z-10 text-slate-700 hover:text-black bg-white/70 p-0.5 rounded-full" title="View details">
                  <Info className="w-3.5 h-3.5" />
                </span>

                {/* Product Image Thumbnail */}
                {prod.image && (
                  <div className="w-full h-24 sm:h-28 overflow-hidden bg-white/95 backdrop-blur-xs flex items-center justify-center p-2 border-b border-yellow-400/60 shadow-inner relative group/img">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-contain filter drop-shadow-md transition-all duration-300 group-hover:scale-110 group-hover:brightness-105 rounded-xs"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Product Name in Center (.n in original CSS) */}
                <div className="n flex-1 flex flex-col items-center justify-center p-2 text-center">
                  <span className="font-extrabold text-sm sm:text-base leading-tight text-[#111]">
                    {prod.name}
                  </span>
                  <span className="text-[10px] text-slate-700 font-medium line-clamp-1 mt-0.5">
                    {prod.banglaName}
                  </span>
                </div>

                {/* Price Bar & Add Button (.pr in original CSS) */}
                <div className="pr bg-[#f0d400] flex justify-between items-center px-2 py-1.5 border-t border-yellow-500/30">
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-[#0d2d4e] font-mono leading-none">
                      ৳{prod.price.toLocaleString()}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[9px] text-slate-600 line-through">
                        ৳{prod.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleAdd(e, prod)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded transition-all active:scale-95 cursor-pointer flex items-center gap-1 ${
                        isJustAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#0d2d4e] text-[#ffe600] hover:bg-[#153f6c]'
                      }`}
                      title="Add to cart"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
