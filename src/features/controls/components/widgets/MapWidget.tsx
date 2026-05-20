import { useState, useEffect } from "react";
import { Navigation, Satellite, Signal, MapPin, Crosshair } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

const MapWidget = () => {
  // Simulate live GPS telemetry drift
  const [telemetry, setTelemetry] = useState({
    lat: 23.2156,
    lng: 72.6369,
    speed: 42,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001,
        speed: Math.max(
          0,
          Math.min(120, prev.speed + (Math.random() - 0.5) * 2),
        ),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DeviceControlCard title="Fleet Tracking" description="Live asset location">
      <div className="group relative flex h-64 w-full flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] ring-1 ring-slate-800">
        {/* Simulated Vector Map Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-700/50 to-slate-900" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-size[24px_24px]" />

        {/* Decorative Topographic / Radar Lines */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 50 Q 25 20, 50 50 T 100 50"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
            <path
              d="M 0 80 Q 40 40, 80 90 T 100 20"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.2"
            />
          </svg>
        </div>

        {/* Top HUD Overlay: Signal & Satellites */}
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-linear-to-b from-black/80 to-transparent p-3 text-slate-300">
          <div className="flex items-center gap-2">
            <Satellite className="h-4 w-4 text-sky-400" />
            <span className="text-[10px] font-bold tracking-widest text-sky-400">
              12 SAT LOCK
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400">
              GPS/LTE
            </span>
            <Signal className="h-4 w-4 text-emerald-400" />
          </div>
        </div>

        {/* Center Target Marker */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          {/* Radar Ping Animation */}
          <div className="absolute h-24 w-24 animate-ping rounded-full bg-sky-500/20" />
          <div className="absolute h-12 w-12 rounded-full border border-sky-400/30 bg-sky-500/10 backdrop-blur-sm" />

          {/* Asset Icon */}
          <div className="relative flex h-8 w-8 rotate-45 items-center justify-center rounded-full bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.6)]">
            <Navigation
              className="h-4 w-4 -rotate-45"
              fill="currentColor"
              strokeWidth={1.5}
            />
          </div>

          {/* Floating Tooltip (Shows on hover) */}
          <div className="absolute -top-10 whitespace-nowrap rounded-lg bg-black/80 px-2.5 py-1 text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            TRK-094 (Moving)
          </div>
        </div>

        {/* Decorative Map Pins */}
        <div className="absolute left-1/4 top-1/4 text-slate-500/50">
          <MapPin className="h-4 w-4" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-slate-500/50">
          <Crosshair className="h-4 w-4" />
        </div>

        {/* Bottom HUD Overlay: Telemetry Readout */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between bg-linear-to-t from-black/90 via-black/60 to-transparent p-3">
          {/* Live Coordinates */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Coordinates
            </span>
            <div className="flex items-center gap-2 font-mono text-xs font-medium text-slate-300">
              <span className="tabular-nums">
                {telemetry.lat.toFixed(5)}° N
              </span>
              <span className="text-slate-600">/</span>
              <span className="tabular-nums">
                {telemetry.lng.toFixed(5)}° E
              </span>
            </div>
          </div>

          {/* Speed Indicator */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Velocity
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-lg font-bold tabular-nums text-sky-400">
                {Math.round(telemetry.speed)}
              </span>
              <span className="text-xs font-bold text-sky-500/50">km/h</span>
            </div>
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default MapWidget;
