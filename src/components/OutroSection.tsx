import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Sparkles, ArrowLeft, MessageCircle } from 'lucide-react';
import { FlowerIcon, SakuraBlossom } from './FloralAccents';

interface OutroSectionProps {
  onRestart: () => void;
  onPrevPage: () => void;
}

export const OutroSection: React.FC<OutroSectionProps> = ({
  onRestart,
  onPrevPage,
}) => {
  return (
    <div className="relative w-full min-h-[750px] py-12 px-6 bg-gradient-to-b from-[#241238] via-[#1E0E30] to-[#140822] text-[#FFFFFF] text-center select-none rounded-[36px] border border-[#3E1F5E] shadow-[0_25px_60px_rgba(36,18,56,0.45)] flex flex-col justify-between overflow-hidden">
      {/* Decorative ambient glowing orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#9B6FE4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#D870B8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-8 my-auto relative z-10">
        {/* Flower Emblem */}
        <div className="mx-auto w-18 h-18 rounded-full bg-gradient-to-tr from-[#8E5BE2] via-[#9B6FE4] to-[#D870B8] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(155,111,228,0.45)]">
          <SakuraBlossom size={34} />
        </div>

        {/* Closing Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-[#E8DCF8] border border-white/15">
            <FlowerIcon size={12} petalColor="#D870B8" />
            <span>Bunga Terindah di Hati Abg</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFFFFF] tracking-tight leading-tight">
            Terima Kasih, Anggi Anisa Lintang
          </h2>
          <p className="text-base sm:text-lg text-[#D8C7F5] max-w-md mx-auto leading-relaxed">
            Meskipun kita belum pernah ketemu langsung, kehadiran Anggi selalu jadi berkah dan penyemangat terbesar buat Abg. Semangat terus buat hapalan, tugas, dan ujiannya yaa. Abg selalu doain dari jauh dan gak sabar nunggu momen indah waktu kita ketemu nanti 🌸✨.
          </p>
        </div>

        {/* Signature */}
        <div className="pt-2 space-y-1.5">
          <div className="text-sm text-[#B899EE]">
            Tertanda dengan penuh sayang & kekaguman,
          </div>
          <div className="text-xl font-bold text-[#FFFFFF] flex items-center justify-center gap-2">
            <span>Dari Abg, buat Anggi tersayang</span>
            <FlowerIcon size={16} petalColor="#E89FD5" />
          </div>
        </div>

        {/* Direct WhatsApp Contact Button */}
        <div className="pt-2">
          <a
            href={`https://wa.me/6285133933560?text=${encodeURIComponent(
              'Bg, aku sudah baca semua pesan dan doa kamu di web... makasih banyak yaa sudah selalu semangatin dari jauh! 🌸'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white text-[#28163E] hover:bg-[#F5F0FB] transition-all font-bold text-sm shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
          >
            <MessageCircle size={17} className="text-[#9B6FE4]" />
            <span>Chat Abg di WhatsApp</span>
          </a>
        </div>

        {/* Micro Timestamp */}
        <div className="text-[13px] text-[#B899EE]/70 flex items-center justify-center gap-1.5 pt-2">
          <Sparkles size={14} className="text-[#E89FD5]" />
          <span>Dibuat khusus untuk Anggi Anisa Lintang • 2026</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="pt-6 flex items-center gap-3 relative z-10">
        <button
          onClick={onPrevPage}
          aria-label="Halaman Sebelumnya"
          className="w-14 h-14 min-w-[54px] min-h-[54px] rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#E8DCF8] shrink-0 cursor-pointer hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.04 }}
          onClick={onRestart}
          className="flex-1 py-4 px-6 bg-gradient-to-r from-[#8E5BE2] via-[#9B6FE4] to-[#D870B8] text-white font-bold text-base rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_rgba(155,111,228,0.4)] transition-opacity hover:opacity-95"
        >
          <RotateCcw size={16} />
          <span>Ulangi Cerita dari Awal</span>
        </motion.button>
      </div>
    </div>
  );
};
