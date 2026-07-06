"use client";

const PROJECTS = [
  {
    name: "Personal Portfolio",
    stack: "Next.js · TypeScript · Tailwind v4",
    desc: "This site — fullpage layout, design-token-driven, minimalist-monochrome.",
    status: "Live",
  },
  {
    name: "NLP Sequence Labeler",
    stack: "Python · HuggingFace · FastAPI",
    desc: "Fine-tuned IndoBERT for named-entity recognition on Indonesian clinical text.",
    status: "Research",
  },
  {
    name: "Inventory Management System",
    stack: "Next.js · Spring Boot · PostgreSQL",
    desc: "Multi-tenant SaaS inventory platform with role-based access control.",
    status: "Production",
  },
  {
    name: "Real-time Dashboard",
    stack: "React · WebSocket · Redis",
    desc: "Live ops dashboard streaming sensor metrics at 60 fps with server-side aggregation.",
    status: "Production",
  },
];

const STATUS_STYLE: Record<string, string> = {
  Live: "text-warm-text-primary border border-warm-border",
  Research: "text-warm-text-muted border border-warm-border",
  Production: "text-warm-text-primary border border-warm-text-primary",
};

export default function ProjectsSection() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
      {/* Eyebrow */}
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6">
        Work
      </p>

      <h2 className="font-sans text-3xl md:text-4xl font-semibold text-warm-text-primary mb-10">
        Selected Projects
      </h2>

      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0">
        {PROJECTS.map((project, i) => {
          const isRight = i % 2 === 1;
          const isBottom = i >= 2;
          return (
            <div
              key={project.name}
              className={[
                "p-6 space-y-2",
                !isRight ? "md:border-r border-warm-border" : "",
                !isBottom ? "border-b border-warm-border" : "",
                i === 0 ? "" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-sans text-sm font-semibold text-warm-text-primary">
                  {project.name}
                </h3>
                <span
                  className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm shrink-0 ${
                    STATUS_STYLE[project.status]
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="font-mono text-[11px] text-warm-text-muted tracking-wide">
                {project.stack}
              </p>
              <p className="font-sans text-sm text-warm-text-secondary leading-relaxed">
                {project.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Corner mark */}
      <div className="absolute bottom-8 right-8 md:right-16 font-mono text-[10px] tracking-widest text-warm-text-muted uppercase">
        04 / 05
      </div>
    </div>
  );
}
