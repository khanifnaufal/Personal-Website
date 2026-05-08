import SceneLoader from "@/components/three/SceneLoader";
import HudNavigation from "@/components/ui/HudNavigation";
import SectionDivider from "@/components/ui/SectionDivider";
import BaseStation from "@/components/sections/BaseStation";
import PilotProfile from "@/components/sections/PilotProfile";
import FlightHistory from "@/components/sections/FlightHistory";
import MissionLogs from "@/components/sections/MissionLogs";
import SignalTransmission from "@/components/sections/SignalTransmission";
import { getGithubProjects } from "@/lib/github";

export default async function Home() {
  const githubProjects = await getGithubProjects();

  return (
    <main className="relative">
      {/* Fixed 3D background */}
      <SceneLoader />

      {/* Floating HUD Navigation */}
      <HudNavigation />

      {/* Content sections layered above 3D */}
      <div className="relative z-10">
        <BaseStation />

        <SectionDivider />
        <PilotProfile />

        <SectionDivider variant="purple" />
        <FlightHistory />

        <SectionDivider variant="magenta" />
        <MissionLogs projects={githubProjects} />

        <SectionDivider />
        <SignalTransmission />

        {/* Footer */}
        <footer className="relative py-6 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-text-secondary text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              © {new Date().getFullYear()} Muhammad Khanif Naufal
            </p>
            <div className="flex items-center gap-2 text-text-secondary text-xs" style={{ fontFamily: "var(--font-mono)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
