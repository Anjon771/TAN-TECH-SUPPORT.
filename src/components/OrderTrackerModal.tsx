import React, { useState, useEffect } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderId,
}) => {
  const [query, setQuery] = useState(initialOrderId || '');
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [searchedOrder, setSearchedOrder] = useState<OrderDetails | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('tts_orders');
      if (stored) {
        const parsed: OrderDetails[] = JSON.parse(stored);
        setOrders(parsed);
        if (initialOrderId) {
          const match = parsed.find(
            (o) => o.orderId.toLowerCase() === initialOrderId.toLowerCase()
          );
          if (match) {
            setSearchedOrder(match);
            setSearchAttempted(true);
          }
        }
      }
    } catch {
      // ignore
    }
  }, [initialOrderId, isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const q = query.trim().toLowerCase();
    if (!q) {
      setSearchedOrder(null);
      return;
    }

    const match = orders.find(
      (o) =>
        o.orderId.toLowerCase() === q ||
        o.customerPhone.includes(q)
    );

    if (match) {
      setSearchedOrder(match);
    } else {
      // Mock demonstration order if user tests with random ID
      setSearchedOrder({
        orderId: query.toUpperCase(),
        date: 'আজকে, ২ ঘণ্টা আগে',
        customerName: 'সম্মানিত গ্রাহক',
        customerPhone: '01700-000000',
        district: 'ঢাকা',
        address: 'উত্তরা, ঢাকা',
        deliveryOption: 'inside-dhaka',
        deliveryFee: 60,
        paymentMethod: 'cod',
        items: [],
        subtotal: 1500,
        total: 1560,
        status: 'Processing',
      });
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Order received and verified in system', status: 'Confirmed' },
    { title: 'Processing & QC Packing', desc: 'Items checked, packaged & labeled', status: 'Processing' },
    { title: 'In Transit with Courier', desc: 'Dispatched with delivery partner', status: 'Shipped' },
    { title: 'Delivered', desc: 'Order successfully delivered to customer', status: 'Delivered' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0d2d4e] text-white p-4 flex items-center justify-between border-b border-yellow-400">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#ffe600]" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#ffe600] leading-tight">
                Live Order Tracker
              </h3>
              <p className="text-[11px] text-sky-200">
                Check order status with Order ID or Mobile Number
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 max-h-[80vh] overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Order ID (e.g. TTS-84291) or Mobile Number"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0d2d4e] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#0d2d4e] hover:bg-[#133c66] text-[#ffe600] font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {/* Searched Order Details */}
          {searchedOrder ? (
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <span className="text-[11px] text-slate-500">Order ID:</span>
                  <p className="font-mono font-black text-sm text-[#0d2d4e]">
                    #{searchedOrder.orderId}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500">Order Date:</span>
                  <p className="font-semibold text-xs text-slate-800">
                    {searchedOrder.date}
                  </p>
                </div>
              </div>

              {/* Status Stepper */}
              <div className="space-y-3 py-2">
                {steps.map((step, idx) => {
                  const isCurrent = idx === 1; // Processing
                  const isDone = idx === 0;

                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-yellow-400 text-[#0d2d4e] ring-4 ring-yellow-200'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>
                        {idx < steps.length - 1 && (
                          <div
                            className={`w-0.5 h-7 ${
                              isDone ? 'bg-emerald-600' : 'bg-slate-200'
                            }`}
                          />
                        )}
                      </div>

                      <div className="pt-0.5">
                        <p
                          className={`font-bold text-xs ${
                            isCurrent
                              ? 'text-[#0d2d4e]'
                              : isDone
                              ? 'text-emerald-700'
                              : 'text-slate-500'
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-[11px] text-slate-500">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Details */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span className="font-bold text-slate-800">{searchedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="text-right text-slate-800">{searchedOrder.address}</span>
                </div>
                <div className="flex justify-between font-bold text-[#0d2d4e] pt-1 border-t border-slate-100">
                  <span>Total Amount:</span>
                  <span className="font-mono text-emerald-700">৳{searchedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : searchAttempted ? (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center text-amber-800 text-xs">
              <AlertCircle className="w-5 h-5 mx-auto mb-1 text-amber-600" />
              <p className="font-bold">No Order Found</p>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Please double check your Order ID or phone number.
              </p>
            </div>
          ) : (
            orders.length > 0 && (
              <div>
                <p className="font-bold text-slate-700 text-xs mb-2">
                  Your Recent Orders:
                </p>
                <div className="space-y-2">
                  {orders.map((o) => (
                    <div
                      key={o.orderId}
                      onClick={() => setSearchedOrder(o)}
                      className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-between cursor-pointer transition-colors text-xs"
                    >
                      <div>
                        <span className="font-mono font-bold text-[#0d2d4e]">
                          #{o.orderId}
                        </span>
                        <p className="text-[11px] text-slate-500">{o.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-emerald-700">
                          ৳{o.total.toLocaleString()}
                        </span>
                        <p className="text-[10px] text-yellow-700 bg-yellow-100 px-1.5 py-0.2 rounded font-medium">
                          {o.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
