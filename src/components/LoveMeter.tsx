import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flame, Zap, RotateCcw, ArrowRight, ArrowLeft, Coffee, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { asset } from '../utils/assets';
import { FlowerIcon, FloralCornerOrnament } from './FloralAccents';

interface LoveMeterProps {
  onNextPage: () => void;
  onPrevPage: () => void;
}

interface FloatingPopup {
  id: number;
  text: string;
  x: number;
  y: number;
}

const CuteRomanticHeart: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
  >
    <path
      d="M18 31.5C17 31.5 7.5 24 4 16.5C0.8 9.5 5.5 3 12 3C15.8 3 17.5 5.2 18 6.2C18.5 5.2 20.2 3 24 3C30.5 3 35.2 9.5 32 16.5C28.5 24 19 31.5 18 31.5Z"
      fill="#FFFFFF"
    />
    <path
      d="M10.5 7.5C8 10 7.2 13.5 7.5 16C7.8 13.8 8.8 11.2 11 9.5C12.5 8.2 14.2 7.5 16 7.2C13.8 6.8 12 7 10.5 7.5Z"
      fill="#FCEEF6"
    />
    <circle cx="8.5" cy="18" r="1.2" fill="#E8DCF8" />
    <circle cx="27.5" cy="8.5" r="1" fill="#E8DCF8" />
  </svg>
);

const FUNNY_MILESTONES = [
  { min: 1000, label: 'SUPORTER BELAJAR #1 DARI JAUH', desc: 'Kapan pun Anggi pusing tugas atau ujian, Abg siap nemenin call atau chat sampai tenang.', icon: Award },
  { min: 750, label: 'TEMAN CERITA VIRTUAL TERBAIK', desc: 'Walau belum ketemu langsung, ruang obrolan kita selalu jadi tempat paling nyaman.', icon: Flame },
  { min: 500, label: 'PENDENGAR SETIA SETIAP HARI', desc: 'Siap dengerin Anggi latian hapalan dan keluh kesah seharian biar beban terasa ringan.', icon: Coffee },
  { min: 300, label: 'PERHATIAN & DOA TANPA PUTUS', desc: 'Selalu doain kelancaran belajar Anggi dan siap kirim moodbooster kapan pun.', icon: Zap },
  { min: 100, label: 'SALING KABAR & SALING DUKUNG', desc: 'Saling bertukar kabar dan saling semangatin walau dipisahkan jarak.', icon: Heart },
];

const POPUP_TEXTS = [
  '🌸 Semangat Hapalan!',
  '✨ Anggi Pasti Bisa',
  '🌷 Nemenin Dari Jauh',
  '💖 Istirahat Dulu Sayang',
  '🌺 Bunga Favorit Abg',
  '💐 Sukses Ujiannya!',
];

