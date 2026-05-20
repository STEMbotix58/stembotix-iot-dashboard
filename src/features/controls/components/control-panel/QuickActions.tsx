type Props = {
  onAllOn: () => void;
  onAllOff: () => void;
  onEmergency: () => void;
};

const QuickActions = ({ onAllOn, onAllOff, onEmergency }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={onAllOn}
        className="rounded-xl bg-green-600 px-5 py-3 text-sm font-medium text-white"
      >
        Turn All ON
      </button>

      <button
        onClick={onAllOff}
        className="rounded-xl bg-slate-800 px-5 py-3 text-sm font-medium text-white"
      >
        Turn All OFF
      </button>

      <button
        onClick={onEmergency}
        className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white"
      >
        Emergency Stop
      </button>
    </div>
  );
};

export default QuickActions;
