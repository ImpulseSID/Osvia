import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { searchMusic } from "../services/musicApi.ts";
import { useMusicPlayer } from "../contexts/MusicPlayerContext.tsx";

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  videoId: string;
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { playTrack } = useMusicPlayer();
  const location = useLocation();

  // Extract query from URL when page loads
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get("q");
    if (urlQuery) {
      setQuery(urlQuery);
      setDebouncedQuery(urlQuery);
    }
  }, [location.search]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      const performSearch = async () => {
        setLoading(true);
        try {
          const results = await searchMusic(debouncedQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Error searching:", error);
        } finally {
          setLoading(false);
        }
      };

      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery]);

  // Mock data for development
  useEffect(() => {
    if (debouncedQuery && loading) {
      setTimeout(() => {
        setSearchResults([
          {
            id: "1",
            title: `${debouncedQuery} - Top Result`,
            artist: "Popular Artist",
            thumbnail: "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg",
            duration: "3:22",
            videoId: "4NRXx6U8ABQ",
          },
          {
            id: "2",
            title: `${debouncedQuery} Remix`,
            artist: "DJ Something",
            thumbnail: "https://i.ytimg.com/vi/XXYlFuWEuKI/hqdefault.jpg",
            duration: "3:35",
            videoId: "XXYlFuWEuKI",
          },
          {
            id: "3",
            title: `Best of ${debouncedQuery}`,
            artist: "Various Artists",
            thumbnail: "https://i.ytimg.com/vi/kTJczUoc26U/hqdefault.jpg",
            duration: "2:21",
            videoId: "kTJczUoc26U",
          },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [debouncedQuery, loading]);

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  return (
    <div className="pb-24">
      <h1 className="text-4xl font-bold mb-6 text-center text-gradient">
        Search Music
      </h1>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full p-4 pl-12 text-lg bg-muted border border-border rounded-lg focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground text-center"
          placeholder="Search for songs, artists..."
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <div>
          <h2 className="text-xl font-medium mb-4">Search Results</h2>
          <div className="bg-card rounded-lg overflow-hidden">
            {searchResults.map((track, index) => (
              <div
                key={track.id}
                className={`flex items-center p-4 hover:bg-secondary cursor-pointer ${
                  index !== searchResults.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
                onClick={() => handlePlayTrack(track)}
              >
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="h-16 w-16 object-cover rounded mr-4"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-medium truncate">
                    {track.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {track.artist}
                  </p>
                </div>
                <div className="text-muted-foreground ml-4">
                  {track.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && debouncedQuery && searchResults.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-muted-foreground text-lg">
            No results found for "{debouncedQuery}"
          </p>
          <p className="text-muted-foreground mt-2">
            Try searching for something else
          </p>
        </div>
      )}

      {!debouncedQuery && (
        <div className="flex flex-col items-center justify-center py-16">
          <Search className="h-16 w-16 text-muted mb-4" />
          <p className="text-muted-foreground text-lg">
            Search for your favorite music
          </p>
          <p className="text-muted-foreground mt-2">
            Discover millions of songs
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
