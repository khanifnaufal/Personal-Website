"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/sections-v2/HeroSection";
import ProfileSection from "@/components/sections-v2/ProfileSection";
import HistorySection from "@/components/sections-v2/HistorySection";
import ProjectsSection from "@/components/sections-v2/ProjectsSection";
import ContactSection from "@/components/sections-v2/ContactSection";
import DockNav from "@/components/sections-v2/DockNav";

const SECTIONS = [
  { id: "hero",     component: HeroSection     },
  { id: "profile",  component: ProfileSection  },
  { id: "history",  component: HistorySection  },
  { id: "projects", component: ProjectsSection },
  { id: "contact",  component: ContactSection  },
] as const;

/*
 * Cross-dissolve animation variants.
 * Both entering and exiting sections fade simultaneously
 * (cross-dissolve / crossfade pattern) so there is never a visual gap.
 *
 * Easing: easeInOut gives a gentle ramp — not abrupt in either direction.
 * Duration: 420ms — within the 400–500ms sweet spot specified.
 *
 * Per ui-ux-pro-max §7:
 *   - Use opacity only (no transform) to avoid layout reflow.
 *   - exit-faster-than-enter: exit is ~260ms vs 420ms enter.
 */
const FADE_VARIANTS = {
  enter: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.42,
      ease: [0.4, 0, 0.2, 1], // Material Design easeInOut cubic
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.26,          // exit ~60% of enter duration
      ease: [0.4, 0, 1, 1],   // ease-in for exit
    },
  },
} as const;

/*
 * Wheel / keyboard navigation throttle.
 *
 * Problem: a single physical scroll gesture fires many wheel events
 * in rapid succession, which would jump multiple sections.
 *
 * Solution: timestamp-based cooldown. After one section change,
 * ignore all subsequent events for THROTTLE_MS milliseconds.
 * 800ms is generous enough to cover trackpad momentum scrolling
 * without feeling sluggish on a regular scroll wheel.
 *
 * Per ui-ux-pro-max §3: "debounce-throttle — Use debounce/throttle
 * for high-frequency events (scroll, resize, input)."
 */
const THROTTLE_MS = 800;

export default function RedesignPage() {
  const [activeSection, setActiveSection] = useState(0);
  const lastSwitchRef = useRef<number>(0);

  /* ── Throttled navigation helper ─────────────────────────────── */
  const navigateTo = useCallback((index: number) => {
    setActiveSection(Math.max(0, Math.min(SECTIONS.length - 1, index)));
  }, []);

  const navigateRelative = useCallback(
    (delta: 1 | -1) => {
      const now = Date.now();
      if (now - lastSwitchRef.current < THROTTLE_MS) return;
      lastSwitchRef.current = now;
      setActiveSection((prev) =>
        Math.max(0, Math.min(SECTIONS.length - 1, prev + delta))
      );
    },
    []
  );

  /* ── Wheel event listener ─────────────────────────────────────── */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      /*
       * e.deltaY > 0 → scrolling down → next section (+1)
       * e.deltaY < 0 → scrolling up   → previous section (-1)
       *
       * Ignore tiny trackpad gestures that might be horizontal
       * (|deltaX| > |deltaY|) to avoid accidental section switches.
       */
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;

      e.preventDefault();
      navigateRelative(e.deltaY > 0 ? 1 : -1);
    };

    /*
     * passive: false is required so we can call e.preventDefault()
     * and suppress any residual scroll that might reveal a scrollbar.
     */
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [navigateRelative]);

  /* ── Keyboard arrow navigation ────────────────────────────────── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        navigateRelative(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigateRelative(-1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigateRelative]);

  const ActiveSection = SECTIONS[activeSection].component;

  return (
    /*
     * FullpageContainer — h-screen + overflow-hidden ensures
     * zero vertical scrollbar at all times, regardless of section.
     * Each section is absolute inset-0, so they overlap without
     * contributing to document flow height.
     */
    <div className="relative h-screen w-screen overflow-hidden bg-warm-bg">

      {/*
       * AnimatePresence mode="sync":
       * Both the exiting and entering section animate simultaneously —
       * this is the cross-dissolve / crossfade effect.
       *
       * mode="wait" would first fade out, THEN fade in (sequential).
       * mode="sync" (default) lets them overlap — preferred here.
       */}
      <AnimatePresence mode="sync">
        <motion.div
          key={SECTIONS[activeSection].id}
          className="absolute inset-0"
          variants={FADE_VARIANTS}
          initial="enter"
          animate="visible"
          exit="exit"
        >
          <ActiveSection />
        </motion.div>
      </AnimatePresence>

      {/* DockNav — floating pill, bottom-center */}
      <DockNav activeIndex={activeSection} onNavigate={navigateTo} />

    </div>
  );
}
