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
        style={{ width: 28, minWidth: 28 }}
      >
        <span
          className="font-bold leading-none"
          style={{
            fontFamily: "var(--font-heading), var(--font-mono), monospace",
            fontSize: "1rem",
            color: "#1DB954",
            textShadow: "0 0 8px rgba(29,185,84,0.4)",
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
      style={{ width: 28, minWidth: 28 }}
    >
      <span
        className="font-medium"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8rem",
          color: "#8a94b5",
        }}
      >
        {rank}
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
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300"
      style={{
        background: hovered
          ? "rgba(29,185,84,0.05)"
          : isFirst
            ? "rgba(29,185,84,0.02)"
            : "transparent",
        borderBottom: "1px solid rgba(255,255,255,0.02)",
      }}
    >
      {/* Rank */}
      <RankBadge rank={track.rank} />

      {/* Album Art */}
      <div
        className="relative flex-shrink-0 rounded overflow-hidden"
        style={{
          width: 28,
          height: 28,
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {track.albumArt ? (
          <Image
            src={track.albumArt}
            alt={track.name}
            fill
            className="object-cover"
            sizes="28px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(29,185,84,0.1)" }}
          >
            <SpotifyLogo size={14} />
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p
          className="truncate font-semibold leading-tight mb-0.5"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.8rem",
            color: isFirst ? "#e0e0f0" : "#a0a0b0",
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
            color: "#8a94b5",
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
              width: 24,
              height: 24,
              background: "#1DB954",
              color: "#000",
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
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-300"
      style={{
        background: hovered
          ? "rgba(29,185,84,0.05)"
          : isFirst
            ? "rgba(29,185,84,0.02)"
            : "transparent",
        borderBottom: "1px solid rgba(255,255,255,0.02)",
      }}
    >
      {/* Rank */}
      <RankBadge rank={artist.rank} />

      {/* Artist Photo */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {artist.image ? (
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover"
            sizes="28px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(29,185,84,0.1)" }}
          >
            <SpotifyLogo size={14} />
          </div>
        )}
      </div>

      {/* Artist Info */}
      <div className="flex-1 min-w-0">
        <p
          className="truncate font-semibold leading-tight mb-0.5"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.8rem",
            color: isFirst ? "#e0e0f0" : "#a0a0b0",
          }}
          title={artist.name}
        >
          {artist.name}
        </p>
        <p
          className="truncate"
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "#8a94b5",
          }}
          title={artist.genres[0] || "Artist"}
        >
          {artist.genres[0] || "Artist"}
        </p>
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
              width: 24,
              height: 24,
              background: "#1DB954",
              color: "#000",
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
const SKELETON_TITLE_WIDTHS = ["70%", "60%", "80%", "50%", "75%"];
const SKELETON_SUB_WIDTHS = ["40%", "30%", "50%", "35%", "45%"];

function SkeletonRow({ index }: { index: number }) {
  const titleW = SKELETON_TITLE_WIDTHS[index % SKELETON_TITLE_WIDTHS.length];
  const subW = SKELETON_SUB_WIDTHS[index % SKELETON_SUB_WIDTHS.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-3 px-2 py-2"
    >
      <div style={{ width: 28, minWidth: 28 }} className="flex items-center justify-center">
        <div
          className="animate-pulse rounded"
          style={{ width: 16, height: 12, background: "#141830" }}
        />
      </div>
      <div
        className="animate-pulse flex-shrink-0 rounded"
        style={{ width: 28, height: 28, background: "#141830" }}
      />
      <div className="flex-1 space-y-1.5">
        <div
          className="animate-pulse rounded"
          style={{ height: 10, width: titleW, background: "#141830" }}
        />
        <div
          className="animate-pulse rounded"
          style={{ height: 8, width: subW, background: "rgba(20,24,48,0.5)" }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function TopTracksArtists() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("tracks");
  const [timeRange, setTimeRange] = useState<TimeRange>("short_term");
  const [tracks, setTracks] = useState<TopTrack[]>([]);
  const [artists, setArtists] = useState<TopArtist[]>([]);
  const [status, setStatus] = useState<FetchStatus>("loading");

  // Prevent re-render skeleton flicker on initial data already cached
  const hasFetchedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const cacheKey = `${activeTab}-${timeRange}`;

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
          setTracks((data.tracks ?? []).slice(0, 5)); // Enforce 5 items
        } else {
          setArtists((data.artists ?? []).slice(0, 5)); // Enforce 5 items
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
    short_term: "4W",
    medium_term: "6M",
    long_term: "ALL",
  };

  const currentList = activeTab === "tracks" ? tracks : artists;

  return (
    <div className="w-full flex flex-col h-full rounded-xl p-4 bg-[#10152a] border border-[#1a2040]">
      {/* Tab Switcher */}
      <div className="flex gap-2 mb-3">
        {(["tracks", "artists"] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-1.5 rounded-md border border-[#1a2040] transition-colors duration-150"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              color: activeTab === tab ? "#e0e0f0" : "#8a94b5",
              background: activeTab === tab ? "rgba(255,255,255,0.05)" : "transparent",
            }}
          >
            {tab === "tracks" ? "Top Songs" : "Top Artists"}
          </button>
        ))}
      </div>

      {/* Time Range Picker */}
      <div className="flex gap-2 mb-4">
        {(Object.entries(timeLabels) as [TimeRange, string][]).map(([range, label]) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className="flex-1 py-1 rounded-md border border-[#1a2040] transition-colors duration-150"
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.7rem",
              color: timeRange === range ? "#e0e0f0" : "#8a94b5",
              background: timeRange === range ? "rgba(255,255,255,0.02)" : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-1"
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
              className="flex items-center justify-center py-10 gap-2 h-[200px]"
              style={{ color: "#8a94b5", fontFamily: "var(--font-mono), monospace" }}
            >
              <SpotifyLogo size={16} />
              <span style={{ fontSize: "0.75rem" }}>SIGNAL_LOST</span>
            </motion.div>
          )}

          {status === "ok" && currentList.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-10 gap-2 h-[200px]"
              style={{ color: "#8a94b5", fontFamily: "var(--font-mono), monospace" }}
            >
              <span style={{ fontSize: "0.75rem" }}>No data found.</span>
            </motion.div>
          )}

          {status === "ok" && currentList.length > 0 && (
            <motion.div
              key={`${activeTab}-${timeRange}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-1"
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
    </div>
  );
}
