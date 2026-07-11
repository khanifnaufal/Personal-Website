/**
 * BlurText — React Bits component, adapted for this project.
 *
 * Source: https://www.reactbits.dev/text-animations/blur-text
 * Original import `motion/react` replaced with `framer-motion`
 * (the package installed in this project at v12).
 * Converted to TypeScript with full prop types.
 */
import { motion, type TargetAndTransition } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

/* ── Types ─────────────────────────────────────────────────────── */

/**
 * Concrete subset of Framer Motion's TargetAndTransition,
 * covering the properties BlurText actually animates.
 * Using `TargetAndTransition` directly keeps everything compatible.
 */
type AnimationSnapshot = TargetAndTransition & {
  filter?: string;
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
};

interface BlurTextProps {
  /** The text content to animate. */
  text?: string;
  /** Delay between each word/letter animation in ms. */
  delay?: number;
  /** Extra CSS classes applied to the wrapping <p>. */
  className?: string;
  /** Animate by 'words' or 'letters'. */
  animateBy?: "words" | "letters";
  /** Direction the elements appear from: 'top' or 'bottom'. */
  direction?: "top" | "bottom";
  /** IntersectionObserver threshold. */
  threshold?: number;
  /** IntersectionObserver rootMargin. */
  rootMargin?: string;
  /** Override the starting animation snapshot. */
  animationFrom?: AnimationSnapshot;
  /** Override the intermediate+end animation snapshots. */
  animationTo?: AnimationSnapshot[];
  /** Custom easing function. */
  easing?: (t: number) => number;
  /** Callback fired when all segments finish animating. */
  onAnimationComplete?: () => void;
  /** Duration (seconds) for each segment's animation. */
  stepDuration?: number;
  /** Whether to trigger animation only once on first load. */
  animateOnFirstLoad?: boolean;
}

/* ── Helpers ────────────────────────────────────────────────────── */

/**
 * Merge a `from` snapshot and an array of `step` snapshots into the
 * keyframe array format that Framer Motion's `animate` prop expects:
 * { property: [fromValue, step1Value, step2Value, ...] }
 */
function buildKeyframes(
  from: AnimationSnapshot,
  steps: AnimationSnapshot[]
): TargetAndTransition {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keyframes: Record<string, any[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [
      (from as Record<string, unknown>)[k],
      ...steps.map((s) => (s as Record<string, unknown>)[k]),
    ];
  });
  return keyframes as TargetAndTransition;
}

/* ── Component ──────────────────────────────────────────────────── */

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  animateOnFirstLoad,
}: BlurTextProps) {
  const elements =
    animateBy === "words" ? text.split(" ") : text.split("");

  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  /* Trigger animation once the element enters the viewport */
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  /* Default from/to snapshots based on direction prop */
  const defaultFrom = useMemo<AnimationSnapshot>(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo<AnimationSnapshot[]>(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1
                ? onAnimationComplete
                : undefined
            }
          >
            {/* Preserve spaces as non-breaking spaces */}
            {segment === " " ? "\u00A0" : segment}
            {/* Add space after each word when animating by word */}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
}
