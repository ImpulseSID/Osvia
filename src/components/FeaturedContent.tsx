import { useState, useEffect } from "react";

interface FeaturedItem {
  id: string;
  title: string;
  artist: string;
  thumbnailUrl: string;
  type: string;
}

const FeaturedContent = () => {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/api/featured");

        if (!response.ok) {
          throw new Error("Failed to fetch featured content");
        }

        const data = await response.json();
        setFeaturedItems(data);
      } catch (err) {
        console.error("Featured content error:", err);
        setError("Failed to load featured content");
        // Fallback to static content if API fails
        setFeaturedItems([
          {
            id: "1",
            title: "Top Hits Today",
            artist: "Various Artists",
            thumbnailUrl:
              "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
            type: "playlist",
          },
          {
            id: "2",
            title: "Chill Vibes",
            artist: "Various Artists",
            thumbnailUrl:
              "https://images.unsplash.com/photo-1500673922987-e212871fec22",
            type: "playlist",
          },
          {
            id: "3",
            title: "Focus Flow",
            artist: "Various Artists",
            thumbnailUrl:
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            type: "playlist",
          },
          {
            id: "4",
            title: "Electronic Mix",
            artist: "Various Artists",
            thumbnailUrl:
              "https://images.unsplash.com/photo-1501854140801-50d01698950b",
            type: "playlist",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block w-8 h-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-gray-400">Loading featured content...</p>
      </div>
    );
  }

  if (error && featuredItems.length === 0) {
    return (
      <div className="p-4 bg-red-900/30 border border-red-700 rounded-md text-center text-red-200">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Featured Content</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <div
            key={item.id}
            className="bg-background-elevated p-4 rounded-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="aspect-square overflow-hidden rounded-md mb-3">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300?text=No+Image";
                }}
              />
            </div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.artist}</p>
            <p className="text-xs text-gray-500 capitalize mt-1">{item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedContent;
