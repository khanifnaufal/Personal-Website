"use client";

import BlurText from "@/components/ui/BlurText";
import { ShimmeringText } from "@/components/ui/shimmering-text";

import ProfileCard from "@/components/ProfileCard";

interface HeroSectionProps {
  onNavigate: (index: number) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
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
        <ShimmeringText
          text="I Build Things"
          duration={2}
          className="text-warm-text-primary block"
          color="var(--color-warm-text-primary)"
          shimmeringColor="#ffffff"
        />
        <ShimmeringText
          text="That Work"
          duration={2}
          className="text-warm-text-secondary block"
          color="var(--color-warm-text-secondary)"
          shimmeringColor="#ffffff"
        />
      </h1>

      {/* Divider */}
      <div className="w-12 h-px bg-warm-border mb-6" />

      {/* Summary */}
      <BlurText
        text="Informatics Engineering graduate drawn to how things are built and what the data behind them says."
        animateBy="words"
        direction="bottom"
        delay={30}
        stepDuration={0.35}
        animateOnFirstLoad
        animationFrom={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animationTo={[
          { filter: "blur(5px)", opacity: 0.5, y: 10 },
          { filter: "blur(0px)", opacity: 1, y: 0 },
        ]}
        className="font-sans text-base md:text-lg text-warm-text-secondary max-w-md leading-relaxed mb-10"
      />

      {/* Profile Card Container - Centered vertically on the right side */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:flex items-center justify-center pr-20">
        <div className="relative w-full max-w-[400px] flex justify-center">
          <ProfileCard
            avatarUrl="/profile2.png"
            behindGlowSize="50%"
            name="Khanif Naufal"
            title="Fullstack Developer"
            handle="khanifnaufal"
            status="Open to opportunities"
            contactText="Get in touch"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => onNavigate(4)}
          />
        </div>
      </div>

    </div>
  );
}
