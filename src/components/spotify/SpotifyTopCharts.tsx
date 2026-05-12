"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type TimeRange = "short_term" | "medium_term" | "long_term";
type ActiveTab = "tracks" | "artists";
type FetchStatus = "idle" | "loading" | "ok" | "error";

interface TopTrack {
  id: string;
  name: string;
  artist: string;
  albumArt: string | null;
  songUrl: string;
  rank: number;
}

interface TopArtist {
  id: string;
  name: string;
  genres: string[];
  image: string | null;
  artistUrl: string;
  rank: number;
}

/* ─────────────────────────────────────────
   Spotify Logo SVG
───────────────────────────────────────── */
function SpotifyLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1DB954" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Play Icon
───────────────────────────────────────── */
function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Rank Number Badge
───────────────────────────────────────── */
function RankBadge({ rank }: { rank: number }) {
  const isFirst = rank === 1;

  if (isFirst) {
    return (
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{ width: 36, minWidth: 36 }}
      >
        <span
          className="font-bold leading-none"
          style={{
            fontFamily: "var(--font-heading), sans-serif",
            fontSize: "1.5rem",
            color: "#1DB954",
            textShadow: "0 0 12px rgba(29,185,84,0.6), 0 0 30px rgba(29,185,84,0.25)",
          }}
        >
          1
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex-shrink-0 flex items-center justify-center"
      style={{ width: 36, minWidth: 36 }}
    >
      <span
        className="font-mono font-medium"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8rem",
          color: "var(--color-text-secondary)",
        }}
      >
        {String(rank).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Track Item Row
───────────────────────────────────────── */
function TrackItem({ track, index }: { track: TopTrack; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isFirst = track.rank === 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.055, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300"
      style={{
        background: hovered
          ? "rgba(29,185,84,0.05)"
          : isFirst
            ? "rgba(29,185,84,0.03)"
            : "transparent",
        borderTop: isFirst ? "1px solid rgba(29,185,84,0.12)" : "1px solid transparent",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Rank */}
      <RankBadge rank={track.rank} />

      {/* Album Art */}
      <div
        className="relative flex-shrink-0 rounded-lg overflow-hidden"
        style={{
          width: isFirst ? 52 : 44,
          height: isFirst ? 52 : 44,
          transition: "width 0.3s, height 0.3s",
          border: isFirst
            ? "1px solid rgba(29,185,84,0.3)"
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow: isFirst ? "0 0 10px rgba(29,185,84,0.15)" : "none",
        }}
      >
        {track.albumArt ? (
          <Image
            src={track.albumArt}
            alt={track.name}
            fill
            className="object-cover"
            sizes="52px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(29,185,84,0.1)" }}
          >
            <SpotifyLogo size={20} />
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p
          className="truncate font-semibold leading-tight mb-0.5"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: isFirst ? "0.9rem" : "0.8rem",
            color: isFirst ? "#e8e8ff" : "var(--color-text-primary)",
          }}
          title={track.name}
        >
          {track.name}
        </p>
        <p
          className="truncate"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: isFirst ? "rgba(29,185,84,0.8)" : "var(--color-text-secondary)",
          }}
          title={track.artist}
        >
          {track.artist}
        </p>
      </div>

      {/* Play Button (hover) */}
      <AnimatePresence>
        {hovered && (
          <motion.a
            key="play-btn"
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: 30,
              height: 30,
              background: "#1DB954",
              color: "#000",
              boxShadow: "0 0 14px rgba(29,185,84,0.5)",
            }}
            aria-label={`Play ${track.name} on Spotify`}
            onClick={(e) => e.stopPropagation()}
          >
            <PlayIcon />
          </motion.a>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Artist Item Row
