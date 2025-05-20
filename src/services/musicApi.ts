// API service to interact with YouTube Music API
interface SearchResult {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  videoId: string;
}

interface FeaturedContent {
  title: string;
  items: SearchResult[];
}

// Mock API calls for now - these would be replaced with actual API calls to ytmusicapi
export const searchMusic = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Search failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching music:", error);
    return [];
  }
};

export const getFeaturedMusic = async (): Promise<FeaturedContent[]> => {
  try {
    const response = await fetch("/api/featured");
    if (!response.ok) {
      throw new Error("Failed to fetch featured music");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching featured music:", error);
    return [];
  }
};

export const getStreamUrl = async (videoId: string): Promise<string> => {
  try {
    const response = await fetch(`/api/stream/${videoId}`);
    if (!response.ok) {
      throw new Error("Failed to get stream URL");
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Error getting stream URL:", error);
    return "";
  }
};
