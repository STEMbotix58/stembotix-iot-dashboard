import { Plug, Activity } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  enabled: boolean;
  powerUsage: number;
  onToggle: () => void;
};

const SmartPlugWidget = ({ enabled, powerUsage, onToggle }: Props) => {
  // Assume a standard 15A/120V or 10A/240V max load for the visual progress bar
  const MAX_WATTAGE = 2400;

  // If the plug is off, it shouldn't draw power visually, even if the prop lags
  const currentLoad = enabled ? powerUsage : 0;
  const loadPercentage = Math.min(100, (currentLoad / MAX_WATTAGE) * 100);

  // Dynamic colors based on how heavy the electrical load is
  let loadColor = "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]";
  let textColor = "text-emerald-400";

  if (currentLoad > 1800) {
    loadColor = "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]";
    textColor = "text-rose-400";
  } else if (currentLoad > 800) {
    loadColor = "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]";
    textColor = "text-amber-400";
  }

  return (
    <DeviceControlCard
      title="Smart Plug"
      description="Monitor and control plug"
    >
      <div className="flex flex-col gap-5 py-2">
        {/* Top Zone: Control Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 ${
                enabled ? "bg-emerald-500/20" : "bg-slate-800"
              }`}
            >
              <Plug
                className={`h-5 w-5 transition-colors duration-500 ${
                  enabled
                    ? "text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]"
                    : "text-slate-500"
                }`}
                strokeWidth={2.5}
              />
            </div>
            <span className="text-sm font-semibold text-slate-500">
              Relay Power
            </span>
          </div>

          {/* Sleek Mini-Toggle */}
          <button
            onClick={onToggle}
            role="switch"
            aria-checked={enabled}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
              enabled ? "bg-emerald-500" : "bg-slate-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${
                enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Bottom Zone: Digital Energy HUD */}
        <div className="relative flex flex-col gap-3 rounded-xl bg-slate-900 p-4 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] ring-1 ring-slate-800">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Activity className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Current Draw
              </span>
            </div>

            {/* Giant Wattage Readout */}
            <div className="flex items-baseline gap-1">
              <span
                className={`text-3xl font-black tabular-nums tracking-tight transition-colors duration-500 ${
                  enabled ? textColor : "text-slate-600"
                }`}
              >
                {currentLoad}
              </span>
              <span
                className={`text-sm font-bold ${enabled ? textColor : "text-slate-600"}`}
              >
                W
              </span>
            </div>
          </div>

          {/* Dynamic Load Bar */}
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                enabled ? loadColor : "bg-transparent shadow-none"
              }`}
              style={{ width: `${loadPercentage}%` }}
            />
          </div>

          {/* Subtle Capacity Markers */}
          <div className="flex justify-between text-[10px] font-bold text-slate-600">
            <span>0W</span>
            <span>{MAX_WATTAGE}W MAX</span>
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default SmartPlugWidget;
