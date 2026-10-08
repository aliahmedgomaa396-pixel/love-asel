import React, { useMemo } from 'react';

interface FloatingHeartsProps {
  enabled?: boolean;
}

// Authentic Apple iOS 3D emoji assets from Apple emoji datasource
const APPLE_EMOJIS = [
  { name: 'red_heart', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2764-fe0f.png' },
  { name: 'mending_heart', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2764-fe0f-200d-1fa79.png' },
  { name: 'sparkling_heart', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f496.png' },
  { name: 'rose', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f339.png' },
  { name: 'white_heart', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f90d.png' },
  { name: 'growing_heart', url: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f497.png' },
];

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ enabled = true }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      emoji: APPLE_EMOJIS[i % APPLE_EMOJIS.length],
      left: `${(i * 4.6 + (i % 3) * 2) % 94}%`,
      delay: `${(i * 0.8) % 12}s`,
      duration: `${11 + (i % 5) * 3}s`,
      size: `${20 + (i % 4) * 8}px`,
      opacity: 0.35 + (i % 4) * 0.15,
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute block animate-[float-heart_linear_infinite]"
          style={{
            left: p.left,
            bottom: '-50px',
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        >
          <img
            src={p.emoji.url}
            alt={p.emoji.name}
            className="drop-shadow-[0_2px_8px_rgba(225,29,72,0.4)] pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
            }}
            loading="lazy"
          />
        </span>
      ))}
      <div className="absolute inset-0 bg-radial from-rose-900/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
