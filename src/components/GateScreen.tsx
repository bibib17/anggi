import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FlowerIcon, FloralCornerOrnament } from './FloralAccents';
import { asset } from '../utils/assets';

interface GateScreenProps {
  onUnlock: () => void;
}

export const GateScreen: React.FC<GateScreenProps> = ({ onUnlock }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#9B6FE4', '#D870B8', '#C084FC', '#F4B8E4', '#FDE047', '#EAE1FA'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    setTimeout(() => {
      onUnlock();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          key="gate-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-romantic-pattern select-none"
        >
          {/* Gift Box Card Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[360px] bg-white/95 backdrop-blur-xl rounded-[32px] p-8 text-center border border-[#E8DCF8] shadow-[0_20px_50px_rgba(155,111,228,0.18)] overflow-hidden"
          >
            {/* Floral Corner Ornaments */}
            <FloralCornerOrnament position="top-right" />
            <FloralCornerOrnament position="bottom-left" />

            {/* Anggi's Photo Avatar & Gift Badge */}
            <div className="relative mx-auto w-24 h-24 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="w-full h-full rounded-full p-1 bg-gradient-to-tr from-[#9B6FE4] via-[#D870B8] to-[#B899EE] shadow-[0_10px_25px_rgba(155,111,228,0.35)] cursor-pointer"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-[#F5F0FB]">
                  <img
                    src={asset('/img/PHOTO-2026-11-18-19-32-51.jpg')}
                    alt="Anggi Anisa Lintang"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-tr from-[#8E5BE2] to-[#D870B8] flex items-center justify-center text-white border-2 border-white shadow-md">
                <Gift size={16} />
              </div>
            </div>

            {/* Title & Message */}
            <div className="mt-5 space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F0FB] rounded-full text-[12px] font-bold text-[#7F4CD1] border border-[#EAE1FA]">
                <FlowerIcon size={13} petalColor="#9B6FE4" />
                <span>Kado Spesial Untukmu</span>
              </div>
              <h1 className="text-2xl font-black text-[#28163E] leading-snug tracking-tight">
                Ada Kado Spesial Buat Anggi Anisa Lintang
              </h1>
              <p className="text-base text-[#5C4478] leading-relaxed">
                Dari Abg, ruang semangat kecil dari jauh penuh doa & bunga untuk Anggi.
              </p>
            </div>

            {/* Ribbon Decoration Bar */}
            <div className="mt-5 py-2.5 px-3 bg-gradient-to-r from-[#F5F0FB] via-[#FCEEF6] to-[#F5F0FB] rounded-2xl flex items-center justify-center gap-2 text-[13px] font-semibold text-[#6434AD] border border-[#EAE1FA]/60">
              <Sparkles size={15} className="text-[#9B6FE4]" />
              <span>Buka kadonya dan dengarkan lagunya ya!</span>
            </div>

            {/* Action Tap Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleOpen}
              className="mt-6 w-full py-3.5 px-5 bg-gradient-to-r from-[#8E5BE2] via-[#9B6FE4] to-[#D870B8] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(155,111,228,0.32)] transition-opacity hover:opacity-95"
            >
              <Heart size={16} fill="#FCEEF6" className="text-[#FCEEF6]" />
              <span>Buka Kado Buat Anggi</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
