"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────
   Config
───────────────────────────────────────── */
const PLAYLISTS = [
  {
    id: "3auw3fUys4hPFQVu9ywNH8",
    badge: "VIBES",
  },
  {
    id: "1i0C9osaHYwCjhCfPSp2lE",
    badge: "CHILL",
  },
  {
    id: "4zpy93ZOAbO5EedHVKhk1T",
    badge: "HYPE",
  },
  {
    id: "6rrnwO9wMTarlRbIPYg7T8",
    badge: "CODING",
  },
  {
    id: "6gNhmlDQDstKSYy7bNPVA3",
    badge: "NIGHT",
  },
];

interface PlaylistData {
  id: string;
  name: string;
  coverImage: string | null;
  trackCount: number;
  playlistUrl: string;
  badge: string;
}

/* ─────────────────────────────────────────
   Spotify Logo SVG for Fallback
───────────────────────────────────────── */
function SpotifyLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1DB954" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Playlist Card Component
───────────────────────────────────────── */
function PlaylistCard({ data, index }: { data: PlaylistData; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-3 p-3 rounded-xl bg-[#141830] border border-[#1a2040] overflow-hidden group cursor-pointer transition-colors duration-300 h-[80px]"
      style={{
        borderColor: hovered ? "#1DB954" : "#1a2040",
      }}
      onClick={() => window.open(data.playlistUrl, "_blank")}
    >
      {/* Glow Effect on Hover */}
      <div
        className="absolute inset-0 bg-[#1DB954]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      {/* Cover Image */}
      <div className="w-14 h-14 flex-shrink-0 rounded shadow-md overflow-hidden bg-[#10152a] flex items-center justify-center border border-[#1a2040] group-hover:border-[#1DB954]/50 transition-colors duration-300 relative z-10">
        {data.coverImage ? (
          <Image src={data.coverImage} alt={data.name} fill className="object-cover" sizes="56px" />
        ) : (
          <SpotifyLogo size={20} />
        )}
        {/* Overlay play icon on hover */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DB954"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 z-10">
        <h4 className="text-[0.85rem] font-medium text-[#e0e0f0] truncate" style={{ fontFamily: "'Courier New', monospace" }}>
          {data.name}
        </h4>
        <p className="text-[0.65rem] text-[#8a94b5] font-mono mt-1">
          {data.trackCount} tracks
        </p>
      </div>

      {/* Subtle indicator arrow/icon */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mr-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Skeleton Card Component
───────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="relative flex items-center gap-3 p-3 rounded-xl bg-[#141830]/50 border border-[#1a2040] h-[80px]">
      <div className="w-14 h-14 bg-[#10152a] rounded animate-pulse flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="w-3/4 h-3 bg-[#10152a] rounded animate-pulse mb-2" />
        <div className="w-1/2 h-2.5 bg-[#10152a] rounded animate-pulse" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function PlaylistCarousel() {
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(PLAYLISTS.length / itemsPerPage);

  useEffect(() => {
    let cancelled = false;

    const fetchPlaylists = async () => {
      setLoading(true);
      const results: PlaylistData[] = [];

      for (const item of PLAYLISTS) {
        try {
          const res = await fetch(`/api/spotify/playlist/${item.id}`);
          if (res.ok) {
            const data = await res.json();
            results.push({
              ...data,
              badge: item.badge,
            });
          }
        } catch (e) {
          console.error(`Failed to fetch playlist ${item.id}`, e);
        }
      }

      if (!cancelled) {
        setPlaylists(results);
        setLoading(false);
      }
    };

    fetchPlaylists();

    return () => { cancelled = true; };
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Calculate current items
  const startIndex = currentPage * itemsPerPage;
  const currentItems = playlists.slice(startIndex, startIndex + itemsPerPage);

  // Framer motion variants for carousel sliding
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    nextPage();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevPage();
  };

  return (
    <div className="w-full flex flex-col h-full rounded-xl p-4 bg-[#10152a] border border-[#1a2040]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold tracking-[0.15em] text-[#1DB954]" style={{ fontFamily: "'Courier New', monospace" }}>
          // MY_PLAYLISTS
        </h3>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-7 h-7 rounded-full border border-[#1a2040] flex items-center justify-center text-[#e0e0f0] hover:border-[#1DB954] hover:text-[#1DB954] transition-all disabled:opacity-30 disabled:hover:border-[#1a2040]"
            disabled={loading || totalPages <= 1}
          >
            &larr;
          </button>
          <button
            onClick={handleNext}
            className="w-7 h-7 rounded-full border border-[#1a2040] flex items-center justify-center text-[#e0e0f0] hover:border-[#1DB954] hover:text-[#1DB954] transition-all disabled:opacity-30 disabled:hover:border-[#1a2040]"
            disabled={loading || totalPages <= 1}
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Grid Area */}
      <div className="flex-1 relative overflow-hidden min-h-[220px]">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 h-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}
              className="grid grid-cols-2 gap-3 absolute inset-0"
            >
              {currentItems.map((playlist, idx) => (
                <PlaylistCard key={playlist.id} data={playlist} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Dot Indicators */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentPage ? 1 : -1);
                setCurrentPage(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? "bg-[#1DB954] w-3" : "bg-[#1a2040] hover:bg-[#8a94b5]"
                }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
