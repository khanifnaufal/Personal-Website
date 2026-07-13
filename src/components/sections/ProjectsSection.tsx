"use client";

import { useRef, forwardRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import CardSwapComponent, { Card as CardComponent } from "@/components/ui/CardSwap";
import { Project } from "@/lib/constants";

const CardSwap = CardSwapComponent as any;
const CardBase = CardComponent as React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectCard — forwardRef so CardSwap can inject its GSAP ref into the DOM.
   ───────────────────────────────────────────────────────────────────────────── */
const ProjectCardContent = ({ project }: { project: Project }) => {
  const [imgOk, setImgOk] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const linkStyle = {
    textDecoration: "none",
    backgroundImage: "linear-gradient(to right, rgba(244,243,239,1) 0%, rgba(244,243,239,1) 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: isHovering ? "100% 1px" : "0% 1px",
    backgroundPosition: "bottom",
    transition: "background-size 0.3s ease",
    paddingBottom: "2px",
  };

  return (
    <div 
      className="relative flex flex-col w-full h-full overflow-hidden select-none bg-[#1C1C1A] border border-white/20 shadow-2xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative flex flex-col w-full h-full">
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
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[#1C1C1A]" />
          <div className="absolute top-3 left-3" style={{ zIndex: 2 }}>
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

        <div className="flex flex-col justify-between flex-1 bg-[#1C1C1A] px-7 pb-5 pt-2">
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
            <p className="font-sans text-[11px] text-[#c7c7c2] leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

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
                  className="font-mono text-[10px] tracking-wider text-[#F4F3EF] cursor-pointer"
                  style={linkStyle}
                >
                  Live ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-wider text-[#F4F3EF]/60 hover:text-[#F4F3EF] cursor-pointer"
                  style={linkStyle}
                >
                  Code &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = forwardRef<
  HTMLDivElement,
  { project: Project } & React.HTMLAttributes<HTMLDivElement>
>(({ project, style, ...rest }, ref) => {
  const [isHovering, setIsHovering] = useState(false);

  const hoverStyle = {
    borderColor: isHovering ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
    boxShadow: isHovering ? "0 25px 50px rgba(0,0,0,0.4)" : "0 15px 30px rgba(0,0,0,0.2)",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    borderWidth: "1px",
    borderStyle: "solid",
  };

  return (
    <CardBase
      ref={ref}
      {...rest}
      style={{ ...style, ...hoverStyle }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="flex flex-col w-full h-full shadow-2xl overflow-hidden select-none"
    >
      <ProjectCardContent project={project} />
    </CardBase>
  );
});
ProjectCard.displayName = "ProjectCard";

/* ─────────────────────────────────────────────────────────────────────────────
   Mobile Project Carousel
   ───────────────────────────────────────────────────────────────────────────── */
function MobileProjectCarousel({ projects, allProjects }: { projects: Project[]; allProjects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const langDist = useMemo(() => {
    const counts: Record<string, number> = {};
    let totalTags = 0;

    allProjects.forEach((p) => {
      (p.languages ?? []).forEach((lang) => {
        if (lang) {
          counts[lang] = (counts[lang] || 0) + 1;
          totalTags++;
        }
      });
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalTags) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4);
  }, [allProjects]);

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 60;
    if (info.offset.x < -swipeThreshold && currentIndex < projects.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full overflow-hidden px-2">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {projects.map((project) => (
            <div key={project.id} className="flex-shrink-0 w-full px-2 py-4">
              <div className="aspect-[4/3] w-full max-w-[320px] mx-auto">
                <ProjectCardContent project={project} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation & Counter */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="text-warm-text-muted hover:text-warm-text-primary disabled:opacity-30 transition-colors"
          >
            <span className="text-lg">←</span>
          </button>
          
          <span className="font-mono text-[10px] tracking-widest text-warm-text-muted uppercase">
            {currentIndex + 1} / {projects.length}
          </span>

          <button 
            onClick={() => setCurrentIndex(prev => Math.min(projects.length - 1, prev + 1))}
            disabled={currentIndex === projects.length - 1}
            className="text-warm-text-muted hover:text-warm-text-primary disabled:opacity-30 transition-colors"
          >
            <span className="text-lg">→</span>
          </button>
        </div>

        <a 
          href="https://github.com/khanifnaufal" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono text-[9px] tracking-wider text-warm-text-muted/60 hover:text-warm-text-muted transition-colors underline underline-offset-4"
        >
          {projects.length} projects on GitHub
        </a>

        {/* Language Distribution Summary */}
        <div className="mt-6 w-full max-w-[260px] space-y-2.5">
          {langDist.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-warm-text-muted w-20 truncate text-left uppercase tracking-tighter">
                {item.name}
              </span>
              <div className="flex-1 h-1 bg-warm-border/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-warm-text-muted/60" 
                />
              </div>
              <span className="font-mono text-[9px] text-warm-text-muted w-8 text-right">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectsSection
   ───────────────────────────────────────────────────────────────────────────── */
export default function ProjectsSection({ initialProjects, isMobile = false }: { initialProjects: Project[]; isMobile?: boolean }) {
  const projects = initialProjects;

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
    <div className={isMobile ? "relative flex flex-col justify-start pt-16 pb-24 px-6" : "absolute inset-0 flex flex-col justify-center pb-28 px-8 md:px-16 lg:px-24"}>
      <div className={cn("mb-8", isMobile && "text-center")}>
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-warm-text-muted mb-2">
          Work
        </p>
        <h2 className="font-sans text-3xl font-semibold text-warm-text-primary tracking-tight">
          Selected Projects
        </h2>
      </div>

       <div className={cn("flex items-center min-h-[380px]", isMobile && "flex-col")}>
         {/* Filter Area */}
         <div className={cn(
           "flex shrink-0",
           isMobile 
             ? "flex-row overflow-x-auto gap-2 pb-6 no-scrollbar w-full justify-start" 
             : "flex-col self-center gap-0 pr-6"
         )}>
           {!isMobile && (
             <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-warm-text-muted mb-2">
               Filter
             </p>
           )}
 
           <div className={cn(
             "flex gap-1.5",
             isMobile ? "flex-row" : "flex-col"
           )}>
             {["All", ...languages].map((lang) => {
               const isActive = lang === activeFilter;
               return (
                 <button
                   key={lang}
                   onClick={() => setActiveFilter(lang)}
                   className={`
                     text-left font-mono text-[10px] uppercase tracking-widest
                     px-3 py-1.5 rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap
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
 
           {!isMobile && <div className="border-t border-warm-border my-4 w-full" />}
 
           {!isMobile && (
             <button
               onClick={() => cardSwapRef.current?.swap()}
               className="font-mono text-[10px] tracking-widest uppercase transition-colors duration-200 cursor-pointer group text-left px-3 py-1.5 text-warm-text-muted hover:text-warm-text-primary"
             >
               <span className="inline-flex items-center gap-2">
                 <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                 Next
               </span>
             </button>
           )}
         </div>
 
         <div className="flex flex-col items-center justify-center flex-1 min-h-[380px] w-full">
           {filtered.length === 0 ? (
             <span className="font-mono text-xs text-warm-text-muted uppercase tracking-wider">
               No projects found.
             </span>
           ) : isMobile ? (
             <MobileProjectCarousel key={activeFilter} projects={filtered} allProjects={projects} />
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
