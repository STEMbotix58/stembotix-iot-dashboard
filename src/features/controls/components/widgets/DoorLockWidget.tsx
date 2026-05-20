import { Lock, Unlock, ShieldCheck, ShieldAlert } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  locked: boolean;
  onToggle: () => void;
};

const DoorLockWidget = ({ locked, onToggle }: Props) => {
  return (
    <DeviceControlCard title="Door Lock" description="Lock or unlock door">
      <div className="flex flex-col items-center justify-center py-4">
        {/* Main Smart Lock Dial */}
        <button
          onClick={onToggle}
          className={`group relative flex h-28 w-28 items-center justify-center rounded-full transition-all duration-500 ease-out focus:outline-none focus:ring-4 focus:ring-slate-700 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            locked
              ? "bg-slate-800 shadow-[0_0_35px_rgba(225,29,72,0.25)] hover:shadow-[0_0_45px_rgba(225,29,72,0.4)]"
              : "bg-slate-800 shadow-[0_0_35px_rgba(16,185,129,0.25)] hover:shadow-[0_0_45px_rgba(16,185,129,0.4)]"
          }`}
          aria-label={locked ? "Unlock door" : "Lock door"}
        >
          {/* Concentric Hardware Rings */}
          <div
            className={`absolute inset-0 rounded-full border-2 transition-colors duration-500 ${
              locked ? "border-rose-500/20" : "border-emerald-500/20"
            }`}
          />
          <div
            className={`absolute inset-2 rounded-full border border-slate-700 bg-linear-to-b transition-colors duration-500 ${
              locked
                ? "from-rose-500/10 to-transparent"
                : "from-emerald-500/10 to-transparent"
            }`}
          />

          {/* Dynamic Core Icon */}
          <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
            {locked ? (
              <Lock
                className="h-10 w-10 text-rose-500 drop-shadow-[0_0_12px_rgba(225,29,72,0.8)]"
                strokeWidth={2}
              />
            ) : (
              <Unlock
                className="h-10 w-10 text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                strokeWidth={2}
              />
            )}
          </div>
        </button>

        {/* Secondary Status Readout */}
        <div className="mt-6 flex items-center gap-2">
          {locked ? (
            <ShieldCheck className="h-4 w-4 text-rose-500" />
          ) : (
            <ShieldAlert className="h-4 w-4 text-emerald-400 animate-pulse" />
          )}
          <span
            className={`text-sm font-bold uppercase tracking-widest transition-colors duration-500 ${
              locked ? "text-rose-500" : "text-emerald-400"
            }`}
          >
            {locked ? "Secure" : "Unlocked"}
          </span>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default DoorLockWidget;
