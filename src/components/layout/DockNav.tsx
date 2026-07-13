"use client";

import { Home, User, Briefcase, Code2, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const DOCK_ITEMS = [
  { id: "hero",     label: "Home",     Icon: Home      },
  { id: "profile",  label: "Profile",  Icon: User      },
  { id: "history",  label: "History",  Icon: Briefcase },
  { id: "projects", label: "Projects", Icon: Code2     },
  { id: "contact",  label: "Contact",  Icon: Mail      },
] as const;

interface TooltipPos {
  centerX: number; // px from left of viewport
  bottom: number;  // px from bottom of viewport
}

interface DockNavProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
  isMobile?: boolean;
}

export default function DockNav({ activeIndex, onNavigate, isMobile }: DockNavProps) {
  const [tooltip, setTooltip] = useState<{ label: string; pos: TooltipPos } | null>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (i: number) => {
    const el = wrapperRefs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setTooltip({
      label: DOCK_ITEMS[i].label,
      pos: {
        centerX: rect.left + rect.width / 2,
        bottom: window.innerHeight - rect.top + 10, // 10px gap above button
      },
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  return (
    <>
      {/* ── Tooltip — position:fixed, centered on hovered button ── */}
      {!isMobile && (
        <AnimatePresence>
          {tooltip && (
          <motion.span
            key={tooltip.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: tooltip.pos.centerX,
              bottom: tooltip.pos.bottom,
              transform: "translateX(-50%)",
              zIndex: 200,
              pointerEvents: "none",
              // typography
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              lineHeight: 1,
              color: "var(--color-warm-bg)",
              whiteSpace: "nowrap",
              // chrome
              background: "var(--color-warm-text-primary)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "5px 10px",
              borderRadius: 5,
            }}
            >
              {tooltip.label}
            </motion.span>
          )}
        </AnimatePresence>
      )}

      {/* ── Nav pill ─────────────────────────────────────────────── */}
      <nav
        aria-label="Section navigation"
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.75rem)" }}
      >
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-full"
          style={{
            background: "var(--color-warm-text-primary)",
            boxShadow: "0 2px 16px rgba(28,28,26,0.18), 0 1px 4px rgba(28,28,26,0.12)",
          }}
        >
          {DOCK_ITEMS.map(({ id, label, Icon }, i) => {
            const isActive = i === activeIndex;

            return (
              <div
                key={id}
                ref={(el) => { wrapperRefs.current[i] = el; }}
                style={{ position: "relative", width: 44, height: 44 }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.button
                  onClick={() => onNavigate(i)}
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: "50%",
                    background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
                    border: "none",
                    transition: "background 0.2s ease",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dock-active-dot"
                      style={{
                        position: "absolute",
                        bottom: 7,
                        left: "50%",
                        translateX: "-50%",
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
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
                      color: isActive ? "var(--color-warm-bg)" : "var(--color-warm-text-muted)",
                      transition: "color 0.2s ease",
                    }}
                  />
                </motion.button>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
