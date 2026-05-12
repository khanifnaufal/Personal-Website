"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface SpotifyTrack {
  isPlaying: boolean;
  title: string | null;
  artist: string;
  album: string;
  albumArt: string | null;
  songUrl: string;
  progress: number;
  duration: number;
}

type FetchState = "loading" | "ok" | "error" | "empty";

/* ─────────────────────────────────────────
   Equalizer Bars (only shown when playing)
───────────────────────────────────────── */
function EqualizerBars() {
  return (
    <div
      className="flex items-end gap-[3px]"
      style={{ height: "16px" }}
      aria-label="Now playing"
    >
      <span
        className="eq-bar-1 block w-[3px] rounded-full"
        style={{ backgroundColor: "#1DB954", minHeight: "4px" }}
      />
      <span
        className="eq-bar-2 block w-[3px] rounded-full"
        style={{ backgroundColor: "#1DB954", minHeight: "4px" }}
      />
      <span
        className="eq-bar-3 block w-[3px] rounded-full"
        style={{ backgroundColor: "#1DB954", minHeight: "4px" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Spotify Logo SVG
───────────────────────────────────────── */
function SpotifyLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#1DB954"
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Progress Bar with client-side interpolation
───────────────────────────────────────── */
function ProgressBar({
  progress,
  duration,
  isPlaying,
}: {
  progress: number;
  duration: number;
  isPlaying: boolean;
}) {
  const [localProgress, setLocalProgress] = useState(progress);
  const frameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  useEffect(() => {
    setLocalProgress(progress);
    lastTickRef.current = Date.now();
  }, [progress]);

  useEffect(() => {
    if (!isPlaying) return;

    const tick = () => {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      setLocalProgress((p) => Math.min(p + delta, duration));
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, duration]);

  const pct = duration > 0 ? (localProgress / duration) * 100 : 0;

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <div className="w-full mt-3">
      <div
        className="relative w-full rounded-full overflow-hidden"
        style={{
          height: "3px",
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-none"
          style={{
            width: `${pct}%`,
            background: "#1DB954",
            boxShadow: "0 0 6px rgba(29, 185, 84, 0.5)",
          }}
        />
      </div>
      <div
        className="flex justify-between mt-1"
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: "0.6rem",
          color: "var(--color-text-muted)",
        }}
      >
        <span>{fmt(localProgress)}</span>
        <span>{fmt(duration)}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [state, setState] = useState<FetchState>("loading");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchTrack = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify/now-playing");
      if (!res.ok) throw new Error("API error");
      const data: SpotifyTrack & { error?: string } = await res.json();

      if (data.error) throw new Error(data.error);
      if (!data.title) {
        setState("empty");
        return;
      }

      setTrack(data);
      setState("ok");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    fetchTrack();
    intervalRef.current = setInterval(fetchTrack, 30_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchTrack]);

  /* ── Error state ── */
  if (state === "error") {
    return (
      <div
        className="glass-card rounded-2xl p-4 w-full"
      >
        <div className="flex items-center gap-3 opacity-40">
          <SpotifyLogo size={20} />
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "0.7rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.1em",
            }}
          >
            SIGNAL_LOST
          </span>
        </div>
      </div>
    );
  }

  /* ── Loading skeleton ── */
  if (state === "loading") {
    return (
      <div
        className="glass-card rounded-2xl p-4 w-full"
        style={{ maxWidth: "350px" }}
      >
        <div className="flex gap-3 items-center">
          <div
            className="rounded-lg animate-pulse flex-shrink-0"
            style={{
              width: 56,
              height: 56,
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <div className="flex-1 space-y-2">
            <div
              className="rounded animate-pulse"
              style={{
                height: 10,
                width: "70%",
                background: "rgba(255,255,255,0.05)",
              }}
            />
            <div
              className="rounded animate-pulse"
              style={{
                height: 8,
                width: "50%",
                background: "rgba(255,255,255,0.05)",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ── Empty state ── */
  if (state === "empty" || !track) return null;

  return (
    <div className="w-full mx-auto md:mx-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={track.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Card */}
          <div
            className="glass-card rounded-xl md:rounded-2xl p-3 md:p-4 relative overflow-hidden"
            style={{ border: "1px solid rgba(29, 185, 84, 0.15)" }}
          >
            {/* Ambient album art blur background */}
            {track.albumArt && (
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden pointer-events-none"
                style={{ zIndex: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={track.albumArt}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    filter: "blur(40px) saturate(1.8) brightness(0.2)",
                    transform: "scale(1.2)",
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="relative z-10">
              {/* Header row */}
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <span
                  className="section-label"
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    paddingLeft: "1rem",
                  }}
                >
                  {track.isPlaying ? "AUDIO_FEED" : "LAST_PLAYED"}
                </span>
                <a
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <SpotifyLogo size={14} />
                </a>
              </div>

              {/* Track row */}
              <div className="flex items-center gap-2 md:gap-3">
                {/* Album Art */}
                <div
                  className="relative flex-shrink-0 rounded-lg overflow-hidden"
                  style={{
                    width: 48,
                    height: 48,
                    border: "1px solid rgba(29,185,84,0.2)",
                  }}
                >
                  {track.albumArt ? (
                    <Image
                      src={track.albumArt}
                      alt={track.album}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <SpotifyLogo size={20} />
                    </div>
                  )}
                </div>

                {/* Track info */}
                <div className="flex-1 min-w-0">
                  {/* Title + Equalizer */}
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {track.isPlaying && <EqualizerBars />}
                    <a
                      href={track.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline truncate block"
                      style={{
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: "0.75rem",
                        mdFontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        lineHeight: 1.2,
                      }}
                      title={track.title ?? ""}
                    >
                      {track.title}
                    </a>
                  </div>

                  {/* Artist */}
                  <p
                    className="truncate"
                    style={{
                      fontFamily:
                        "var(--font-jetbrains-mono), monospace",
                      fontSize: "0.65rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.3,
                    }}
                    title={track.artist}
                  >
                    {track.artist}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <ProgressBar
                progress={track.progress}
                duration={track.duration}
                isPlaying={track.isPlaying}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
