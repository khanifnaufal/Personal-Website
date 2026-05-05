"use client";

import { motion } from "framer-motion";

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="relative flex items-center justify-center py-8"
    >
      {/* Left line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
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
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex-1 h-[1px] bg-gradient-to-r ${c.line} origin-left`}
      />
    </motion.div>
  );
}
