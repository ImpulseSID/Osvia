import { NavLink } from "react-router-dom";
import { Search, Music } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-full bg-background p-4 flex flex-col">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold text-gradient">Osvia</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary border-l-2 border-primary pl-[10px]"
                    : "text-muted-foreground hover:bg-secondary"
                }`
              }
            >
              <Music className="mr-3 h-5 w-5" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary border-l-2 border-primary pl-[10px]"
                    : "text-muted-foreground hover:bg-secondary"
                }`
              }
            >
              <Search className="mr-3 h-5 w-5" />
              <span>Search</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto p-4 text-xs text-gray-foreground">
        <p>© 2025 Osvia</p>
        <p>Powered by YouTube Music</p>
      </div>
    </div>
  );
};

export default Sidebar;
