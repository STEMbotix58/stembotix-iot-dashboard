type Props = {
  value: string;

  onChange: (value: string) => void;
};

const triggers = [
  "Temperature High",
  "Motion Detected",
  "Device Offline",
  "Humidity Alert",
];

const TriggerSelector = ({ value, onChange }: Props) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Trigger
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-black"
      >
        {triggers.map((trigger) => (
          <option key={trigger} value={trigger}>
            {trigger}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TriggerSelector;
