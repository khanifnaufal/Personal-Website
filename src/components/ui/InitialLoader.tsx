"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LOGS = [
  { min: 0, text: "SECURE UPLINK ESTABLISHED. PORT: 8080..." },
  { min: 12, text: "INITIALIZING WEBPACK CONTEXT & ASSETS..." },
  { min: 25, text: "LOADING HOLOGRAPHIC STARFIELD & NEBULA MATRICES..." },
  { min: 45, text: "CALIBRATING THREE.JS WEBGL RENDER SYSTEM..." },
  { min: 62, text: "RETRIEVING GITHUB MISSION RECORDS & PROJECT STATS..." },
  { min: 80, text: "SYNCHRONIZING HEAD-UP HUD NAVIGATION GRIDS..." },
  { min: 92, text: "STABILIZING PHOTONIC REACTOR DRIVE CORE... TEMPERATURE: NOMINAL" },
  { min: 100, text: "SYSTEM STATUS: ALL SYSTEMS OPERATIONAL. SECURE DEPLOYMENT READY." },
];

interface InitialLoaderProps {
  onComplete: () => void;
}

export default function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeLog, setActiveLog] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  // Smooth progress increment
  useEffect(() => {
    // Lock scrolling on mount
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    const duration = 2500; // 2.5 seconds total
    const startTime = performance.now();

    const updateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      
      // Easing curve: Slow down at the end for realistic loading feel
      const easeProgress = 1 - Math.pow(1 - progressFraction, 3);
      currentProgress = Math.floor(easeProgress * 100);
      
      setProgress(currentProgress);

      // Find matching log statement based on progress
      const matchingLog = [...LOGS]
        .reverse()
        .find((log) => currentProgress >= log.min);
      if (matchingLog) {
        setActiveLog(matchingLog.text);
      }

      if (progressFraction < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Add a slight delay at 100% for impact, then exit
        setTimeout(() => {
          setIsExiting(true);
        }, 600);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Handle cleanup and parent completion call
  const handleExitComplete = () => {
    // Unlock scrolling
    document.body.style.overflow = "";
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Top Shutter Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={isExiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full h-[50.5vh] bg-[#030014] border-b border-cyan/10 z-10"
        style={{
          boxShadow: isExiting ? "none" : "0 10px 30px rgba(0, 240, 255, 0.05)",
        }}
      />

      {/* Bottom Shutter Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={isExiting ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={(definition) => {
          // If the bottom shutter finishes moving out of view, notify parent
          if (isExiting) {
            handleExitComplete();
          }
        }}
        className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-[#030014] border-t border-cyan/10 z-10"
        style={{
          boxShadow: isExiting ? "none" : "0 -10px 30px rgba(0, 240, 255, 0.05)",
        }}
      />

      {/* HUD & Counter Elements */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={isExiting ? { opacity: 0, scale: 0.8, filter: "blur(10px)" } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center justify-center max-w-lg px-6 text-center pointer-events-none"
      >
        {/* Futuristic Rotating Cyber Rings */}
        <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
          {/* Outer circle dotted */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-cyan/35"
          />
          {/* Middle circle with gap */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-double border-purple/35 border-t-transparent border-b-transparent"
          />
          {/* Inner circle glowing */}
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
            className="absolute inset-8 rounded-full border border-cyan/40 border-l-transparent"
          />
          {/* Dynamic Core Glow */}
          <div className="absolute w-8 h-8 rounded-full bg-cyan/10 blur-sm animate-pulse-glow flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_12px_#00f0ff]" />
          </div>
        </div>

        {/* Counter Display */}
        <div className="mb-4">
          <span
            className="text-6xl md:text-7xl font-extrabold tracking-widest text-cyan glow-text-cyan font-heading"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {String(progress).padStart(3, "0")}
            <span className="text-3xl text-cyan/70 font-light">%</span>
          </span>
        </div>

        {/* Binary / Tech Deco bar */}
        <div className="w-64 h-1.5 bg-space-black border border-cyan/20 rounded-full overflow-hidden mb-6 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan via-purple to-magenta rounded-full shadow-[0_0_8px_#00f0ff]"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_50%,transparent_50%)] bg-[size:4px_100%] pointer-events-none" />
        </div>

        {/* Command Line Logs */}
        <div className="h-16 flex flex-col justify-center max-w-md">
          <motion.div
            key={activeLog}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs uppercase tracking-[0.18em] text-text-secondary leading-relaxed font-mono select-none"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="text-cyan font-bold mr-2">&gt;_</span>
            {activeLog}
          </motion.div>
        </div>

        {/* Grid and coordinate deco */}
        <div className="absolute -top-32 -left-32 w-16 h-16 border-t border-l border-cyan/15 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-16 h-16 border-t border-r border-cyan/15 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-16 h-16 border-b border-l border-cyan/15 pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-16 h-16 border-b border-r border-cyan/15 pointer-events-none" />

        <div
          className="absolute -bottom-44 text-[9px] text-text-muted font-mono tracking-widest uppercase select-none"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          System Uplink V16.2.4 // Latency: 004ms
        </div>
      </motion.div>

      {/* Screen scanline overlays inside loader */}
      <div className="absolute inset-0 scanlines pointer-events-none z-15" />
    </div>
  );
}
