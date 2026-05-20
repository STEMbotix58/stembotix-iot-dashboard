import { Wifi, ArrowDown, ArrowUp, Globe } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  ping: number;
  download: number;
  upload: number;
  online: boolean;
};

const NetworkHealthWidget = ({ ping, download, upload, online }: Props) => {
  return (
    <DeviceControlCard
      title="Network Diagnostics"
      description="Router & ISP Health"
    >
      <div className="flex flex-col gap-4 py-2">
        {/* Main Status Header */}
        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-3 ring-1 ring-slate-700">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${online ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}
            >
              {online ? (
                <Globe className="h-5 w-5" />
              ) : (
                <Wifi className="h-5 w-5 line-through" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400">
                Connection
              </span>
              <span
                className={`text-sm font-black uppercase tracking-widest ${online ? "text-emerald-400" : "text-rose-400"}`}
              >
                {online ? "Online & Stable" : "Offline"}
              </span>
            </div>
          </div>

          {/* Ping Readout */}
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-slate-500">
              Latency
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={`font-mono text-xl font-bold ${ping > 100 ? "text-amber-400" : "text-white"}`}
              >
                {ping}
              </span>
              <span className="text-xs text-slate-500">ms</span>
            </div>
          </div>
        </div>

        {/* Speed Telemetry */}
        <div className="grid grid-cols-2 gap-3">
          {/* Download */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-3 ring-1 ring-slate-700/50">
            <ArrowDown className="h-6 w-6 text-sky-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Download
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg font-bold text-white">
                  {download}
                </span>
                <span className="text-[10px] text-slate-500">Mbps</span>
              </div>
            </div>
          </div>

          {/* Upload */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-3 ring-1 ring-slate-700/50">
            <ArrowUp className="h-6 w-6 text-purple-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Upload
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg font-bold text-white">
                  {upload}
                </span>
                <span className="text-[10px] text-slate-500">Mbps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default NetworkHealthWidget;
