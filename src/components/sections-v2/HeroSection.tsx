"use client";

export default function HeroSection() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
      {/* Eyebrow label */}
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6">
        Muhammad Khanif Naufal — Portfolio
      </p>

      {/* Name */}
      <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-warm-text-primary leading-[1.05] mb-6">
        Full-Stack
        <br />
        <span className="text-warm-text-secondary">Developer &</span>
        <br />
        ML Engineer
      </h1>

      {/* Divider */}
      <div className="w-12 h-px bg-warm-border mb-6" />

      {/* Summary */}
      <p className="font-sans text-base md:text-lg text-warm-text-secondary max-w-md leading-relaxed mb-10">
        Building production-grade web systems and machine-learning pipelines.
        Based in Indonesia, working globally.
      </p>

      {/* CTA area */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-warm-text-muted tracking-widest">
          ↓ scroll to explore
        </span>
      </div>

      {/* Corner mark */}
      <div className="absolute bottom-8 right-8 md:right-16 font-mono text-[10px] tracking-widest text-warm-text-muted uppercase">
        01 / 05
      </div>
    </div>
  );
}
