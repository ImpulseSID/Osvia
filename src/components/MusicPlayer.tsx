import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext.tsx";
import { getStreamUrl } from "../services/musicApi.ts";

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
  } = useMusicPlayer();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [streamUrl, setStreamUrl] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (currentTrack) {
      const fetchStream = async () => {
        const url = await getStreamUrl(currentTrack.videoId);
        setStreamUrl(url || ""); // Ensure it's a string, empty if none
      };
      fetchStream();
    } else {
      setStreamUrl(""); // Clear when no track
    }
  }, [currentTrack]);

  // Handle play/pause & visualizer
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!streamUrl) {
      // If no valid stream URL, pause playback and cancel visualizer
      audio.pause();
      cancelAnimationFrame(animationRef.current!);
      return;
    }

    if (isPlaying) {
      // Play audio only if URL is valid
      audio.play().catch(() => {
        /* Ignore play errors (like autoplay blocked) */
      });
      startVisualizer(audio);
    } else {
      audio.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isPlaying, streamUrl]);

  // Volume and mute handling
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Cleanup on unmount: close AudioContext and cancel animation
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      sourceRef.current = null;
      analyserRef.current = null;
    };
  }, []);

  const startVisualizer = (audio: HTMLAudioElement) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Reuse existing AudioContext, create if needed
    let audioContext = audioContextRef.current;
    if (!audioContext) {
      audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
    }

    // Reuse or create MediaElementSourceNode
    if (!sourceRef.current) {
      try {
        sourceRef.current = audioContext.createMediaElementSource(audio);
      } catch (e) {
        // Already connected source to this audio element? just skip
      }
    }

    // Create or reuse analyser node
    let analyser = analyserRef.current;
    if (!analyser) {
      analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 128;
    }

    // Connect nodes if not connected
    try {
      sourceRef.current?.disconnect();
    } catch {}
    try {
      analyser.disconnect();
    } catch {}

    sourceRef.current?.connect(analyser);
    analyser.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const renderVisualizer = () => {
      if (!ctx) return;

      animationRef.current = requestAnimationFrame(renderVisualizer);
      analyser!.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (canvas.height / 2);

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#3b82f6"); // blue-500
        gradient.addColorStop(1, "#8b5cf6"); // purple-500

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 2;
      }
    };

    renderVisualizer();
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setProgress(current);
    setDuration(total);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const value = parseFloat(e.target.value);
    setProgress(value);
    audioRef.current.currentTime = value;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (isMuted && value > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="h-24 bg-gray-900 border-t border-gray-800 flex items-center px-4 relative">
      {/* Only render audio if streamUrl is non-empty */}
      {streamUrl ? (
        <audio
          ref={audioRef}
          src={`/api/audio-proxy/${currentTrack.videoId}`} // 👈 updated endpoint
          onTimeUpdate={handleTimeUpdate}
          onEnded={nextTrack}
        />
      ) : null}

      <div className="w-full flex items-center">
        {/* Track Info */}
        <div className="flex items-center w-1/3">
          <img
            src={currentTrack.thumbnail || "/default-album.jpg"}
            alt={currentTrack.title}
            className="h-16 w-16 rounded mr-3"
          />
          <div className="truncate">
            <h4 className="text-white font-medium truncate">
              {currentTrack.title}
            </h4>
            <p className="text-gray-400 text-sm truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center mb-2">
            <button
              onClick={previousTrack}
              className="text-gray-400 hover:text-white mx-2"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={isPlaying ? pauseTrack : resumeTrack}
              className="bg-white rounded-full p-2 mx-4 text-black hover:bg-gray-200"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={nextTrack}
              className="text-gray-400 hover:text-white mx-2"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center w-full max-w-2xl">
            <span className="text-xs text-gray-400 w-10">
              {formatTime(progress)}
            </span>

            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 mx-2 rounded-full accent-blue-500"
            />

            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center w-1/6 justify-end">
          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-white mr-2"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 rounded-full accent-blue-500"
          />
        </div>
      </div>

      {/* Audio Visualizer */}
      <canvas
        ref={canvasRef}
        className="absolute bottom-24 left-0 w-full h-8 opacity-75"
      />
    </div>
  );
};

export default MusicPlayer;
