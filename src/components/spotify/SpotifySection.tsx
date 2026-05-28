"use client";

import { motion } from "framer-motion";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import TopTracksArtists from "./TopTracksArtists";
import PlaylistCarousel from "./PlaylistCarousel";
import { useIsMobile } from "@/lib/useIsMobile";

export default function SpotifySection() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full mt-12 mb-12">
      <motion.div
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl shadow-spotify/5"
      >
        {/* Terminal Header */}
        <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <h4 className="text-sm font-bold font-mono tracking-widest text-cyan uppercase ml-2">
              // AUDITORY_TERMINAL_V1.0
            </h4>
          </div>
          <p className="text-[10px] font-mono text-text-secondary/40 uppercase tracking-widest">
            Music that fuels the pilot's focus
          </p>
        </div>

        <div className="p-0">
          {/* Top Section: Now Playing Headline (Full Width) */}
          <div className="p-6 border-b border-white/5 bg-white/[0.01]">
            <div className="w-full">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex gap-1.5 items-end h-4">
                  {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8, 0.4, 0.6].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["20%", "100%", "20%"] }}
                      transition={{ repeat: Infinity, duration: 0.8 + i * 0.15, ease: "easeInOut" }}
                      className="w-1 bg-cyan/50 rounded-full"
                      style={{ height: `${h * 100}%` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-cyan tracking-[0.4em] uppercase font-bold">
                  Currently_Broadcasting
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan/20 to-transparent" />
              </div>
              <SpotifyNowPlaying />
            </div>
          </div>

          {/* Bottom Section: 2 Columns */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: Top Songs & Artists */}
              <div className="flex flex-col">
                <TopTracksArtists />
              </div>

              {/* Right Column: Playlist Showcase */}
              <div className="flex flex-col">
                <PlaylistCarousel />
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Footer Decor */}
        <div className="px-6 py-2 bg-spotify/5 border-t border-white/5 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="text-[8px] font-mono text-spotify/40 uppercase tracking-tighter">Bitrate: 320kbps</div>
            <div className="text-[8px] font-mono text-spotify/40 uppercase tracking-tighter">Source: Spotify_API</div>
          </div>
          <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: [-100, 100] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="w-1/2 h-full bg-spotify/20"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
