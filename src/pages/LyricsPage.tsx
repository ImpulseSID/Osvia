import React, { useState, useEffect, useRef } from "react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";
import axios from "axios";

interface LyricLine {
  time: number;
  text: string;
}

const parseLRC = (lrc: string): LyricLine[] => {
  const lines = lrc.split("\n");
  const parsed: LyricLine[] = [];

  const timeRegex = /\[(\d+):(\d+\.\d+)]/;

  for (const line of lines) {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseFloat(match[2]);
      const time = minutes * 60 + seconds;
      const text = line.replace(timeRegex, "").trim();
      if (text) {
        parsed.push({ time, text });
      }
    }
  }

  return parsed.sort((a, b) => a.time - b.time);
};

const LyricsPage: React.FC = () => {
  const { currentTrack, isPlaying, getCurrentTime } = useMusicPlayer();
  // <-- getCurrentTime should return current playback time in seconds

  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!currentTrack) return;

      setLoading(true);
      setError(null);
      setLyrics([]);
      try {
        const { data } = await axios.get("/api/lyrics", {
          params: {
            title: currentTrack.title,
            artist: currentTrack.artist,
          },
        });

        const parsedLyrics = parseLRC(data.lrc);
        setLyrics(parsedLyrics);
      } catch (err) {
        setError("No synced lyrics found.");
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
    setActiveIndex(-1);
  }, [currentTrack]);

  useEffect(() => {
    const updateActiveIndex = () => {
      if (!isPlaying || lyrics.length === 0) {
        animationFrameRef.current = requestAnimationFrame(updateActiveIndex);
        return;
      }

      const currentTime = getCurrentTime ? getCurrentTime() : 0;

      const currentIndex = lyrics.findIndex(
        (line, idx) =>
          currentTime >= line.time &&
          (idx === lyrics.length - 1 || currentTime < lyrics[idx + 1].time)
      );

      if (currentIndex !== -1 && currentIndex !== activeIndex) {
        setActiveIndex(currentIndex);
      }

      animationFrameRef.current = requestAnimationFrame(updateActiveIndex);
    };

    animationFrameRef.current = requestAnimationFrame(updateActiveIndex);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, lyrics, activeIndex, getCurrentTime]);

  if (!currentTrack) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl text-gray-500">Play a track to see lyrics</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-gradient">
          Lyrics
        </h1>

        <div className="bg-neutral-900 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <img
              src={currentTrack.thumbnail || "/default-album.jpg"}
              alt={currentTrack.title}
              className="w-20 h-20 rounded-lg mr-4"
            />
            <div>
              <h2 className="text-xl font-bold text-white">
                {currentTrack.title}
              </h2>
              <p className="text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading lyrics...</p>
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : (
            <div className="space-y-6 py-4 max-h-[400px] overflow-y-auto">
              {lyrics.map((line, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 text-center text-lg ${
                    index === activeIndex
                      ? "text-primary font-bold scale-110"
                      : "text-gray-400"
                  }`}
                >
                  {line.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LyricsPage;
