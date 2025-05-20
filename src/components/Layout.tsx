import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import MusicPlayer from "./MusicPlayer.tsx";
import { useState } from "react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext.tsx";

const Layout = () => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isDragging, setIsDragging] = useState(false);
  const { currentTrack } = useMusicPlayer();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newWidth = e.clientX;
      if (newWidth > 160 && newWidth < 400) {
        setSidebarWidth(newWidth);
      }
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-black text-white"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex flex-1 overflow-hidden">
        <div
          className="h-full relative flex-shrink-0"
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar />
          <div
            className="absolute top-0 right-0 w-0.5 h-full cursor-ew-resize bg-white bg-opacity-10 hover:bg-opacity-20"
            onMouseDown={handleMouseDown}
          />
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Conditionally render the MusicPlayer with animation */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          currentTrack
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full h-0"
        }`}
      >
        {currentTrack && <MusicPlayer />}
      </div>
    </div>
  );
};

export default Layout;
