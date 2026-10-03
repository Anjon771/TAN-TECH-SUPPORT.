import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { BannerSlider } from './components/BannerSlider';
import { GallerySection } from './components/GallerySection';
import { SideSection } from './components/SideSection';
import { ProductsSection } from './components/ProductsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InvoiceModal } from './components/InvoiceModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PrintDetailModal } from './components/PrintDetailModal';
import { ShowroomOrderModal } from './components/ShowroomOrderModal';
import { VideoReviewModal } from './components/VideoReviewModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { DrawerMenu } from './components/DrawerMenu';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';

import { INITIAL_PRODUCTS } from './data/mockData';
import { Product, CartItem, OrderDetails, PrintDesign, ShowroomVehicle } from './types';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('top');
  const [highlightedProductId, setHighlightedProductId] = useState<string | null>(null);

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tts_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [directCheckoutProduct, setDirectCheckoutProduct] = useState<{
    product: Product;
    quantity: number;
  } | null>(null);

  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [activePrintDetail, setActivePrintDetail] = useState<PrintDesign | null>(null);
  const [isShowroomOrderOpen, setIsShowroomOrderOpen] = useState(false);
  const [selectedShowroomVehicle, setSelectedShowroomVehicle] = useState<ShowroomVehicle | undefined>(undefined);
  const [activeVideoReview, setActiveVideoReview] = useState<ShowroomVehicle | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerOrderId, setTrackerOrderId] = useState<string | undefined>(undefined);
  const [latestInvoice, setLatestInvoice] = useState<OrderDetails | null>(null);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'info' | 'warning', text: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('tts_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast('success', `"${product.name}" added to cart!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('info', 'Item removed from cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('info', 'Cart has been cleared.');
  };

  // Instant direct order
  const handleInstantOrder = (product: Product, quantity = 1) => {
    setDirectCheckoutProduct({ product, quantity });
    setIsCheckoutOpen(true);
  };

  // Order submission
  const handleOrderSuccess = (order: OrderDetails) => {
    try {
      const stored = localStorage.getItem('tts_orders');
      const orders = stored ? JSON.parse(stored) : [];
      orders.unshift(order);
      localStorage.setItem('tts_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }

    if (!directCheckoutProduct) {
      setCartItems([]);
    }
    setDirectCheckoutProduct(null);
    setIsCheckoutOpen(false);
    setLatestInvoice(order);
    showToast('success', `Order #${order.orderId} placed successfully!`);
  };

  // Flash card and scroll to it (matching original prototype behavior)
  const handleFlashProduct = (keyword: string) => {
    const target = products.find(
      (p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
        p.banglaName.toLowerCase().includes(keyword.toLowerCase()) ||
        p.id.toLowerCase().includes(keyword.toLowerCase())
    );

    if (target) {
      setHighlightedProductId(target.id);
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setTimeout(() => {
        setHighlightedProductId(null);
      }, 2500);
    }
  };

  // Smooth scroll to section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b2a47] flex justify-center text-white antialiased font-sans">
      {/* Centered Main Page Container as in original CSS (.page max-width 880px) */}
      <div className="w-full max-w-[920px] bg-[#0d2d4e] shadow-2xl flex flex-col min-h-screen border-x border-sky-900/60">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={totalCartCount}
          cartTotal={totalCartPrice}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenTracker={() => setIsTrackerOpen(true)}
          onLogoClick={() => handleNavigate('top')}
        />

        {/* Navbar */}
        <Navbar
          onToggleDrawer={() => setIsDrawerOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalCartCount}
          cartTotal={totalCartPrice}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        {/* Banner Carousel */}
        <div id="top">
          <BannerSlider
            onExploreProducts={() => handleNavigate('products')}
            onExplorePrinting={() => handleNavigate('print')}
            onExploreShowroom={() => {
              setSelectedShowroomVehicle(undefined);
              setIsShowroomOrderOpen(true);
            }}
          />
        </div>

        {/* Main Grid: Gallery & Side Section as in original layout */}
        <main className="grid grid-cols-1 md:grid-cols-[1fr_210px] gap-2 px-2 sm:px-4 mt-2">
          {/* Printing Service Gallery (Left) */}
          <div id="print">
            <GallerySection
              onSelectPrintDesign={(design) => setActivePrintDetail(design)}
            />
          </div>

          {/* Showroom Vehicle / Play Buttons (Right) */}
          <SideSection
            onOpenShowroomOrder={(vehicle) => {
              setSelectedShowroomVehicle(vehicle);
              setIsShowroomOrderOpen(true);
            }}
            onOpenVideoReview={(vehicle) => setActiveVideoReview(vehicle)}
          />
        </main>

        {/* Products Section */}
        <div className="px-2 sm:px-4 mt-2">
          <ProductsSection
            products={products}
            searchQuery={searchQuery}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
            onQuickOrder={(prod) => handleInstantOrder(prod, 1)}
            onProductClick={(prod) => setActiveProductDetail(prod)}
            highlightedProductId={highlightedProductId}
          />
        </div>

        {/* Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenTracker={() => setIsTrackerOpen(true)}
          onOpenShowroom={() => {
            setSelectedShowroomVehicle(undefined);
            setIsShowroomOrderOpen(true);
          }}
        />

        {/* Drawer Menu */}
        <DrawerMenu
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onNavigate={handleNavigate}
          onSelectCategoryItem={(kw) => handleFlashProduct(kw)}
          onOpenShowroomOrder={() => {
            setSelectedShowroomVehicle(undefined);
            setIsShowroomOrderOpen(true);
          }}
          onOpenTracker={() => setIsTrackerOpen(true)}
        />

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setDirectCheckoutProduct(null);
            setIsCheckoutOpen(true);
          }}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setDirectCheckoutProduct(null);
          }}
          items={cartItems}
          directProduct={directCheckoutProduct}
          onOrderSuccess={handleOrderSuccess}
        />

        {/* Invoice Modal */}
        <InvoiceModal
          order={latestInvoice}
          onClose={() => setLatestInvoice(null)}
          onTrackOrder={(orderId) => {
            setTrackerOrderId(orderId);
            setIsTrackerOpen(true);
          }}
        />

        {/* Product Quick Detail Modal */}
        <ProductDetailModal
          product={activeProductDetail}
          onClose={() => setActiveProductDetail(null)}
          onAddToCart={handleAddToCart}
          onInstantOrder={handleInstantOrder}
        />

        {/* Custom Print Design Modal */}
        <PrintDetailModal
          design={activePrintDetail}
          onClose={() => setActivePrintDetail(null)}
          onAddToCart={(customProduct) => handleAddToCart(customProduct, 1)}
          onInstantOrder={(customProduct) => handleInstantOrder(customProduct, 1)}
        />

        {/* Showroom Vehicle Order Modal */}
        <ShowroomOrderModal
          isOpen={isShowroomOrderOpen}
          onClose={() => setIsShowroomOrderOpen(false)}
          preSelectedVehicle={selectedShowroomVehicle}
          onSubmitSuccess={(msg) => showToast('success', msg)}
        />

        {/* Video Review Modal */}
        <VideoReviewModal
          vehicle={activeVideoReview}
          onClose={() => setActiveVideoReview(null)}
          onBookNow={(vehicle) => {
            setSelectedShowroomVehicle(vehicle);
            setIsShowroomOrderOpen(true);
          }}
        />

        {/* Order Tracker Modal */}
        <OrderTrackerModal
          isOpen={isTrackerOpen}
          onClose={() => {
            setIsTrackerOpen(false);
            setTrackerOrderId(undefined);
          }}
          initialOrderId={trackerOrderId}
        />

        {/* Toast System */}
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </div>
    </div>
  );
}
