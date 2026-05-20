import { CloudRain, Sun, Wind, Droplets } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  temperature: number;
  condition: "Sunny" | "Rainy" | "Cloudy";
  humidity: number;
  windSpeed: number;
};

const WeatherWidget = ({
  temperature,
  condition,
  humidity,
  windSpeed,
}: Props) => {
  // Dynamic atmospheric backgrounds based on weather
  const isSunny = condition === "Sunny";
  const bgGradient = isSunny
    ? "from-sky-500/20 to-amber-500/10"
    : "from-slate-600/30 to-blue-900/20";
  const Icon = isSunny ? Sun : CloudRain;
  const iconColor = isSunny ? "text-amber-400" : "text-blue-400";

  return (
    <DeviceControlCard
      title="Outdoor Climate"
      description="Local weather station"
    >
      <div
        className={`relative flex flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br p-5 ring-1 ring-white/10 ${bgGradient}`}
      >
        {/* Main Temperature & Icon */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-4xl font-black tabular-nums tracking-tighter text-white drop-shadow-md">
              {temperature}°
            </span>
            <span className="text-sm font-semibold tracking-wide text-slate-300">
              {condition}
            </span>
          </div>

          <div className="relative flex h-16 w-16 items-center justify-center">
            {/* Ambient sun/cloud glow */}
            <div
              className={`absolute inset-0 blur-xl ${isSunny ? "bg-amber-500/40" : "bg-blue-500/40"}`}
            />
            <Icon
              className={`relative z-10 h-10 w-10 ${iconColor} ${isSunny ? "animate-[spin_20s_linear_infinite]" : "animate-bounce"}`}
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Secondary Metrics Array */}
        <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-black/20 p-2 backdrop-blur-md">
            <Droplets className="h-4 w-4 text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Humidity
              </span>
              <span className="text-sm font-bold text-white">{humidity}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-black/20 p-2 backdrop-blur-md">
            <Wind className="h-4 w-4 text-slate-300" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Wind
              </span>
              <span className="text-sm font-bold text-white">
                {windSpeed} km/h
              </span>
            </div>
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default WeatherWidget;
