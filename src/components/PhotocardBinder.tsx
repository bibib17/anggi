import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCw, Volume2, VolumeX, Play, Pause, X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { ANGGI_SOLO_CARDS } from '../data/content';
import { PhotocardItem } from '../types';
import { FlowerIcon, SakuraBlossom } from './FloralAccents';

interface PhotocardBinderProps {
  onNextPage: () => void;
  onPrevPage: () => void;
}

export const PhotocardBinder: React.FC<PhotocardBinderProps> = ({
  onNextPage,
  onPrevPage,
}) => {
  const [selectedCard, setSelectedCard] = useState<PhotocardItem | null>(null);
  const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({});
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [totalLikes, setTotalLikes] = useState(ANGGI_SOLO_CARDS.length);
  const [floatingHeartId, setFloatingHeartId] = useState<string | null>(null);

  // Modal Video controls
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalFlipped, setModalFlipped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleCardFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
  };

  const handleHeartClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const wasLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !wasLiked }));
    setTotalLikes((prev) => (wasLiked ? prev - 1 : prev + 1));
    setFloatingHeartId(id);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(12);
    }

    setTimeout(() => {
      setFloatingHeartId(null);
    }, 900);
  };

  const openModal = (card: PhotocardItem) => {
    setSelectedCard(card);
    setModalFlipped(false);
    setIsPlaying(true);
    setIsMuted(true);
  };

  const nextModalCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedCard) return;
    const currentIndex = ANGGI_SOLO_CARDS.findIndex((c) => c.id === selectedCard.id);
    const nextIndex = (currentIndex + 1) % ANGGI_SOLO_CARDS.length;
    setSelectedCard(ANGGI_SOLO_CARDS[nextIndex]);
    setModalFlipped(false);
  };

  const prevModalCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedCard) return;
    const currentIndex = ANGGI_SOLO_CARDS.findIndex((c) => c.id === selectedCard.id);
    const prevIndex = (currentIndex - 1 + ANGGI_SOLO_CARDS.length) % ANGGI_SOLO_CARDS.length;
    setSelectedCard(ANGGI_SOLO_CARDS[prevIndex]);
    setModalFlipped(false);
  };

  const toggleModalPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleModalMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="relative w-full min-h-[750px] py-8 px-4 flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Header Bagian 1 */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <FlowerIcon size={24} petalColor="#9B6FE4" />
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#28163E] leading-tight">
                Tentang Anggi Anisa Lintang
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/85 backdrop-blur-md rounded-full text-[13px] font-bold text-[#7F4CD1] border border-[#E8DCF8] shadow-sm shrink-0">
              <Heart size={13} fill="#9B6FE4" className="text-[#9B6FE4]" />
              <span>{totalLikes} Suka</span>
            </div>
          </div>
          <p className="text-base text-[#5C4478] leading-relaxed">
            Kumpulan foto dan video manis kiriman Anggi yang selalu jadi penyemangat hari-hari Abg dari jauh.
          </p>
        </div>

        {/* Anggi Photocards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {ANGGI_SOLO_CARDS.map((card) => {
            const isFlipped = !!flippedMap[card.id];
            const isLiked = !!likedMap[card.id];

            return (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openModal(card)}
                className="relative rounded-[24px] bg-white/95 backdrop-blur-md p-2.5 flex flex-col justify-between cursor-pointer select-none overflow-hidden border border-[#E8DCF8] shadow-[0_8px_20px_rgba(155,111,228,0.1)] hover:shadow-[0_12px_28px_rgba(155,111,228,0.18)] transition-all"
              >
                {/* Photocard Front / Back */}
                {!isFlipped ? (
                  <div className="relative w-full h-full flex flex-col justify-between">
                    {/* Media Display - Locked 181 x 247.31 Ratio */}
                    <div
                      className="relative w-full aspect-[181/247.31] rounded-[18px] overflow-hidden bg-[#28163E] shrink-0"
                      style={{ aspectRatio: '181 / 247.31' }}
                    >
                      {card.type === 'video' ? (
                        <video
                          src={card.src}
                          playsInline
                          webkit-playsinline="true"
                          muted
                          autoPlay
                          loop
                          preload="metadata"
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      ) : (
                        <img
                          src={card.src}
                          alt={card.title}
                          className="w-full h-full object-cover pointer-events-none"
                          loading="lazy"
                        />
                      )}

                      {/* Holo Stamp Badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#28163E]/85 backdrop-blur-sm text-[#FFFFFF] text-[12px] font-bold rounded-full">
                        #{card.cardNo}
                      </div>

                      {/* Love Tap Button */}
                      <button
                        onClick={(e) => handleHeartClick(card.id, e)}
                        aria-label="Suka Photocard"
                        className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#9B6FE4] shadow-sm cursor-pointer"
                      >
                        <Heart
                          size={15}
                          fill={isLiked ? '#9B6FE4' : 'transparent'}
                        />
                      </button>

                      {/* Double tap pop heart */}
                      <AnimatePresence>
                        {floatingHeartId === card.id && (
                          <motion.div
                            initial={{ scale: 0.4, opacity: 1 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#9B6FE4]"
                          >
                            <Heart size={54} fill="#9B6FE4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-2 px-1 flex items-center justify-between shrink-0">
                      <div className="truncate pr-1">
                        <div className="text-[12px] sm:text-[13px] font-bold text-[#28163E] truncate leading-tight">
                          {card.title}
                        </div>
                        <div className="text-[11px] sm:text-[12px] text-[#8E76A8] leading-tight mt-0.5">
                          {card.date}
                        </div>
                      </div>

                      {/* Flip Button */}
                      <button
                        onClick={(e) => toggleCardFlip(card.id, e)}
                        aria-label="Balik Photocard"
                        className="p-1 rounded-full text-[#8E76A8] hover:text-[#9B6FE4] transition-colors cursor-pointer shrink-0"
                        title="Balik Kartu"
                      >
                        <RotateCw size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Photocard Back Side */
                  <div
                    onClick={(e) => toggleCardFlip(card.id, e)}
                    className="relative w-full h-full rounded-[18px] bg-gradient-to-br from-[#F5F0FB] via-[#FCEEF6] to-[#F5F0FB] border border-[#EAE1FA] p-3 flex flex-col justify-between text-center overflow-hidden"
                  >
                    <div className="space-y-0.5 shrink-0">
                      <div className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-bold text-[#7F4CD1]">
                        <FlowerIcon size={12} petalColor="#D870B8" />
                        <span>KARTU RESMI ANGGI</span>
                      </div>
                      <div className="text-[11px] sm:text-[12px] font-bold text-[#8E76A8]">
                        NO. {card.cardNo} / {ANGGI_SOLO_CARDS.length}
                      </div>
                    </div>

                    <div className="my-auto py-1">
                      <p className="text-xs sm:text-sm font-bold text-[#28163E] leading-snug line-clamp-4">
                        "{card.backNote}"
                      </p>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-[#8E76A8] shrink-0">
                      <span className="truncate">{card.tag}</span>
                      <span className="font-semibold text-[#9B6FE4]">Ketuk foto</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
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
          <span>Lanjut ke Momen Berdua</span>
          <ArrowRight size={18} className="text-[#FCEEF6]" />
        </motion.button>
      </div>

      {/* Fullscreen Modal View */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[370px] bg-white/95 backdrop-blur-2xl rounded-[32px] p-4.5 space-y-3.5 border border-[#E8DCF8] shadow-[0_25px_60px_rgba(155,111,228,0.25)] overflow-hidden"
            >
              {/* Modal Top Nav Bar */}
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevModalCard}
                    aria-label="Sebelumnya"
                    className="p-1.5 rounded-full text-[#6434AD] hover:bg-[#F5F0FB] transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm font-bold text-[#28163E]">
                    {selectedCard.cardNo} / {ANGGI_SOLO_CARDS.length}
                  </span>
                  <button
                    onClick={nextModalCard}
                    aria-label="Berikutnya"
                    className="p-1.5 rounded-full text-[#6434AD] hover:bg-[#F5F0FB] transition-colors cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedCard(null)}
                  aria-label="Tutup Modal"
                  className="p-1.5 rounded-full text-[#8E76A8] hover:text-[#28163E] hover:bg-[#F5F0FB] transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Media Showcase */}
              {!modalFlipped ? (
                <div
                  className="relative w-full aspect-[181/247.31] rounded-[24px] overflow-hidden bg-[#28163E] border border-[#E8DCF8]"
                  style={{ aspectRatio: '181 / 247.31' }}
                >
                  {selectedCard.type === 'video' ? (
                    <>
                      <video
                        ref={videoRef}
                        src={selectedCard.src}
                        playsInline
                        webkit-playsinline="true"
                        muted={isMuted}
                        autoPlay
                        loop
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <button
                          onClick={toggleModalPlay}
                          aria-label="Putar atau Jeda"
                          className="p-2.5 rounded-full bg-[#28163E]/80 backdrop-blur-md text-white cursor-pointer"
                        >
                          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                        </button>
                        <button
                          onClick={toggleModalMute}
                          aria-label="Bunyikan atau Bisukan"
                          className="p-2.5 rounded-full bg-[#28163E]/80 backdrop-blur-md text-white cursor-pointer"
                        >
                          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                      </div>
                    </>
                  ) : (
                    <img
                      src={selectedCard.src}
                      alt={selectedCard.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#28163E]/85 backdrop-blur-md text-[#FFFFFF] text-[13px] font-bold rounded-full">
                    PC #{selectedCard.cardNo} • {selectedCard.tag}
                  </div>
                </div>
              ) : (
                /* Modal Back Side */
                <div
                  className="relative w-full aspect-[181/247.31] rounded-[24px] bg-gradient-to-br from-[#F5F0FB] via-[#FCEEF6] to-[#F5F0FB] border border-[#EAE1FA] p-6 flex flex-col justify-between text-center"
                  style={{ aspectRatio: '181 / 247.31' }}
                >
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#7F4CD1]">
                      <SakuraBlossom size={18} />
                      <span>OFFICIAL PHOTOCARD ANGGI</span>
                    </div>
                    <div className="text-[13px] font-bold text-[#8E76A8]">
                      NO. {selectedCard.cardNo} / {ANGGI_SOLO_CARDS.length}
                    </div>
                  </div>

                  <div className="my-auto py-4">
                    <p className="text-lg font-bold text-[#28163E] leading-relaxed">
                      "{selectedCard.backNote}"
                    </p>
                  </div>

                  <div className="pt-2 text-sm text-[#5C4478] flex items-center justify-center gap-1">
                    <FlowerIcon size={12} petalColor="#D870B8" />
                    <span>Ditulis tulus oleh Abg buat Anggi</span>
                  </div>
                </div>
              )}

              {/* Modal Card Info & Flip Action */}
              <div className="px-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#28163E]">
                    {selectedCard.title}
                  </h3>
                  <button
                    onClick={() => setModalFlipped(!modalFlipped)}
                    className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#F5F0FB] text-[#7F4CD1] border border-[#EAE1FA] text-[13px] font-bold cursor-pointer hover:bg-[#E8DCF8]/50 transition-colors"
                  >
                    <RotateCw size={13} />
                    <span>{modalFlipped ? 'Lihat Foto' : 'Balik Kartu'}</span>
                  </button>
                </div>
                <div className="text-[13px] text-[#8E76A8]">
                  {selectedCard.date} • Koleksi #{selectedCard.cardNo} dari {ANGGI_SOLO_CARDS.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
