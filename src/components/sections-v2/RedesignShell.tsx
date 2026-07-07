"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/sections-v2/HeroSection";
import ProfileSection from "@/components/sections-v2/ProfileSection";
import HistorySection from "@/components/sections-v2/HistorySection";
import ProjectsSection from "@/components/sections-v2/ProjectsSection";
import ContactSection from "@/components/sections-v2/ContactSection";
import DockNav from "@/components/sections-v2/DockNav";
import SectionIndexRail from "@/components/sections-v2/SectionIndexRail";
import { Project } from "@/lib/constants";

const SECTION_IDS = ["hero", "profile", "history", "projects", "contact"] as const;

const STATIC_SECTIONS = [
  { id: "hero",     component: HeroSection     },
  { id: "profile",  component: ProfileSection  },
  { id: "history",  component: HistorySection  },
  { id: "contact",  component: ContactSection  },
] as const;

const FADE_VARIANTS = {
  enter:   { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, transition: { duration: 0.26, ease: [0.4, 0, 1, 1] } },
} as const;

const THROTTLE_MS = 800;

interface Props {
  /** Pre-fetched on the server — no client-side GitHub API call needed. */
  projects: Project[];
}

export default function RedesignShell({ projects }: Props) {
  const [activeSection, setActiveSection] = useState(0);
  const lastSwitchRef = useRef<number>(0);

  const navigateTo = useCallback((index: number) => {
    setActiveSection(Math.max(0, Math.min(SECTION_IDS.length - 1, index)));
  }, []);

  const navigateRelative = useCallback((delta: 1 | -1) => {
    const now = Date.now();
    if (now - lastSwitchRef.current < THROTTLE_MS) return;
    lastSwitchRef.current = now;
    setActiveSection((prev) =>
      Math.max(0, Math.min(SECTION_IDS.length - 1, prev + delta))
    );
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;
      e.preventDefault();
      navigateRelative(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [navigateRelative]);

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

  const activeSectionId = SECTION_IDS[activeSection];

  function renderSection() {
    if (activeSectionId === "projects") {
      return <ProjectsSection initialProjects={projects} />;
    }
    const found = STATIC_SECTIONS.find((s) => s.id === activeSectionId);
    if (!found) return null;
    const Comp = found.component;
    return <Comp />;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-warm-bg">
      <AnimatePresence mode="sync">
        <motion.div
          key={activeSectionId}
          className="absolute inset-0"
          variants={FADE_VARIANTS}
          initial="enter"
          animate="visible"
          exit="exit"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      <DockNav activeIndex={activeSection} onNavigate={navigateTo} />
      <SectionIndexRail activeIndex={activeSection} onNavigate={navigateTo} />
    </div>
  );
}
