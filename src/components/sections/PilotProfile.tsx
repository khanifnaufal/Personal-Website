"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PILOT_PROFILE, SKILLS, type SkillCategory } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowIcon from "@/components/ui/GlowIcon";
import SpotifySection from "@/components/spotify/SpotifySection";

const categories: SkillCategory[] = ["Frontend", "Backend", "Tools & Database"];

const categoryColors: Record<SkillCategory, string> = {
  Frontend: "rgba(0, 240, 255, 0.3)",
  Backend: "rgba(123, 47, 255, 0.3)",
  "Tools & Database": "rgba(255, 0, 229, 0.3)",
};

export default function PilotProfile() {
  return (
    <SectionWrapper id="pilot-profile" label="PILOT_PROFILE">
      <div className="text-center mb-16">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          <span className="text-text-muted">[</span>{" "}
          <span className="galaxy-text">Pilot Profile</span>{" "}
          <span className="text-text-muted">]</span>
        </h2>
        <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-cyan to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Profile Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Photo Column */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full mb-6 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan via-purple to-magenta p-[2px] transition-transform duration-500 group-hover:scale-105">
                  <div className="w-full h-full rounded-full bg-space-black flex items-center justify-center overflow-hidden relative">
                    {/* Base Image */}
                    <Image
                      src={PILOT_PROFILE.photo}
                      alt={PILOT_PROFILE.name}
                      fill
                      className="object-cover object-[center_20%] filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-700"
                      priority
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-4xl font-bold galaxy-text" style="font-family: var(--font-heading)">MKN</span>`;
                        }
                      }}
                    />

                    {/* Glitch Layer 1 (Red Shift) */}
                    <div className="absolute inset-0 pointer-events-none glitch-layer-1 mix-blend-screen opacity-0">
                      <Image src={PILOT_PROFILE.photo} alt="" fill className="object-cover object-[center_20%] filter hue-rotate-90 contrast-200 brightness-110" priority />
                    </div>

                    {/* Glitch Layer 2 (Cyan Shift) */}
                    <div className="absolute inset-0 pointer-events-none glitch-layer-2 mix-blend-screen opacity-0">
                      <Image src={PILOT_PROFILE.photo} alt="" fill className="object-cover object-[center_20%] filter -hue-rotate-90 contrast-200 brightness-110" priority />
                    </div>
                    <div className="absolute inset-0 bg-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                  </div>
                </div>
                {/* Orbiting element */}
                <div
                  className="absolute w-3 h-3 rounded-full bg-cyan glow-cyan"
                  style={{
                    top: "10%",
                    right: "5%",
                    animation: "float 4s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light border border-green-500/30 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
                <span
                  className="text-[10px] tracking-[0.2em] uppercase text-green-400 font-medium"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {PILOT_PROFILE.status}
                </span>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href={PILOT_PROFILE.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass-card hover:bg-cyan/10 border border-cyan/20 transition-all duration-300 group"
                  title="GitHub Profile"
                >
                  <svg className="w-5 h-5 text-text-muted group-hover:text-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
                <a
                  href={PILOT_PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass-card hover:bg-purple/10 border border-purple/20 transition-all duration-300 group"
                  title="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 text-text-muted group-hover:text-purple transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>

              {/* Removed NowPlaying from here */}
            </div>

            {/* Info Column */}
            <div className="flex-1 w-full">
              <h3
                className="text-3xl md:text-4xl font-bold mb-6 galaxy-text text-center md:text-left"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {PILOT_PROFILE.name}
              </h3>

              <div className="space-y-4 mb-8">
                {/* Info Items */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pb-4 border-b border-white/5 group/item">
                  <div className="w-32 flex items-center gap-2 text-cyan-dim text-xs tracking-widest uppercase font-mono group-hover/item:text-cyan transition-colors">
                    <svg className="w-4 h-4 text-cyan/70 group-hover/item:text-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v7" />
                    </svg>
                    Education
                  </div>
                  <div className="text-text-primary text-sm sm:text-base">{PILOT_PROFILE.education}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pb-4 border-b border-white/5 group/item">
                  <div className="w-32 flex items-center gap-2 text-cyan-dim text-xs tracking-widest uppercase font-mono group-hover/item:text-cyan transition-colors">
                    <svg className="w-4 h-4 text-cyan/70 group-hover/item:text-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </div>
                  <div className="text-text-primary text-sm sm:text-base">{PILOT_PROFILE.location}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pb-4 border-b border-white/5 group/item">
                  <div className="w-32 flex items-center gap-2 text-cyan-dim text-xs tracking-widest uppercase font-mono group-hover/item:text-cyan transition-colors">
                    <svg className="w-4 h-4 text-cyan/70 group-hover/item:text-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Comms
                  </div>
                  <div className="text-cyan text-sm sm:text-base hover:text-cyan-dim transition-colors glow-text-cyan/20">
                    <a href={`mailto:${PILOT_PROFILE.email}`}>{PILOT_PROFILE.email}</a>
                  </div>
                </div>
              </div>

              {/* Motto */}
              <div className="relative pl-6 py-2 border-l-2 border-purple/30 mb-8">
                <svg className="absolute -top-2 -left-2 w-4 h-4 text-purple/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-text-secondary italic text-lg leading-relaxed font-light">
                  {PILOT_PROFILE.motto}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Unified Auditory Terminal Section ── */}
        <SpotifySection />

        {/* Telemetry Data (Highlight Metrics) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { label: "Repositories", value: "31+", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
            { label: "Years Coding", value: "4+", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { label: "Certifications", value: "3", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
            { label: "GPA", value: "3.90", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }
          ].map((stat, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col items-center justify-center text-center rounded-2xl group hover:border-cyan/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg className="w-6 h-6 text-cyan/50 mb-3 group-hover:text-cyan group-hover:scale-110 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
              </svg>
              <span className="text-3xl font-bold galaxy-text mb-1" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</span>
              <span className="text-[10px] tracking-widest uppercase text-text-secondary font-mono">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* System Specs (Skills Marquee) */}
        <div className="mt-10">
          <div className="text-center mb-12">
            <h3
              className="text-2xl font-bold mb-2 text-text-primary"
              style={{ fontFamily: "var(--font-heading), sans-serif" }}
            >
              System Specifications
            </h3>
            <p className="text-text-muted text-sm" style={{ fontFamily: "var(--font-mono), monospace" }}>
              {"// TECHNOLOGIES & ARSENAL"}
            </p>
          </div>

          <div className="space-y-10">
            {categories.map((category, catIndex) => {
              const skills = SKILLS.filter((s) => s.category === category);
              // Quadruple for seamless infinite loop (track must be wider than viewport)
              const repeated = [...skills, ...skills, ...skills, ...skills];
              const isReverse = catIndex % 2 === 1;

              return (
                <div key={category}>
                  {/* Category label */}
                  <div className="flex items-center gap-3 mb-5 px-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: categoryColors[category].replace("0.3", "0.8"),
                        boxShadow: `0 0 8px ${categoryColors[category]}`,
                      }}
                    />
                    <h4
                      className="text-xs tracking-[0.2em] uppercase text-text-secondary"
                      style={{ fontFamily: "var(--font-mono), monospace" }}
                    >
                      {category}
                    </h4>
                    <div className="flex-1 h-[1px] bg-border" />
                  </div>

                  {/* Marquee container */}
                  <div className="overflow-hidden relative">
                    {/* Left/right fade masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-space-black to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-space-black to-transparent pointer-events-none" />

                    <div className={`marquee-track ${isReverse ? "marquee-reverse" : ""}`}>
                      {repeated.map((skill, i) => (
                        <div
                          key={`${skill.name}-${i}`}
                          className="glass-card rounded-xl p-4 flex flex-col items-center gap-3 group cursor-default min-w-[110px] hud-bracket"
                        >
                          <GlowIcon
                            src={skill.icon}
                            alt={skill.name}
                            size={36}
                            glowColor={categoryColors[category]}
                          />
                          <span
                            className="text-xs text-text-secondary group-hover:text-text-primary transition-colors text-center whitespace-nowrap"
                            style={{ fontFamily: "var(--font-mono), monospace" }}
                          >
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
