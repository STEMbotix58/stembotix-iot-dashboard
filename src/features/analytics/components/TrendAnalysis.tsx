type Trend = {
  label: string;
  status: "positive" | "warning" | "negative";
  description: string;
};

type Props = {
  trends: Trend[];
};

const TrendAnalysis = ({ trends }: Props) => {
  const statusStyles = {
    positive: "border-green-200 bg-green-50 text-green-700",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
    negative: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">Trend Analysis</h2>
        <p className="text-sm text-slate-500">
          System generated telemetry insights
        </p>
      </div>

      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div
            key={index}
            className={`rounded-xl border p-4 ${statusStyles[trend.status]}`}
          >
            <h3 className="font-semibold">{trend.label}</h3>
            <p className="mt-1 text-sm">{trend.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendAnalysis;
