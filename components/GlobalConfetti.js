import { useEffect, useState } from 'react';

const COLORS = [
  '#c9a84c', // gold
  '#eab308', // haldi
  '#064e3b', // deep emerald
  '#f59e0b', // amber
  '#059669', // emerald
  '#34d399', // light emerald
  '#fde68a', // cream gold
  '#047857', // emerald dark
  '#a07c2a', // antique gold
  '#10b981', // green
];

const SHAPES = ['circle', 'square', 'triangle', 'star'];

function createPiece(id) {
  return {
    id,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 10,
    size: 4 + Math.random() * 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    drift: -30 + Math.random() * 60,
    spin: Math.random() * 360,
    opacity: 0.3 + Math.random() * 0.5,
  };
}

export default function GlobalConfetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    setPieces(Array.from({ length: 30 }, (_, i) => createPiece(i)));
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden no-print" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="global-confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: p.shape === 'circle' ? `${p.size}px` : `${p.size * 1.4}px`,
            backgroundColor: p.shape !== 'triangle' ? p.color : 'transparent',
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'star' ? '2px' : '1px',
            borderLeft: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : undefined,
            borderRight: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : undefined,
            borderBottom: p.shape === 'triangle' ? `${p.size}px solid ${p.color}` : undefined,
            '--confetti-drift': `${p.drift}px`,
            '--confetti-spin': `${p.spin}deg`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
