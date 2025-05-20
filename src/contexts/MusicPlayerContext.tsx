import React, { createContext, useState, useContext, type ReactNode } from "react";

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

  const playTrack = (track: Track) => {
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
    // This would require keeping track of history
    console.log("Previous track functionality not implemented yet");
  };

  const addToQueue = (track: Track) => {
    setQueue([...queue, track]);
    console.log(`Added to queue: ${track.title}`);
  };

  const clearQueue = () => {
    setQueue([]);
    console.log("Queue cleared");
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
