"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/app/actions/contact";
import { contactSchema } from "@/lib/schemas";

const LINKS = [
  { label: "Email", value: "mkhanif86@gmail.com", href: "mailto:mkhanif86@gmail.com" },
  { label: "GitHub", value: "github.com/khanifnaufal", href: "https://github.com/khanifnaufal" },
  { label: "LinkedIn", value: "linkedin.com/in/khanifnaufal", href: "https://www.linkedin.com/in/khanif-naufal/" },
];

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      // 1. Client-side Zod validation
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const subject = formData.get("subject") as string;
      const message = formData.get("message") as string;

      const result = contactSchema.safeParse({
        name,
        email,
        subject,
        message,
      });

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        return {
          success: false,
          errors: fieldErrors,
          message: "Validation failed. Please check your inputs.",
        };
      }

      // 2. Call the server action
      return await submitContact(prevState, formData);
    },
    null
  );

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 overflow-y-auto">
      {/* Eyebrow */}
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6 md:mb-8 shrink-0">
        Contact
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start max-w-6xl w-full">
        {/* Left Column: Heading + Intro + Social Links */}
        <div className="lg:col-span-5 space-y-8 md:space-y-10">
          <div className="space-y-4">
            <h2 className="font-sans text-3xl md:text-4xl font-semibold text-warm-text-primary leading-snug">
              Let's build something
              <br />
              worth shipping.
            </h2>

            <p className="font-sans text-base text-warm-text-secondary leading-relaxed">
              Open to full-time roles, contract work, and research collaborations.
              Reach out through any channel here.<br /> I'll respond within 24 hours.
            </p>
          </div>

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

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 w-full bg-warm-surface/20 border border-warm-border/50 rounded-lg p-6 md:p-8 space-y-6">
          <form action={formAction} ref={formRef} className="space-y-5">
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-[10px] tracking-wider uppercase text-warm-text-muted mb-1.5"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  disabled={isPending}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 rounded border border-warm-border text-warm-text-primary bg-transparent font-sans text-sm placeholder:text-warm-text-muted focus:outline-none focus:border-warm-text-primary focus:bg-warm-surface/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {state?.errors?.name && (
                  <p className="text-red-600 font-mono text-[11px] mt-1">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] tracking-wider uppercase text-warm-text-muted mb-1.5"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled={isPending}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded border border-warm-border text-warm-text-primary bg-transparent font-sans text-sm placeholder:text-warm-text-muted focus:outline-none focus:border-warm-text-primary focus:bg-warm-surface/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {state?.errors?.email && (
                  <p className="text-red-600 font-mono text-[11px] mt-1">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block font-mono text-[10px] tracking-wider uppercase text-warm-text-muted mb-1.5"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  disabled={isPending}
                  placeholder="What is this about?"
                  className="w-full px-3.5 py-2.5 rounded border border-warm-border text-warm-text-primary bg-transparent font-sans text-sm placeholder:text-warm-text-muted focus:outline-none focus:border-warm-text-primary focus:bg-warm-surface/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {state?.errors?.subject && (
                  <p className="text-red-600 font-mono text-[11px] mt-1">
                    {state.errors.subject[0]}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-[10px] tracking-wider uppercase text-warm-text-muted mb-1.5"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  disabled={isPending}
                  rows={4}
                  placeholder="Your message details..."
                  className="w-full px-3.5 py-2.5 rounded border border-warm-border text-warm-text-primary bg-transparent font-sans text-sm placeholder:text-warm-text-muted focus:outline-none focus:border-warm-text-primary focus:bg-warm-surface/25 transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {state?.errors?.message && (
                  <p className="text-red-600 font-mono text-[11px] mt-1">
                    {state.errors.message[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Status Alerts */}
            {state && (
              <div className="pt-1">
                {state.success ? (
                  <div className="p-3 bg-warm-surface border border-warm-border text-warm-text-primary rounded text-xs font-sans flex items-start gap-2">
                    <span className="text-warm-text-secondary font-bold">✓</span>
                    <p>{state.message}</p>
                  </div>
                ) : (
                  (!state.errors || Object.keys(state.errors).length === 0) && (
                    <div className="p-3 bg-red-50/50 border border-red-200 text-red-800 rounded text-xs font-sans flex items-start gap-2">
                      <span className="text-red-600 font-bold">✕</span>
                      <p>{state.message}</p>
                    </div>
                  )
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 px-4 bg-warm-dock-bg text-warm-bg hover:bg-warm-dock-bg/90 active:scale-[0.99] transition-all duration-150 font-sans text-sm font-medium rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-warm-text-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-warm-bg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

