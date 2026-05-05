"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const holoVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const holoFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uFresnelPower;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    // Fresnel effect for edge glow
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), uFresnelPower);

    // Scanlines
    float scanline = sin(vUv.y * 80.0 + uTime * 2.0) * 0.5 + 0.5;
    scanline = smoothstep(0.3, 0.7, scanline) * 0.15;

    // Horizontal data lines
    float dataLine = step(0.98, fract(vUv.y * 20.0 + uTime * 0.5));
    dataLine *= step(0.5, fract(vUv.x * 10.0 + uTime));

    // Combine effects
    float alpha = fresnel * 0.6 + scanline + dataLine * 0.3;
    alpha = clamp(alpha, 0.0, 1.0);

    // Color with slight variation
    vec3 color = uColor;
    color += fresnel * vec3(0.1, 0.3, 0.5);
    color += dataLine * vec3(0.0, 0.5, 1.0) * 0.3;

    gl_FragColor = vec4(color, alpha * 0.7);
  }
`;

const ringVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    float pulse = sin(uTime * 1.5) * 0.2 + 0.8;
    float glow = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    float sweep = fract(vUv.x - uTime * 0.15);
    float sweepGlow = smoothstep(0.0, 0.1, sweep) * smoothstep(0.3, 0.1, sweep);

    vec3 color = uColor * pulse;
    float alpha = glow * 0.4 + sweepGlow * 0.3;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function HolographicCore() {
  const groupRef = useRef<THREE.Group>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  const holoUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#00f0ff") },
      uFresnelPower: { value: 2.5 },
    }),
    []
  );

  const ring1Uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#00f0ff") },
    }),
    []
  );

  const ring2Uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#7b2fff") },
    }),
    []
  );

  useFrame((_, delta) => {
    const time = holoUniforms.uTime.value + delta;
    holoUniforms.uTime.value = time;
    ring1Uniforms.uTime.value = time;
    ring2Uniforms.uTime.value = time;

    // Mouse parallax with smooth lerp
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.4,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.3,
        0.05
      );
    }

    // Auto-rotate sphere slowly
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.15;
    }

    // Rotate rings independently
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main holographic sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <shaderMaterial
          vertexShader={holoVertexShader}
          fragmentShader={holoFragmentShader}
          uniforms={holoUniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[1.22, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial
          color="#0a1a3a"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.8, 0.008, 16, 100]} />
        <shaderMaterial
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={ring1Uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 1.8, Math.PI / 4, 0]}>
        <torusGeometry args={[2.1, 0.006, 16, 100]} />
        <shaderMaterial
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={ring2Uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Small orbiting particles */}
      <OrbitDots count={8} radius={1.8} color="#00f0ff" speed={0.3} />
      <OrbitDots count={5} radius={2.1} color="#7b2fff" speed={-0.2} />
    </group>
  );
}

function OrbitDots({
  count,
  radius,
  color,
  speed,
}: {
  count: number;
  radius: number;
  color: string;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * speed;
    }
  });

  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0,
        ] as [number, number, number],
        scale: 0.02 + Math.random() * 0.02,
      };
    });
  }, [count, radius]);

  return (
    <group ref={groupRef} rotation={[Math.PI / 2.5, 0, 0]}>
      {dots.map((dot, i) => (
        <mesh key={i} position={dot.position}>
          <sphereGeometry args={[dot.scale, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
