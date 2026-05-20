import { Fan } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  speed: number;
  onChange: (value: number) => void;
};

const FanSpeedSliderWidget = ({ speed, onChange }: Props) => {
  const isOn = speed > 0;

  // Calculate dynamic spin speed. Level 1 = slowest (2s), Level 5 = fastest (0.4s).
  const spinDuration = isOn ? `${2 / speed}s` : "0s";

  return (
    <DeviceControlCard title="Fan Speed" description="Control fan speed">
      <div className="flex flex-col gap-6 py-2">
        {/* Header: Dynamic Icon & Value */}
        <div className="flex items-center justify-between px-1">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full shadow-inner transition-colors duration-300 ${
              isOn ? "bg-cyan-500/10" : "bg-slate-800"
            }`}
          >
            <Fan
              className={`h-7 w-7 transition-colors duration-300 ${
                isOn
                  ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  : "text-slate-500"
              }`}
              style={{
                animation: isOn
                  ? `spin ${spinDuration} linear infinite`
                  : "none",
              }}
              strokeWidth={2.5}
            />
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Current Speed
            </span>
            <span
              className={`text-2xl font-extrabold transition-all duration-300 ${
                isOn ? "text-cyan-400" : "text-slate-600"
              }`}
            >
              {isOn ? `Level ${speed}` : "OFF"}
            </span>
          </div>
        </div>

        {/* Segmented Stepper Track */}
        <div className="relative flex h-14 w-full items-end justify-between gap-1.5 rounded-2xl bg-slate-800 p-2 shadow-inner">
          {/* Invisible Native Input for native dragging and clicking */}
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={speed}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
            aria-label="Fan speed slider"
          />

          {/* Visual Bar Generation (Levels 1 to 5) */}
          {[1, 2, 3, 4, 5].map((level) => {
            const isActive = speed >= level;
            // Create a staggered height effect for the bars (20%, 40%, 60%, 80%, 100%)
            const heightPercentage = `${level * 20}%`;

            return (
              <div
                key={level}
                className="relative w-full rounded-sm transition-all duration-300 ease-out"
                style={{ height: heightPercentage }}
              >
                <div
                  className={`absolute inset-0 rounded-sm transition-colors duration-200 ${
                    isActive
                      ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      : "bg-slate-700"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default FanSpeedSliderWidget;