───────────────────────────────────────── */
function ArtistItem({ artist, index }: { artist: TopArtist; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isFirst = artist.rank === 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.055, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300"
      style={{
        background: hovered
          ? "rgba(29,185,84,0.05)"
          : isFirst
            ? "rgba(29,185,84,0.03)"
            : "transparent",
        borderTop: isFirst ? "1px solid rgba(29,185,84,0.12)" : "1px solid transparent",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Rank */}
      <RankBadge rank={artist.rank} />

      {/* Artist Photo */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          width: isFirst ? 52 : 44,
          height: isFirst ? 52 : 44,
          borderRadius: "50%",
          transition: "width 0.3s, height 0.3s",
          border: isFirst
            ? "2px solid rgba(29,185,84,0.4)"
            : "2px solid rgba(255,255,255,0.1)",
          boxShadow: isFirst ? "0 0 14px rgba(29,185,84,0.2)" : "none",
        }}
      >
        {artist.image ? (
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover"
            sizes="52px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(29,185,84,0.1)" }}
          >
            <SpotifyLogo size={20} />
          </div>
        )}
      </div>

      {/* Artist Info */}
      <div className="flex-1 min-w-0">
        <p
          className="truncate font-semibold leading-tight mb-1"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: isFirst ? "0.9rem" : "0.8rem",
            color: isFirst ? "#e8e8ff" : "var(--color-text-primary)",
          }}
          title={artist.name}
        >
          {artist.name}
        </p>
        {/* Genre Pills */}
        {artist.genres.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {artist.genres.map((genre) => (
              <span
                key={genre}
                className="capitalize"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.05em",
                  color: "rgba(29,185,84,0.7)",
                  background: "rgba(29,185,84,0.08)",
                  border: "1px solid rgba(29,185,84,0.15)",
                  borderRadius: "4px",
                  padding: "1px 5px",
                }}
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Play Button (hover) */}
      <AnimatePresence>
        {hovered && (
          <motion.a
            key="play-btn"
            href={artist.artistUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: 30,
              height: 30,
              background: "#1DB954",
              color: "#000",
              boxShadow: "0 0 14px rgba(29,185,84,0.5)",
            }}
            aria-label={`Open ${artist.name} on Spotify`}
            onClick={(e) => e.stopPropagation()}
          >
            <PlayIcon />
          </motion.a>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Skeleton Loader Row
───────────────────────────────────────── */
// Fixed widths — avoid Math.random() which causes SSR/client hydration mismatch
const SKELETON_TITLE_WIDTHS = ["72%", "65%", "80%", "58%", "75%", "68%", "82%", "60%", "70%", "77%"];
const SKELETON_SUB_WIDTHS = ["45%", "38%", "52%", "40%", "48%", "35%", "55%", "42%", "50%", "37%"];

function SkeletonRow({ index }: { index: number }) {
  const titleW = SKELETON_TITLE_WIDTHS[index % SKELETON_TITLE_WIDTHS.length];
  const subW = SKELETON_SUB_WIDTHS[index % SKELETON_SUB_WIDTHS.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-3 px-3 py-2.5"
    >
      <div style={{ width: 36, minWidth: 36 }} className="flex items-center justify-center">
        <div
          className="animate-pulse rounded"
          style={{ width: 20, height: 12, background: "rgba(255,255,255,0.06)" }}
        />
      </div>
      <div
        className="animate-pulse flex-shrink-0 rounded-lg"
        style={{ width: 44, height: 44, background: "rgba(255,255,255,0.05)" }}
      />
      <div className="flex-1 space-y-2">
        <div
          className="animate-pulse rounded"
          style={{ height: 10, width: titleW, background: "rgba(255,255,255,0.06)" }}
        />
        <div
          className="animate-pulse rounded"
          style={{ height: 8, width: subW, background: "rgba(255,255,255,0.04)" }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function SpotifyTopCharts() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("tracks");
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [tracks, setTracks] = useState<TopTrack[]>([]);
  const [artists, setArtists] = useState<TopArtist[]>([]);
  const [status, setStatus] = useState<FetchStatus>("loading");

  // Prevent re-render skeleton flicker on initial data already cached
  const hasFetchedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const cacheKey = `${activeTab}-${timeRange}`;

    // If we already fetched this combination, don't show skeleton again
    if (!hasFetchedRef.current[cacheKey]) {
      setStatus("loading");
    }

    const endpoint =
      activeTab === "tracks"
        ? `/api/spotify/top-tracks?range=${timeRange}`
        : `/api/spotify/top-artists?range=${timeRange}`;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (cancelled) return;

        if (activeTab === "tracks") {
          setTracks(data.tracks ?? []);
        } else {
          setArtists(data.artists ?? []);
        }
        hasFetchedRef.current[cacheKey] = true;
        setStatus("ok");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => { cancelled = true; };
  }, [activeTab, timeRange]);

  const timeLabels: Record<TimeRange, string> = {
    short_term: "4 Minggu",
    medium_term: "6 Bulan",
    long_term: "Semua",
  };

  const currentList = activeTab === "tracks" ? tracks : artists;

  return (
    <div className="w-full mx-auto md:mx-0">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SpotifyLogo size={16} />
          <span
            className="section-label"
            style={{ fontSize: "0.65rem", letterSpacing: "0.15em" }}
          >
            {activeTab === "tracks" ? "Top Songs" : "Top Artists"}
          </span>
        </div>
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-40 hover:opacity-80 transition-opacity"
          aria-label="Open Spotify"
        >
          <SpotifyLogo size={14} />
        </a>
      </div>

      {/* Tab Switcher */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        role="tablist"
        aria-label="Select chart type"
      >
        {(["tracks", "artists"] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 relative rounded-lg py-1.5 transition-all duration-300"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: activeTab === tab ? "#1DB954" : "var(--color-text-secondary)",
              background: activeTab === tab ? "rgba(29,185,84,0.1)" : "transparent",
              border: activeTab === tab
                ? "1px solid rgba(29,185,84,0.25)"
                : "1px solid transparent",
              boxShadow: activeTab === tab ? "0 0 10px rgba(29,185,84,0.08)" : "none",
              cursor: "pointer",
            }}
          >
            {tab === "tracks" ? "Top Songs" : "Top Artists"}
          </button>
        ))}
      </div>

      {/* Time Range Picker */}
      <div className="flex gap-1.5 mb-5" role="group" aria-label="Time range">
        {(Object.entries(timeLabels) as [TimeRange, string][]).map(([range, label]) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className="flex-1 py-1 rounded-lg transition-all duration-300"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              color: timeRange === range ? "#1DB954" : "var(--color-text-secondary)",
              background: timeRange === range
                ? "rgba(29,185,84,0.08)"
                : "rgba(255,255,255,0.02)",
              border: timeRange === range
                ? "1px solid rgba(29,185,84,0.2)"
                : "1px solid rgba(255,255,255,0.05)",
              cursor: "pointer",
            }}
            aria-pressed={timeRange === range}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div
        className="w-full mb-3"
        style={{ height: "1px", background: "linear-gradient(to right, rgba(29,185,84,0.3), transparent)" }}
      />

      {/* List Content */}
      <AnimatePresence mode="wait">
        {status === "loading" && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} index={i} />
            ))}
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-10 gap-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <SpotifyLogo size={16} />
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
              }}
            >
              SIGNAL_LOST — Coba lagi nanti
            </span>
          </motion.div>
        )}

        {status === "ok" && currentList.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-10 gap-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.7rem",
              }}
            >
              Belum ada data.
            </span>
          </motion.div>
        )}

        {status === "ok" && currentList.length > 0 && (
          <motion.div
            key={`${activeTab}-${timeRange}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "tracks"
              ? tracks.map((track, i) => (
                <TrackItem key={track.id} track={track} index={i} />
              ))
              : artists.map((artist, i) => (
                <ArtistItem key={artist.id} artist={artist} index={i} />
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
