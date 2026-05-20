import { Activity, Cpu, MapPin, Wifi, WifiOff } from "lucide-react";

import { Navigate } from "react-router-dom";

import { useDeviceDetails } from "../hooks/useDeviceDetails";

import DeviceActions from "../components/DeviceActions";

import LineChart from "@/shared/charts/LineChart";
import AreaChart from "@/shared/charts/AreaChart";
import GaugeChart from "@/shared/charts/GaugeChart";
import BarChart from "@/shared/charts/BarChart";
import RealtimeChart from "@/shared/charts/RealtimeChart";

const DeviceDetailsPage = () => {
  const { device } = useDeviceDetails();

  if (!device) {
    return <Navigate to="/dashboard/devices" />;
  }

  const telemetrySeries = [
    {
      name: "Temperature",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: "Humidity",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  const telemetryBarCategories = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const telemetryCategories = [
    "10:00",
    "10:05",
    "10:10",
    "10:15",
    "10:20",
    "10:25",
    "10:30",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
                <Cpu size={24} />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {device.name}
                </h1>

                <p className="mt-1 text-slate-500">Device ID: {device.id}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
                <MapPin size={16} />
                <span className="text-sm text-slate-700">
                  {device.location}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
                <Activity size={16} />
                <span className="text-sm text-slate-700">{device.type}</span>
              </div>

              <div
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium ${
                  device.status === "Online"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {device.status === "Online" ? (
                  <Wifi size={16} />
                ) : (
                  <WifiOff size={16} />
                )}

                {device.status}
              </div>
            </div>
          </div>

          <DeviceActions />
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Current Reading</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {device.value}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Battery</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">82%</h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Signal Strength</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">-61 dBm</h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Last Seen</p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            {device.lastSeen}
          </h2>
        </div>
      </div>

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-2">
        <LineChart
          title="System Status"
          series={telemetrySeries}
          categories={telemetryBarCategories}
          customOptions={{
            fill: {
              type: "solid",
              opacity: 0.1,
            },
            markers: {
              size: 5,
              strokeColors: "#fff",
              strokeWidth: 2,
            },
          }}
        />
        <AreaChart
          title="Server Load"
          series={[{ name: "CPU %", data: [15, 25, 20, 45, 30] }]}
          categories={["12pm", "1pm", "2pm", "3pm", "4pm"]}
          customOptions={{
            stroke: {
              curve: "straight", // Full Control: Overriding the default smooth curve
              width: 1,
            },
            colors: ["#000000"], // Overriding the color to a sleek black
            fill: {
              gradient: {
                opacityFrom: 0.2,
                opacityTo: 0,
              },
            },
          }}
        />
        <BarChart
          title="Environment Metrics"
          series={[
            { name: "Temperature", data: [11, 32, 45, 32, 34, 52, 41] },
            { name: "Humidity", data: [31, 40, 28, 51, 42, 109, 100] },
          ]}
          categories={telemetryCategories}
        />
        <RealtimeChart
          title="Temperature Over Time"
          series={telemetrySeries}
          categories={telemetryCategories}
          height={350}
          customOptions={{
            xaxis: {
              min: 0,
              max: 10,
            },
            yaxis: {
              min: 0,
              max: 120,
            },
          }}
        />
      </div>

      {/* Bottom Section */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Gauge */}
        <>
          <GaugeChart
            label="CPU Load"
            value={76}
            customOptions={{
              plotOptions: {
                radialBar: {
                  track: {
                    background: "#E0E7FF",
                    strokeWidth: "97%",
                    margin: 5,
                  },
                  dataLabels: {
                    value: {
                      formatter: (val) => `${val}ºC`,
                    },
                  },
                },
              },
            }}
          />
        </>

        {/* Device Metadata */}

        <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">
            Device Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <InfoItem label="Firmware" value="v2.5.1" />

            <InfoItem label="Protocol" value="MQTT" />

            <InfoItem label="IP Address" value="192.168.1.45" />

            <InfoItem label="MAC Address" value="A8:3F:21:9B:4C:22" />

            <InfoItem label="Uptime" value="12 Days" />

            <InfoItem label="Environment" value="Production" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailsPage;

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => {
  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <p className="text-sm text-slate-500">{label}</p>

      <h3 className="mt-2 font-semibold text-slate-900">{value}</h3>
    </div>
  );
};
