"use client";

import { useEffect, useState } from "react";
import BlurText from "@/components/ui/BlurText";
import { ShimmeringText } from "@/components/ui/shimmering-text";

import { HeroCard } from "@/components/ui/HeroCard";

interface HeroSectionProps {
  onNavigate: (index: number) => void;
  isMobile: boolean;
}

export default function HeroSection({ onNavigate, isMobile }: HeroSectionProps) {
  return (
    <div className={isMobile ? "relative flex flex-col justify-start pt-16 pb-24 px-6" : "absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"}>
      {/* Hero Content - Text Stack */}
      <div className={isMobile ? "w-full max-w-none text-center" : "max-w-2xl"}>
        {/* Eyebrow label */}
        <BlurText
          text="Muhammad Khanif Naufal — Portfolio"
          animateBy="words"
          direction="top"
          delay={60}
          stepDuration={0.3}
          className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6 flex flex-wrap justify-center lg:justify-start"
        />

        {/* Hero heading — fluid clamp font size */}
        <h1
          className="font-sans font-semibold tracking-tight leading-[1.1] mb-6"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
          }}
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
        <div
          className={`w-12 h-px bg-warm-border mb-6 ${isMobile ? "mx-auto" : "ml-0 mr-auto"
            }`}
        />

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
            className={`font-sans text-base text-warm-text-secondary max-w-md leading-relaxed flex flex-wrap ${isMobile ? "justify-center mx-auto mb-3" : "justify-start mb-10"
              }`}
         />
      </div>

      {/* Profile Card Container - Stacked below text on mobile, side-by-side on desktop */}
       <div className={isMobile ? "w-full max-w-md mx-auto mt-0" : "absolute inset-y-0 right-0 w-1/2 hidden lg:flex items-center justify-end pr-20"}>
        <div className="relative w-full max-w-[320px] mx-auto">
          <HeroCard
            name="Khanif Naufal"
            title="Fullstack Developer"
            avatarSrc="/profile2.png"
            handle="khanifnaufal"
            status="Open to opportunities"
            onContactClick={() => onNavigate(4)}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
}
