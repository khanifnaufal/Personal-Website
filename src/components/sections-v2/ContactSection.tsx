"use client";

const LINKS = [
  { label: "Email", value: "khanif@example.com", href: "mailto:khanif@example.com" },
  { label: "GitHub", value: "github.com/khanifnaufal", href: "https://github.com/khanifnaufal" },
  { label: "LinkedIn", value: "linkedin.com/in/khanifnaufal", href: "https://linkedin.com/in/khanifnaufal" },
];

export default function ContactSection() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
      {/* Eyebrow */}
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6">
        Contact
      </p>

      <div className="max-w-2xl space-y-10">
        <h2 className="font-sans text-3xl md:text-4xl font-semibold text-warm-text-primary leading-snug">
          Let's build something
          <br />
          worth shipping.
        </h2>

        <p className="font-sans text-base text-warm-text-secondary leading-relaxed">
          Open to full-time roles, contract work, and research collaborations.
          Reach out through any channel below — I respond within 24 hours.
        </p>

        {/* Contact table */}
        <div className="space-y-0">
          {LINKS.map((link, i) => (
            <div
              key={link.label}
              className={`flex justify-between items-baseline py-4 ${
                i < LINKS.length - 1 ? "border-b border-warm-border" : ""
              }`}
            >
              <span className="font-mono text-xs tracking-wider text-warm-text-muted uppercase w-24 shrink-0">
                {link.label}
              </span>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="font-sans text-sm text-warm-text-primary hover:text-warm-text-secondary transition-colors duration-150 cursor-pointer"
              >
                {link.value}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Corner mark */}
      <div className="absolute bottom-8 right-8 md:right-16 font-mono text-[10px] tracking-widest text-warm-text-muted uppercase">
        05 / 05
      </div>
    </div>
  );
}
