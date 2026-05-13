import { deviceStatusService } from "../services/device-status.service";

interface Props {
  status: string;
}

const DeviceStatus = ({ status }: Props) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${deviceStatusService.getStatusColor(
        status,
      )}`}
    >
      {status}
    </span>
  );
};

export default DeviceStatus;