export const LoveMeter: React.FC<LoveMeterProps> = ({
  onNextPage,
  onPrevPage,
}) => {
  const [loveScore, setLoveScore] = useState(100);
  const [popups, setPopups] = useState<FloatingPopup[]>([]);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const currentMilestone =
    FUNNY_MILESTONES.find((m) => loveScore >= m.min) || FUNNY_MILESTONES[FUNNY_MILESTONES.length - 1];

  const handleHeartPump = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const randomText = POPUP_TEXTS[Math.floor(Math.random() * POPUP_TEXTS.length)];
    const newPopup: FloatingPopup = {
      id: Date.now() + Math.random(),
      text: randomText,
      x,
      y,
    };

    setPopups((prev) => [...prev.slice(-4), newPopup]);
    setClickCount((c) => c + 1);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(16);
    }

    setLoveScore((prev) => {
      const next = prev + 50;
      if (next >= 1000 && !hasCelebrated) {
        setHasCelebrated(true);
        confetti({
          particleCount: 60,
          spread: 85,
          origin: { y: 0.6, x: 0.5 },
          colors: ['#9B6FE4', '#D870B8', '#B899EE', '#FCEEF6', '#FDE047'],
          shapes: ['circle'],
          scalar: 1.2,
        });
      }
      return next;
    });
  };

  const handleTurboBoost = () => {
    setLoveScore(1000);
    setHasCelebrated(true);
    setClickCount((c) => c + 10);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([20, 50, 20]);
    }
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.55, x: 0.5 },
      colors: ['#9B6FE4', '#D870B8', '#C084FC', '#FCEEF6', '#FDE047'],
      shapes: ['circle'],
      scalar: 1.25,
    });
  };

  const handleResetAttempt = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(30);
    }
    alert('Skor perhatiannya gak bisa dikurangin ya, minimal segini!');
  };

  const progressPercent = Math.min(100, Math.round((loveScore / 1000) * 100));
  const MilestoneIcon = currentMilestone.icon;

  return (
    <div className="relative w-full min-h-[750px] py-8 px-4 flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-7 rounded-[32px] bg-white/95 backdrop-blur-xl border border-[#E8DCF8] shadow-[0_20px_50px_rgba(155,111,228,0.15)] space-y-6 relative overflow-hidden text-center"
        >
          {/* Floral Corner Ornaments */}
          <FloralCornerOrnament position="top-right" />
          <FloralCornerOrnament position="bottom-left" />

          {/* Heading */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-2xl sm:text-3xl font-black tracking-tight text-[#28163E] leading-tight">
                <FlowerIcon size={22} petalColor="#9B6FE4" />
                <span>Tingkat Perhatian Abg</span>
              </div>
              <button
                onClick={handleResetAttempt}
                title="Coba Kurangi"
                className="p-1.5 rounded-full text-[#8E76A8] hover:text-[#9B6FE4] hover:bg-[#F5F0FB] transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw size={14} />
              </button>
            </div>
            <p className="text-sm sm:text-base text-[#5C4478]">
              Tekan tombol bunga hati di bawah buat nentuin seberapa banyak perhatian yang Anggi mau dari Abg!
            </p>
          </div>

          {/* Big Score Display */}
          <div className="space-y-2">
            <motion.div
              key={loveScore}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-[#8E5BE2] via-[#9B6FE4] to-[#D870B8] bg-clip-text text-transparent tracking-tight"
            >
              {loveScore}%
            </motion.div>

            {/* Dynamic Cute Milestone Card */}
            <motion.div
              key={currentMilestone.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F5F0FB] via-[#FCEEF6] to-[#F5F0FB] border border-[#EAE1FA] space-y-1 text-center"
            >
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7F4CD1]">
                <MilestoneIcon size={16} />
                <span>{currentMilestone.label}</span>
              </div>
              <p className="text-base text-[#5C4478] leading-snug">
                "{currentMilestone.desc}"
              </p>
            </motion.div>
          </div>

          {/* Animated Progress Meter */}
          <div className="w-full bg-[#F5F0FB] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#EAE1FA]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8E5BE2] via-[#9B6FE4] to-[#D870B8] rounded-full"
              initial={{ width: '10%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            />
          </div>

          {/* Central Interactive Heart Pump Button with balanced dainty proportions */}
          <div className="pt-2 relative flex flex-col items-center justify-center gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleHeartPump}
              aria-label="Pompa Porsi Manja Anggi"
              className="relative w-[62px] h-[62px] min-w-[62px] min-h-[62px] rounded-full bg-gradient-to-tr from-[#9B6FE4] via-[#B899EE] to-[#D870B8] text-white flex items-center justify-center cursor-pointer select-none shadow-[0_8px_20px_rgba(155,111,228,0.38)] transition-transform"
            >
              <div className="flex items-center justify-center pointer-events-none">
                <CuteRomanticHeart size={20} />
              </div>

              {/* Floating micro reaction popups on tap */}
              <AnimatePresence>
                {popups.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1, scale: 0.7, y: 0, x: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1.35,
                      y: -75,
                      x: (Math.random() - 0.5) * 50,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    className="absolute pointer-events-none text-white z-30 font-bold text-[13px] whitespace-nowrap bg-[#28163E] px-2.5 py-0.5 rounded-full shadow-md"
                  >
                    {item.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.button>
            <p className="text-[13px] text-[#8E76A8]">
              Klik terus sampai mencapai skor 1000 ya!
            </p>
          </div>

          {/* Couple Vignette: Anggi Anisa Lintang & Abg */}
          <div className="pt-1 flex flex-col items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-[#F5F0FB] via-[#FCEEF6] to-[#F5F0FB] rounded-2xl flex items-center justify-between gap-3 w-full max-w-[340px] border border-[#EAE1FA]">
              {/* Anggi Avatar */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#28163E] shrink-0 border-2 border-[#9B6FE4]/50 shadow-sm">
                  <img
                    src={asset('/img/PHOTO-2026-11-18-19-32-51.jpg')}
                    alt="Anggi Anisa Lintang"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="text-[13px] font-bold text-[#28163E] truncate max-w-[110px]">
                    Anggi Anisa L.
                  </div>
                  <div className="text-[12px] text-[#7F4CD1] leading-tight flex items-center gap-0.5">
                    <FlowerIcon size={10} petalColor="#D870B8" />
                    <span>Bunga Manis</span>
                  </div>
                </div>
              </div>

              {/* Pulsing Love Indicator with Flower */}
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center justify-center text-[#9B6FE4] px-1"
              >
                <Heart size={20} fill="#9B6FE4" />
              </motion.div>

              {/* Abg Avatar */}
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-[13px] font-bold text-[#28163E]">
                    Abg
                  </div>
                  <div className="text-[12px] text-[#8E76A8] leading-tight">
                    Selalu Ada
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#28163E] shrink-0 border-2 border-[#8E76A8]/40 shadow-sm">
                  <img
                    src={asset('/img/PHOTO-2026-11-03-09-14-35.jpg')}
                    alt="Abg"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-[13px] text-[#8E76A8]">
                {clickCount > 0 ? 'Semangat terus buat Anggi tersayang! 🌸' : 'Ketuk hati untuk menaikkan skor!'}
              </span>
              {loveScore < 1000 && (
                <button
                  onClick={handleTurboBoost}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F5F0FB] text-[13px] font-bold text-[#7F4CD1] border border-[#EAE1FA] hover:bg-[#E8DCF8]/50 transition-colors cursor-pointer"
                >
                  <Zap size={13} />
                  <span>Langsung 1000</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="pt-6 flex items-center gap-3">
        <button
          onClick={onPrevPage}
          aria-label="Halaman Sebelumnya"
          className="w-14 h-14 min-w-[54px] min-h-[54px] rounded-full bg-white/90 backdrop-blur-md border border-[#E8DCF8] shadow-sm flex items-center justify-center text-[#28163E] shrink-0 cursor-pointer hover:bg-[#E8DCF8]/30 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={onNextPage}
          className="flex-1 py-4 px-6 bg-gradient-to-r from-[#8E5BE2] via-[#9B6FE4] to-[#D870B8] text-white rounded-full font-bold text-base flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(155,111,228,0.32)] transition-opacity hover:opacity-95"
        >
          <span>Buka Galeri Foto Anggi</span>
          <ArrowRight size={18} className="text-[#FCEEF6]" />
        </motion.button>
      </div>
    </div>
  );
};
