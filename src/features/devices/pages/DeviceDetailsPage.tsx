import {
  Activity,
  Battery,
  Cpu,
  Gauge,
  MapPin,
  Radio,
  ShieldAlert,
  Wifi,
  WifiOff,
} from "lucide-react";

import { Navigate } from "react-router-dom";

import { useDeviceDetails } from "../hooks/useDeviceDetails";

import DeviceActions from "../components/DeviceActions";

import LineChart from "@/shared/charts/LineChart";
import RealtimeChart from "@/shared/charts/RealtimeChart";
import GaugeChart from "@/shared/charts/GaugeChart";

const DeviceDetailsPage = () => {
  const { device } = useDeviceDetails();

  if (!device) {
    return <Navigate to="/dashboard/devices" />;
  }

  const telemetrySeries = [
    {
      name: "Temperature",
      data: [22, 24, 25, 26, 27, 26, 25],
    },
    {
      name: "Humidity",
      data: [55, 57, 60, 61, 63, 60, 59],
    },
  ];

  const categories = [
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
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
                <Cpu size={30} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {device.name}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Device ID: {device.id}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <RuntimeBadge
                icon={<MapPin size={16} />}
                label={device.location}
              />
              <RuntimeBadge icon={<Activity size={16} />} label={device.type} />
              <div
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ${
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
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Battery" value="82%" icon={<Battery size={22} />} />
        <StatsCard title="Signal" value="-61 dBm" icon={<Radio size={22} />} />
        <StatsCard
          title="Current Value"
          value={device.value}
          icon={<Gauge size={22} />}
        />
        <StatsCard
          title="Last Seen"
          value={device.lastSeen ?? "Unknown"}
          icon={<Activity size={22} />}
        />
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <LineChart
          title="Environmental Telemetry"
          series={telemetrySeries}
          categories={categories}
        />
        <RealtimeChart
          title="Realtime Sensor Stream"
          series={telemetrySeries}
          categories={categories}
          height={350}
        />
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SensorCard label="Temperature" value="26°C" />
        <SensorCard label="Humidity" value="61%" />
        <SensorCard label="Voltage" value="220V" />
        <SensorCard label="Current" value="12A" />
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <GaugeChart label="CPU Load" value={76} />
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">Device Shadow</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <ShadowBlock
              title="Reported"
              data={`{"temperature": 26, "relay": true}`}
            />
            <ShadowBlock title="Desired" data={`{"relay": false}`} />
            <ShadowBlock title="Delta" data={`{"relay": false}`} />
          </div>
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Connectivity</h2>
          <div className="mt-6 space-y-4">
            <InfoRow label="Protocol" value="MQTT" />
            <InfoRow label="Broker" value="ws://localhost:9001" />
            <InfoRow label="QoS" value="1" />
            <InfoRow label="WebSocket" value="Connected" />
            <InfoRow label="IP Address" value="192.168.1.45" />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Command Center</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <CommandButton label="Restart Device" />
            <CommandButton label="Sync State" />
            <CommandButton label="Firmware Update" />
            <CommandButton label="Emergency Stop" />
          </div>
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-red-500" />
            <h2 className="text-xl font-bold text-slate-900">Alerts</h2>
          </div>
          <div className="mt-6 space-y-4">
            <AlertItem
              title="High Temperature"
              description="Temperature exceeded threshold."
            />
            <AlertItem
              title="Signal Drop"
              description="Device signal temporarily degraded."
            />
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Activity Timeline
          </h2>
          <div className="mt-6 space-y-5">
            <TimelineItem time="10:24 AM" event="Telemetry updated" />
            <TimelineItem time="10:18 AM" event="Command executed" />
            <TimelineItem time="10:10 AM" event="Device connected" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeviceDetailsPage;

const RuntimeBadge = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2">
    {icon}
    <span className="text-sm font-medium text-slate-700">{label}</span>
  </div>
);

const StatsCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="rounded-3xl bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-500">{title}</p>
      <div className="text-slate-500">{icon}</div>
    </div>
    <h2 className="mt-4 text-3xl font-bold text-slate-900">{value}</h2>
  </div>
);

const SensorCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-3xl bg-white p-5 shadow-sm">
    <p className="text-sm text-slate-500">{label}</p>
    <h2 className="mt-3 text-2xl font-bold text-slate-900">{value}</h2>
  </div>
);

const ShadowBlock = ({ title, data }: { title: string; data: string }) => (
  <div className="rounded-2xl bg-slate-950 p-4">
    <p className="mb-3 text-sm font-semibold text-slate-400">{title}</p>
    <pre className="overflow-x-auto text-sm text-green-400">{data}</pre>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="font-semibold text-slate-900">{value}</p>
  </div>
);

const CommandButton = ({ label }: { label: string }) => (
  <button className="rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800">
    {label}
  </button>
);

const AlertItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
    <h3 className="font-semibold text-red-700">{title}</h3>
    <p className="mt-1 text-sm text-red-600">{description}</p>
  </div>
);

const TimelineItem = ({ time, event }: { time: string; event: string }) => (
  <div className="flex items-start gap-4">
    <div className="mt-2 h-3 w-3 rounded-full bg-black" />
    <div>
      <p className="text-sm text-slate-500">{time}</p>
      <h3 className="font-semibold text-slate-900">{event}</h3>
    </div>
  </div>
);
