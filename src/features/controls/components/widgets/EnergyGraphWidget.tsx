import { Zap, TrendingDown } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

// Mock data representing last 7 days of kWh usage
const mockData = [
  { day: "M", value: 12 },
  { day: "T", value: 18 },
  { day: "W", value: 15 },
  { day: "T", value: 24 }, // Peak
  { day: "F", value: 20 },
  { day: "S", value: 30 },
  { day: "S", value: 28 },
];

const EnergyGraphWidget = () => {
  const maxVal = Math.max(...mockData.map((d) => d.value));
  const total = mockData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <DeviceControlCard title="Energy Consumption" description="Weekly Usage">
      <div className="flex flex-col py-2">
        {/* Header Stats */}
        <div className="flex items-end justify-between px-1 mb-6">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-amber-400">
              {total} <span className="text-lg text-slate-500">kWh</span>
            </span>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-400">
              <TrendingDown className="h-3 w-3" />
              <span>-12% vs last week</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
            <Zap className="h-5 w-5" />
          </div>
        </div>

        {/* CSS Bar Chart */}
        <div className="flex h-32 w-full items-end justify-between gap-2 rounded-xl bg-slate-900 p-4 shadow-inner ring-1 ring-slate-800">
          {mockData.map((data, index) => {
            const heightPct = (data.value / maxVal) * 100;
            const isPeak = data.value === maxVal;

            return (
              <div
                key={index}
                className="group flex h-full flex-1 flex-col justify-end gap-2"
              >
                {/* Floating Tooltip Value */}
                <span className="text-center text-[10px] font-bold text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                  {data.value}
                </span>

                {/* Bar */}
                <div
                  className={`w-full rounded-t-sm transition-all duration-500 hover:brightness-125 ${
                    isPeak
                      ? "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                      : "bg-slate-700"
                  }`}
                  style={{ height: `${Math.max(10, heightPct)}%` }} // Ensure even 0 has a tiny sliver
                />

                {/* X-Axis Label */}
                <span
                  className={`text-center text-xs font-bold ${isPeak ? "text-amber-400" : "text-slate-500"}`}
                >
                  {data.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default EnergyGraphWidget;
