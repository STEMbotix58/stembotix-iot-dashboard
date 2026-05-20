import { Snowflake, Flame, Leaf, Thermometer } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  temperature: number;
  onChange: (value: number) => void;
};

const ThermostatWidget = ({ temperature, onChange }: Props) => {
  // Map the 16-35 range to a 0-100 percentage for the fill bar
  const MIN_TEMP = 16;
  const MAX_TEMP = 35;
  const percentage = Math.max(
    5, // Keep a tiny 5% sliver visible at the absolute minimum
    Math.min(100, ((temperature - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100),
  );

  // Determine dynamic visual states based on temperature thresholds
  let stateColors = "";
  let glowColor = "";
  let textColor = "";
  let Icon = Thermometer;

  if (temperature < 22) {
    // Cooling mode
    stateColors = "from-blue-600 to-cyan-400";
    glowColor = "shadow-[0_0_15px_rgba(6,182,212,0.4)]";
    textColor = "text-cyan-400";
    Icon = Snowflake;
  } else if (temperature < 28) {
    // Comfort/Eco mode
    stateColors = "from-emerald-500 to-green-400";
    glowColor = "shadow-[0_0_15px_rgba(16,185,129,0.4)]";
    textColor = "text-emerald-400";
    Icon = Leaf;
  } else {
    // Heating mode
    stateColors = "from-orange-500 to-red-500";
    glowColor = "shadow-[0_0_15px_rgba(239,68,68,0.4)]";
    textColor = "text-red-400";
    Icon = Flame;
  }

  return (
    <DeviceControlCard title="Thermostat" description="Set room temperature">
      <div className="flex flex-col gap-6 py-2">
        {/* Dynamic Header Display */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 shadow-inner transition-colors duration-500`}
            >
              <Icon
                className={`h-6 w-6 transition-all duration-500 ${textColor}`}
                strokeWidth={2.5}
                style={{ filter: `drop-shadow(0 0 6px currentColor)` }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Climate Mode
              </span>
              <span
                className={`text-sm font-bold uppercase transition-colors duration-500 ${textColor}`}
              >
                {temperature < 22
                  ? "Cooling"
                  : temperature < 28
                    ? "Comfort"
                    : "Heating"}
              </span>
            </div>
          </div>

          <div className="flex items-start">
            <span
              className={`text-4xl font-extrabold tabular-nums tracking-tight transition-colors duration-500 ${textColor}`}
            >
              {temperature}
            </span>
            <span className="text-xl font-bold text-slate-500">°C</span>
          </div>
        </div>

        {/* Custom Slider Track */}
        <div className="relative h-14 w-full rounded-2xl bg-slate-800 p-1 shadow-inner">
          {/* Dynamic Temperature Fill */}
          <div
            className={`h-full rounded-xl bg-linear-to-r transition-all duration-300 ease-out ${stateColors} ${glowColor}`}
            style={{ width: `${percentage}%` }}
          />

          {/* Invisible Native Overlay */}
          <input
            type="range"
            min={MIN_TEMP}
            max={MAX_TEMP}
            step={1}
            value={temperature}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 z-20 h-full w-full cursor-grab active:cursor-grabbing opacity-0"
            aria-label="Temperature slider"
          />

          {/* Min/Max Indicator Notches (Decorative) */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-4 text-xs font-bold text-slate-500/50">
            <span>{MIN_TEMP}°</span>
            <span>{MAX_TEMP}°</span>
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default ThermostatWidget;
