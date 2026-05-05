"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { submitContact } from "@/app/actions/contact";
import SectionWrapper from "@/components/ui/SectionWrapper";
import type { ContactFormState } from "@/lib/schemas";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 rounded-xl font-bold text-sm tracking-[0.15em] uppercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      style={{
        fontFamily: "var(--font-heading), sans-serif",
        background: "linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7)",
        color: "#ffffff",
        boxShadow: "0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.15)",
      }}
    >
      {pending ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Transmitting...
        </>
      ) : (
        "⚡ Transmit Signal"
      )}
    </button>
  );
}

export default function SignalTransmission() {
  const [state, formAction] = useActionState<ContactFormState, FormData>(submitContact, null);

  return (
    <SectionWrapper id="signal-transmission" label="SIGNAL_TRANSMISSION">
      <div className="text-center mb-16">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading), sans-serif" }}
        >
          <span className="text-text-muted">[</span>{" "}
          <span className="galaxy-text">Signal Transmission</span>{" "}
          <span className="text-text-muted">]</span>
        </h2>
        <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-magenta to-transparent" />
        <p className="mt-4 text-text-secondary text-sm md:text-base max-w-xl mx-auto">
          Open a communication channel. All transmissions are encrypted and secure.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Status decorators */}
        <div
          className="flex items-center justify-between mb-6 text-[10px] tracking-[0.2em] uppercase text-text-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span>FREQ: 42.7 GHz</span>
          <span>CHANNEL: OPEN</span>
          <span>LAT: -6.2° | LON: 106.8°</span>
        </div>

        {/* Form card — stronger visibility */}
        <div
          className="rounded-2xl p-8 md:p-10 relative"
          style={{
            background: "rgba(15, 10, 40, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(124, 58, 237, 0.35)",
            boxShadow:
              "0 0 40px rgba(124, 58, 237, 0.1), 0 0 80px rgba(79, 70, 229, 0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Corner decorators */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple/50 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple/50 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple/50 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple/50 rounded-br-2xl" />

          {/* Status message */}
          <AnimatePresence mode="wait">
            {state && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                  state.success
                    ? "bg-green-500/15 border border-green-500/30 text-green-400"
                    : "bg-red-500/15 border border-red-500/30 text-red-400"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {state.success ? "✓ " : "✗ "}
                {state.message}
              </motion.div>
            )}
          </AnimatePresence>

          <form action={formAction} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs tracking-[0.15em] uppercase mb-2 font-medium"
                style={{ fontFamily: "var(--font-mono)", color: "#c8c4d4" }}
              >
                Callsign (Name)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3.5 rounded-xl text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-300"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  background: "rgba(20, 15, 50, 0.8)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.7)";
                  e.target.style.boxShadow = "0 0 20px rgba(124, 58, 237, 0.2), inset 0 0 20px rgba(124, 58, 237, 0.05)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.3)";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your callsign..."
              />
              {state?.errors?.name && (
                <p className="mt-1.5 text-xs text-red-400">{state.errors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs tracking-[0.15em] uppercase mb-2 font-medium"
                style={{ fontFamily: "var(--font-mono)", color: "#c8c4d4" }}
              >
                Frequency (Email)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3.5 rounded-xl text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-300"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  background: "rgba(20, 15, 50, 0.8)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.7)";
                  e.target.style.boxShadow = "0 0 20px rgba(124, 58, 237, 0.2), inset 0 0 20px rgba(124, 58, 237, 0.05)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.3)";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="your@frequency.com"
              />
              {state?.errors?.email && (
                <p className="mt-1.5 text-xs text-red-400">{state.errors.email[0]}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs tracking-[0.15em] uppercase mb-2 font-medium"
                style={{ fontFamily: "var(--font-mono)", color: "#c8c4d4" }}
              >
                Signal Type (Subject)
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3.5 rounded-xl text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-300"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  background: "rgba(20, 15, 50, 0.8)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.7)";
                  e.target.style.boxShadow = "0 0 20px rgba(124, 58, 237, 0.2), inset 0 0 20px rgba(124, 58, 237, 0.05)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.3)";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Transmission subject..."
              />
              {state?.errors?.subject && (
                <p className="mt-1.5 text-xs text-red-400">{state.errors.subject[0]}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs tracking-[0.15em] uppercase mb-2 font-medium"
                style={{ fontFamily: "var(--font-mono)", color: "#c8c4d4" }}
              >
                Payload (Message)
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3.5 rounded-xl text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-300 resize-none"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  background: "rgba(20, 15, 50, 0.8)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.7)";
                  e.target.style.boxShadow = "0 0 20px rgba(124, 58, 237, 0.2), inset 0 0 20px rgba(124, 58, 237, 0.05)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(124, 58, 237, 0.3)";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your transmission..."
              />
              {state?.errors?.message && (
                <p className="mt-1.5 text-xs text-red-400">{state.errors.message[0]}</p>
              )}
            </div>

            <SubmitButton />
          </form>
        </div>

        {/* Transmission status footer */}
        <div
          className="mt-4 text-center text-[10px] tracking-[0.2em] uppercase text-text-muted"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ◉ ENCRYPTION: AES-256 | STATUS: SECURE
        </div>
      </div>
    </SectionWrapper>
  );
}
