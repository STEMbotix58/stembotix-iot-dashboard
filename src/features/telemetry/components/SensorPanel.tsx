import MetricCard from "./MetricCard";

type Props = {
  temperature: number;
  humidity: number;
  voltage: number;
};

const SensorPanel = ({ temperature, humidity, voltage }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <MetricCard
        label="Temperature"
        value={temperature}
        unit="°C"
        status={temperature > 35 ? "danger" : "normal"}
      />

      <MetricCard
        label="Humidity"
        value={humidity}
        unit="%"
        status={humidity > 80 ? "warning" : "normal"}
      />

      <MetricCard label="Voltage" value={voltage} unit="V" />
    </div>
  );
};

export default SensorPanel;
