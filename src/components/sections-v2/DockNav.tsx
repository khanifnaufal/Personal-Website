"use client";

import { Home, User, Briefcase, Code2, Mail } from "lucide-react";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------
   DockNav — floating pill nav, bottom-center, fixed position.
   All colors use CSS custom properties from the warm grayscale
   palette defined in globals.css @theme, ensuring visual cohesion
   with the rest of the redesign-minimal sections.

   Palette reference:
     dock bg      → var(--color-warm-text-primary) #1C1C1A
     active btn   → rgba(white, 0.10) — subtle lift, no off-palette hex
     active icon  → var(--color-warm-bg)          #F4F3EF
     inactive     → var(--color-warm-text-muted)  #8A8A86
   --------------------------------------------------------------- */

const DOCK_ITEMS = [
  { id: "hero",     label: "Hero",     Icon: Home      },
  { id: "profile",  label: "Profile",  Icon: User      },
  { id: "history",  label: "History",  Icon: Briefcase },
  { id: "projects", label: "Projects", Icon: Code2     },
  { id: "contact",  label: "Contact",  Icon: Mail      },
] as const;

interface DockNavProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export default function DockNav({ activeIndex, onNavigate }: DockNavProps) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-1/2 -translate-x-1/2 z-50"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.75rem)" }}
    >
      {/* Pill container — uses warm-text-primary as dock bg (#1C1C1A) */}
      <div
        className="flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          background: "var(--color-warm-text-primary)",
          boxShadow:
            "0 2px 16px rgba(28,28,26,0.18), 0 1px 4px rgba(28,28,26,0.12)",
        }}
      >
        {DOCK_ITEMS.map(({ id, label, Icon }, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.button
              key={id}
              onClick={() => onNavigate(i)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              title={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full"
              style={{
                width: 44,
                height: 44,
                /* Active: white tint layer inside the dark pill */
                background: isActive
                  ? "rgba(255, 255, 255, 0.10)"
                  : "transparent",
                transition: "background 0.2s ease",
              }}
            >
              {/* Active dot indicator with shared layout animation */}
              {isActive && (
                <motion.span
                  layoutId="dock-active-dot"
                  className="absolute bottom-[7px] left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    width: 3,
                    height: 3,
                    background: "var(--color-warm-text-muted)",
                  }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                />
              )}

              <Icon
                size={18}
                strokeWidth={isActive ? 2 : 1.75}
                aria-hidden
                style={{
                  /* Active: warm-bg (#F4F3EF); Inactive: warm-text-muted (#8A8A86) */
                  color: isActive
                    ? "var(--color-warm-bg)"
                    : "var(--color-warm-text-muted)",
                  transition: "color 0.2s ease",
                }}
              />
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
