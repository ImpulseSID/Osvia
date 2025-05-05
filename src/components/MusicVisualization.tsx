import { useEffect, useRef, useState } from "react";

const MusicVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Set default mouse position if no movement
    if (mousePosition.x === 0 && mousePosition.y === 0) {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }

    // Animation variables
    const barCount = 70;
    const barWidth = canvas.width / barCount;
    const barHeights: number[] = Array(barCount).fill(0);
    const barColors = [
      "#9b87f5", // primary
      "#8670e6", // primary-hover
      "#6c5ce7", // purple
      "#a29bfe", // lighter purple
    ];

    // Animation frame
    let animationId: number;

    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Generate simulated audio data (random heights)
      for (let i = 0; i < barCount; i++) {
        // Calculate distance from mouse to determine intensity
        const barX = i * barWidth + barWidth / 2;
        const distX = Math.abs(barX - mousePosition.x);
        const maxDist = canvas.width / 2;
        const intensity = Math.max(0, 1 - distX / maxDist);

        // Gradually move towards a new target height, influenced by mouse position
        const targetHeight = Math.random() * 100 * (intensity * 0.8 + 0.2);
        barHeights[i] = barHeights[i] * 0.9 + targetHeight * 0.1;

        // Draw the bar
        const barHeight = barHeights[i];
        const colorIndex = Math.floor(i % barColors.length);
        ctx.fillStyle = barColors[colorIndex];

        // Bottom bars (reflected)
        ctx.globalAlpha = 0.2;
        ctx.fillRect(
          i * barWidth,
          canvas.height - barHeight / 2,
          barWidth - 2,
          barHeight / 2
        );

        // Top bars
        ctx.globalAlpha = 0.1;
        ctx.fillRect(
          i * barWidth,
          canvas.height - barHeight,
          barWidth - 2,
          barHeight / 2
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-70"
    />
  );
};

export default MusicVisualization;
