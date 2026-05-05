"use client";

import { motion } from "framer-motion";
import { PILOT_PROFILE } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";

const SOCIAL_CHANNELS = [
  {
    id: "email",
    label: "Email",
    value: PILOT_PROFILE.email,
    link: `mailto:${PILOT_PROFILE.email}`,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "cyan",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Khanif Naufal",
    link: PILOT_PROFILE.links.linkedin,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    color: "purple",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@khanifnaufal",
    link: PILOT_PROFILE.links.instagram,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    color: "magenta",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Secure Channel",
    link: PILOT_PROFILE.links.whatsapp,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    color: "green",
  },
];

const colorVariants: Record<string, string> = {
  cyan: "from-cyan/20 to-cyan/5 border-cyan/30 text-cyan hover:border-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]",
  purple: "from-purple/20 to-purple/5 border-purple/30 text-purple hover:border-purple hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]",
  magenta: "from-magenta/20 to-magenta/5 border-magenta/30 text-magenta hover:border-magenta hover:shadow-[0_0_20px_rgba(255,0,229,0.2)]",
  green: "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]",
};

export default function SignalTransmission() {
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
          Established secure communication channels. Select a frequency to transmit your message.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SOCIAL_CHANNELS.map((channel, index) => (
          <motion.a
            key={channel.id}
            href={channel.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br border transition-all duration-300 group ${colorVariants[channel.color]}`}
          >
            <div className={`p-4 rounded-xl bg-space-black border border-current flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
              {channel.icon}
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase opacity-70 mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                {channel.label} CHANNEL
              </p>
              <p className="text-lg font-bold text-text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                {channel.value}
              </p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>

      <div
        className="mt-12 text-center text-[10px] tracking-[0.2em] uppercase text-text-muted"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        ◉ ALL TRANSMISSIONS ARE ENCRYPTED | STATUS: SECURE
      </div>
    </SectionWrapper>
  );
}
