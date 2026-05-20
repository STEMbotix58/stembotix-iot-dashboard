import { useState } from "react";
import { ShieldAlert, ShieldCheck, Delete } from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type SecurityState = "DISARMED" | "ARMED_HOME" | "ARMED_AWAY";

type Props = {
  currentState: SecurityState;
  onStateChange: (state: SecurityState, pin: string) => void;
};

const AlarmKeypadWidget = ({ currentState, onStateChange }: Props) => {
  const [pin, setPin] = useState("");

  const handleKeypad = (num: string) => {
    if (pin.length < 4) setPin((prev) => prev + num);
  };

  const handleClear = () => setPin("");

  const handleAction = (newState: SecurityState) => {
    if (pin.length === 4) {
      onStateChange(newState, pin);
      setPin(""); // Clear after action
    }
  };

  const isArmed = currentState !== "DISARMED";

  return (
    <DeviceControlCard title="Security Panel" description="Manage alarm state">
      <div className="flex flex-col gap-4">
        {/* Display Screen */}
        <div
          className={`relative flex h-16 w-full items-center justify-between rounded-xl p-4 shadow-inner ring-1 ${
            isArmed
              ? "bg-rose-950/30 ring-rose-900/50"
              : "bg-emerald-950/30 ring-emerald-900/50"
          }`}
        >
          <div className="flex flex-col">
            <span
              className={`text-xs font-bold uppercase tracking-widest ${isArmed ? "text-rose-500" : "text-emerald-500"}`}
            >
              {currentState.replace("_", " ")}
            </span>
            <div className="flex gap-2 text-2xl tracking-widest text-white">
              {/* Render dots for PIN or dashes if empty */}
              {[...Array(4)].map((_, i) => (
                <span key={i}>{pin[i] ? "•" : "-"}</span>
              ))}
            </div>
          </div>
          {isArmed ? (
            <ShieldAlert className="h-8 w-8 text-rose-500 opacity-50" />
          ) : (
            <ShieldCheck className="h-8 w-8 text-emerald-500 opacity-50" />
          )}
        </div>

        {/* Numpad Grid */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeypad(num.toString())}
              className="flex h-12 items-center justify-center rounded-lg bg-slate-800 text-lg font-bold text-slate-200 shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform active:scale-95 active:bg-slate-700"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="flex h-12 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-transform active:scale-95 active:bg-slate-700"
          >
            <Delete className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleKeypad("0")}
            className="flex h-12 items-center justify-center rounded-lg bg-slate-800 text-lg font-bold text-slate-200 shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform active:scale-95 active:bg-slate-700"
          >
            0
          </button>
          <button
            disabled={pin.length < 4}
            onClick={() => handleAction(isArmed ? "DISARMED" : "ARMED_AWAY")}
            className={`flex h-12 items-center justify-center rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-all active:scale-95 ${
              pin.length === 4
                ? isArmed
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : "bg-rose-600 hover:bg-rose-500"
                : "bg-slate-800 text-slate-600"
            }`}
          >
            {isArmed ? "Disarm" : "Arm"}
          </button>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default AlarmKeypadWidget;
