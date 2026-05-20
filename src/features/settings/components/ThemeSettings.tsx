type Props = {
  darkMode: boolean;
  onToggle: () => void;
};

const ThemeSettings = ({ darkMode, onToggle }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Theme Settings
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Toggle dashboard appearance
          </p>
        </div>

        <button
          onClick={onToggle}
          className={`rounded-full px-5 py-2 text-sm font-medium transition ${
            darkMode ? "bg-black text-white" : "bg-slate-200 text-slate-700"
          }`}
        >
          {darkMode ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
};

export default ThemeSettings;
