"use client";

import { useRef, forwardRef, useState, useMemo } from "react";
// @ts-ignore
import CardSwapComponent, { Card as CardComponent } from "@/components/CardSwap";
import { Project } from "@/lib/constants";

const CardSwap = CardSwapComponent as any;
const CardBase = CardComponent as React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectCard — forwardRef so CardSwap can inject its GSAP ref into the DOM.

   Layout (image takes 58%, text area 42%):
   ┌─────────────────────────────┐
   │  [repo label top-left]      │
   │  grayscale screenshot       │  58%
   │                             │
   ├── gradient fade ────────────┤
   │  Title             [lang]   │  42%
   │  © 2026   Live ↗   Code →   │
   └─────────────────────────────┘
   ───────────────────────────────────────────────────────────────────────────── */
const ProjectCard = forwardRef<
  HTMLDivElement,
  { project: Project } & React.HTMLAttributes<HTMLDivElement>
>(({ project, style, ...rest }, ref) => {
  const [imgOk, setImgOk] = useState(true);

  return (
    <CardBase
      ref={ref}
      {...rest}
      style={style}
      className="flex flex-col w-full h-full shadow-2xl overflow-hidden select-none"
    >
      {/* ── Image strip: 58% of card height ── */}
      <div className="relative flex-shrink-0" style={{ height: "58%" }}>
        {imgOk && project.image ? (
          <img
            src={project.image}
            alt=""
            onError={() => setImgOk(false)}
            className="w-full h-full object-cover object-top grayscale brightness-75"
            draggable={false}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "repeating-linear-gradient(135deg, #232320 0px, #232320 1px, #1C1C1A 1px, #1C1C1A 12px)",
            }}
          />
        )}
        {/* Gradient fade into dark text area */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[#1C1C1A]" />

        {/* ── Repo label — top-left, always visible on all stacked cards ── */}
        <div
          className="absolute top-3 left-3"
          style={{ zIndex: 2 }}
        >
          <span
            style={{
              background: "rgba(28,28,26,0.65)",
              backdropFilter: "blur(2px)",
              borderRadius: "4px",
              padding: "3px 8px",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(212,211,206,0.85)",
              display: "inline-block",
              lineHeight: 1.4,
            }}
          >
            {project.title}
          </span>
        </div>
      </div>

      {/* ── Text area: 42% solid dark ── */}
      <div className="flex flex-col justify-between flex-1 bg-[#1C1C1A] px-7 pb-5 pt-2">
        {/* Title + language badge */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-sans text-base font-semibold tracking-tight text-[#F4F3EF] leading-snug">
              {project.title}
            </h3>
            {project.languages?.[0] && (
              <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#D8D7D0]/20 rounded-full text-[#D8D7D0]/70 shrink-0 mt-0.5">
                {project.languages[0]}
              </span>
            )}
          </div>
          <p className="font-sans text-[11px] text-[#D8D7D0]/70 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Footer: copyright & links */}
        <div className="flex justify-between items-center pt-3 border-t border-[#F4F3EF]/10">
          <span className="font-mono text-[9px] text-[#D8D7D0]/30">
            Khanif Naufal &copy; 2026
          </span>
          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-wider text-[#F4F3EF] hover:underline cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-wider text-[#F4F3EF]/60 hover:text-[#F4F3EF] hover:underline cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                Code &rarr;
              </a>
            )}
          </div>
        </div>
      </div>
    </CardBase>
  );
});
ProjectCard.displayName = "ProjectCard";



/* ─────────────────────────────────────────────────────────────────────────────
   ProjectsSection
   ───────────────────────────────────────────────────────────────────────────── */
export default function ProjectsSection({ initialProjects }: { initialProjects: Project[] }) {
  const projects = initialProjects;

  // Derive unique languages from all projects (preserve insertion order)
  const languages = useMemo(() => {
    const seen = new Set<string>();
    projects.forEach((p) => {
      (p.languages ?? []).forEach((lang) => {
        if (lang) seen.add(lang);
      });
    });
    return Array.from(seen);
  }, [projects]);

  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.languages?.includes(activeFilter)),
    [projects, activeFilter]
  );

  const cardSwapRef = useRef<{ swap: () => void } | null>(null);

  return (
    <div className="absolute inset-0 flex flex-col justify-center pb-28 px-8 md:px-16 lg:px-24">
      {/* Header — left-aligned like other sections */}
      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-warm-text-muted mb-2">
          Work
        </p>
        <h2 className="font-sans text-3xl font-semibold text-warm-text-primary tracking-tight">
          Selected Projects
        </h2>
      </div>

      {/* Filter (left) + Card stack (right) — truly side-by-side, filter flush left */}
      <div className="flex items-center min-h-[380px]">
        {/* Left panel: filter + next button — flush left */}
        <div className="flex-shrink-0 self-center flex flex-col gap-0 pr-6">
          {/* Filter label */}
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-warm-text-muted mb-2">
            Filter
          </p>

          {/* Language pills */}
          <div className="flex flex-col gap-1.5">
            {["All", ...languages].map((lang) => {
              const isActive = lang === activeFilter;
              return (
                <button
                  key={lang}
                  onClick={() => setActiveFilter(lang)}
                  className={`
                    text-left font-mono text-[10px] uppercase tracking-widest
                    px-3 py-1.5 rounded-sm transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-warm-text-primary text-warm-bg"
                        : "text-warm-text-muted hover:text-warm-text-secondary"
                    }
                  `}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className="border-t border-warm-border my-4 w-full" />

          {/* Next project button — part of left control panel */}
          <button
            onClick={() => cardSwapRef.current?.swap()}
            className="text-left font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 text-warm-text-muted hover:text-warm-text-primary transition-colors duration-200 cursor-pointer group"
          >
            <span className="inline-flex items-center gap-2">
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              Next
            </span>
          </button>
        </div>

        {/* Card stack — takes remaining space, centered within it */}
        <div className="flex flex-col items-center justify-center flex-1 min-h-[380px]">
          {filtered.length === 0 ? (
            <span className="font-mono text-xs text-warm-text-muted uppercase tracking-wider">
              No projects found.
            </span>
          ) : (
            <CardSwap
              key={activeFilter}
              ref={cardSwapRef}
              width={500}
              height={320}
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={true}
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </CardSwap>
          )}
        </div>
      </div>
    </div>
  );
}
