"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

interface SectionDividerProps {
  variant?: "cyan" | "purple" | "magenta";
}

const colors = {
  cyan: {
    line: "from-transparent via-cyan/40 to-transparent",
    dot: "bg-cyan",
    glow: "0 0 10px rgba(0, 240, 255, 0.5)",
  },
  purple: {
    line: "from-transparent via-purple/40 to-transparent",
    dot: "bg-purple",
    glow: "0 0 10px rgba(123, 47, 255, 0.5)",
  },
  magenta: {
    line: "from-transparent via-magenta/40 to-transparent",
    dot: "bg-magenta",
    glow: "0 0 10px rgba(255, 0, 229, 0.5)",
  },
};

export default function SectionDivider({ variant = "cyan" }: SectionDividerProps) {
  const c = colors[variant];
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex items-center justify-center py-8"
    >
      {/* Left line */}
      <motion.div
        initial={isMobile ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={isMobile ? { scaleX: 1 } : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex-1 h-[1px] bg-gradient-to-r ${c.line} origin-right`}
      />

      {/* Center dot */}
      <div className="mx-4 relative">
        <div
          className={`w-2 h-2 rounded-full ${c.dot}`}
          style={{ boxShadow: c.glow }}
        />
        {/* Ping animation */}
        <div
          className={`absolute inset-0 w-2 h-2 rounded-full ${c.dot} animate-ping opacity-30`}
        />
      </div>

      {/* Right line */}
      <motion.div
        initial={isMobile ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={isMobile ? { scaleX: 1 } : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex-1 h-[1px] bg-gradient-to-r ${c.line} origin-left`}
      />
    </motion.div>
  );
}
