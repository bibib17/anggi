import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Heart, Play, Sparkles } from 'lucide-react';
import { HERO_FILMSTRIP } from '../data/content';
import { HeroFilmstripItem } from '../types';
import { FlowerIcon } from './FloralAccents';

interface FilmstripWidgetProps {
  activeMedia?: HeroFilmstripItem;
  onSelectMedia?: (item: HeroFilmstripItem) => void;
  onOpenGallery?: () => void;
}

export const FilmstripWidget: React.FC<FilmstripWidgetProps> = ({
  activeMedia,
  onSelectMedia,
  onOpenGallery,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const [floatingHeart, setFloatingHeart] = useState(false);

  const currentItem = activeMedia || HERO_FILMSTRIP[selectedIndex];

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    const item = HERO_FILMSTRIP[idx];
    onSelectMedia?.(item);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
  };

  const prevSlide = () => {
    const nextIdx = selectedIndex > 0 ? selectedIndex - 1 : HERO_FILMSTRIP.length - 1;
    handleSelect(nextIdx);
  };

  const nextSlide = () => {
    const nextIdx = selectedIndex < HERO_FILMSTRIP.length - 1 ? selectedIndex + 1 : 0;
    handleSelect(nextIdx);
  };

  const handleLikeMoment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [currentItem.id]: !prev[currentItem.id] }));
    setFloatingHeart(true);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(15);
    }

    setTimeout(() => {
      setFloatingHeart(false);
    }, 800);
  };

  const isCurrentLiked = !!likedMap[currentItem.id];

  return (
    <div className="relative w-full sm:w-[320px] p-3.5 bg-white/95 backdrop-blur-md rounded-3xl border border-[#E8DCF8] shadow-[0_8px_24px_rgba(155,111,228,0.1)] select-none space-y-2.5">
      {/* Header: Date & Live Time */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#F5F0FB] via-[#FCEEF6] to-[#F5F0FB] px-3.5 py-2 rounded-2xl border border-[#EAE1FA]/70">
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#6434AD]">
          <Clock size={14} className="text-[#9B6FE4]" />
          <span>{currentItem.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-[#28163E]">
            {currentItem.time}
          </span>
          <button
            onClick={handleLikeMoment}
            aria-label="Suka Momen Ini"
            className="p-1 rounded-full text-[#9B6FE4] cursor-pointer hover:bg-white transition-colors"
          >
            <Heart size={14} fill={isCurrentLiked ? '#9B6FE4' : 'transparent'} />
          </button>
        </div>
      </div>

      {/* Thumbnails Reel with navigation buttons */}
      <div className="flex items-center justify-between gap-1">
        <button
          onClick={prevSlide}
          aria-label="Momen Sebelumnya"
          className="p-1.5 rounded-full text-[#6434AD] hover:text-[#28163E] hover:bg-[#F5F0FB] transition-colors cursor-pointer shrink-0"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2 overflow-hidden py-1">
          {HERO_FILMSTRIP.map((item, idx) => {
            const isSelected = (activeMedia ? activeMedia.id === item.id : selectedIndex === idx);
            return (
              <motion.div
                key={item.id}
                whileTap={{ scale: 0.93 }}
                onClick={() => handleSelect(idx)}
                className={`relative w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-2xl overflow-hidden cursor-pointer transition-transform transition-opacity ${
                  isSelected
                    ? 'border-2 border-[#9B6FE4] scale-105 shadow-[0_4px_12px_rgba(155,111,228,0.3)]'
                    : 'opacity-60 hover:opacity-90'
                }`}
              >
                <img
                  src={item.type === 'video' ? (item.poster || item.src) : item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-white">
                    <Play size={12} fill="white" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Momen Berikutnya"
          className="p-1.5 rounded-full text-[#6434AD] hover:text-[#28163E] hover:bg-[#F5F0FB] transition-colors cursor-pointer shrink-0"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Active Caption Details */}
      <div className="pt-0.5 px-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-[13px] font-bold text-[#28163E] truncate">
            {currentItem.title}
          </h4>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7F4CD1] bg-[#F5F0FB] px-2 py-0.5 rounded-full border border-[#EAE1FA]">
            <FlowerIcon size={10} petalColor="#D870B8" />
            {currentItem.tag}
          </span>
        </div>
        <p className="text-[12px] text-[#5C4478] line-clamp-2 leading-relaxed">
          {currentItem.note}
        </p>
      </div>
    </div>
  );
};
