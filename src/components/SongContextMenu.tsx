import React, { useState, useEffect, useRef } from "react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";
import { Play, ListMusic, SkipForward } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  videoId: string;
}

interface SongContextMenuProps {
  children: React.ReactNode;
  track: Track;
}

const SongContextMenu: React.FC<SongContextMenuProps> = ({
  children,
  track,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const { playTrack, addToQueue, playNext } = useMusicPlayer();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Calculate position, ensuring menu stays within viewport
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 150);

    setPosition({ x, y });
    setShowMenu(true);
  };

  const handlePlay = () => {
    playTrack(track);
    setShowMenu(false);
  };

  const handleAddToQueue = () => {
    addToQueue(track);
    setShowMenu(false);
  };

  const handlePlayNext = () => {
    playNext(track);
    setShowMenu(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="relative" onContextMenu={handleContextMenu}>
      {children}

      {showMenu && (
        <div
          ref={menuRef}
          className="fixed bg-gray-900 border border-gray-700 rounded shadow-lg py-1 z-50 min-w-[180px] overflow-hidden"
          style={{ top: position.y, left: position.x }}
        >
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center text-white"
            onClick={handlePlay}
          >
            <Play size={16} />
            <span>Play now</span>
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center text-white"
            onClick={handlePlayNext}
          >
            <SkipForward size={16} />
            <span>Play next</span>
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-blue-600 flex items-center text-white"
            onClick={handleAddToQueue}
          >
            <ListMusic size={16} />
            <span>Add to queue</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SongContextMenu;
