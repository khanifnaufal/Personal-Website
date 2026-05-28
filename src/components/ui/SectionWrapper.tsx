"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  label?: string;
  delay?: number;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  label,
  delay = 0,
}: SectionWrapperProps) {
  const isMobile = useIsMobile();

  return (
    <motion.section
      id={id}
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.7,
        delay: isMobile ? 0 : delay,
        ease: "easeOut",
      }}
      className={`relative z-10 px-6 md:px-12 lg:px-20 py-20 md:py-28 ${className}`}
    >
      {/* Section label decorator */}
      {label && (
        <motion.div
          initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          whileInView={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: isMobile ? 0 : delay + 0.1 }}
          className="section-label mb-8 md:mb-12"
        >
          {label}
        </motion.div>
      )}

      {children}
    </motion.section>
  );
}
