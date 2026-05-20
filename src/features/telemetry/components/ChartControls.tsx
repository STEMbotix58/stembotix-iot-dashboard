type Props = {
  onRefresh: () => void;
  onExport: () => void;
};

const ChartControls = ({ onRefresh, onExport }: Props) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onRefresh}
        className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
      >
        Refresh
      </button>

      <button
        onClick={onExport}
        className="rounded-xl bg-slate-200 px-5 py-3 text-sm font-medium text-slate-700"
      >
        Export
      </button>
    </div>
  );
};

export default ChartControls;
