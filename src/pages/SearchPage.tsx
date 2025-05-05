import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  thumbnailUrl: string;
  duration?: string;
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/search?q=${encodeURIComponent(
            searchQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearchResults();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary opacity-10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/3 w-64 h-64 bg-purple-600 opacity-10 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "3.5s" }}
        ></div>
      </div>

      <div className="relative z-10 px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search</h1>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for songs, artists, or albums..."
              className="w-full bg-gray-800 rounded-full py-3 px-5 pl-12 outline-none focus:ring-2 focus:ring-primary text-white"
            />
            <SearchIcon
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          {isLoading && (
            <div className="mt-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-400">Searching...</p>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-900/30 border border-red-700 rounded-md text-center text-red-200">
              {error}
            </div>
          )}

          {!isLoading && !error && searchResults.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((song) => (
                <div
                  key={song.id}
                  className="bg-gray-800/50 p-4 rounded-lg flex items-center space-x-3 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={song.thumbnailUrl}
                      alt={song.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/160?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">
                      {song.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {song.artist}
                    </p>
                    {song.album && (
                      <p className="text-xs text-gray-500 truncate">
                        {song.album}
                      </p>
                    )}
                  </div>
                  {song.duration && (
                    <div className="text-xs text-gray-500">{song.duration}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!isLoading &&
            !error &&
            searchQuery &&
            searchResults.length === 0 && (
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  No results found for "{searchQuery}"
                </p>
              </div>
            )}

          {!searchQuery && !isLoading && (
            <div className="mt-10">
              <p className="text-gray-400 text-center">
                Type something to search for music
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
