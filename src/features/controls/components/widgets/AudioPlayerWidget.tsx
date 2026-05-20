import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Speaker,
} from "lucide-react";
import DeviceControlCard from "./DeviceControlCard";

type Props = {
  isPlaying: boolean;
  songTitle: string;
  artist: string;
  volume: number; // 0-100
  onTogglePlay: () => void;
  onVolumeChange: (val: number) => void;
};

const AudioPlayerWidget = ({
  isPlaying,
  songTitle,
  artist,
  volume,
  onTogglePlay,
  onVolumeChange,
}: Props) => {
  return (
    <DeviceControlCard
      title="Living Room Audio"
      description="Multi-room control"
    >
      {/* Container with simulated blurred album art background */}
      <div className="relative flex w-full flex-col overflow-hidden rounded-2xl bg-slate-900 p-5 shadow-inner">
        {/* Blurred background effect */}
        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-600/30 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Track Info */}
          <div className="flex items-center gap-4">
            {/* Spinning Record Icon */}
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg ring-2 ring-slate-700/50 ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}`}
            >
              <div className="h-4 w-4 rounded-full bg-slate-800 ring-1 ring-slate-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white line-clamp-1">
                {songTitle}
              </span>
              <span className="text-sm font-medium text-slate-400">
                {artist}
              </span>
            </div>
          </div>

          {/* Scrubber (Visual only for this demo) */}
          <div className="flex w-full items-center gap-2">
            <span className="text-xs font-mono text-slate-500">1:24</span>
            <div className="h-1.5 flex-1 cursor-pointer rounded-full bg-slate-800">
              <div className="h-full w-1/3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            </div>
            <span className="text-xs font-mono text-slate-500">-2:18</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-2">
            <button className="text-slate-400 transition-colors hover:text-white active:scale-90">
              <SkipBack className="h-6 w-6" fill="currentColor" />
            </button>

            <button
              onClick={onTogglePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" fill="currentColor" />
              ) : (
                <Play className="h-6 w-6 ml-1" fill="currentColor" />
              )}
            </button>

            <button className="text-slate-400 transition-colors hover:text-white active:scale-90">
              <SkipForward className="h-6 w-6" fill="currentColor" />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-3 border-t border-white/10 pt-4">
            <Speaker className="h-4 w-4 text-slate-500" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-slate-800 accent-white"
            />
            <Volume2 className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      </div>
    </DeviceControlCard>
  );
};

export default AudioPlayerWidget;
