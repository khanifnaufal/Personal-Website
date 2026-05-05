"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { NAV_LINKS, PILOT_PROFILE } from "@/lib/constants";

export default function HudNavigation() {
  const [activeSection, setActiveSection] = useState("base-station");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Track scroll position for nav background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(link.sectionId);
            }
          });
        },
        { threshold: 0.1, rootMargin: "-20% 0px -20% 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-0.75">
            {/* Logo / call sign */}
            <button
              onClick={() => scrollToSection("base-station")}
              className="flex items-center gap-2 group md:hidden"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan/30 group-hover:border-cyan transition-colors">
                <Image
                  src={PILOT_PROFILE.photo}
                  alt={PILOT_PROFILE.name}
                  width={32}
                  height={32}
                  className="object-cover object-[center_20%] w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-cyan/10 text-[8px] font-bold text-cyan">KN</div>`;
                    }
                  }}
                />
              </div>
              <span
                className="text-xs md:text-sm tracking-[0.15em] uppercase text-text-primary group-hover:text-cyan transition-colors"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                Khanif Naufal
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <span className="text-text-muted text-xs ml-2 mr-3" style={{ fontFamily: "var(--font-mono)" }}>
                NAV://
              </span>
              {NAV_LINKS.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 rounded ${
                    activeSection === link.sectionId
                      ? "text-cyan"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {activeSection === link.sectionId && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded glass-light"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    [{String(i + 1).padStart(2, "0")}] {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Status indicator */}
          <div className="hidden md:flex items-center gap-2 text-text-muted text-xs" style={{ fontFamily: "var(--font-mono)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>ONLINE</span>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1px] bg-cyan"
            />
            <motion.span
              animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1px] bg-cyan"
            />
            <motion.span
              animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1px] bg-cyan"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 glass p-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.sectionId)}
                  className={`text-left px-4 py-3 text-sm tracking-[0.1em] uppercase transition-all duration-300 rounded ${
                    activeSection === link.sectionId
                      ? "text-cyan glass-light"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  [{String(i + 1).padStart(2, "0")}] {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
