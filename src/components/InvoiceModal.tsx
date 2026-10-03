import React from 'react';
import { X, CheckCircle, Printer, Share2, ArrowRight } from 'lucide-react';
import { OrderDetails } from '../types';

interface InvoiceModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  onClose,
  onTrackOrder,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `Tan Tech Support Order Invoice!\nOrder ID: ${order.orderId}\nCustomer: ${order.customerName}\nPhone: ${order.customerPhone}\nTotal: ৳${order.total}\nAddress: ${order.address}`;
    const url = `https://wa.me/8801700000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0d2d4e] text-white p-4 text-center relative border-b border-yellow-400">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-1 rounded-full text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-400/40">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-bold text-lg text-[#ffe600]">
            Order Successfully Placed!
          </h3>
          <p className="text-xs text-sky-200 font-mono mt-0.5">
            Order ID: #{order.orderId}
          </p>
        </div>

        {/* Invoice Body */}
        <div className="p-4 sm:p-5 text-slate-700 text-xs space-y-3">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Customer Name:</span>
              <span className="font-bold text-slate-800">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Phone Number:</span>
              <span className="font-mono font-bold text-slate-800">{order.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="text-right text-slate-800 max-w-[60%] truncate">{order.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Method:</span>
              <span className="font-semibold uppercase text-slate-800">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
              </span>
            </div>
            {order.trxId && (
              <div className="flex justify-between">
                <span className="text-slate-500">TrxID:</span>
                <span className="font-mono text-slate-800">{order.trxId}</span>
              </div>
            )}
          </div>

          {/* Items Table */}
          <div>
            <p className="font-bold text-slate-800 mb-1">Ordered Items List:</p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-[11px] text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2 font-medium text-slate-800">
                        {item.product.name}
                      </td>
                      <td className="p-2 text-center font-mono">
                        {item.quantity}
                      </td>
                      <td className="p-2 text-right font-mono font-semibold">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="bg-slate-100 p-2.5 rounded-lg space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-mono font-medium">৳{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Delivery Fee:</span>
              <span className="font-mono font-medium">৳{order.deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#0d2d4e] pt-1 border-t border-slate-300">
              <span>Total:</span>
              <span className="font-mono text-emerald-700 text-base">
                ৳{order.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Hotline info */}
          <p className="text-center text-[11px] text-slate-500">
            Our customer support representative will call you shortly to confirm.
          </p>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-lg font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg font-bold transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Memo</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onTrackOrder(order.orderId);
            }}
            className="w-full bg-[#0d2d4e] hover:bg-[#133c66] text-[#ffe600] py-2.5 px-4 rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer shadow"
          >
            <span>Track Live Order Status</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
