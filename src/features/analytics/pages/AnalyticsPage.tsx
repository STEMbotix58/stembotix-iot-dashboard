import useAnalytics from "../hooks/useAnalytics";
import MetricCard from "@/features/telemetry/components/MetricCard";
import AnalyticsChart from "../components/AnalyticsChart";
import DeviceComparison from "../components/DeviceComparison";
import TrendAnalysis from "../components/TrendAnalysis";

const AnalyticsPage = () => {
  const { averageTemperature, averageHumidity, peakEnergy, onlineDevices } =
    useAnalytics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">
          Device insights and telemetry analytics
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Avg Temperature"
          value={averageTemperature}
          unit="°C"
        />
        <MetricCard label="Avg Humidity" value={averageHumidity} unit="%" />
        <MetricCard label="Peak Energy" value={peakEnergy} unit="kWh" />
        <MetricCard label="Online Devices" value={onlineDevices} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AnalyticsChart
          title="Temperature Trends"
          series={[
            {
              name: "Temperature",
              data: [22, 24, 26, 28, 30, 27],
            },
          ]}
          categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        />

        <AnalyticsChart
          title="Energy Consumption"
          series={[
            {
              name: "Energy",
              data: [120, 135, 128, 145, 160, 152],
            },
          ]}
          categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DeviceComparison
            devices={[
              {
                name: "Temperature Sensor",

                temperature: 28,

                humidity: 62,

                energy: 120,
              },

              {
                name: "Humidity Sensor",

                temperature: 24,

                humidity: 72,

                energy: 98,
              },

              {
                name: "Power Meter",

                temperature: 31,

                humidity: 58,

                energy: 160,
              },
            ]}
          />
        </div>

        <TrendAnalysis
          trends={[
            {
              label: "Temperature Rising",

              status: "warning",

              description: "Average temperature increased by 12% this week.",
            },

            {
              label: "Energy Stable",

              status: "positive",

              description: "Energy consumption remains within safe thresholds.",
            },

            {
              label: "Voltage Spike",

              status: "negative",

              description:
                "Unexpected voltage spikes detected on Device DEV-003.",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AnalyticsPage;
