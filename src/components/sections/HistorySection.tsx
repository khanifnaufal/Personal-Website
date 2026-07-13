"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLIGHT_HISTORY, HISTORY_CATEGORIES, TimelineItem } from "@/lib/constants";
import { Repeat } from "lucide-react";

// Define types for clarity, aligning with FLIGHT_HISTORY structure
type HistoryCategory = "work" | "academic" | "certification" | "research";
type ActiveCategory = "work" | "education" | "journal";

interface CategoryConfig {
  key: ActiveCategory;
  label: string;
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  { key: "work", label: "Work Experience" },
  { key: "education", label: "Education & Certifications" },
  { key: "journal", label: "Journal" },
];

// Placeholder for missing images and links
const PLACEHOLDER_IMAGE_URL = "/placeholder-image.svg";
const PLACEHOLDER_PAPER_URL = "#";

const getYear = (period: string) => {
  const match = period.match(/\d{4}/g);
  return match ? parseInt(match[match.length - 1]) : 0;
};

const getHistoryItems = (category: ActiveCategory): (TimelineItem & { imageUrl?: string; paperUrl?: string })[] => {
  let filtered = FLIGHT_HISTORY.filter(item => {
    if (category === "work") return item.category === "work";
    if (category === "education") return item.category === "academic" || item.category === "certification";
    if (category === "journal") return item.category === "research";
    return false;
  });

  if (category === "education") {
    filtered = [...filtered].sort((a, b) => getYear(b.period) - getYear(a.period));
  }

  return filtered.map(item => {
    if (item.category === "research") {
      return {
        ...item,
        imageUrl: (item as any).imageUrl ?? PLACEHOLDER_IMAGE_URL,
        paperUrl: (item as any).paperUrl ?? (item.link ?? PLACEHOLDER_PAPER_URL),
      };
    }
    return {
      ...item,
      imageUrl: item.imageUrl ?? PLACEHOLDER_IMAGE_URL, // Use item.imageUrl if present, otherwise placeholder
      paperUrl: undefined,
    };
  });
};

