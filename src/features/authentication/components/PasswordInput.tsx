import { useState } from "react";
// Optional: npm install lucide-react
import { Eye, EyeOff } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const PasswordInput = ({ value, onChange }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        value={value}
        placeholder="••••••••"
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? (
          <EyeOff size={18} strokeWidth={2} />
        ) : (
          <Eye size={18} strokeWidth={2} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
