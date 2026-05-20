import { useState, useEffect } from "react";
import { Camera, Video, Maximize, Wifi } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

const CameraControlWidget = () => {
  // Mock time for the live feed timestamp overlay
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <DeviceControlCard title="Security Camera" description="Live porch feed">
      {/* 
        aspect-video locks it to a 16:9 ratio. 
        group allows us to trigger hover effects on inner elements. 
      */}
      <div className="group relative flex aspect-video w-full flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
        {/* Simulated Lens/Feed Background (Gradient + Subtle Grid) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-700 to-slate-900" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[20px_20px]" />

        {/* Central Reticle (Decorative, adds to the tactical hardware feel) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
          <div className="h-16 w-16 rounded-full border border-slate-400" />
          <div className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-12 -translate-y-1/2 bg-slate-400" />
          <div className="absolute left-1/2 top-1/2 h-0.5 w-3 translate-x-9 -translate-y-1/2 bg-slate-400" />
          <div className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-12 bg-slate-400" />
          <div className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-px translate-y-9 bg-slate-400" />
        </div>

        {/* Top HUD Overlay (Status & Network) */}
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-linear-to-b from-black/80 to-transparent p-3 text-white">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 animate-pulse items-center justify-center rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-xs font-bold tracking-widest text-red-500">
              LIVE
            </span>
            <span className="ml-2 hidden text-xs font-medium text-slate-300 sm:block">
              CAM_01 / 1080p
            </span>
          </div>
          <Wifi className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
        </div>

        {/* Bottom HUD Overlay & Controls (Reveals slightly on hover) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex translate-y-1 items-end justify-between bg-linear-to-t from-black/90 via-black/40 to-transparent p-3 opacity-80 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {/* Real-time Timestamp */}
          <div className="flex flex-col text-xs font-mono tracking-wider text-slate-300 drop-shadow-md">
            <span>{time.toLocaleTimeString("en-US", { hour12: false })}</span>
            <span>{time.toLocaleDateString()}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Take snapshot"
            >
              <Camera className="h-4 w-4" />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-rose-500 hover:shadow-[0_0_15px_rgba(225,29,72,0.5)] focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Start recording"
            >
              <Video className="h-4 w-4" />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Fullscreen"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default CameraControlWidget;
