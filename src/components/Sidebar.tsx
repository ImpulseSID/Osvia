import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-full bg-background-elevated p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/osvia.svg" alt="Osvia Logo" className="h-20" />
          <span className="text-xl font-bold">Osvia Music</span>
        </Link>
      </div>

      <nav className="space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          to="/search"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
        >
          <Search size={20} />
          <span>Search</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
