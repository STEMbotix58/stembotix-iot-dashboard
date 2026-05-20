type Props = {
  value: string;
  onChange: (value: string) => void;
};

const TelemetryFilters = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-3">
      {["temperature", "humidity", "voltage", "energy"].map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            value === filter
              ? "bg-black text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TelemetryFilters;
