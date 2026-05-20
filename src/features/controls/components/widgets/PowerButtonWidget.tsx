import { Power } from "lucide-react";

import DeviceControlCard from "./DeviceControlCard";

type Props = {
  active: boolean;
  loading?: boolean;
  onToggle: () => void;
};

const PowerButtonWidget = ({ active, loading = false, onToggle }: Props) => {
  return (
    <DeviceControlCard title="Power Control" description="Power device on/off">
      <div className="flex flex-col items-center justify-center py-4">
        <button
          onClick={onToggle}
          disabled={loading}
          className="group relative flex h-32 w-32 items-center justify-center rounded-full transition-transform duration-300 ease-out focus:outline-none active:scale-90 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={active ? "Turn power off" : "Turn power on"}
          aria-pressed={active}
        >
          {/* Glow */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-700 ease-in-out ${
              active
                ? "bg-emerald-500/20 blur-md shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                : "bg-transparent shadow-none blur-0"
            }`}
          />

          {/* Button */}
          <div
            className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 transition-all duration-500 ${
              active
                ? "border-2 border-emerald-500 shadow-[inset_0_0_20px_rgba(16,185,129,0.4)]"
                : "border-2 border-slate-700 shadow-[inset_0_4px_6px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.6)]"
            }`}
          >
            <Power
              className={`h-10 w-10 transition-all duration-500 ${
                active
                  ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,1)]"
                  : "text-slate-600"
              }`}
              strokeWidth={2.5}
            />
          </div>
        </button>

        {/* Status */}
        <div className="mt-8 flex flex-col items-center gap-1">
          <span
            className={`text-sm font-black uppercase tracking-widest transition-colors duration-500 ${
              active ? "text-emerald-400" : "text-slate-500"
            }`}
          >
            {loading
              ? "Loading..."
              : active
                ? "System Online"
                : "System Offline"}
          </span>

          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                active ? "animate-pulse bg-emerald-500" : "bg-slate-700"
              }`}
            />

            <span className="text-xs font-semibold text-slate-500">
              Main Relay
            </span>
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default PowerButtonWidget;
