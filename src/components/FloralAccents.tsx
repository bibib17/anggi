import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const FlowerIcon: React.FC<{
  size?: number;
  className?: string;
  petalColor?: string;
  centerColor?: string;
}> = ({
  size = 20,
  className = '',
  petalColor = '#9B6FE4',
  centerColor = '#FDE047',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* 5 rounded petals */}
      <circle cx="12" cy="6" r="4.2" fill={petalColor} fillOpacity="0.88" />
      <circle cx="17.7" cy="10.1" r="4.2" fill={petalColor} fillOpacity="0.88" />
      <circle cx="15.5" cy="16.9" r="4.2" fill={petalColor} fillOpacity="0.88" />
      <circle cx="8.5" cy="16.9" r="4.2" fill={petalColor} fillOpacity="0.88" />
      <circle cx="6.3" cy="10.1" r="4.2" fill={petalColor} fillOpacity="0.88" />
      {/* Glowing Stamen Center */}
      <circle cx="12" cy="12" r="2.8" fill={centerColor} />
      <circle cx="12" cy="12" r="1.3" fill="#F59E0B" />
    </svg>
  );
};

export const SakuraBlossom: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M16 16 C16 11, 13 6, 16 3 C19 6, 16 11, 16 16 Z"
        fill="url(#sakuraGrad1)"
      />
      <path
        d="M16 16 C20.8 14.4, 25.5 14.8, 28.4 12.6 C26.2 15.5, 26.6 20.2, 16 16 Z"
        fill="url(#sakuraGrad2)"
      />
      <path
        d="M16 16 C18.5 20.3, 20.8 24.6, 23.6 24.8 C21.4 26.8, 17.5 23.8, 16 16 Z"
        fill="url(#sakuraGrad1)"
      />
      <path
        d="M16 16 C13.5 20.3, 9.6 23.8, 7.4 24.8 C10.2 24.6, 12.5 20.3, 16 16 Z"
        fill="url(#sakuraGrad2)"
      />
      <path
        d="M16 16 C5.4 20.2, 5.8 15.5, 3.6 12.6 C6.5 14.8, 11.2 14.4, 16 16 Z"
        fill="url(#sakuraGrad1)"
      />
      <circle cx="16" cy="16" r="2.2" fill="#FEF08A" />
      <defs>
        <linearGradient id="sakuraGrad1" x1="16" y1="3" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E89FD5" />
          <stop offset="1" stopColor="#B388EB" />
        </linearGradient>
        <linearGradient id="sakuraGrad2" x1="28" y1="12" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4B8E4" />
          <stop offset="1" stopColor="#C599F5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const FloralCornerOrnament: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-right', className = '' }) => {
  const rotation = {
    'top-left': '-rotate-90 top-1 left-1',
    'top-right': 'top-1 right-1',
    'bottom-left': 'rotate-180 bottom-1 left-1',
    'bottom-right': 'rotate-90 bottom-1 right-1',
  }[position];

  return (
    <div className={`absolute pointer-events-none select-none z-10 ${rotation} ${className}`}>
      <svg width="42" height="42" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M48 2 C25 2 2 25 2 48"
          stroke="#C599F5"
          strokeWidth="1.5"
          strokeDasharray="2 3"
          strokeOpacity="0.4"
        />
        {/* Blossom */}
        <circle cx="40" cy="10" r="3.5" fill="#E89FD5" fillOpacity="0.6" />
        <circle cx="40" cy="10" r="1.5" fill="#FEF08A" />
        {/* Leaf */}
        <path d="M26 12 C30 8 35 10 32 15 C28 14 26 12 26 12 Z" fill="#A78BFA" fillOpacity="0.35" />
        <path d="M12 26 C8 30 10 35 15 32 C14 28 12 26 12 26 Z" fill="#E89FD5" fillOpacity="0.35" />
        {/* Micro Blossom */}
        <circle cx="10" cy="40" r="3" fill="#B388EB" fillOpacity="0.6" />
        <circle cx="10" cy="40" r="1.2" fill="#FEF08A" />
      </svg>
    </div>
  );
};

interface PetalItem {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  color: string;
}

export const FloatingFloralPetals: React.FC = () => {
  const petals: PetalItem[] = useMemo(() => {
    const colors = [
      '#E89FD5', // Sakura pink
      '#C599F5', // Soft lilac
      '#F4B8E4', // Pastel blush
      '#B388EB', // Dreamy violet
      '#E0B0FF', // Mauve petal
    ];

    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: (i * 7.5 + 4) % 94, // evenly distributed across width
      delay: (i * 0.9) % 7,
      duration: 11 + (i % 5) * 2,
      size: 13 + (i % 4) * 4,
      rotate: i * 35,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-20">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: -40,
            x: `${p.x}vw`,
            rotate: p.rotate,
            opacity: 0,
          }}
          animate={{
            y: '105vh',
            x: [`${p.x}vw`, `${p.x + (p.id % 2 === 0 ? 4 : -4)}vw`, `${p.x}vw`],
            rotate: [p.rotate, p.rotate + 180, p.rotate + 360],
            opacity: [0, 0.75, 0.85, 0.75, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: p.size, height: p.size * 1.3 }}
          className="absolute"
        >
          <svg viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_4px_rgba(155,111,228,0.25)]">
            <path
              d="M10 0 C16 4, 20 12, 17 20 C14 26, 6 26, 3 20 C0 12, 4 4, 10 0 Z"
              fill={p.color}
              fillOpacity="0.65"
            />
            {/* Center vein highlight */}
            <path
              d="M10 4 C11 11, 10 18, 10 22"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeOpacity="0.45"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

