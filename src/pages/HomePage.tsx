import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFeaturedMusic } from "../services/musicApi.ts";
import { useMusicPlayer } from "../contexts/MusicPlayerContext.tsx";
import { Play, Search } from "lucide-react";
import SongContextMenu from "../components/SongContextMenu.tsx";

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  videoId: string;
}

interface FeaturedContent {
  title: string;
  items: Track[];
}

const HomePage = () => {
  const [featuredContent, setFeaturedContent] = useState<FeaturedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const { playTrack } = useMusicPlayer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      setLoading(true);
      try {
        const data = await getFeaturedMusic();
        setFeaturedContent(data);
      } catch (error) {
        console.error("Error fetching featured content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  const handlePlayTrack = (track: Track) => {
    playTrack(track);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Centered Search Bar */}
      <div className="max-w-2xl mx-auto mb-10 mt-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gradient">
          Discover Music
        </h1>

        <form onSubmit={handleSearch} className="relative">
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
        </form>
      </div>

      {featuredContent.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {section.items.map((track) => (
              <SongContextMenu key={track.id} track={track}>
                <div
                  className="bg-card rounded-lg overflow-hidden hover:bg-secondary transition-colors cursor-pointer group"
                  onClick={() => handlePlayTrack(track)}
                >
                  <div className="relative">
                    <img
                      src={track.thumbnail}
                      alt={track.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-primary rounded-full p-3">
                        <Play className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground truncate">
                      {track.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>
              </SongContextMenu>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
