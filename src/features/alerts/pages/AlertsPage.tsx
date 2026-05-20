import { useMemo, useState } from "react";

import useAlerts from "../hooks/useAlerts";
import AlertFilters from "../components/AlertFilters";
import AlertList from "../components/AlertList";

const AlertsPage = () => {
  const [filter, setFilter] = useState("all");
  const { alerts } = useAlerts();

  const filteredAlerts = useMemo(() => {
    if (filter === "all") {
      return alerts;
    }
    return alerts.filter((alert) => alert.severity === filter);
  }, [alerts, filter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Alerts</h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor realtime system alerts
        </p>
      </div>
      {/* Filters */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <AlertFilters value={filter} onChange={setFilter} />
      </div>
      {/* Alerts */}
      <AlertList alerts={filteredAlerts} />
    </div>
  );
};

export default AlertsPage;
