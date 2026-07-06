"use client";

const TIMELINE = [
  {
    year: "2024–Present",
    role: "Full-Stack & ML Engineer",
    place: "Freelance / Open Source",
    desc: "Building production Next.js applications and deploying fine-tuned LLM pipelines.",
  },
  {
    year: "2023–2024",
    role: "Research Assistant — NLP",
    place: "University Lab",
    desc: "Developed sequence labeling models using BERT variants on Indonesian-language corpora.",
  },
  {
    year: "2022–2023",
    role: "Frontend Developer",
    place: "Internship",
    desc: "Delivered React-based UI systems integrated with Spring Boot microservices.",
  },
  {
    year: "2020–2024",
    role: "B.Sc. Informatics",
    place: "University",
    desc: "Graduated with focus on software engineering and intelligent systems.",
  },
];

export default function HistorySection() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
      {/* Eyebrow */}
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6">
        Experience
      </p>

      <h2 className="font-sans text-3xl md:text-4xl font-semibold text-warm-text-primary mb-10">
        Timeline
      </h2>

      <div className="max-w-3xl space-y-0">
        {TIMELINE.map((item, i) => (
          <div
            key={i}
            className={`grid grid-cols-[120px_1fr] gap-6 py-5 ${
              i < TIMELINE.length - 1 ? "border-b border-warm-border" : ""
            }`}
          >
            {/* Year */}
            <span className="font-mono text-xs text-warm-text-muted leading-relaxed pt-0.5">
              {item.year}
            </span>

            {/* Content */}
            <div className="space-y-1">
              <p className="font-sans text-sm font-medium text-warm-text-primary">
                {item.role}
                <span className="font-normal text-warm-text-muted mx-2">·</span>
                <span className="text-warm-text-secondary">{item.place}</span>
              </p>
              <p className="font-sans text-sm text-warm-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Corner mark */}
      <div className="absolute bottom-8 right-8 md:right-16 font-mono text-[10px] tracking-widest text-warm-text-muted uppercase">
        03 / 05
      </div>
    </div>
  );
}
