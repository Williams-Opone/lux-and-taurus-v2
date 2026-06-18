import { useEffect, useState, memo } from 'react';

// Wrap in memo to prevent unnecessary React re-renders when parent states mutate
export const MatrixRain = memo(() => {
  const [streams, setStreams] = useState<{ id: number; left: number; speed: number; delay: number; text: string }[]>([]);

  useEffect(() => {
    // Reduce density (step by 50px instead of 32px) to dramatically lower DOM node count
    const count = Math.floor(window.innerWidth / 50);
    const chars = "01010101010101";
    
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i * 100) / count,
      speed: Math.random() * 6 + 6, // Smooth out speeds
      delay: Math.random() * -20,
      text: Array.from({ length: 15 }, () => chars[Math.floor(Math.random() * chars.length)]).join('\n')
    }));
    setStreams(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02] select-none z-0 font-mono text-[9px] leading-none whitespace-pre select-none">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="absolute text-emerald-400 will-change-transform animate-matrix-fast"
          style={{
            left: `${stream.left}%`,
            top: '-20%',
            animationDuration: `${stream.speed}s`,
            animationDelay: `${stream.delay}s`,
          }}
        >
          {stream.text}
        </div>
      ))}
    </div>
  );
});

MatrixRain.displayName = 'MatrixRain';