import { Power, RotateCcw, Trash2, Settings } from "lucide-react";

const DeviceActions = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
        <Power size={16} />
        Restart
      </button>

      <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
        <RotateCcw size={16} />
        Sync
      </button>

      <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
        <Settings size={16} />
        Configure
      </button>

      <button className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100">
        <Trash2 size={16} />
        Remove
      </button>
    </div>
  );
};

export default DeviceActions;
