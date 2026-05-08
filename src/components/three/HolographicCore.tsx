"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const holoVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vPosition = worldPosition.xyz;
    vUv = uv;
    vViewDir = normalize(cameraPosition - vPosition);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const holoFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uFresnelPower;
  uniform float uScrollVelocity;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vViewDir;

  // Simple noise function for procedural terrain
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i + vec3(0, 0, 0)), hash(i + vec3(1, 0, 0)), f.x),
                   mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
               mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
                   mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);
    for (int i = 0; i < 5; ++i) {
      v += a * noise(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // 1. Fresnel effect for atmospheric glow
    float fresnel = pow(1.0 - max(dot(vViewDir, vNormal), 0.0), uFresnelPower);
    
    // 2. Procedural Surface (Terrain/Clouds)
    vec3 surfacePos = vNormal * 2.5 + vec3(uTime * 0.05);
    float terrain = fbm(surfacePos);
    float clouds = fbm(surfacePos * 1.5 + vec3(uTime * 0.1));
    
    // 3. Lighting (Day/Night)
    vec3 lightDir = normalize(vec3(5.0, 5.0, 5.0));
    float diff = max(dot(vNormal, lightDir), 0.1);
    
    // 4. Color Palette (Earth-like: Blue oceans, Green/Brown land)
    vec3 deepOcean = vec3(0.02, 0.15, 0.4) * uColor;
    vec3 shallowWater = vec3(0.05, 0.4, 0.6) * uColor;
    vec3 land = vec3(0.1, 0.5, 0.15); // Lush Green
    vec3 mountains = vec3(0.4, 0.35, 0.25); // Brown
    vec3 snow = vec3(0.95, 0.95, 1.0); // Polar caps
    
    // Mix terrain layers based on noise
    vec3 terrainColor = mix(deepOcean, shallowWater, smoothstep(0.45, 0.52, terrain));
    terrainColor = mix(terrainColor, land, smoothstep(0.52, 0.55, terrain));
    terrainColor = mix(terrainColor, mountains, smoothstep(0.65, 0.72, terrain));
    terrainColor = mix(terrainColor, snow, smoothstep(0.78, 0.85, terrain));
    
    // Add clouds (White, moving differently)
    vec3 finalColor = mix(terrainColor, vec3(1.0), smoothstep(0.55, 0.85, clouds) * 0.6);
    
    // Apply lighting and fresnel (Atmospheric blue glow)
    finalColor *= diff;
    vec3 atmosphereColor = vec3(0.3, 0.6, 1.0); // Light blue atmosphere
    finalColor += fresnel * atmosphereColor * 1.2;
    
    // 5. HUD Scanlines (Keep the holographic feel but more 'real')
    float scanline = sin(vUv.y * 200.0 + uTime) * 0.5 + 0.5;
    finalColor += scanline * 0.03 * uColor;
    
    // Add data glitches on fast scroll
    float glitch = step(0.98, fract(vUv.y * 10.0 + uTime * 5.0)) * uScrollVelocity * 0.5;
    finalColor += glitch * vec3(1.0);

    gl_FragColor = vec4(finalColor, 0.95);
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
  
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const targetPosY = useRef(0);

  const holoUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#00f0ff") },
      uFresnelPower: { value: 2.5 },
      uScrollVelocity: { value: 0 },
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
      uColor: { value: new THREE.Color("#ff00e5") },
    }),
    []
  );

  useFrame((_, delta) => {
    // 1. Calculate scroll velocity and target position
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollY.current;
    
    scrollVelocity.current = THREE.MathUtils.lerp(
      scrollVelocity.current,
      deltaY * 0.1, 
      0.1
    );
    lastScrollY.current = currentScrollY;

    // Smoothly update vertical position based on scroll (Parallax removed per user request)
    // We keep the planet centered but maintain other dynamic animations
    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.05);
      
      // Dynamic Scaling: Zoom in slightly then zoom out as we scroll deeper
      const zoomFactor = Math.sin(currentScrollY * 0.001) * 0.15;
      const baseScale = THREE.MathUtils.lerp(1.0, 0.7, Math.min(currentScrollY * 0.0003, 0.5));
      const scale = baseScale + zoomFactor;
      groupRef.current.scale.setScalar(scale);
      
      // Dynamic Tilting: The planet tilts its axis as you scroll
      const tiltX = -pointer.y * 0.2 + (currentScrollY * 0.0002);
      const tiltZ = currentScrollY * 0.00015;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, tiltX, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tiltZ, 0.05);
      
      // Add a 'Floating' bobbing motion that intensifies with scroll velocity
      const bobbing = Math.sin(_.clock.elapsedTime * 2.0) * (0.05 + Math.abs(scrollVelocity.current) * 0.02);
      groupRef.current.position.y = bobbing; // Relative to center
    }

    // 2. Update Uniforms with intensified reactivity
    const speedBoost = Math.abs(scrollVelocity.current) * 3.0;
    const time = holoUniforms.uTime.value + delta * (1 + speedBoost);
    
    holoUniforms.uTime.value = time;
    // Intensified scroll velocity for shader glitches
    holoUniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
      holoUniforms.uScrollVelocity.value,
      Math.abs(scrollVelocity.current) * 2.0,
      0.1
    );
    ring1Uniforms.uTime.value = time;
    ring2Uniforms.uTime.value = time;

    // Atmospheric reactivity: Make it 'flare' during fast scrolls
    holoUniforms.uFresnelPower.value = THREE.MathUtils.lerp(
      2.5, 
      0.3, 
      Math.min(Math.abs(scrollVelocity.current) * 0.8, 1.0)
    );

    // 3. Mouse Parallax / Direct Rotation
    if (groupRef.current) {
      // Significantly increase rotation based on cursor position
      const targetRotY = pointer.x * Math.PI * 0.5 + (currentScrollY * 0.0002);
      const targetRotX = -pointer.y * Math.PI * 0.3 + (currentScrollY * 0.0001);
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      );
      
      // Merge with the dynamic tilt logic
      const dynamicTiltX = -pointer.y * 0.5 + (currentScrollY * 0.0002);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, dynamicTiltX, 0.05);
    }

    // 4. Auto-rotation & Aggressive scroll boost
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.12 + scrollVelocity.current * 0.08;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.2 + scrollVelocity.current * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.15 - scrollVelocity.current * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main realistic planet sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <shaderMaterial
          vertexShader={holoVertexShader}
          fragmentShader={holoFragmentShader}
          uniforms={holoUniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmospheric layer (soft glow) */}
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Subtle wireframe overlay (for HUD feel) */}
      <mesh>
        <sphereGeometry args={[1.31, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.0, 0.01, 16, 100]} />
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
        <torusGeometry args={[2.4, 0.008, 16, 100]} />
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
      <OrbitDots count={12} radius={2.0} color="#00f0ff" speed={0.25} rotation={[Math.PI / 2.5, 0, 0]} />
      <OrbitDots count={8} radius={2.4} color="#ff00e5" speed={-0.15} rotation={[Math.PI / 1.8, Math.PI / 4, 0]} />
    </group>
  );
}

function OrbitDots({
  count,
  radius,
  color,
  speed,
  rotation,
}: {
  count: number;
  radius: number;
  color: string;
  speed: number;
  rotation: [number, number, number];
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
    <group ref={groupRef} rotation={rotation}>
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
