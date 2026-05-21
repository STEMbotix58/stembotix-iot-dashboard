type Props = {
  status: "Online" | "Offline" | "Maintenance";
};

const statusStyles = {
  Online: "bg-emerald-500/10 text-emerald-300",
  Offline: "bg-rose-500/10 text-rose-300",
  Maintenance: "bg-amber-500/10 text-amber-300",
};

const DeviceStatusTag = ({ status }: Props) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
      statusStyles[status]
    }`}
  >
    {status}
  </span>
);

export default DeviceStatusTag;
