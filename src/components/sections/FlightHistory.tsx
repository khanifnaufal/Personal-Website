"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLIGHT_HISTORY, HISTORY_CATEGORIES, type HistoryCategory } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function FlightHistory() {
  const [activeFilter, setActiveFilter] = useState<HistoryCategory | "all">("all");

  const filteredHistory = FLIGHT_HISTORY.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <SectionWrapper id="flight-history" label="FLIGHT_HISTORY">
      <div className="text-center mb-16">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          <span className="text-text-muted">[</span>{" "}
          <span className="galaxy-text">Flight History</span>{" "}
          <span className="text-text-muted">]</span>
        </h2>
        <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-cyan to-transparent" />
        <p className="mt-4 text-text-secondary text-sm md:text-base max-w-xl mx-auto">
          A chronolog of past operations, academic achievements, and certifications.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-cyan/20 border border-cyan/50 text-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                : "glass-light text-text-secondary hover:text-text-primary hover:border-cyan/30"
            }`}
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            All Logs
          </button>
          {HISTORY_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                activeFilter === cat.key
                  ? "bg-purple/20 border border-purple/50 text-purple shadow-[0_0_15px_rgba(123,47,255,0.2)]"
                  : "glass-light text-text-secondary hover:text-text-primary hover:border-purple/30"
              }`}
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan/30 via-purple/30 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredHistory.map((item, index) => {
                const isLeft = index % 2 === 0;
                const catInfo = HISTORY_CATEGORIES.find((c) => c.key === item.category);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    } pl-16 md:pl-0`}
                  >
                    {/* Dot on the timeline */}
                    <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-space-black border-2 border-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)] -translate-x-1/2 z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-cyan rounded-full animate-ping opacity-70" />
                    </div>

                    {/* Content Card */}
                    <div
                      className={`glass-card rounded-2xl p-6 w-full md:w-[45%] relative group hud-bracket ${
                        isLeft ? "border-cyan/20" : "border-purple/20"
                      }`}
                    >
                      {/* Connection line for desktop */}
                      <div
                        className={`hidden md:block absolute top-1/2 w-[10%] h-[1px] bg-border -translate-y-1/2 ${
                          isLeft ? "-right-[10%]" : "-left-[10%]"
                        }`}
                      />

                      {/* Header (ID + Icon) */}
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className="text-[10px] tracking-[0.2em] text-text-muted bg-white/5 px-2 py-1 rounded"
                          style={{ fontFamily: "var(--font-mono), monospace" }}
                        >
                          {item.id}
                        </span>
                        <span className="text-xl opacity-70 group-hover:opacity-100 transition-opacity">
                          {catInfo?.icon}
                        </span>
                      </div>

                      {/* Title & Org */}
                      <h3
                        className={`text-xl font-bold mb-1 ${
                          isLeft ? "text-cyan group-hover:glow-text-cyan" : "text-purple group-hover:glow-text-purple"
                        } transition-all duration-300`}
                        style={{ fontFamily: "var(--font-heading), sans-serif" }}
                      >
                        {item.title}
                      </h3>
                      <h4 className="text-text-primary font-medium mb-1">{item.organization}</h4>

                      {/* Period */}
                      <p
                        className="text-xs text-text-muted mb-4 uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-mono), monospace" }}
                      >
                        {item.period}
                      </p>

                      {/* Description */}
                      <p className="text-text-secondary text-sm leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase glass-light ${
                                isLeft ? "text-cyan-dim" : "text-purple"
                              }`}
                              style={{ fontFamily: "var(--font-mono)" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
