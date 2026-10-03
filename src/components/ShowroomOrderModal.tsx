import React, { useState } from 'react';
import { X, Car, CheckCircle, Phone, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import { SHOWROOM_VEHICLES } from '../data/mockData';
import { ShowroomVehicle } from '../types';

interface ShowroomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedVehicle?: ShowroomVehicle;
  onSubmitSuccess: (message: string) => void;
}

export const ShowroomOrderModal: React.FC<ShowroomOrderModalProps> = ({
  isOpen,
  onClose,
  preSelectedVehicle,
  onSubmitSuccess,
}) => {
  const [selectedVehId, setSelectedVehId] = useState(
    preSelectedVehicle?.id || SHOWROOM_VEHICLES[0].id
  );
  const [bookingType, setBookingType] = useState<'booking' | 'test-drive' | 'consultation'>('booking');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [location, setLocation] = useState('ঢাকা শো-রুম (Main Showroom)');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentVehicle =
    SHOWROOM_VEHICLES.find((v) => v.id === selectedVehId) || SHOWROOM_VEHICLES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const actionText =
      bookingType === 'booking'
        ? 'Booking Request'
        : bookingType === 'test-drive'
        ? 'Test Drive Schedule'
        : 'Consultation Request';

    onSubmitSuccess(
      `Thank you, ${name}! Your ${actionText} for "${currentVehicle.bengaliName}" has been received. Our showroom team will contact you at ${phone} shortly.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#17574f] text-white p-4 flex items-center justify-between border-b border-yellow-300">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-yellow-300" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white leading-tight">
                Showroom Vehicle &amp; Heavy Tech Order
              </h3>
              <p className="text-[11px] text-teal-200">
                Book your electric vehicle or commercial unit directly
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-teal-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 max-h-[80vh] overflow-y-auto space-y-4 text-slate-700 text-xs sm:text-sm">
          {/* Vehicle Select */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Select Product or Vehicle *
            </label>
            <select
              value={selectedVehId}
              onChange={(e) => setSelectedVehId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#17574f] focus:outline-none"
            >
              {SHOWROOM_VEHICLES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.bengaliName} — ৳{v.price.toLocaleString()} ({v.type})
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Highlights Box */}
          <div className="bg-[#f1f4b8] p-3 rounded-lg border border-yellow-300 text-slate-800 text-xs space-y-1">
            <div className="flex justify-between items-center font-bold text-teal-900">
              <span>{currentVehicle.bengaliName}</span>
              <span className="font-mono text-sm">৳{currentVehicle.price.toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-teal-800 pt-1">
              {currentVehicle.specs.map((s, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Type */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Select Service Type *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBookingType('booking')}
                className={`p-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                  bookingType === 'booking'
                    ? 'border-[#17574f] bg-[#17574f] text-white'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                Direct Booking
              </button>
              <button
                type="button"
                onClick={() => setBookingType('test-drive')}
                className={`p-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                  bookingType === 'test-drive'
                    ? 'border-[#17574f] bg-[#17574f] text-white'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                Test Drive
              </button>
              <button
                type="button"
                onClick={() => setBookingType('consultation')}
                className={`p-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                  bookingType === 'consultation'
                    ? 'border-[#17574f] bg-[#17574f] text-white'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                Consultation
              </button>
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rafiqul Islam"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#17574f] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-[#17574f] focus:outline-none"
              />
            </div>
          </div>

          {/* Preferred Date & Showroom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Showroom Branch
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none"
              >
                <option value="Dhaka Main Showroom">Dhaka Main Showroom (Mirpur)</option>
                <option value="Chittagong Branch">Chittagong Branch Showroom</option>
                <option value="Sylhet Branch">Sylhet Branch Showroom</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Special Inquiries or Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any questions about the vehicle or delivery schedule"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#17574f] hover:bg-[#12423c] text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-yellow-300" />
            <span>Submit Showroom Request</span>
          </button>
        </form>
      </div>
    </div>
  );
};
