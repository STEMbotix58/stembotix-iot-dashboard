import { useMemo, useState } from "react";

import useAlertsPaginated from "../hooks/useAlertsPaginated";
import AlertFilters from "../components/AlertFilters";
import AlertList from "../components/AlertList";
import Pagination from "@/core/pagination/Pagination";

const AlertsPage = () => {
  const [filter, setFilter] = useState("all");
  const { alerts, pagination, setPage, setPageSize, loading } =
    useAlertsPaginated();

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

      <div className="rounded-2xl bg-white shadow-sm">
        <Pagination
          pagination={pagination}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => setPageSize(s)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AlertsPage;
