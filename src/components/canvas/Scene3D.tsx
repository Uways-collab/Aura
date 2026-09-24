import React, { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Text3D, Center, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TweakpaneSettings } from '../../types';

gsap.registerPlugin(ScrollTrigger);

interface Scene3DProps {
  settings: TweakpaneSettings;
  scrollProgress: number;
  scrollVelocity: number;
}

// Global cursor velocity and position tracking in normalized WebGL coords (-1 to +1)
const pointerVelocity = { x: 0, y: 0, speed: 0 };
let lastPointerTime = performance.now();
let lastPointerPos = { x: 0, y: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    const now = performance.now();
    const dt = Math.max(now - lastPointerTime, 16);
    
    // Normalized coordinates (-1 to 1)
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;

    const dx = normX - lastPointerPos.x;
    const dy = normY - lastPointerPos.y;

    pointerVelocity.x = dx / (dt / 1000);
    pointerVelocity.y = dy / (dt / 1000);
    pointerVelocity.speed = Math.sqrt(pointerVelocity.x * pointerVelocity.x + pointerVelocity.y * pointerVelocity.y);

    lastPointerPos = { x: normX, y: normY };
    lastPointerTime = now;
  });
}

// Central 3D Mesh with Dynamic Wobble, Cursor Distortion & Velocity Physics
function HeroGeometry({
  settings,
  scrollVelocity,
}: {
  settings: TweakpaneSettings;
  scrollVelocity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);
  const currentRotationSpeed = useRef({ x: 0, y: 0, z: 0 });
  const currentWobble = useRef(settings.wobbleFactor);
  const currentWobbleSpeed = useRef(settings.wobbleSpeed);
  const currentScale = useRef(1);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Decay pointer velocity over time for smooth inertia
    pointerVelocity.speed = THREE.MathUtils.lerp(pointerVelocity.speed, 0, delta * 3.5);
    pointerVelocity.x = THREE.MathUtils.lerp(pointerVelocity.x, 0, delta * 3.5);
    pointerVelocity.y = THREE.MathUtils.lerp(pointerVelocity.y, 0, delta * 3.5);

    // Compute instantaneous excitation from both cursor velocity & scroll velocity
    const cursorBoost = Math.min(pointerVelocity.speed * 0.35, 3.0);
    const scrollBoost = Math.min(Math.abs(scrollVelocity) * 0.004, 3.5);
    const totalBoost = cursorBoost + scrollBoost;

    // Calculate dynamic rotation velocities
    const targetRotX = (delta * (settings.rotationSpeed * 0.7 + totalBoost * 0.8)) + (pointerVelocity.y * 0.03);
    const targetRotY = (delta * (settings.rotationSpeed * 0.9 + totalBoost * 1.2)) + (pointerVelocity.x * 0.03);
    const targetRotZ = delta * (settings.rotationSpeed * 0.4 + totalBoost * 0.5);

    currentRotationSpeed.current.x = THREE.MathUtils.lerp(currentRotationSpeed.current.x, targetRotX, delta * 5);
    currentRotationSpeed.current.y = THREE.MathUtils.lerp(currentRotationSpeed.current.y, targetRotY, delta * 5);
    currentRotationSpeed.current.z = THREE.MathUtils.lerp(currentRotationSpeed.current.z, targetRotZ, delta * 5);

    // Apply rotation
    meshRef.current.rotation.x += currentRotationSpeed.current.x;
    meshRef.current.rotation.y += currentRotationSpeed.current.y;
    meshRef.current.rotation.z += currentRotationSpeed.current.z;

    // Scale distortion: mesh warps/stretches under high kinetic velocity
    const targetScale = 1 + Math.min(totalBoost * 0.08, 0.35);
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 6);
    
    // Anisotropic squash and stretch
    meshRef.current.scale.set(
      currentScale.current * (1 + pointerVelocity.x * 0.04),
      currentScale.current * (1 - Math.abs(scrollVelocity) * 0.0002),
      currentScale.current * (1 + pointerVelocity.y * 0.04)
    );

    // Dynamic material wobble responsiveness
    const targetWobble = settings.wobbleFactor + Math.min(totalBoost * 0.45, 1.8);
    const targetWobbleSpeed = settings.wobbleSpeed + Math.min(totalBoost * 1.5, 6.0);

    currentWobble.current = THREE.MathUtils.lerp(currentWobble.current, targetWobble, delta * 4);
    currentWobbleSpeed.current = THREE.MathUtils.lerp(currentWobbleSpeed.current, targetWobbleSpeed, delta * 4);

    if (meshRef.current.material) {
      const mat = meshRef.current.material as any;
      if (mat.factor !== undefined) mat.factor = currentWobble.current;
      if (mat.speed !== undefined) mat.speed = currentWobbleSpeed.current;
    }

    // Outer cyber cage counter-rotates and reacts
    if (outerCageRef.current) {
      outerCageRef.current.rotation.x -= currentRotationSpeed.current.x * 0.7;
      outerCageRef.current.rotation.y -= currentRotationSpeed.current.y * 0.8;
      outerCageRef.current.rotation.z += currentRotationSpeed.current.z * 0.5;
      const cageScale = 1.35 * (1 + Math.min(totalBoost * 0.05, 0.2));
      outerCageRef.current.scale.set(cageScale, cageScale, cageScale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Hero WebGL Mesh */}
      <mesh ref={meshRef}>
        {settings.meshType === 'torusKnot' && (
          <torusKnotGeometry args={[1.5, 0.42, 220, 36, 2, 3]} />
        )}
        {settings.meshType === 'sphere' && (
          <icosahedronGeometry args={[1.8, 16]} />
        )}
        {settings.meshType === 'rings' && (
          <torusGeometry args={[1.8, 0.35, 32, 120]} />
        )}

        <MeshWobbleMaterial
          factor={settings.wobbleFactor}
          speed={settings.wobbleSpeed}
          wireframe={settings.wireframe}
          color={settings.lightColor}
          roughness={0.12}
          metalness={0.88}
          emissive={settings.secondaryLightColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Outer subtle concentric wireframe ring */}
      <mesh ref={outerCageRef} scale={[1.35, 1.35, 1.35]}>
        <torusGeometry args={[2.25, 0.035, 16, 90]} />
        <meshStandardMaterial
          wireframe
          color={settings.secondaryLightColor}
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// 3D Floating Block Letters for "ALCHE" with Physics Float
function FloatingBrandLetters({
  lightColor,
  scrollProgress,
}: {
  lightColor: string;
  scrollProgress: number;
}) {
  const lettersGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!lettersGroupRef.current) return;
    // Slow planetary orbit
    lettersGroupRef.current.rotation.y += delta * 0.2;
    // Scroll progress tilt
    lettersGroupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.4;
    lettersGroupRef.current.rotation.z = Math.cos(scrollProgress * Math.PI * 0.5) * 0.2;
  });

  return (
    <group ref={lettersGroupRef} position={[0, -0.2, 0]}>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <Center position={[0, 0, 0.2]}>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.15}
            height={0.28}
            curveSegments={16}
            bevelEnabled
            bevelThickness={0.035}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={6}
          >
            ALCHE
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.15}
              metalness={0.85}
              wireframe={false}
              emissive={lightColor}
              emissiveIntensity={0.38}
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
}

