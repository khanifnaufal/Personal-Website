"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HudNavigation from "@/components/ui/HudNavigation";
import BaseStation from "@/components/sections/BaseStation";
import SectionDivider from "@/components/ui/SectionDivider";
import PilotProfile from "@/components/sections/PilotProfile";
import FlightHistory from "@/components/sections/FlightHistory";
import MissionLogs from "@/components/sections/MissionLogs";
import SignalTransmission from "@/components/sections/SignalTransmission";
import InitialLoader from "@/components/ui/InitialLoader";

interface HomeClientProps {
  githubProjects: any;
}

export default function HomeClient({ githubProjects }: HomeClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has already visited in this session
    const visited = sessionStorage.getItem("visited_portfolio");
    if (visited) {
      setIsLoading(false);
      // Remove loading class from HTML root if returning visit
      document.documentElement.classList.remove("loading-state");
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("visited_portfolio", "true");
    setIsLoading(false);
    // Remove loading class from HTML root to reveal layout scrollbar/etc
    document.documentElement.classList.remove("loading-state");
  };

  // Prevent layout shift/flashes during SSR hydration
  if (!isMounted) {
    return (
      <div 
        id="main-content" 
        className="relative z-10 opacity-0"
        style={{ contentVisibility: "auto" }}
      >
        {/* Render simple placeholders during SSR to maintain HTML structure for SEO */}
        <HudNavigation />
        <BaseStation />
        <SectionDivider />
        <PilotProfile />
        <SectionDivider variant="purple" />
        <FlightHistory />
        <SectionDivider variant="magenta" />
        <MissionLogs projects={githubProjects} />
        <SectionDivider />
        <SignalTransmission />
      </div>
    );
  }

  return (
    <>
      {/* Initial 0-100% Loader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <InitialLoader onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Main Landing Page Reveal Wrapper */}
      <div 
        id="main-content" 
        className={`relative z-10 transition-opacity duration-1000 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Mount main contents only when loading finishes to trigger entrance animations cleanly */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* HUD Floating Nav */}
            <HudNavigation />

            {/* Content Sections */}
            <BaseStation />

            <SectionDivider />
            <PilotProfile />

            <SectionDivider variant="purple" />
            <FlightHistory />

            <SectionDivider variant="magenta" />
            <MissionLogs projects={githubProjects} />

            <SectionDivider />
            <SignalTransmission />

            {/* Footer */}
            <footer className="relative py-8 px-6 border-t border-border mt-12 bg-space-black/40 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p
                  className="text-text-secondary text-xs tracking-[0.15em] uppercase"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  © {new Date().getFullYear()} Muhammad Khanif Naufal
                </p>
                <div 
                  className="flex items-center gap-2 text-text-secondary text-xs" 
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>All Systems Operational</span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </div>
    </>
  );
}
