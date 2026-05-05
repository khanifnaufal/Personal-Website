"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";

const ROLES = ["Full-Stack Developer", "AI & Machine Learning Engineer", "Research & Data Scientist"];
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 500;

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      setText(currentWord.slice(0, text.length + 1));
      if (text.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        return;
      }
    } else {
      setText(currentWord.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [text, wordIndex, isDeleting, words]);

  useEffect(() => {
    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return text;
}

function TypewriterTagline() {
  const displayText = useTypewriter(ROLES);

  return (
    <p
      className="text-lg md:text-xl lg:text-2xl text-cyan glow-text-cyan tracking-[0.12em] uppercase h-8"
      style={{ fontFamily: "var(--font-mono), monospace" }}
    >
      {"< "}
      <span>{displayText}</span>
      <span className="animate-pulse">|</span>
      {" />"}
    </p>
  );
}

export default function BaseStation() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="base-station"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-light mb-10"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
          <span
            className="text-xs tracking-[0.25em] uppercase text-cyan"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            System Online
          </span>
        </motion.div>

        {/* Small intro line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-text-secondary text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name — extra large */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-[0.95] galaxy-text"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          {PERSONAL_INFO.name}
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="w-32 h-[1px] mx-auto mb-6 bg-gradient-to-r from-transparent via-purple to-transparent"
        />

        {/* Typewriter tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mb-8"
        >
          <TypewriterTagline />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {PERSONAL_INFO.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("mission-logs")}
            className="btn-primary"
          >
            View Mission Logs
          </button>
          <button
            onClick={() => scrollTo("signal-transmission")}
            className="btn-outline"
          >
            Send Signal
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] tracking-[0.3em] uppercase text-text-muted"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Scroll
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-cyan/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Corner HUD decorators */}
      <div className="absolute top-24 left-8 w-8 h-8 border-t border-l border-cyan/20 hidden lg:block" />
      <div className="absolute top-24 right-8 w-8 h-8 border-t border-r border-cyan/20 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-cyan/20 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-cyan/20 hidden lg:block" />
    </section>
  );
}