// Dynamic 360-Degree Scroll-Driven Camera Orbit
function ScrollCameraOrbit({
  scrollProgress,
  cameraSpeed,
}: {
  scrollProgress: number;
  cameraSpeed: number;
}) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 6.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // 1. Subtle pointer parallax
    const px = state.pointer.x * 0.6 * cameraSpeed;
    const py = state.pointer.y * 0.45 * cameraSpeed;

    // 2. Full 360-Degree Camera Orbit
    // progress 0.0 -> angle 0 (front)
    // progress 0.35 (Works gallery) -> zoomed in closer to the 3D core
    // progress 1.0 (Footer) -> orbit completed 360 deg, pulled back
    const orbitAngle = scrollProgress * Math.PI * 2.0; // Complete 360-degree rotation
    
    // Zoom in slightly near project gallery (around scroll 0.25 - 0.45), pull back towards footer
    const zoomInFactor = Math.sin(Math.min(Math.max(scrollProgress * 2.5, 0), Math.PI)) * 1.6;
    const baseRadius = 6.6 - zoomInFactor + (scrollProgress > 0.65 ? (scrollProgress - 0.65) * 3.5 : 0);

    const targetX = Math.sin(orbitAngle) * baseRadius + px;
    const targetY = -scrollProgress * 2.8 + py + Math.cos(orbitAngle * 0.5) * 0.6;
    const targetZ = Math.cos(orbitAngle) * baseRadius;

    currentPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 2.8);
    camera.position.copy(currentPos.current);

    // Look at target: shifts slightly as you scroll down
    const targetLookAt = new THREE.Vector3(
      Math.sin(orbitAngle * 0.8) * 0.5,
      -scrollProgress * 1.6,
      0
    );
    currentLookAt.current.lerp(targetLookAt, delta * 3.2);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  settings,
  scrollProgress,
  scrollVelocity,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#08080c']} />
        
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.55} />
        
        {/* Key Directional Light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.9}
          color="#ffffff"
        />

        {/* Hyper Cyan Fill Light */}
        <pointLight
          position={[-6, 2, 4]}
          intensity={2.8}
          color={settings.lightColor}
          distance={18}
        />

        {/* Electric Violet Rim Light */}
        <pointLight
          position={[6, -4, -3]}
          intensity={3.5}
          color={settings.secondaryLightColor}
          distance={20}
        />

        {/* Soft Underglow Light */}
        <pointLight
          position={[0, -5, 2]}
          intensity={1.4}
          color="#06b6d4"
          distance={14}
        />

        {/* Particle Universe */}
        <Sparkles
          count={settings.particleCount}
          scale={[15, 15, 15]}
          size={2.4}
          speed={0.4}
          noise={0.3}
          color={settings.lightColor}
        />
        <Sparkles
          count={Math.floor(settings.particleCount * 0.6)}
          scale={[18, 18, 18]}
          size={1.6}
          speed={0.2}
          noise={0.5}
          color={settings.secondaryLightColor}
        />

        <Suspense fallback={null}>
          {/* Hero 3D Mesh with Wobble, Cursor Distortion and Scroll Excitation */}
          <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.5}>
            <HeroGeometry
              settings={settings}
              scrollVelocity={scrollVelocity}
            />
          </Float>

          {/* Floating 3D Block Text */}
          <FloatingBrandLetters
            lightColor={settings.lightColor}
            scrollProgress={scrollProgress}
          />
        </Suspense>

        {/* 360-Degree Camera Orbit */}
        <ScrollCameraOrbit
          scrollProgress={scrollProgress}
          cameraSpeed={settings.cameraSpeed}
        />
      </Canvas>
    </div>
  );
};
