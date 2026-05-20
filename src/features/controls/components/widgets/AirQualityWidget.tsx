import { Wind, AlertCircle, CheckCircle2 } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  aqi: number; // Air Quality Index (0-500)
};

const AirQualityWidget = ({ aqi }: Props) => {
  // Determine AQI Status and Colors
  let status = "Good";
  let colorClass = "text-emerald-400";
  let bgClass = "bg-emerald-500";
  let glowClass = "shadow-[0_0_15px_rgba(52,211,153,0.4)]";
  let Icon = CheckCircle2;

  if (aqi > 300) {
    status = "Hazardous";
    colorClass = "text-purple-500";
    bgClass = "bg-purple-600";
    glowClass = "shadow-[0_0_15px_rgba(147,51,234,0.4)]";
    Icon = AlertCircle;
  } else if (aqi > 150) {
    status = "Unhealthy";
    colorClass = "text-rose-500";
    bgClass = "bg-rose-500";
    glowClass = "shadow-[0_0_15px_rgba(244,63,94,0.4)]";
    Icon = AlertCircle;
  } else if (aqi > 50) {
    status = "Moderate";
    colorClass = "text-amber-400";
    bgClass = "bg-amber-500";
    glowClass = "shadow-[0_0_15px_rgba(251,191,36,0.4)]";
    Icon = Wind;
  }

  // Calculate percentage for the visual arc (capped at 500)
  const percentage = Math.min(100, (aqi / 500) * 100);

  return (
    <DeviceControlCard title="Air Quality" description="Indoor AQI Monitor">
      <div className="flex flex-col items-center py-4">
        {/* Circular Gauge */}
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-slate-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] ring-1 ring-slate-700">
          {/* Dynamic Fill Ring */}
          <div className="absolute inset-2 rounded-full border-4 border-slate-700">
            <svg className="absolute -left-1 -top-1 h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="58"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="364"
                strokeDashoffset={364 - (364 * percentage) / 100}
                className={`transition-all duration-1000 ease-out ${colorClass}`}
              />
            </svg>
          </div>

          {/* Center Readout */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-slate-500">AQI</span>
            <span
              className={`text-4xl font-black tabular-nums tracking-tighter ${colorClass}`}
            >
              {aqi}
            </span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="mt-6 flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-1.5 ring-1 ring-white/5">
          <Icon className={`h-4 w-4 ${colorClass}`} />
          <span
            className={`text-sm font-bold uppercase tracking-wider ${colorClass}`}
          >
            {status}
          </span>
        </div>

        {/* Secondary Metrics */}
        <div className="mt-4 flex w-full justify-between border-t border-slate-700/50 pt-4 text-xs font-semibold text-slate-400">
          <div className="flex flex-col items-center">
            <span>PM2.5</span>
            <span className="text-slate-200">12 µg/m³</span>
          </div>
          <div className="flex flex-col items-center">
            <span>VOCs</span>
            <span className="text-slate-200">0.2 ppm</span>
          </div>
          <div className="flex flex-col items-center">
            <span>CO2</span>
            <span className="text-slate-200">410 ppm</span>
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default AirQualityWidget;
