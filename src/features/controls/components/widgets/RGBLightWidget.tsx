import { Lightbulb, Palette } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  color: string;
  onChange: (value: string) => void;
};

const RGBLightWidget = ({ color, onChange }: Props) => {
  return (
    <DeviceControlCard title="RGB Light" description="Select light color">
      <div className="relative flex w-full items-center justify-between rounded-2xl bg-slate-800 p-3 shadow-inner ring-1 ring-slate-700 transition-all hover:ring-slate-500">
        {/* Invisible Native Color Picker (Clicking anywhere triggers it) */}
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
          aria-label="Choose RGB Color"
        />

        <div className="flex items-center gap-4">
          {/* Visual Color Indicator (Glowing Orb) */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-colors duration-300"
            style={{
              backgroundColor: `${color}20`, // 20% opacity background
              boxShadow: `0 0 20px ${color}60`, // 60% opacity glow
            }}
          >
            <Lightbulb
              className="h-6 w-6 transition-colors duration-300"
              style={{
                color: color,
                filter: `drop-shadow(0 0 8px ${color})`,
              }}
              strokeWidth={2.5}
            />
          </div>

          {/* Hex Value Readout */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Current Color
            </span>
            <span className="font-mono text-lg font-bold text-slate-200">
              {color.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Action Indicator Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700/50 text-slate-400 transition-colors hover:text-slate-200">
          <Palette className="h-5 w-5" />
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default RGBLightWidget;
