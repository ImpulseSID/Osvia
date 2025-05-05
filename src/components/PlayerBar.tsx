import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

const PlayerBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(0);
  const [duration] = useState(100);
  const [volume, setVolume] = useState(70);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  return (
    <div className="h-16 sm:h-20 bg-background-elevated border-t border-gray-800 px-2 sm:px-4 flex flex-col sm:flex-row items-center">
      {/* Mobile View: Track info + Controls */}
      <div className="w-full flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-700 rounded flex-shrink-0"></div>
          <div className="truncate max-w-[120px]">
            <h4 className="font-medium text-sm truncate">Track Name</h4>
            <p className="text-xs text-gray-400 truncate">Artist</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-white">
            <SkipBack size={16} />
          </button>
          <button
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-1.5 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipForward size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="w-full px-2 sm:hidden">
        <div className="w-full h-1 bg-gray-700 rounded-full">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex w-1/3 items-center gap-3">
        <div className="w-14 h-14 bg-gray-700 rounded flex-shrink-0"></div>
        <div>
          <h4 className="font-medium">Track Name</h4>
          <p className="text-sm text-gray-400">Artist</p>
        </div>
      </div>

      <div className="hidden sm:flex w-1/3 flex-col items-center">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white">
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="w-full flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="hidden sm:flex w-1/3 justify-end items-center gap-2">
        <Volume2 size={18} className="text-gray-400" />
        <div className="w-24 h-1 bg-gray-700 rounded-full">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="absolute w-24 opacity-0 cursor-pointer"
          />
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${volume}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-400 w-8">{volume}%</span>
      </div>
    </div>
  );
};

export default PlayerBar;
