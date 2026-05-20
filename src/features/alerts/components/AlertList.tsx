import AlertCard from "./AlertCard";

import type { Alert } from "../api/alerts.api";

type Props = {
  alerts: Alert[];
};

const AlertList = ({ alerts }: Props) => {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
};

export default AlertList;
