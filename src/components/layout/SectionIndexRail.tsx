"use client";

/**
 * SectionIndexRail — Gear Selector
 *
 * Dirancang menyerupai selector gigi mobil matic (PRND-style):
 *
 *   ┌─────────────────────────────┐
 *   │  01   ──┤  ← gate notch    │
 *   │         │                  │
 *   │  02   ──┤                  │
 *   │         │                  │
 *   │  03   ──┤◉  ← knob (aktif) │
 *   │         │                  │
 *   │  04   ──┤                  │
 *   │         │                  │
 *   │  05   ──┤                  │
 *   └─────────────────────────────┘
 *
 * Knob bergerak dengan spring physics (type: "spring") —
 * bukan ease curve — supaya ada feel snap mekanikal,
 * bukan smooth CSS transition biasa.
 *
 * Gate notches (horizontal tick di tiap posisi) memberi
 * referensi visual posisi yang valid, seperti detent pada
 * selector fisik.
 */

import { motion } from "framer-motion";

const LABELS = ["01", "02", "03", "04", "05"];

/*
 * SLOT_H: jarak vertikal antara tiap posisi gear (center-to-center).
 * Semua kalkulasi y diturunkan dari nilai ini.
 */
const SLOT_H = 44;          // px — juga sekaligus minimum touch target height
const KNOB_H = 22;          // pill height
const KNOB_W = 8;           // pill width
const TRACK_W = 2;          // lebar track channel
const GATE_W = 10;          // panjang gate notch horizontal (dari track ke kiri)

/* Spring config — stiff & slightly underdamped untuk feel "klik masuk slot" */
const SPRING = { type: "spring" as const, stiffness: 520, damping: 38, mass: 0.6 };

/* Warna yang sync dengan palette globals.css */
const C = {
  trackLine:   "var(--color-warm-border)",        // #D8D7D0
  gate:        "var(--color-warm-border)",
  knob:        "var(--color-warm-text-primary)",  // #1C1C1A
  labelActive: "var(--color-warm-text-primary)",
  labelMuted:  "var(--color-warm-text-muted)",    // #8A8A86
} as const;

interface SectionIndexRailProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export default function SectionIndexRail({
  activeIndex,
  onNavigate,
}: SectionIndexRailProps) {
  /*
   * Total height of the gear column:
   * spans from center of first slot to center of last slot.
   * i.e. (LABELS.length - 1) * SLOT_H
   * Plus SLOT_H/2 above and below for the topmost/bottommost labels.
   * Track starts and ends at the center of each end slot.
   */
  const totalColH = SLOT_H * LABELS.length;
  const trackTop = SLOT_H / 2;
  const trackH = SLOT_H * (LABELS.length - 1);

  return (
    <aside
      aria-label="Section gear selector"
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex items-start select-none"
      style={{ gap: 6 }}
    >
      {/*
       * ── Numbers column ──────────────────────────────────────────
       * Each button occupies exactly SLOT_H pixels vertically
       * so it aligns precisely with the gate notch on the track.
       */}
      <div
        className="flex flex-col"
        style={{ height: totalColH }}
      >
        {LABELS.map((label, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              aria-label={`Section ${label}`}
              aria-current={isActive ? "page" : undefined}
              className="flex items-center justify-end cursor-pointer focus-visible:outline-none rounded-sm"
              style={{
                height: SLOT_H,
                width: 28,
                paddingRight: 4,
              }}
            >
              <motion.span
                animate={{
                  color: isActive ? C.labelActive : C.labelMuted,
                  fontWeight: isActive ? 600 : 400,
                  fontSize: isActive ? "11px" : "10px",
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={SPRING}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                {label}
              </motion.span>
            </button>
          );
        })}
      </div>

      {/*
       * ── Gear track assembly ──────────────────────────────────────
       * Relative container that holds:
       *   1. Gate notches (horizontal ticks at each position)
       *   2. Vertical track line (channel)
       *   3. Sliding knob (the gear selector pill)
       */}
      <div
        className="relative"
        style={{ width: KNOB_W + GATE_W + 4, height: totalColH }}
      >
        {/* Vertical track channel */}
        <div
          className="absolute"
          style={{
            left: GATE_W,
            top: trackTop,
            width: TRACK_W,
            height: trackH,
            background: C.trackLine,
            borderRadius: 1,
          }}
        />

        {/*
         * Gate notches — short horizontal lines extending leftward
         * from the track at each valid gear position.
         * Creates the "detent" affordance of a physical gear selector.
         */}
        {LABELS.map((_, i) => {
          const centerY = i * SLOT_H + SLOT_H / 2;
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                width: isActive ? GATE_W + 3 : GATE_W,
                opacity: isActive ? 1 : 0.55,
              }}
              transition={SPRING}
              style={{
                left: 0,
                top: centerY - 0.5,
                height: 1,
                background: C.gate,
                borderRadius: 0.5,
              }}
            />
          );
        })}

        {/*
         * Selector knob — the pill that snaps between gear positions.
         *
         * Uses spring animation: stiff + slightly underdamped so it
         * "thunks" into each slot with a physical overshoot feel.
         *
         * Position: left edge aligns with gate start (left: 0),
         * extends rightward past the track line.
         * Vertical: centered in the slot (activeIndex * SLOT_H + SLOT_H/2).
         */}
        <motion.div
          animate={{
            y: activeIndex * SLOT_H + SLOT_H / 2 - KNOB_H / 2,
          }}
          transition={SPRING}
          className="absolute"
          style={{
            left: GATE_W + TRACK_W / 2 - KNOB_W / 2,  // center knob on track centerline
            top: 0,              // y is driven by animate.y
            width: KNOB_W,
            height: KNOB_H,
            background: C.knob,
            borderRadius: KNOB_W / 2,
          }}
        />
      </div>
    </aside>
  );
}
