import React, { useState } from 'react';
import { X, Play, Pause, Volume2, Maximize2, ShieldCheck, Sparkles, Car } from 'lucide-react';
import { ShowroomVehicle } from '../types';

interface VideoReviewModalProps {
  vehicle: ShowroomVehicle | null;
  onClose: () => void;
  onBookNow: (vehicle: ShowroomVehicle) => void;
}

export const VideoReviewModal: React.FC<VideoReviewModalProps> = ({
  vehicle,
  onClose,
  onBookNow,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(14);
  const totalDuration = 180; // 3:00

  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700 animate-in fade-in zoom-in-95 duration-200 text-white">
        {/* Header */}
        <div className="bg-[#0b2a47] p-3 sm:p-4 flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#ffe600] truncate">
                {vehicle.videoTitle}
              </h3>
              <p className="text-[11px] text-sky-200">{vehicle.bengaliName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative bg-black h-56 sm:h-64 flex flex-col justify-between overflow-hidden group select-none">
          {/* Animated Background Simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-600/90 text-white grid place-items-center shadow-lg transform transition-transform group-hover:scale-110 mb-2">
              {isPlaying ? (
                <div className="flex gap-1.5 items-center justify-center">
                  <div className="w-2 h-6 bg-white rounded-xs animate-bounce"></div>
                  <div className="w-2 h-6 bg-white rounded-xs animate-bounce delay-100"></div>
                  <div className="w-2 h-6 bg-white rounded-xs animate-bounce delay-200"></div>
                </div>
              ) : (
                <Play className="w-7 h-7 fill-white ml-1" />
              )}
            </div>

            <p className="font-bold text-sm text-[#ffe600] drop-shadow">
              {vehicle.bengaliName} Live Test &amp; Road Review
            </p>
            <p className="text-xs text-sky-300 mt-0.5">
              Tan Tech Support Showroom Exclusive
            </p>
          </div>

          {/* Top Video Overlay */}
          <div className="relative z-10 p-3 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center text-xs">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded font-black text-[10px] tracking-wider uppercase">
              HD 1080p
            </span>
            <span className="text-slate-300 font-mono">0:{currentTime < 10 ? `0${currentTime}` : currentTime} / 3:00</span>
          </div>

          {/* Bottom Player Controls */}
          <div className="relative z-10 p-3 bg-gradient-to-t from-black/90 to-transparent space-y-2">
            {/* Scrubber */}
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div
                className="bg-red-500 h-full rounded-full transition-all"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between text-slate-300 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <div className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4" />
                  <div className="w-12 bg-slate-600 h-1 rounded-full">
                    <div className="w-9 bg-yellow-400 h-full rounded-full"></div>
                  </div>
                </div>
              </div>
              <button className="hover:text-white">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Specs & Booking Box */}
        <div className="p-4 sm:p-5 bg-slate-900 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <span className="text-slate-400 text-[11px]">{vehicle.type}</span>
              <h4 className="font-bold text-base text-[#ffe600]">
                {vehicle.name}
              </h4>
            </div>
            <span className="text-lg font-black font-mono text-emerald-400">
              ৳{vehicle.price.toLocaleString()}
            </span>
          </div>

          <div>
            <p className="font-bold text-slate-300 mb-1">Technical Specifications:</p>
            <div className="grid grid-cols-2 gap-1.5 text-slate-300">
              {vehicle.specs.map((s, idx) => (
                <div key={idx} className="bg-slate-800/80 p-1.5 rounded border border-slate-700/60">
                  <span className="text-yellow-400 font-bold mr-1">✓</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookNow(vehicle);
            }}
            className="w-full bg-[#17574f] hover:bg-[#1f6e64] text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer text-sm"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Book or Order from Showroom</span>
          </button>
        </div>
      </div>
    </div>
  );
};
