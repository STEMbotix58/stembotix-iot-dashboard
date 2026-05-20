import type { Device } from "@/entities/device/device.types";
import { useDevices } from "../hooks/useDevices";
import { useDeviceSelection } from "../hooks/useDeviceSelection";

const DeviceSelector = () => {
  const { devices } = useDevices();

  const { selectedDevice, selectDevice } = useDeviceSelection();

  return (
    <select
      value={selectedDevice?.id || ""}
      onChange={(e) => {
        const device = devices.find((d: Device) => d.id === e.target.value);

        if (device) {
          selectDevice(device);
        }
      }}
      className="rounded-xl border border-slate-200 bg-white px-4 py-3"
    >
      <option value="">Select Device</option>

      {devices.map((device: Device) => (
        <option key={device.id} value={device.id}>
          {device.name}
        </option>
      ))}
    </select>
  );
};

export default DeviceSelector;
