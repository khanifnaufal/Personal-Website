"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

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
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut",
      }}
      className={`relative px-6 md:px-12 lg:px-20 py-20 md:py-28 ${className}`}
    >
      {/* Section label decorator */}
      {label && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          className="section-label mb-8 md:mb-12"
        >
          {label}
        </motion.div>
      )}

      {children}
    </motion.section>
  );
}
