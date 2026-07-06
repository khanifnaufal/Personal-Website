"use client";

import BlurText from "@/components/ui/BlurText";

export default function HeroSection() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">

      {/* Eyebrow label */}
      <BlurText
        text="Muhammad Khanif Naufal — Portfolio"
        animateBy="words"
        direction="top"
        delay={60}
        stepDuration={0.3}
        className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6"
      />

      {/*
       * Hero heading — three lines animated as separate BlurText instances
       * so each line staggers independently with a natural reading rhythm.
       *
       * BlurText renders a <p> tag, but we wrap in an <h1> for semantics.
       * Each line uses a slightly longer delay offset so line 2 starts
       * after line 1 is mid-way, creating a cascading entrance.
       */}
      <h1
        className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] mb-6"
        aria-label="Full-Stack Developer & ML Engineer"
      >
        <BlurText
          text="Full-Stack"
          animateBy="words"
          direction="top"
          delay={80}
          stepDuration={0.38}
          className="text-warm-text-primary"
        />
        <BlurText
          text="Developer &"
          animateBy="words"
          direction="top"
          delay={80}
          stepDuration={0.38}
          className="text-warm-text-secondary"
          animationFrom={{ filter: "blur(10px)", opacity: 0, y: -50 }}
          /*
           * Inline delay on the whole component: shift the entire
           * second line's IntersectionObserver start is immediate,
           * but the per-word delay stagger handles the cascade.
           * We use a slightly longer initial delay via the first
           * word's delay offset being absorbed into the stagger.
           */
        />
        <BlurText
          text="ML Engineer"
          animateBy="words"
          direction="top"
          delay={80}
          stepDuration={0.38}
          className="text-warm-text-primary"
        />
      </h1>

      {/* Divider */}
      <div className="w-12 h-px bg-warm-border mb-6" />

      {/* Summary */}
      <BlurText
        text="Building production-grade web systems and machine-learning pipelines. Based in Indonesia, working globally."
        animateBy="words"
        direction="bottom"
        delay={30}
        stepDuration={0.28}
        className="font-sans text-base md:text-lg text-warm-text-secondary max-w-md leading-relaxed mb-10"
      />


    </div>
  );
}
