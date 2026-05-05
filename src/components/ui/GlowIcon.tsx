"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface GlowIconProps {
  src: string;
  alt: string;
  size?: number;
  glowColor?: string;
}

export default function GlowIcon({
  src,
  alt,
  size = 40,
  glowColor = "rgba(0, 240, 255, 0.3)",
}: GlowIconProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.15,
        boxShadow: `0 0 25px ${glowColor}, 0 0 50px ${glowColor}`,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="relative flex items-center justify-center rounded-xl p-3"
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        boxShadow: `0 0 12px ${glowColor.replace("0.3", "0.1")}`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="relative z-10 drop-shadow-lg"
        style={{
          filter: "brightness(1.1) saturate(1.2)",
        }}
      />
    </motion.div>
  );
}
