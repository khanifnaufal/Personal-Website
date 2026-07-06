"use client";

const TRAITS = [
  { label: "Specialty", value: "Full-Stack & ML Engineering" },
  { label: "Languages", value: "TypeScript, Python, Go" },
  { label: "Focus", value: "Scalable systems, data-driven interfaces" },
  { label: "Location", value: "Indonesia" },
  { label: "Available", value: "Open to new opportunities" },
];

export default function ProfileSection() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
      {/* Eyebrow */}
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6">
        About
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl">
        {/* Left: bio */}
        <div className="space-y-4">
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-warm-text-primary leading-snug">
            Who I am
          </h2>
          <p className="font-sans text-base text-warm-text-secondary leading-relaxed">
            I'm a software engineer who cares about both the correctness of a
            system and the clarity of its interface. I've shipped full-stack web
            applications, REST and GraphQL APIs, and end-to-end ML pipelines
            from experimentation to deployment.
          </p>
          <p className="font-sans text-base text-warm-text-secondary leading-relaxed">
            I approach every project as an opportunity to learn something that
            didn't exist in my toolbox before.
          </p>
        </div>

        {/* Right: trait table */}
        <div className="space-y-0">
          {TRAITS.map((trait, i) => (
            <div
              key={trait.label}
              className={`flex justify-between items-baseline py-4 ${
                i < TRAITS.length - 1 ? "border-b border-warm-border" : ""
              }`}
            >
              <span className="font-mono text-xs tracking-wider text-warm-text-muted uppercase w-32 shrink-0">
                {trait.label}
              </span>
              <span className="font-sans text-sm text-warm-text-primary text-right">
                {trait.value}
              </span>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
