import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Clock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FilmstripWidget } from './FilmstripWidget';
import { FlowerIcon, FloralCornerOrnament } from './FloralAccents';
import { HERO_FILMSTRIP } from '../data/content';
import { HeroFilmstripItem } from '../types';

interface HeroCollageProps {
  onNextPage: () => void;
  onJumpToPage?: (page: number) => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

export const HeroCollage: React.FC<HeroCollageProps> = ({
  onNextPage,
  onJumpToPage,
}) => {
  const [activeMedia, setActiveMedia] = useState<HeroFilmstripItem>(HERO_FILMSTRIP[0]);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const handleHeartBurst = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 32,
      spread: 70,
      origin: { y: 0.88, x: 0.5 },
      colors: ['#9B6FE4', '#D870B8', '#B899EE', '#FCEEF6', '#FDE047'],
      shapes: ['circle'],
      scalar: 1.15,
    });
  };

  const handleCutoutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setFloatingHearts((prev) => [...prev.slice(-4), newHeart]);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(12);
    }

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-[820px] bg-transparent pt-6 pb-12 px-4 flex flex-col justify-between select-none">
      {/* Top Bar: Headline & Filmstrip Controller */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex flex-col gap-4 px-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2.5 max-w-sm lg:max-w-xl">
            {/* Dainty Floral Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-xs font-bold text-[#7F4CD1] border border-[#E8DCF8] shadow-sm"
            >
              <FlowerIcon size={13} petalColor="#D870B8" />
              <span>Bunga Paling Cantik & Istimewa</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-4xl sm:text-5xl lg:text-[72px] font-black text-[#28163E] tracking-tight leading-[1.05]"
            >
              Anggi Anisa Lintang
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="text-base sm:text-lg text-[#5C4478] leading-relaxed max-w-md"
            >
              Walau belum pernah ketemu langsung, senyum dan semangat Anggi selalu jadi hal paling istimewa buat Abg.
            </motion.p>

            {/* Primary Action Button in First Screen */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="pt-1"
            >
              <button
                onClick={onNextPage}
                className="inline-flex items-center gap-2.5 py-3.5 px-7 rounded-full bg-gradient-to-r from-[#8E5BE2] via-[#9B6FE4] to-[#D870B8] text-white font-bold text-base min-h-[48px] hover:opacity-95 shadow-[0_10px_25px_rgba(155,111,228,0.32)] transition-all cursor-pointer"
              >
                <span>Buka Semangat Buat Anggi</span>
                <ArrowRight size={18} className="text-[#FCEEF6]" />
              </button>
            </motion.div>
          </div>

          {/* Interactive Filmstrip Controller Widget */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-end pt-1">
            <FilmstripWidget
              activeMedia={activeMedia}
              onSelectMedia={(item) => setActiveMedia(item)}
              onOpenGallery={() => (onJumpToPage ? onJumpToPage(3) : onNextPage())}
            />
          </div>
        </div>
      </motion.div>

      {/* Central Moving Picture Showcase Controlled by Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex-1 flex items-center justify-center my-6"
      >
        <div
          onClick={handleCutoutClick}
          className="relative w-[300px] sm:w-[380px] lg:w-[440px] h-[380px] sm:h-[460px] lg:h-[520px] cursor-pointer"
        >
          {/* Floral Corner Ornaments on Frame */}
          <FloralCornerOrnament position="top-right" />
          <FloralCornerOrnament position="bottom-left" />

          {/* Dynamic Floating Sticker 1: Active Tag with Flower */}
          <motion.div
            key={activeMedia.tag}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 z-20 px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-[#7F4CD1] border border-[#E8DCF8] text-sm font-bold rounded-full flex items-center gap-1.5 shadow-[0_4px_12px_rgba(155,111,228,0.15)]"
          >
            <FlowerIcon size={14} petalColor="#D870B8" />
            <span>{activeMedia.tag}</span>
          </motion.div>

          {/* Dynamic Floating Sticker 2: Active Time */}
          <motion.div
            key={activeMedia.time}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 right-2 z-20 px-4 py-1.5 bg-[#28163E]/90 backdrop-blur-md text-[#FFFFFF] text-sm font-semibold rounded-full flex items-center gap-1.5 shadow-md"
          >
            <Clock size={15} className="text-[#E8DCF8]" />
            <span>{activeMedia.time}</span>
          </motion.div>

          {/* Moving Picture Footage Container */}
          <div className="w-full h-full rounded-[32px] overflow-hidden bg-white p-2 border border-[#E8DCF8] shadow-[0_20px_45px_rgba(155,111,228,0.18)]">
            <div className="w-full h-full rounded-[24px] overflow-hidden bg-[#28163E]">
              <AnimatePresence mode="wait">
                {activeMedia.type === 'video' ? (
                  <motion.video
                    key={activeMedia.src}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                    src={activeMedia.src}
                    poster={activeMedia.poster}
                    playsInline
                    webkit-playsinline="true"
                    muted
                    autoPlay
                    loop
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <motion.img
                    key={activeMedia.src}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                    src={activeMedia.src}
                    alt={activeMedia.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tap-on-cutout heart & flower bubble particles */}
          <AnimatePresence>
            {floatingHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, scale: 0.6, x: h.x - 16, y: h.y - 16 }}
                animate={{
                  opacity: 0,
                  scale: 1.6,
                  y: h.y - 85,
                  x: h.x - 16 + (Math.random() * 30 - 15),
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute pointer-events-none text-[#9B6FE4] z-30 flex items-center justify-center"
              >
                <Heart size={28} fill="#9B6FE4" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom Interactive Navigation Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.28 }}
        className="relative z-30 flex items-center gap-3 px-2"
      >
        {/* Flower Burst Pill */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.06 }}
          onClick={handleHeartBurst}
          aria-label="Kirim Partikel Bunga & Hati"
          className="w-14 h-14 min-w-[54px] min-h-[54px] rounded-full bg-white/90 backdrop-blur-md border border-[#E8DCF8] shadow-[0_4px_16px_rgba(155,111,228,0.15)] flex items-center justify-center text-[#9B6FE4] shrink-0 cursor-pointer"
        >
          <FlowerIcon size={26} petalColor="#D870B8" />
        </motion.button>

        {/* Primary Action Button to Proceed to Next Page */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={onNextPage}
          className="flex-1 py-4 px-6 bg-gradient-to-r from-[#8E5BE2] via-[#9B6FE4] to-[#D870B8] text-[#FFFFFF] rounded-full font-bold text-base flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(155,111,228,0.32)] transition-opacity hover:opacity-95"
        >
          <span>Lanjut ke Cerita</span>
          <ArrowRight size={18} className="text-[#FCEEF6]" />
        </motion.button>
      </motion.div>
    </div>
  );
};
