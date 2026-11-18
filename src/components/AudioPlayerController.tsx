import React from 'react';
import { motion } from 'framer-motion';
import { Disc, Play, Pause } from 'lucide-react';
import { FlowerIcon } from './FloralAccents';

interface AudioPlayerControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioPlayerController: React.FC<AudioPlayerControllerProps> = ({
  isPlaying,
  onToggle,
}) => {
  return (
    <div className="fixed top-3 right-4 z-50 flex items-center gap-2 py-1.5 px-3.5 bg-white/85 backdrop-blur-md border border-[#E8DCF8] rounded-full text-[13px] font-semibold text-[#28163E] shadow-[0_4px_16px_rgba(155,111,228,0.12)] select-none">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[#9B6FE4] ${
          isPlaying ? 'animate-spin-slow' : 'opacity-60'
        }`}
      >
        <Disc size={16} />
      </div>

      <div className="flex items-center gap-1 pr-0.5">
        <FlowerIcon size={12} petalColor="#D870B8" />
        <span className="text-[13px] font-bold text-[#28163E] leading-tight">
          Peak of Love
        </span>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        className="p-1 rounded-full text-[#6434AD] hover:text-[#9B6FE4] transition-colors cursor-pointer"
      >
        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
      </motion.button>
    </div>
  );
};
