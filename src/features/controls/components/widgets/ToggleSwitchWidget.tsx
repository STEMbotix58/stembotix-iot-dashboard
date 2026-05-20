import { Zap } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  enabled: boolean;
  onToggle: () => void;
};

const ToggleSwitchWidget = ({ enabled, onToggle }: Props) => {
  return (
    <DeviceControlCard
      title="Toggle Control"
      description="Enable or disable device"
    >
      <div className="flex items-center">
        <button
          onClick={onToggle}
          role="switch"
          aria-checked={enabled}
          className={`relative inline-flex h-12 w-24 shrink-0 cursor-pointer items-center rounded-full transition-all duration-500 ease-in-out focus:outline-none  ${
            enabled
              ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              : "bg-slate-700 shadow-inner"
          }`}
        >
          <span className="sr-only">Toggle device</span>

          {/* Embedded Text Indicators */}
          <span
            className={`absolute left-3 text-xs font-extrabold tracking-wider text-white transition-opacity duration-300 ${
              enabled ? "opacity-100" : "opacity-0"
            }`}
          >
            ON
          </span>
          <span
            className={`absolute right-3 text-xs font-extrabold tracking-wider text-slate-400 transition-opacity duration-300 ${
              enabled ? "opacity-0" : "opacity-100"
            }`}
          >
            OFF
          </span>

          {/* Sliding Knob */}
          <span
            className={`pointer-events-none relative z-10 flex h-10 w-10 transform items-center justify-center rounded-full bg-white shadow-md ring-0 transition-transform duration-500 ease-in-out ${
              enabled ? "translate-x-13" : "translate-x-1"
            }`}
          >
            {/* Lucide React Icon */}
            <Zap
              className={`h-5 w-5 transition-colors duration-500 ${
                enabled ? "text-emerald-500" : "text-slate-400"
              }`}
              strokeWidth={2.5}
            />
          </span>
        </button>
      </div>
    </DeviceControlCard>
  );
};

export default ToggleSwitchWidget;
