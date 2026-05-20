type Props = {
  value: string;
  onChange: (value: string) => void;
};

const actions = [
  "Turn ON Device",
  "Turn OFF Device",
  "Send Alert",
  "Activate Alarm",
];

const ActionSelector = ({ value, onChange }: Props) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Action
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-black"
      >
        {actions.map((action) => (
          <option key={action} value={action}>
            {action}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActionSelector;
