"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroCardProps {
  name: string;
  title: string;
  avatarSrc: string;
  handle: string;
  status: string;
  onContactClick: () => void;
  className?: string;
}

export const HeroCard = ({
  name,
  title,
  avatarSrc,
  handle,
  status,
  onContactClick,
  className,
}: HeroCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-warm-dock will-change-transform",
        "aspect-[0.7] border border-white/10 shadow-xl shadow-black/30",
        "flex flex-col", // header di atas, foto ngisi sisa ruang di bawah
        className,
      )}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      style={{
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      {/* HEADER — solid background, gak ketiban foto sama sekali */}
      <div className="relative z-20 px-6 pt-6 pb-4 text-center shrink-0">
        <h2 className="text-xl font-bold text-[#1C1C1A] md:text-2xl">
          {name}
        </h2>
        <p className="text-sm text-[#1C1C1A]/70 md:text-base">
          {title}
        </p>
      </div>

      {/* FOTO — cuma ngisi sisa ruang DI BAWAH header, bukan seluruh card */}
      <div className="relative flex-1 min-h-0">
        <Image
          src={avatarSrc}
          alt="Profile Avatar"
          fill
          className="object-cover object-top"
          priority
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(28,28,26,0.9), transparent)",
          }}
        />
      </div>

      {/* INFO BAR BAWAH — tetap overlay di atas foto, tapi ini area gelap-nya foto (kaki/badan), bukan area wajah, jadi lebih aman */}
      <div className="absolute inset-x-4 bottom-4 z-20 rounded-xl bg-black/50 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 mb-3">
          <Image
            src={avatarSrc}
            alt="Mini Avatar"
            width={28}
            height={28}
            className="rounded-full object-cover shrink-0"
          />
          <div className="flex flex-col min-w-0 leading-tight">
            <span className="text-sm font-medium text-warm-bg truncate">
              @{handle}
            </span>
            <span className="text-xs text-warm-bg/60 truncate">
              {status}
            </span>
          </div>
        </div>

        <button
          onClick={onContactClick}
          className="w-full rounded-full bg-warm-bg text-[#1C1C1A] text-sm font-medium py-2 transition-opacity hover:opacity-90"
        >
          Get in touch
        </button>
      </div>
    </motion.div>
  );
};