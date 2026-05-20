import { ArrowUpSquare, ArrowDownSquare, AlertTriangle } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type DoorState = "OPEN" | "CLOSED" | "PARTIAL";

type Props = {
  doorState: DoorState;
  onToggle: () => void;
};

const GarageDoorWidget = ({ doorState, onToggle }: Props) => {
  const isOpen = doorState === "OPEN";
  const isPartial = doorState === "PARTIAL";

  return (
    <DeviceControlCard title="Main Garage" description="Sectional door control">
      <div className="flex items-center gap-6 py-2">
        {/* Animated Garage Visualizer */}
        <div className="relative h-24 w-20 overflow-hidden rounded-md border-4 border-slate-700 bg-slate-900 shadow-inner">
          <div
            className={`absolute inset-x-0 top-0 flex w-full flex-col gap-[2px] transition-transform duration-1000 ease-in-out ${
              isOpen
                ? "-translate-y-[85%]"
                : isPartial
                  ? "-translate-y-1/2"
                  : "translate-y-0"
            }`}
          >
            {/* Garage Panels */}
            {[1, 2, 3, 4].map((panel) => (
              <div
                key={panel}
                className="h-5 w-full border-b border-slate-600 bg-slate-400 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]"
              />
            ))}
          </div>

          {/* Ground Sensor Beam Line */}
          <div className="absolute bottom-1 left-0 right-0 h-[1px] bg-red-500/30 shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
        </div>

        {/* Controls & Status */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-black uppercase tracking-widest ${isOpen ? "text-amber-500" : isPartial ? "text-rose-500" : "text-emerald-500"}`}
            >
              {doorState}
            </span>
            {isPartial && (
              <AlertTriangle className="h-4 w-4 animate-pulse text-rose-500" />
            )}
          </div>

          <button
            onClick={onToggle}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold uppercase text-white shadow-lg transition-transform active:scale-95 ${
              isOpen
                ? "bg-emerald-600 hover:bg-emerald-500"
                : "bg-amber-600 hover:bg-amber-500"
            }`}
          >
            {isOpen ? (
              <ArrowDownSquare className="h-5 w-5" />
            ) : (
              <ArrowUpSquare className="h-5 w-5" />
            )}
            {isOpen ? "Close Door" : "Open Door"}
          </button>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default GarageDoorWidget;
