import {
  Sun,
  Moon,
  Film,
  Home,
  Plane,
  Coffee,
  Sparkles,
  BookOpen,
  Play,
} from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  scenes: string[];
  selected: string;
  onSelect: (scene: string) => void;
};

// Helper function to auto-assign icons and colors based on scene name
const getSceneConfig = (sceneName: string) => {
  const name = sceneName.toLowerCase();

  if (
    name.includes("morning") ||
    name.includes("wake") ||
    name.includes("day")
  ) {
    return {
      Icon: Sun,
      activeGlow: "shadow-[0_0_15px_rgba(251,191,36,0.4)] ring-amber-500",
      activeText: "text-amber-400",
      activeBg: "bg-amber-500/10",
    };
  }
  if (name.includes("night") || name.includes("sleep")) {
    return {
      Icon: Moon,
      activeGlow: "shadow-[0_0_15px_rgba(168,85,247,0.4)] ring-purple-500",
      activeText: "text-purple-400",
      activeBg: "bg-purple-500/10",
    };
  }
  if (
    name.includes("movie") ||
    name.includes("cinema") ||
    name.includes("tv")
  ) {
    return {
      Icon: Film,
      activeGlow: "shadow-[0_0_15px_rgba(225,29,72,0.4)] ring-rose-500",
      activeText: "text-rose-400",
      activeBg: "bg-rose-500/10",
    };
  }
  if (name.includes("away") || name.includes("leave")) {
    return {
      Icon: Plane,
      activeGlow: "shadow-[0_0_15px_rgba(148,163,184,0.4)] ring-slate-400",
      activeText: "text-slate-300",
      activeBg: "bg-slate-500/10",
    };
  }
  if (name.includes("home") || name.includes("arrive")) {
    return {
      Icon: Home,
      activeGlow: "shadow-[0_0_15px_rgba(16,185,129,0.4)] ring-emerald-500",
      activeText: "text-emerald-400",
      activeBg: "bg-emerald-500/10",
    };
  }
  if (name.includes("read") || name.includes("study")) {
    return {
      Icon: BookOpen,
      activeGlow: "shadow-[0_0_15px_rgba(56,189,248,0.4)] ring-sky-500",
      activeText: "text-sky-400",
      activeBg: "bg-sky-500/10",
    };
  }
  if (name.includes("relax") || name.includes("coffee")) {
    return {
      Icon: Coffee,
      activeGlow: "shadow-[0_0_15px_rgba(217,119,6,0.4)] ring-amber-600",
      activeText: "text-amber-500",
      activeBg: "bg-amber-600/10",
    };
  }

  // Default fallback for unrecognized scenes
  return {
    Icon: Sparkles,
    activeGlow: "shadow-[0_0_15px_rgba(6,182,212,0.4)] ring-cyan-500",
    activeText: "text-cyan-400",
    activeBg: "bg-cyan-500/10",
  };
};

const SceneSelectorWidget = ({ scenes, selected, onSelect }: Props) => {
  return (
    <DeviceControlCard title="Scenes" description="Select automation scene">
      {/* Grid layout for macro-pad feel */}
      <div className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-3">
        {scenes.map((scene) => {
          const isSelected = selected === scene;
          const { Icon, activeGlow, activeText, activeBg } =
            getSceneConfig(scene);

          return (
            <button
              key={scene}
              onClick={() => onSelect(scene)}
              aria-pressed={isSelected}
              className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-4 transition-all duration-300 ease-out focus:outline-none active:scale-95 ${
                isSelected
                  ? `ring-1 ${activeGlow} ${activeBg} transform -translate-y-1` // Elevated active state
                  : "bg-slate-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02),0_4px_8px_rgba(0,0,0,0.4)] hover:bg-slate-700 ring-1 ring-slate-700/50" // Recessed idle state
              }`}
            >
              {/* Dynamic Icon */}
              <div
                className={`transition-colors duration-300 ${
                  isSelected
                    ? activeText
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              >
                <Icon strokeWidth={isSelected ? 2.5 : 2} className="h-7 w-7" />
              </div>

              {/* Scene Name */}
              <span
                className={`text-xs font-bold tracking-wide transition-colors duration-300 ${
                  isSelected
                    ? activeText
                    : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {scene}
              </span>

              {/* Tiny 'Active' indicator icon that appears only when selected */}
              {isSelected && (
                <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <Play className={`h-2.5 w-2.5 fill-current ${activeText}`} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </DeviceControlCard>
  );
};

export default SceneSelectorWidget;
