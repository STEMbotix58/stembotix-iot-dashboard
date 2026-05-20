type Props = {
  enabled: boolean;
  onToggle: () => void;
};

const NotificationSettings = ({ enabled, onToggle }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-slate-500">Enable realtime alerts</p>
        </div>

        <button
          onClick={onToggle}
          className={`rounded-full px-5 py-2 text-sm font-medium transition ${
            enabled ? "bg-green-600 text-white" : "bg-slate-200 text-slate-700"
          }`}
        >
          {enabled ? "Enabled" : "Disabled"}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
