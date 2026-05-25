import { useMemo } from "react";

import { useDevices } from "../hooks/useDevices";

import DeviceRuntimeSite from "./DeviceRuntimeSite";

import { dashboardLayoutService } from "@/features/dashboard/services/dashboard-layout.service";

const DeviceRuntimeGrid = () => {
  const { devices = [], loading } = useDevices();

  const sites = useMemo(() => {
    return dashboardLayoutService.groupBySiteAndRoom(devices);
  }, [devices]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-3xl border border-slate-200 bg-white shadow-sm"
          />
        ))}
      </div>
    );
  }

  if (!sites.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          No Devices Connected
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Waiting for realtime device registration and telemetry streams.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {sites.map((site) => (
        <DeviceRuntimeSite key={site.siteId} site={site} />
      ))}
    </div>
  );
};

export default DeviceRuntimeGrid;
