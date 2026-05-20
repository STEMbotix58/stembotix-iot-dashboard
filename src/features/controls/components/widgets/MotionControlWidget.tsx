import { Activity, Radar, ShieldCheck, AlertTriangle } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  detected: boolean;
};

const MotionControlWidget = ({ detected }: Props) => {
  return (
    <DeviceControlCard
      title="Motion Sensor"
      description="Realtime motion detection"
    >
      <div className="flex flex-col items-center justify-center py-4">
        {/* Radar / Alert Visualizer */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          {/* Animated Background Rings */}
          {detected ? (
            <>
              {/* Aggressive fast pings for alert state */}
              <div className="absolute inset-0 animate-ping rounded-full bg-rose-500/20" />
              <div
                className="absolute inset-4 animate-ping rounded-full bg-rose-500/40"
                style={{ animationDelay: "150ms" }}
              />
            </>
          ) : (
            <>
              {/* Gentle slow pulses for scanning state */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-500/10" />
              <div
                className="absolute inset-6 animate-pulse rounded-full bg-emerald-500/20"
                style={{ animationDelay: "500ms" }}
              />
            </>
          )}

          {/* Central Hardware Core */}
          <div
            className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-slate-800 transition-all duration-300 ${
              detected
                ? "border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.6)]"
                : "border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            }`}
          >
            {detected ? (
              <Activity
                className="h-8 w-8 text-rose-500 drop-shadow-[0_0_8px_rgba(225,29,72,0.8)]"
                strokeWidth={2.5}
              />
            ) : (
              <Radar
                className="h-8 w-8 text-emerald-400 opacity-80"
                strokeWidth={2}
              />
            )}
          </div>
        </div>

        {/* Status Readout Panel */}
        <div className="mt-8 flex w-full flex-col items-center gap-2 rounded-xl bg-slate-300/50 p-3 shadow-inner ">
          <div className="flex items-center gap-2">
            {detected ? (
              <AlertTriangle className="h-4 w-4 animate-pulse text-rose-500" />
            ) : (
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            )}
            <span
              className={`text-sm font-black uppercase tracking-widest transition-colors duration-300 ${
                detected ? "text-rose-500" : "text-emerald-400"
              }`}
            >
              {detected ? "Motion Detected" : "Zone Secure"}
            </span>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            {detected ? "Triggered: Just now" : "Monitoring active"}
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default MotionControlWidget;
