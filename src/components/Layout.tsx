import { Outlet, useLocation } from "react-router-dom";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";
import MusicVisualization from "./MusicVisualization";

const Layout = () => {
  const location = useLocation();
  const isAuthRoute = ["/login", "/signup", "/forgot-password"].includes(
    location.pathname
  );

  // Render auth pages without sidebar and player bar
  if (isAuthRoute) {
    return (
      <div className="h-screen bg-[#0A0A0A] text-white overflow-auto">
        <Outlet />
      </div>
    );
  }

  // Regular layout with sidebar and player bar
  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A] text-white">
      {/* Add music visualization background */}
      <MusicVisualization />

      <div className="flex-1 overflow-hidden flex z-10">
        <PanelGroup direction="horizontal">
          <Panel
            defaultSize={20}
            minSize={15}
            maxSize={30}
            className="hidden sm:block"
          >
            <Sidebar />
          </Panel>
          <PanelResizeHandle className="w-1 bg-gray-800 hover:bg-primary cursor-col-resize transition-colors hidden sm:block" />
          <Panel defaultSize={80}>
            <main className="h-full overflow-auto px-3 py-4 sm:px-6 sm:py-6">
              <Outlet />
            </main>
          </Panel>
        </PanelGroup>
      </div>
      <PlayerBar />
    </div>
  );
};

export default Layout;
