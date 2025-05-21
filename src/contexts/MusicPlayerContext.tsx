import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  videoId: string;
}

interface MusicPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  addToQueue: (track: Track) => void;
  clearQueue: () => void;
  playNext: (track: Track) => void;
  history: Track[];
  reorderQueue: (oldIndex: number, newIndex: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined
);

export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [history, setHistory] = useState<Track[]>([]);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("musicPlayerVolume");
    return savedVolume ? parseFloat(savedVolume) : 0.7;
  });
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuted = localStorage.getItem("musicPlayerMuted");
    return savedMuted ? savedMuted === "true" : false;
  });

  // Save volume and mute state to localStorage when they change
  useEffect(() => {
    localStorage.setItem("musicPlayerVolume", volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem("musicPlayerMuted", isMuted.toString());
  }, [isMuted]);

  const playTrack = (track: Track) => {
    // Add current track to history if it exists
    if (currentTrack) {
      setHistory((prev) => [currentTrack, ...prev].slice(0, 50)); // Limit history to 50 items
    }
    setCurrentTrack(track);
    setIsPlaying(true);
    console.log(`Playing track: ${track.title}`);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    console.log("Paused track");
  };

  const resumeTrack = () => {
    setIsPlaying(true);
    console.log("Resumed track");
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      // Add current track to history if it exists
      if (currentTrack) {
        setHistory((prev) => [currentTrack, ...prev].slice(0, 50));
      }
      setCurrentTrack(nextTrack);
      setQueue(queue.slice(1));
      setIsPlaying(true);
      console.log(`Playing next track: ${nextTrack.title}`);
    } else {
      setCurrentTrack(null);
      setIsPlaying(false);
      console.log("No more tracks in queue");
    }
  };

  const previousTrack = () => {
    if (history.length > 0) {
      const prevTrack = history[0];
      const newHistory = history.slice(1);

      // Add current track to beginning of queue if it exists
      if (currentTrack) {
        setQueue((prev) => [currentTrack, ...prev]);
      }

      setCurrentTrack(prevTrack);
      setHistory(newHistory);
      setIsPlaying(true);
      console.log(`Playing previous track: ${prevTrack.title}`);
    } else {
      console.log("No previous tracks in history");
    }
  };

  const addToQueue = (track: Track) => {
    setQueue([...queue, track]);
    console.log(`Added to queue: ${track.title}`);
  };

  const playNext = (track: Track) => {
    setQueue((prev) => [track, ...prev]);
    console.log(`Added to play next: ${track.title}`);
  };

  const clearQueue = () => {
    setQueue([]);
    console.log("Queue cleared");
  };

// New function to reorder queue items by index
  const reorderQueue = (oldIndex: number, newIndex: number) => {
    setQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      const [movedItem] = newQueue.splice(oldIndex, 1);
      newQueue.splice(newIndex, 0, movedItem);
      return newQueue;
    });
    console.log(`Reordered queue: moved item from position ${oldIndex} to ${newIndex}`);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        queue,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        addToQueue,
        clearQueue,
        playNext,
        history,
        reorderQueue,
        volume,
        setVolume,
        isMuted,
        setIsMuted,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};
