import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Phone, User, CreditCard, Banknote } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  directProduct?: { product: CartItem['product']; quantity: number } | null;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  directProduct,
  onOrderSuccess,
}) => {
  const activeItems = directProduct ? [directProduct] : items;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('ঢাকা (Dhaka)');
  const [address, setAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'inside-dhaka' | 'outside-dhaka' | 'showroom-pickup'>('inside-dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'rocket'>('cod');
  const [trxId, setTrxId] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const subtotal = activeItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryFee =
    deliveryOption === 'inside-dhaka'
      ? 60
      : deliveryOption === 'outside-dhaka'
      ? 120
      : 0;

  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      setError('Please provide a valid 11-digit mobile number (e.g. 01700000000).');
      return;
    }
    if (deliveryOption !== 'showroom-pickup' && !address.trim()) {
      setError('Please provide your full delivery address.');
      return;
    }
    if (paymentMethod !== 'cod' && !trxId.trim()) {
      setError('Transaction ID (TrxID) is required for mobile banking.');
      return;
    }

    const orderId = `TTS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderDetails = {
      orderId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customerName: name.trim(),
      customerPhone: cleanPhone,
      district,
      address: address.trim() || 'Showroom Self Pickup',
      deliveryOption,
      deliveryFee,
      paymentMethod,
      trxId: trxId.trim() || undefined,
      note: note.trim() || undefined,
      items: activeItems,
      subtotal,
      total: grandTotal,
      status: 'Confirmed',
    };

    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0d2d4e] text-white p-4 flex items-center justify-between border-b border-yellow-400">
          <div>
            <h3 className="font-bold text-lg text-[#ffe600]">Complete Your Order</h3>
            <p className="text-xs text-sky-200">
              Safe &amp; secure order via Cash on Delivery or Mobile Banking
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 max-h-[80vh] overflow-y-auto space-y-4 text-slate-700 text-sm">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Order Item Summary */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
            <p className="font-bold text-[#0d2d4e] mb-1.5">Order Items Summary:</p>
            <div className="space-y-1">
              {activeItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-600">
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-mono font-bold text-slate-800">
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tanvir Ahmed"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0d2d4e] focus:outline-none text-sm"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>Mobile Number *</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0d2d4e] focus:outline-none text-sm font-mono"
            />
          </div>

          {/* Delivery Option */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Select Delivery Area *</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label
                className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer text-xs transition-colors ${
                  deliveryOption === 'inside-dhaka'
                    ? 'border-[#0d2d4e] bg-sky-50 font-bold text-[#0d2d4e]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryOption === 'inside-dhaka'}
                    onChange={() => setDeliveryOption('inside-dhaka')}
                  />
                  <span>Inside Dhaka</span>
                </div>
                <span className="font-mono text-emerald-700">৳60</span>
              </label>

              <label
                className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer text-xs transition-colors ${
                  deliveryOption === 'outside-dhaka'
                    ? 'border-[#0d2d4e] bg-sky-50 font-bold text-[#0d2d4e]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryOption === 'outside-dhaka'}
                    onChange={() => setDeliveryOption('outside-dhaka')}
                  />
                  <span>Outside Dhaka</span>
                </div>
                <span className="font-mono text-emerald-700">৳120</span>
              </label>

              <label
                className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer text-xs transition-colors ${
                  deliveryOption === 'showroom-pickup'
                    ? 'border-[#0d2d4e] bg-sky-50 font-bold text-[#0d2d4e]'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryOption === 'showroom-pickup'}
                    onChange={() => setDeliveryOption('showroom-pickup')}
                  />
                  <span>Showroom Pickup</span>
                </div>
                <span className="font-mono text-emerald-700">৳0</span>
              </label>
            </div>
          </div>

          {/* Address */}
          {deliveryOption !== 'showroom-pickup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Delivery Address (House/Road, Area, Thana, District) *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. House 12, Road 4, Sector 7, Uttara, Dhaka"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0d2d4e] focus:outline-none text-sm resize-none"
              />
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-slate-500" />
              <span>Payment Method *</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-2 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                  paymentMethod === 'cod'
                    ? 'border-[#0d2d4e] bg-[#0d2d4e] text-[#ffe600] font-bold'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                💵 Cash on Delivery
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bkash')}
                className={`p-2 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                  paymentMethod === 'bkash'
                    ? 'border-pink-600 bg-pink-600 text-white font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-pink-600'
                }`}
              >
                bKash
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('nagad')}
                className={`p-2 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                  paymentMethod === 'nagad'
                    ? 'border-orange-600 bg-orange-600 text-white font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-orange-600'
                }`}
              >
                Nagad
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('rocket')}
                className={`p-2 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                  paymentMethod === 'rocket'
                    ? 'border-purple-600 bg-purple-600 text-white font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-purple-700'
                }`}
              >
                Rocket
              </button>
            </div>

            {/* Mobile banking instruction */}
            {paymentMethod !== 'cod' && (
              <div className="mt-2.5 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-1.5">
                <p className="font-semibold text-amber-900">
                  📱 Send Money / Payment to: <span className="font-mono font-bold text-amber-950">01700-000000</span> (Personal)
                </p>
                <p className="text-amber-800 text-[11px]">
                  Please enter the received Transaction ID (TrxID) below:
                </p>
                <input
                  type="text"
                  required
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  placeholder="e.g. 9J3K81ALQ"
                  className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded focus:ring-1 focus:ring-amber-500 font-mono text-xs uppercase"
                />
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Special Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Please call before arriving"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          {/* Total calculation */}
          <div className="p-3 bg-slate-100 rounded-lg text-xs space-y-1 font-medium">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-mono">৳{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#0d2d4e] pt-1 border-t border-slate-300">
              <span>Total Payable:</span>
              <span className="text-emerald-700 font-mono text-base">
                ৳{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0d2d4e] hover:bg-[#133c66] text-[#ffe600] font-bold py-3 px-4 rounded-lg shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Confirm Order</span>
          </button>
        </form>
      </div>
    </div>
  );
};
