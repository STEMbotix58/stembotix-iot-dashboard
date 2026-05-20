type Props = {
  label: string;
  value: string | number;
  unit?: string;
  status?: "normal" | "warning" | "danger";
};

const MetricCard = ({ label, value, unit, status = "normal" }: Props) => {
  const statusStyles = {
    normal: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    danger: "border-red-200 bg-red-50",
  };

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${statusStyles[status]}`}>
      <p className="text-sm text-slate-500">{label}</p>

      <div className="mt-3 flex items-end gap-2">
        <h2 className="text-3xl font-bold text-slate-900">{value}</h2>

        {unit && <span className="pb-1 text-sm text-slate-500">{unit}</span>}
      </div>
    </div>
  );
};

export default MetricCard;
