"use client";

import React from "react";

export default function DesignPreview() {
  const colors = [
    { name: "background", class: "bg-warm-bg", hex: "#F4F3EF", var: "--color-warm-bg", desc: "Base application background" },
    { name: "surface", class: "bg-warm-surface", hex: "#EBEAE5", var: "--color-warm-surface", desc: "Card and panel surfaces" },
    { name: "border", class: "bg-warm-border", hex: "#D8D7D0", var: "--color-warm-border", desc: "Dividers, borders, and outlines" },
    { name: "text-muted", class: "bg-warm-text-muted", hex: "#8A8A86", var: "--color-warm-text-muted", desc: "Metadata, disabled text, captions" },
    { name: "text-secondary", class: "bg-warm-text-secondary", hex: "#5C5C58", var: "--color-warm-text-secondary", desc: "Body text and secondary details" },
    { name: "text-primary", class: "bg-warm-text-primary", hex: "#1C1C1A", var: "--color-warm-text-primary", desc: "Headings and primary text" },
    { name: "dock-bg", class: "bg-warm-dock-bg", hex: "#1C1C1A", var: "--color-warm-dock-bg", desc: "Bottom navigation dock background" },
  ];

  return (
    <div className="min-h-screen bg-warm-bg text-warm-text-primary p-8 md:p-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="border-b border-warm-border pb-8">
          <p className="font-mono text-xs uppercase tracking-wider text-warm-text-muted mb-2">// Design System Verification</p>
          <h1 className="font-sans text-4xl md:text-5xl font-semibold tracking-tight text-warm-text-primary">
            Minimalist Redesign Tokens
          </h1>
          <p className="font-sans text-lg text-warm-text-secondary mt-2">
            Warm Gray Grayscale & Typography Verification Page
          </p>
        </header>

        {/* Section 1: Color Palette */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-warm-text-muted">01/</span>
            <h2 className="font-sans text-2xl font-medium">Grayscale Palette (Warm Gray)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color) => (
              <div 
                key={color.name} 
                className="bg-warm-surface border border-warm-border rounded-xl p-4 flex flex-col justify-between h-48 shadow-sm transition-all hover:translate-y-[-2px] hover:shadow-md"
              >
                {/* Color Swatch */}
                <div className={`w-full h-20 rounded-lg ${color.class} border border-warm-border/30 mb-4`} />
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans font-semibold capitalize text-warm-text-primary">{color.name}</span>
                    <span className="font-mono text-xs text-warm-text-secondary">{color.hex}</span>
                  </div>
                  <div className="flex flex-col mt-1">
                    <span className="font-mono text-[10px] text-warm-text-muted">{color.var}</span>
                    <span className="font-mono text-[10px] text-warm-text-muted">class: {color.class}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Typography */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-warm-text-muted">02/</span>
            <h2 className="font-sans text-2xl font-medium">Typography & Fonts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sans-Serif Font */}
            <div className="bg-warm-surface border border-warm-border rounded-xl p-6 space-y-4">
              <div className="border-b border-warm-border pb-3">
                <h3 className="font-sans text-lg font-semibold">Sans-Serif: Inter</h3>
                <p className="font-mono text-xs text-warm-text-muted">class: font-sans</p>
              </div>
              <div className="space-y-4 font-sans">
                <p className="text-4xl font-light text-warm-text-primary">Light 300</p>
                <p className="text-4xl font-normal text-warm-text-primary">Regular 400</p>
                <p className="text-4xl font-medium text-warm-text-primary">Medium 500</p>
                <p className="text-4xl font-semibold text-warm-text-primary">Semibold 600</p>
                <p className="text-4xl font-bold text-warm-text-primary">Bold 700</p>
                <p className="text-sm text-warm-text-secondary leading-relaxed pt-2">
                  Inter is a variable font family carefully crafted & designed for computer screens. 
                  It features a tall x-height to aid in readability of mixed-case and lower-case text.
                </p>
              </div>
            </div>

            {/* Mono Font */}
            <div className="bg-warm-surface border border-warm-border rounded-xl p-6 space-y-4">
              <div className="border-b border-warm-border pb-3">
                <h3 className="font-sans text-lg font-semibold">Monospace: JetBrains Mono</h3>
                <p className="font-mono text-xs text-warm-text-muted">class: font-mono</p>
              </div>
              <div className="space-y-4 font-mono">
                <p className="text-3xl font-light text-warm-text-primary">Light 300</p>
                <p className="text-3xl font-normal text-warm-text-primary">Regular 400</p>
                <p className="text-3xl font-medium text-warm-text-primary">Medium 500</p>
                <p className="text-3xl font-semibold text-warm-text-primary">Semibold 600</p>
                <p className="text-3xl font-bold text-warm-text-primary">Bold 700</p>
                <p className="text-sm text-warm-text-secondary leading-relaxed pt-2">
                  JetBrains Mono is a typeface tailored specifically for developers. 
                  Its design characteristics make reading code easier and reduce eye strain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Element Preview Grid Mockup */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-warm-text-muted">03/</span>
            <h2 className="font-sans text-2xl font-medium">Composite UI Preview</h2>
          </div>

          <div className="bg-warm-surface border border-warm-border rounded-xl p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-sans text-xl font-semibold text-warm-text-primary">Interface Components Mockup</h3>
                <p className="font-sans text-sm text-warm-text-secondary">A mockup rendering components exclusively using the new design tokens.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-warm-dock-bg text-warm-bg rounded-lg text-sm font-sans font-medium hover:opacity-90 transition-opacity">
                  Primary Action
                </button>
                <button className="px-4 py-2 border border-warm-border text-warm-text-secondary rounded-lg text-sm font-sans font-medium hover:bg-warm-bg transition-colors">
                  Secondary
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-warm-bg border border-warm-border rounded-lg p-5 space-y-2">
                <h4 className="font-sans font-semibold text-warm-text-primary">Card Surface</h4>
                <p className="font-sans text-sm text-warm-text-secondary">
                  This card uses <code className="font-mono text-xs bg-warm-surface px-1 py-0.5 rounded">bg-warm-bg</code> on top of a surface container.
                </p>
                <p className="font-sans text-xs text-warm-text-muted">
                  Text muted looks like this.
                </p>
              </div>

              <div className="bg-warm-bg border border-warm-border rounded-lg p-5 space-y-2">
                <h4 className="font-sans font-semibold text-warm-text-primary">Spacing Alignment</h4>
                <div className="flex flex-col gap-2 font-mono text-xs text-warm-text-muted">
                  <div className="flex justify-between border-b border-warm-border pb-1">
                    <span>4px / space-1</span>
                    <span className="w-1 h-1 bg-warm-text-primary self-center" />
                  </div>
                  <div className="flex justify-between border-b border-warm-border pb-1">
                    <span>8px / space-2</span>
                    <span className="w-2 h-2 bg-warm-text-primary self-center" />
                  </div>
                  <div className="flex justify-between border-b border-warm-border pb-1">
                    <span>16px / space-4</span>
                    <span className="w-4 h-4 bg-warm-text-primary self-center" />
                  </div>
                  <div className="flex justify-between border-b border-warm-border pb-1">
                    <span>24px / space-6</span>
                    <span className="w-6 h-6 bg-warm-text-primary self-center" />
                  </div>
                </div>
              </div>

              <div className="bg-warm-bg border border-warm-border rounded-lg p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans font-semibold text-warm-text-primary">Dock Preview</h4>
                  <p className="font-sans text-sm text-warm-text-secondary">
                    Representing the sticky dock navigation widget background.
                  </p>
                </div>
                <div className="mt-4 bg-warm-dock-bg text-warm-bg p-3 rounded-lg flex justify-around text-xs font-mono">
                  <span className="text-warm-bg font-semibold">Active</span>
                  <span className="opacity-60">Projects</span>
                  <span className="opacity-60">About</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
