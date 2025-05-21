import { NavLink } from "react-router-dom";
import { Search, Music, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  return (
    <div
      className={`h-full bg-background p-4 flex flex-col ${
        isCollapsed ? "items-center" : ""
      }`}
    >
      <div
        className={`flex items-center mb-8 ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-gradient">Osvia</h1>
        )}
        {isCollapsed && <Music className="h-6 w-6 text-primary" />}
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center ${
                  isCollapsed ? "justify-center" : ""
                } p-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary border-l-2 border-primary pl-[10px]"
                    : "text-muted-foreground hover:bg-secondary"
                }`
              }
              title="Home"
            >
              <Music className={`${isCollapsed ? "" : "mr-3"} h-5 w-5`} />
              {!isCollapsed && <span>Home</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `flex items-center ${
                  isCollapsed ? "justify-center" : ""
                } p-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary border-l-2 border-primary pl-[10px]"
                    : "text-muted-foreground hover:bg-secondary"
                }`
              }
              title="Search"
            >
              <Search className={`${isCollapsed ? "" : "mr-3"} h-5 w-5`} />
              {!isCollapsed && <span>Search</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="mt-auto p-4 text-xs text-gray-600">
          <p>© 2025 Osvia</p>
          <p>Powered by YouTube Music</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
