"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-black">
      {/* Animated loading ring */}
      <div className="relative w-20 h-20 mb-8">
        <div
          className="absolute inset-0 rounded-full border border-cyan/30"
          style={{
            animation: "spin 3s linear infinite",
          }}
        />
        <div
          className="absolute inset-2 rounded-full border border-purple/30"
          style={{
            animation: "spin 2s linear infinite reverse",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
        </div>
      </div>

      {/* Loading text */}
      <p
        className="text-xs tracking-[0.3em] uppercase text-text-muted"
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        Initializing Command Center...
      </p>

      {/* Progress bar */}
      <div className="mt-4 w-48 h-[2px] bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan to-purple rounded-full"
          style={{
            animation: "loadingBar 2s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes loadingBar {
          0% {
            width: 0%;
            margin-left: 0;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
