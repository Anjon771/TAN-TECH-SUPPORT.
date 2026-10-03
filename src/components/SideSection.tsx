import React from 'react';
import { Car, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { SHOWROOM_VEHICLES } from '../data/mockData';
import { ShowroomVehicle } from '../types';

interface SideSectionProps {
  onOpenShowroomOrder: (preSelectedVehicle?: ShowroomVehicle) => void;
  onOpenVideoReview: (vehicle: ShowroomVehicle) => void;
}

export const SideSection: React.FC<SideSectionProps> = ({
  onOpenShowroomOrder,
  onOpenVideoReview,
}) => {
  return (
    <aside className="bg-[#f1f4b8] p-3 sm:p-4 text-center rounded-tr-lg border-l-2 border-yellow-300 shadow-inner flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center gap-1.5 mb-1 text-[#17574f]">
          <Car className="w-5 h-5 text-[#1a9aa8]" />
          <h3 className="font-bold text-base sm:text-lg text-[#1a9aa8] leading-tight">
            Your Vehicles &amp; <br />
            Heavy Tech Gear
          </h3>
        </div>

        <p className="text-[11px] text-slate-700 mb-2">
          Showroom Visit or Direct Booking
        </p>

        {/* Showroom Order Button */}
        <button
          onClick={() => onOpenShowroomOrder()}
          className="go w-full bg-[#17574f] hover:bg-[#12423c] text-white font-bold text-xs py-2 px-3 rounded-full cursor-pointer transition-all shadow-md active:scale-95 mb-3 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>Showroom Order</span>
        </button>
      </div>

      {/* 5 Play Icon Buttons from original prototype */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-teal-900 border-b border-teal-700/20 pb-1 mb-1.5">
          ▶ Video Reviews &amp; Live Demos
        </div>

        {SHOWROOM_VEHICLES.map((vehicle, idx) => (
          <div
            key={vehicle.id}
            onClick={() => onOpenVideoReview(vehicle)}
            className="group cursor-pointer bg-[#e1e69b] hover:bg-[#d6dc87] p-1.5 rounded-lg border border-yellow-600/30 transition-all flex items-center gap-2 text-left"
            title={`Watch ${vehicle.bengaliName} review`}
          >
            {/* The iconic Play button styling from original prototype */}
            <div className="shrink-0 w-12 h-8 bg-[#bdae1d] shadow-[2px_3px_0_#8f8316] group-hover:translate-y-[-1px] group-active:translate-y-[1px] transition-transform grid place-items-center rounded-sm">
              <div className="w-0 h-0 border-l-[12px] border-l-[#c8161d] border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent ml-1"></div>
            </div>

            <div className="overflow-hidden flex-1">
              <p className="text-[11px] font-bold text-[#0d2d4e] truncate group-hover:text-teal-900">
                {vehicle.bengaliName}
              </p>
              <p className="text-[10px] text-teal-800 font-mono">
                ৳{vehicle.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust badge */}
      <div className="mt-3 pt-2 border-t border-teal-800/10 flex items-center justify-center gap-1 text-[11px] text-teal-900 font-medium">
        <ShieldCheck className="w-4 h-4 text-[#17574f]" />
        <span>100% Official Warranty</span>
      </div>
    </aside>
  );
};
