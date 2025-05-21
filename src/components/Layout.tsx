import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import MusicPlayer from "./MusicPlayer.tsx";
import { useState, useEffect } from "react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext.tsx";
import { Menu } from "lucide-react";
import QueueSidebar from "./QueueSidebar.tsx";

const Layout = () => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isDragging, setIsDragging] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const { currentTrack } = useMusicPlayer();

  useEffect(() => {
    // Check for mobile on initial load and when window resizes
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      // Auto-collapse sidebar on mobile
      if (mobile && !isSidebarCollapsed) {
        setIsSidebarCollapsed(true);
      }

      // Also close queue sidebar on mobile if open
      if (mobile && isQueueOpen) {
        setIsQueueOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarCollapsed, isQueueOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSidebarCollapsed) {
      setIsDragging(true);
    }
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    // Close queue sidebar when opening main sidebar on mobile
    if (window.innerWidth < 768 && !isSidebarCollapsed && isQueueOpen) {
      setIsQueueOpen(false);
    }
  };

  const toggleQueueSidebar = () => {
    setIsQueueOpen(!isQueueOpen);
    // Close main sidebar when opening queue sidebar on mobile
    if (window.innerWidth < 768 && isQueueOpen && !isSidebarCollapsed) {
      setIsSidebarCollapsed(true);
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-black text-white"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar with transition for smooth collapse/expand */}
        <div
          className={`h-full relative flex-shrink-0 transition-all duration-300 ${
            isSidebarCollapsed ? "w-0 md:w-16" : ""
          }`}
          style={{ width: isSidebarCollapsed ? "" : `${sidebarWidth}px` }}
        >
          <Sidebar isCollapsed={isSidebarCollapsed} />

          {/* Resize handle - only visible when sidebar is expanded */}
          {!isSidebarCollapsed && (
            <div
              className="absolute top-0 right-0 w-0.5 h-full cursor-ew-resize bg-white bg-opacity-10 hover:bg-opacity-20"
              onMouseDown={handleMouseDown}
            />
          )}
        </div>
        {/* Main content - remove pr-80 class and position the queue sidebar absolutely */}
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
          {/* Mobile sidebar toggle button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden mb-4 p-2 rounded-full hover:bg-gray-800"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <Outlet />
        </main>

        {/* Right Queue Sidebar - positioned absolutely */}
        <div className="absolute top-0 right-0 h-full">
          <QueueSidebar isOpen={isQueueOpen} onClose={toggleQueueSidebar} />
        </div>
      </div>

      {/* Conditionally render the MusicPlayer with animation */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          currentTrack
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full h-0"
        }`}
      >
        {currentTrack && (
          <MusicPlayer
            toggleQueue={toggleQueueSidebar}
            isQueueOpen={isQueueOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;
