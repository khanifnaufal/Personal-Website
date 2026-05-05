"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import { Starfield } from "./Starfield";
import { Nebula } from "./Nebula";
import { HolographicCore } from "./HolographicCore";

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "#030014" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <pointLight position={[10, 10, 10]} intensity={0.3} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.15} color="#7b2fff" />

          <Starfield />
          <Nebula />
          <HolographicCore />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
