import { Sun, Moon } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  brightness: number;
  onChange: (value: number) => void;
};

const LightControlWidget = ({ brightness, onChange }: Props) => {
  const isOn = brightness > 0;

  return (
    <DeviceControlCard
      title="Light Brightness"
      description="Adjust lighting intensity"
    >
      <div className="flex flex-col gap-5 py-2">
        {/* Value Display */}
        <div className="flex items-end justify-between px-1">
          <span className="text-sm font-semibold tracking-wide text-slate-400">
            Intensity
          </span>
          <span
            className={`text-3xl font-extrabold transition-all duration-300 ${
              isOn
                ? "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                : "text-slate-600"
            }`}
          >
            {brightness}%
          </span>
        </div>

        {/* Custom Slider */}
        <div className="relative h-14 w-full rounded-2xl bg-slate-800 p-1 shadow-inner">
          {/* Dynamic Fill Track */}
          <div
            className={`h-full rounded-xl bg-linear-to-r transition-all duration-150 ease-out ${
              isOn
                ? "from-amber-600 to-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                : "bg-slate-700"
            }`}
            // Math.max ensures there is always a tiny "pill" visible even at 0%
            style={{ width: `${Math.max(brightness, 8)}%` }}
          />

          {/* Invisible Overlay Input for Native Drag/Click */}
          <input
            type="range"
            min={0}
            max={100}
            value={brightness}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 z-20 h-full w-full opacity-0 cursor-grab active:cursor-grabbing"
            aria-label="Brightness slider"
          />

          {/* Embedded Visual Feedback Icons */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-4">
            <Moon
              className={`h-5 w-5 transition-colors duration-300 ${
                brightness < 20 ? "text-amber-100" : "text-amber-900/40"
              }`}
              strokeWidth={2.5}
            />
            <Sun
              className={`h-6 w-6 transition-colors duration-300 ${
                brightness > 80 ? "text-white drop-shadow-md" : "text-slate-500"
              }`}
              strokeWidth={2.5}
            />
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default LightControlWidget;
