import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Truck, Printer, Car } from 'lucide-react';
import { LOGO_IMG } from '../data/assets';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenTracker: () => void;
  onOpenShowroom: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTracker,
  onOpenShowroom,
}) => {
  return (
    <footer className="bg-[#0b243d] text-slate-300 text-xs border-t-2 border-yellow-400 mt-6 pt-8 pb-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-sky-900/60">
        {/* Brand Col */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={LOGO_IMG}
              alt="Logo"
              className="w-10 h-10 rounded border border-yellow-400"
            />
            <div>
              <h4 className="font-serif font-black text-white text-sm">
                TAN TECH SUPPORT
              </h4>
              <p className="text-[10px] text-yellow-300">Digital Tech &amp; Service Showroom</p>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Genuine computer hardware, smart mobile gadgets, showroom vehicles &amp; professional digital printing services.
          </p>
          <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Authentic Product Guarantee</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-2.5 text-[#ffe600]">
            Quick Links
          </h5>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <button
                onClick={() => onNavigate('top')}
                className="hover:text-yellow-300 transition-colors"
              >
                Home Page
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('products')}
                className="hover:text-yellow-300 transition-colors"
              >
                All Products &amp; Deals
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('print')}
                className="hover:text-yellow-300 transition-colors"
              >
                Digital Printing Services
              </button>
            </li>
            <li>
              <button
                onClick={onOpenShowroom}
                className="hover:text-yellow-300 transition-colors"
              >
                Showroom Vehicles &amp; Equipment
              </button>
            </li>
            <li>
              <button
                onClick={onOpenTracker}
                className="hover:text-yellow-300 transition-colors"
              >
                Track Live Order
              </button>
            </li>
          </ul>
        </div>

        {/* Services & Highlights */}
        <div>
          <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-2.5 text-[#ffe600]">
            Our Services
          </h5>
          <ul className="space-y-1.5 text-[11px] text-slate-400">
            <li className="flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-yellow-300" />
              <span>Smart PVC ID &amp; Badge Printing</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-yellow-300" />
              <span>Electric Bikes &amp; Cargo Vans</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-yellow-300" />
              <span>Nationwide Express Delivery</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-yellow-300" />
              <span>Fast 24-48 Hours Shipping</span>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-2.5 text-[#ffe600]">
            Contact &amp; Location
          </h5>
          <ul className="space-y-2 text-[11px] text-slate-300">
            <li className="flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
              <span>Main Showroom: Mirpur Road, Dhaka - 1216</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <a href="tel:+8801700000000" className="font-mono hover:underline">
                +880 1700-000000
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <span>support@tantech.com</span>
            </li>
            <li className="text-[10px] text-slate-400 pt-1">
              Open 6 Days a Week (9:00 AM - 10:00 PM)
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <p>© {new Date().getFullYear()} TAN TECH SUPPORT. All rights reserved.</p>
        <p className="text-[10px]">
          Designed &amp; Developed for Tan Tech Support Online &amp; Showroom Ecosystem.
        </p>
      </div>
    </footer>
  );
};
