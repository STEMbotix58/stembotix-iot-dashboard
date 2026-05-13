import type { ChartContainerProps } from "./chart.types";

const ChartContainer = ({ title, children, action }: ChartContainerProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {(title || action) && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

          {action}
        </div>
      )}

      {children}
    </div>
  );
};

export default ChartContainer;
