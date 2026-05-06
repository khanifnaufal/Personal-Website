"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export function Starfield() {
  const ref = useRef<THREE.Points>(null!);
  const { pointer } = useThree();
  const isWarping = useRef(false);

  useEffect(() => {
    const handleWarp = () => {
      isWarping.current = true;
      setTimeout(() => {
        isWarping.current = false;
      }, 1200); // durasi warp
    };
    window.addEventListener("nav-warp", handleWarp);
    return () => window.removeEventListener("nav-warp", handleWarp);
  }, []);

  const particles = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a sphere
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      sizes[i] = Math.random() * 0.8 + 0.2;
    }

    return { positions, originalPositions, sizes };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;

    // Normal rotation
    ref.current.rotation.y += delta * 0.008;
    ref.current.rotation.x += delta * 0.003;

    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    let needsUpdate = false;

    // Hitung posisi mouse di ruang lokal (local space) point cloud
    // Asumsi jarak kamera sekitar z=5 sampai z=15
    const localMouse = new THREE.Vector3(pointer.x * 25, pointer.y * 25, 5);
    ref.current.worldToLocal(localMouse);

    for (let i = 0; i < 4000; i++) {
      const i3 = i * 3;
      const ox = particles.originalPositions[i3];
      const oy = particles.originalPositions[i3 + 1];
      const oz = particles.originalPositions[i3 + 2];

      let cx = positions[i3];
      let cy = positions[i3 + 1];
      let cz = positions[i3 + 2];

      // 1. Warp Speed Effect
      if (isWarping.current) {
        cz += delta * 250; // melaju super cepat ke arah kamera
        if (cz > 20) {
          cz = -50; // wrap around ke belakang
        }
        needsUpdate = true;
      } else {
        // Kembali ke Z awal dengan smooth
        if (Math.abs(cz - oz) > 0.1) {
          cz = THREE.MathUtils.lerp(cz, oz, 0.05);
          needsUpdate = true;
        }
      }

      // 2. Repulsive Mouse Effect
      if (!isWarping.current) {
        const dx = ox - localMouse.x;
        const dy = oy - localMouse.y;
        // Hanya tolak bintang yang lumayan dekat dengan sumbu Z kamera
        const dz = oz - localMouse.z; 
        
        const distSq = dx * dx + dy * dy + (dz * dz * 0.2); 

        if (distSq < 40) { // radius dorongan
          const force = (40 - distSq) / 40;
          cx += dx * force * 0.08;
          cy += dy * force * 0.08;
          needsUpdate = true;
        }
      }

      // 3. Spring back ke X dan Y semula
      if (Math.abs(cx - ox) > 0.01 || Math.abs(cy - oy) > 0.01) {
        cx = THREE.MathUtils.lerp(cx, ox, 0.08);
        cy = THREE.MathUtils.lerp(cy, oy, 0.08);
        needsUpdate = true;
      }

      positions[i3] = cx;
      positions[i3 + 1] = cy;
      positions[i3 + 2] = cz;
    }

    if (needsUpdate) {
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points
      ref={ref}
      positions={particles.positions}
      sizes={particles.sizes}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color={isWarping.current ? "#ffffff" : "#cceeff"}
        size={0.07}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={1.0}
      />
    </Points>
  );
}
