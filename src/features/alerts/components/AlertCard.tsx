import type { Alert } from "../api/alerts.api";

type Props = {
  alert: Alert;
};

const AlertCard = ({ alert }: Props) => {
  const severityStyles = {
    info: "border-blue-200 bg-blue-50 text-blue-700",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
    critical: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${severityStyles[alert.severity]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{alert.title}</h3>
          <p className="mt-1 text-sm">{alert.description}</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">
          {alert.severity}
        </span>
      </div>
      <div className="mt-4 text-xs">
        Device:
        {alert.deviceId}
      </div>
      <div className="mt-1 text-xs">{alert.timestamp}</div>
    </div>
  );
};

export default AlertCard;
