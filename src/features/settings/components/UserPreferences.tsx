type Props = {
  timezone: string;
  autoRefresh: boolean;
  onTimezoneChange: (value: string) => void;
  onAutoRefreshToggle: () => void;
};

const UserPreferences = ({
  timezone,
  autoRefresh,
  onTimezoneChange,
  onAutoRefreshToggle,
}: Props) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          User Preferences
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Personalize dashboard behavior
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Timezone
          </label>
          <select
            value={timezone}
            onChange={(e) => onTimezoneChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          >
            <option value="UTC">UTC</option>
            <option value="IST">IST</option>
            <option value="EST">EST</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Auto Refresh
          </span>

          <button
            onClick={onAutoRefreshToggle}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              autoRefresh
                ? "bg-blue-600 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {autoRefresh ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