export default function HistorySection({ isMobile = false }: { isMobile?: boolean }) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("work");
  const [activeIndex, setActiveIndex] = useState(0);
  const [historyItems, setHistoryItems] = useState<(TimelineItem & { imageUrl?: string; paperUrl?: string })[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(0); // Timestamp for last manual interaction

  // Autoplay functionality
  useEffect(() => {
    if (isMobile || isPaused || isHovering || historyItems.length <= 1) {
      return;
    }

    const autoplayInterval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % historyItems.length);
    }, 4000); // Autoplay every 4 seconds

    return () => clearInterval(autoplayInterval);
  }, [activeIndex, activeCategory, isPaused, isHovering, historyItems]);

  // Reset index when category changes
  useEffect(() => {
    const items = getHistoryItems(activeCategory);
    setHistoryItems(items);
    setActiveIndex(0); 
    setIsPaused(false); // Resume autoplay when category changes
    setLastInteractionTime(0); // Reset interaction time
  }, [activeCategory]);

  // Effect to reset index if historyItems change and are empty
  useEffect(() => {
    if (historyItems.length === 0 && activeIndex !== 0) {
      setActiveIndex(0);
    } else if (historyItems.length > 0 && activeIndex >= historyItems.length) {
      // If somehow index is out of bounds, reset to 0
      setActiveIndex(0);
    }
  }, [historyItems, activeIndex]);

  // Explicitly type currentItem to help TypeScript infer properties correctly
  const currentItem: (TimelineItem & { imageUrl?: string; paperUrl?: string }) | undefined = historyItems[activeIndex];

  // Framer Motion variants for transitions
  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // No-op for removed state

  // Resume autoplay after 5 seconds of idle time following a manual interaction
  useEffect(() => {
    if (isPaused && !isHovering && lastInteractionTime > 0) {
      const idleTimer = setTimeout(() => {
        setIsPaused(false);
        setLastInteractionTime(0); // Reset for next interaction
      }, 4000); // 5 seconds idle before resuming

      return () => clearTimeout(idleTimer);
    }
  }, [isPaused, isHovering, lastInteractionTime]);

  const goToIndex = (index: number) => {
    if (index >= 0 && index < historyItems.length) {
      setActiveIndex(index);
      setIsPaused(true); // Pause autoplay on manual interaction
      setLastInteractionTime(Date.now()); // Record interaction time
    }
  };

  const handleChevronUp = () => {
    goToIndex(activeIndex - 1);
  };

  const handleChevronDown = () => {
    goToIndex(activeIndex + 1);
  };

  return (
    <div className={isMobile ? "relative flex flex-col justify-start px-6 pt-16 pb-24" : "relative flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 overflow-hidden"}>
      <div className="max-w-6xl mx-auto w-full mb-12"> {/* New wrapper for alignment */}
        {/* Eyebrow */}
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6">
          History
        </p>

        {/* Cyclical Tab */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const currentIndex = CATEGORY_CONFIGS.findIndex(c => c.key === activeCategory);
            const nextIndex = (currentIndex + 1) % CATEGORY_CONFIGS.length;
            setActiveCategory(CATEGORY_CONFIGS[nextIndex].key);
          }}
          className="flex items-center rounded-full bg-warm-bg-secondary text-warm-text-primary border border-warm-text-muted/20 overflow-hidden"
          style={{ paddingLeft: '1.5rem', paddingRight: '0.5rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }} // Custom padding for visual balance
        >
          <span className="flex items-center gap-2 font-medium text-sm pr-4"> {/* Added right padding to text container */}
            {CATEGORY_CONFIGS.find(c => c.key === activeCategory)?.label}
            <Repeat className="w-3 h-3 text-warm-text-muted" /> {/* Smaller icon */}
          </span>
          
          {/* Vertical Separator */}
          <div className="w-px h-5 bg-warm-text-muted/20 mr-4" /> {/* Separator with margin-right */}

          <div className="flex items-center gap-1.5">
            {CATEGORY_CONFIGS.map((cat) => (
              <div
                key={cat.key}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${activeCategory === cat.key
                    ? "w-3 bg-warm-text-primary" // Active dot: slightly longer pill shape
                    : "w-1.5 bg-warm-text-muted/30"}
                `}
              />
            ))}
          </div>
        </motion.button>
      </div> {/* End of new wrapper */}

      <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto w-full"> {/* Changed to responsive flex columns */}
        {/* Left Column: Slider and Content */}
        <div 
          className="flex-1 flex w-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Vertical Slider Sub-column */}
          <div className="flex flex-col items-center pr-8"> {/* Slider with right padding */}
             <motion.button
               whileTap={{ scale: 0.95 }}
               onClick={handleChevronUp}
               disabled={activeIndex === 0 || historyItems.length === 0}
               className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-warm-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
               </svg>
             </motion.button>

            {/* Dots Navigation */}
            <div className="flex flex-col items-center py-4 space-y-3"> {/* Increased space-y */}
               {historyItems.map((_, index) => (
                 <motion.div
                   key={index}
                   onClick={() => goToIndex(index)}
                   className={`
                     relative w-4 h-4 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center
                     ${activeIndex === index ? "bg-transparent" : "bg-transparent"}
                   `}
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                 >
                   <div className={`
                     rounded-full transition-all duration-300
                     ${activeIndex === index
                       ? "w-2 h-2 bg-warm-text-primary" // Active dot darker/slightly larger
                       : "w-1 h-1 bg-warm-text-muted hover:bg-warm-text-secondary"}
                   `} />
                 </motion.div>
               ))}
            </div>

             <motion.button
               whileTap={{ scale: 0.95 }}
               onClick={handleChevronDown}
               disabled={activeIndex === historyItems.length - 1 || historyItems.length === 0}
               className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-warm-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
               </svg>
             </motion.button>
          </div>

          {/* Entry Details Sub-column */}
          <div className="flex-1 pt-4"> {/* flex-1 allows it to take remaining width, removed ml-8 */}
            <AnimatePresence initial={false} mode="wait">
              {currentItem && (
                <motion.div
                  key={currentItem.id || activeIndex} // Use id or activeIndex as key
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-1">
                    <p className="font-sans text-sm font-medium text-warm-text-primary">
                      {currentItem.title}
                      <span className="font-normal text-warm-text-muted mx-2">·</span>
                      <span className="text-warm-text-secondary">{currentItem.organization}</span>
                    </p>
                    <p className="font-mono text-xs text-warm-text-muted leading-relaxed pt-0.5">
                      {currentItem.period}
                    </p>
                    <p className="font-sans text-sm text-warm-text-secondary leading-relaxed mt-2 text-justify">
                      {Array.isArray(currentItem.description)
                        ? currentItem.description.map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < currentItem.description.length - 1 && <br />}
                            </React.Fragment>
                          ))
                        : currentItem.description}
                    </p>
                    {currentItem.tags && currentItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {currentItem.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="font-mono text-xs bg-warm-bg-secondary text-warm-text-muted px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Image and Link */}
        <div className="flex-1 flex flex-col items-center justify-center w-full p-4 bg-warm-bg-secondary rounded-lg shadow-inner"> {/* Added flex-1 and styling */}
          <AnimatePresence initial={false} mode="wait">
            {currentItem && (
              <motion.div
                key={currentItem.id || activeIndex} // Use id or activeIndex as key
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                {activeCategory === "journal" ? (
                  <>
                    <img
                      src={currentItem.imageUrl || PLACEHOLDER_IMAGE_URL}
                      alt={currentItem.title || "Publication cover"}
                      className="w-full h-64 object-cover rounded-md mb-4 shadow-md"
                      onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE_URL; }}
                    />
                    {currentItem.paperUrl && currentItem.paperUrl !== PLACEHOLDER_PAPER_URL && (
                      <a
                        href={currentItem.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center font-sans text-sm font-medium text-warm-text-primary hover:underline"
                      >
                        Read paper →
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6v6M10 10l6-6" />
                        </svg>
                      </a>
                    )}
                  </>
                ) : (
                  <div className="relative w-full">
                    {activeCategory === "education" && (
                      <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-black/60 text-white text-[10px] uppercase tracking-wider rounded">
                        {currentItem.category}
                      </span>
                    )}
                    <img
                      src={currentItem.imageUrl || PLACEHOLDER_IMAGE_URL}
                      alt={currentItem.title || "Activity photo"}
                      className="w-full h-64 object-cover rounded-md mb-4 shadow-md"
                      onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE_URL; }}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}