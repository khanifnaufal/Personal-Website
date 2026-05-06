"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function MissionLogs({ projects }: { projects?: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Use dynamic projects if available, otherwise fallback to static ones
  const displayProjects = projects && projects.length > 0 ? projects : PROJECTS;

  // Extract unique top languages to use as filter categories
  const filters = useMemo(() => {
    const langs = new Set<string>();
    displayProjects.forEach(p => {
      if (p.languages && p.languages.length > 0) {
        langs.add(p.languages[0]); // Use primary language for filter
      }
    });
    // Add custom broad categories if needed, or just stick to languages.
    // To ensure UI looks good, we'll limit to top 4-5 unique languages
    const uniqueLangs = Array.from(langs).slice(0, 4);
    return ["All", ...uniqueLangs];
  }, [displayProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return displayProjects;
    return displayProjects.filter(p => p.languages && p.languages.includes(activeFilter));
  }, [displayProjects, activeFilter]);

  return (
    <SectionWrapper id="mission-logs" label="MISSION_LOGS">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          <span className="text-text-muted">[</span> <span className="galaxy-text">Mission Logs</span> <span className="text-text-muted">]</span>
        </h2>
        <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-purple to-transparent" />
        <p className="mt-4 text-text-secondary text-sm md:text-base max-w-xl mx-auto mb-8">
          A collection of completed missions and ongoing operations.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-cyan/20 border border-cyan text-cyan glow-text-cyan/50"
                  : "glass-card border border-white/10 text-text-secondary hover:text-text-primary hover:border-cyan/30"
              }`}
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={cardVariants}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl overflow-hidden group relative flex flex-col"
            >
            <div className="relative h-48 overflow-hidden bg-space-black/50">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-purple/10 to-magenta/10 z-0" />
              
              {/* Project Image */}
              {project.image ? (
                <div className="absolute inset-0 z-10">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-space-black/40 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              ) : null}

              {/* Fallback / Overlay Icon */}
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-16 h-16 rounded-full border border-cyan/20 flex items-center justify-center group-hover:border-cyan/40 transition-colors">
                  <svg className="w-8 h-8 text-cyan/50 group-hover:text-cyan/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute top-3 right-3 px-2 py-1 rounded glass-light text-[10px] tracking-[0.15em] text-text-muted z-20" style={{ fontFamily: "var(--font-mono)" }}>{project.id}</div>
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent z-20" />
            </div>

            <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-cyan transition-colors" style={{ fontFamily: "var(--font-heading), sans-serif" }}>{project.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 h-15">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.languages && project.languages.map((lang) => (
                    <span key={lang} className="px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase bg-cyan/10 border border-cyan/30 text-cyan font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                      {lang}
                    </span>
                  ))}
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase glass-light text-cyan-dim" style={{ fontFamily: "var(--font-mono)" }}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-wider uppercase glass-light text-text-primary hover:text-cyan transition-all" style={{ fontFamily: "var(--font-mono)" }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    Live
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-wider uppercase glass-light text-text-primary hover:text-purple transition-all" style={{ fontFamily: "var(--font-mono)" }}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
