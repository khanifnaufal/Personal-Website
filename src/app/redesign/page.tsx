"use client";

import { useState } from "react";
import HeroSection from "@/components/sections-v2/HeroSection";
import ProfileSection from "@/components/sections-v2/ProfileSection";
import HistorySection from "@/components/sections-v2/HistorySection";
import ProjectsSection from "@/components/sections-v2/ProjectsSection";
import ContactSection from "@/components/sections-v2/ContactSection";

const SECTIONS = [
  { id: "hero", label: "Hero", component: HeroSection },
  { id: "profile", label: "Profile", component: ProfileSection },
  { id: "history", label: "History", component: HistorySection },
  { id: "projects", label: "Projects", component: ProjectsSection },
  { id: "contact", label: "Contact", component: ContactSection },
];

export default function RedesignPage() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    /*
     * FullpageContainer — h-screen + overflow-hidden ensures
     * zero vertical scrollbar at all times, regardless of section.
     * Each section is absolute inset-0, so they overlap without
     * contributing to document flow height.
     */
    <div className="relative h-screen w-screen overflow-hidden bg-warm-bg">

      {/* Section stack */}
      {SECTIONS.map(({ id, component: Section }, i) => (
        <div
          key={id}
          aria-hidden={i !== activeSection}
          className={[
            "absolute inset-0 transition-opacity duration-0",
            i === activeSection
              ? "opacity-100"
              : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          <Section />
        </div>
      ))}

      {/*
       * Temporary dev nav — bottom-right corner.
       * Not the final dock; just for testing section switching.
       * To be replaced in the next commit with the real dock component.
       */}
      <nav
        aria-label="Section switcher (dev)"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col gap-1.5 items-end"
      >
        {SECTIONS.map(({ id, label }, i) => (
          <button
            key={id}
            onClick={() => setActiveSection(i)}
            aria-current={i === activeSection ? "true" : undefined}
            className={[
              "font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-sm",
              "border transition-colors duration-150 cursor-pointer",
              i === activeSection
                ? "bg-warm-dock-bg text-warm-bg border-warm-dock-bg"
                : "bg-transparent text-warm-text-muted border-warm-border hover:border-warm-text-muted hover:text-warm-text-secondary",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
