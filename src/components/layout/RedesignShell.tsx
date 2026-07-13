"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import ProfileSection from "@/components/sections/ProfileSection";
import HistorySection from "@/components/sections/HistorySection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import DockNav from "@/components/layout/DockNav";
import SectionIndexRail from "@/components/layout/SectionIndexRail";
import { Project } from "@/lib/constants";

const SECTION_IDS = ["hero", "profile", "history", "projects", "contact"] as const;

const STATIC_SECTIONS = [
  { id: "profile",  component: ProfileSection  },
  { id: "history",  component: HistorySection  },
  { id: "contact",  component: ContactSection  },
] as const;

const FADE_VARIANTS = {
  enter:   { opacity: 0, filter: 'blur(8px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, filter: 'blur(8px)', transition: { duration: 0.26, ease: [0.4, 0, 1, 1] } },
} as const;

const THROTTLE_MS = 800;

interface Props {
  /** Pre-fetched on the server — no client-side GitHub API call needed. */
  projects: Project[];
}

export default function RedesignShell({ projects }: Props) {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lastSwitchRef = useRef<number>(0);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const navigateTo = useCallback((index: number) => {
    setActiveSection(Math.max(0, Math.min(SECTION_IDS.length - 1, index)));
    if (isMobile) {
      const id = SECTION_IDS[index];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isMobile]);

  const navigateRelative = useCallback((delta: 1 | -1) => {
    const now = Date.now();
    if (now - lastSwitchRef.current < THROTTLE_MS) return;
    lastSwitchRef.current = now;
    setActiveSection((prev) =>
      Math.max(0, Math.min(SECTION_IDS.length - 1, prev + delta))
    );
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;
      e.preventDefault();
      navigateRelative(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [navigateRelative, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const index = SECTION_IDS.indexOf(sectionId as any);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
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
  }, [navigateRelative, isMobile]);

  const activeSectionId = SECTION_IDS[activeSection];

  function renderSection(id: string) {
    if (id === "hero") {
      return <HeroSection key="hero" onNavigate={navigateTo} isMobile={isMobile} />;
    }
    if (id === "projects") {
      return <ProjectsSection key="projects" initialProjects={projects} isMobile={isMobile} />;
    }
    const found = STATIC_SECTIONS.find((s) => s.id === id);
    if (!found) return null;
    
    const Comp = found.component;
    return <Comp key={id} isMobile={isMobile} />;
  }

  return (
    <div className={`relative bg-warm-bg w-full ${isMobile ? "overflow-x-hidden" : "h-screen overflow-hidden"}`}>
      {isMobile ? (
        <div className="flex flex-col pb-24">
          {SECTION_IDS.map((id) => (
            <div key={id} id={id} className="min-h-[100dvh] w-full">
              {renderSection(id)}
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSectionId}
            className="absolute inset-0"
            variants={FADE_VARIANTS}
            initial="enter"
            animate="visible"
            exit="exit"
          >
            {renderSection(activeSectionId)}
          </motion.div>
        </AnimatePresence>
      )}
 
      <DockNav activeIndex={activeSection} onNavigate={navigateTo} isMobile={isMobile} />
      {!isMobile && <SectionIndexRail activeIndex={activeSection} onNavigate={navigateTo} />}
    </div>
  );
}
