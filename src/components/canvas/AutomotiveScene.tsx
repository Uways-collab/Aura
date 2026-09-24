import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { CarSettings } from '../../types';
import { SupercarMesh } from './SupercarMesh';
import { PorscheTaycan } from './PorscheTaycan';

interface AutomotiveSceneProps {
  settings: CarSettings;
  scrollProgress: number;
  scrollVelocity: number;
}

// Responsive Camera Controller with Mobile-Aware Screen Aspect Ratio Calculation
function CameraInspectionController({
  scrollProgress,
  scrollVelocity,
  sensitivity,
}: {
  scrollProgress: number;
  scrollVelocity: number;
  sensitivity: number;
}) {
  const { camera, size } = useThree();
  const currentPos = useRef(new THREE.Vector3(3.4, 1.4, 4.6));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.5, 0.4));

  useFrame((state, delta) => {
    // 1. Calculate mobile aspect ratio and push camera back accordingly
    const isMobile = size.width < 768;
    const isNarrow = size.width < 450;
    
    // Scale distance factor: On narrow mobile screens, pull camera back so the car fits gracefully without edge clipping
    const distanceMultiplier = isNarrow ? 1.45 : isMobile ? 1.25 : 1.0;
    const heightAdjustment = isMobile ? 0.35 : 0.0;

    // Pointer/touch parallax offset
    const px = state.pointer.x * 0.35 * sensitivity;
    const py = state.pointer.y * 0.25 * sensitivity;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let lookX = 0;
    let lookY = 0.45;
    let lookZ = 0;

    // Dynamic Camera Inspection Tour:
    // 0% - 22%: Front-quarter hero view
    // 22% - 52%: Lower side profile & battery pack
    // 52% - 78%: Elevated orbit over cockpit & rear wing
    // 78% - 100%: Rear powertrain & diffuser
    if (scrollProgress <= 0.22) {
      const t = scrollProgress / 0.22;
      targetX = THREE.MathUtils.lerp(3.6, 4.2, t) + px;
      targetY = THREE.MathUtils.lerp(1.3, 0.9, t) + py + heightAdjustment;
      targetZ = THREE.MathUtils.lerp(4.4, 2.6, t);
      lookX = THREE.MathUtils.lerp(0.2, 0, t);
      lookY = THREE.MathUtils.lerp(0.5, 0.35, t);
      lookZ = THREE.MathUtils.lerp(0.8, 0.2, t);
    } else if (scrollProgress <= 0.52) {
      const t = (scrollProgress - 0.22) / 0.30;
      targetX = THREE.MathUtils.lerp(4.2, 4.6, t) + px;
      targetY = THREE.MathUtils.lerp(0.9, 0.35, t) + py + heightAdjustment;
      targetZ = THREE.MathUtils.lerp(2.6, -0.2, t);
      lookX = THREE.MathUtils.lerp(0, 0, t);
      lookY = THREE.MathUtils.lerp(0.35, 0.2, t);
      lookZ = THREE.MathUtils.lerp(0.2, -0.1, t);
    } else if (scrollProgress <= 0.78) {
      const t = (scrollProgress - 0.52) / 0.26;
      targetX = THREE.MathUtils.lerp(4.6, 2.4, t) + px;
      targetY = THREE.MathUtils.lerp(0.35, 2.4, t) + py + heightAdjustment;
      targetZ = THREE.MathUtils.lerp(-0.2, -4.2, t);
      lookX = THREE.MathUtils.lerp(0, 0, t);
      lookY = THREE.MathUtils.lerp(0.2, 0.6, t);
      lookZ = THREE.MathUtils.lerp(-0.1, -1.2, t);
    } else {
      const t = (scrollProgress - 0.78) / 0.22;
      targetX = THREE.MathUtils.lerp(2.4, -0.2, t) + px;
      targetY = THREE.MathUtils.lerp(2.4, 0.95, t) + py + heightAdjustment;
      targetZ = THREE.MathUtils.lerp(-4.2, -4.8, t);
      lookX = 0;
      lookY = 0.45;
      lookZ = -1.5;
    }

    // Apply distance multiplier for mobile screen width safety
    targetX *= distanceMultiplier;
    targetZ *= distanceMultiplier;

    // Subtle reaction to touch / scroll velocity
    const velocityBump = Math.max(Math.min(scrollVelocity * 0.0006, 0.4), -0.4);
    targetY += velocityBump;

    // Smooth physics lerping
    currentPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 3.4);
    camera.position.copy(currentPos.current);

    currentLookAt.current.lerp(new THREE.Vector3(lookX, lookY, lookZ), delta * 3.8);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export const AutomotiveScene: React.FC<AutomotiveSceneProps> = ({
  settings,
  scrollProgress,
  scrollVelocity,
}) => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden touch-action-none">
      <Canvas
        camera={{ position: [3.4, 1.4, 4.6], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        // Adaptive quality scaling: Capped to max 2 to prevent mobile GPU throttling on iPhone Retina
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1.5, 2)]}
      >
        <color attach="background" args={['#06060a']} />

        {/* 1. Studio Lighting Setup */}
        <ambientLight intensity={0.45} />

        {/* Studio Key Light (Pure White) */}
        <directionalLight
          position={[6, 12, 6]}
          intensity={2.2}
          color="#ffffff"
        />

        {/* Dynamic Headlight Color Fill */}
        <pointLight
          position={[-6, 4, 3]}
          intensity={settings.headlightIntensity * 2.5}
          color={settings.headlightColor}
          distance={18}
        />

        {/* Rear Taillight Ruby Fill */}
        <pointLight
          position={[0, 1.5, -5]}
          intensity={2.8}
          color={settings.taillightColor}
          distance={12}
        />

        {/* Underbody Chassis Glow */}
        <pointLight
          position={[0, -0.1, 0]}
          intensity={1.2}
          color="#06b6d4"
          distance={8}
        />

        {/* 2. Studio Environment for Metallic Reflections */}
        <Environment preset="studio" />

        <Suspense
          fallback={
            <SupercarMesh
              settings={settings}
              scrollProgress={scrollProgress}
              scrollVelocity={scrollVelocity}
            />
          }
        >
          {/* Active 3D Vehicle: Real Porsche Taycan GLB or Concept Hypercar */}
          {settings.vehicleModel === 'concept' ? (
            <SupercarMesh
              settings={settings}
              scrollProgress={scrollProgress}
              scrollVelocity={scrollVelocity}
            />
          ) : (
            <PorscheTaycan
              settings={settings}
              scrollProgress={scrollProgress}
              scrollVelocity={scrollVelocity}
            />
          )}

          {/* Realistic Floor Contact Shadows */}
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={settings.floorReflectionOpacity}
            scale={12}
            blur={2.2}
            far={8}
            resolution={isMobile ? 256 : 512}
            color="#000000"
          />

          {/* Adaptive Particle Universe (Scale down on mobile for locked 60FPS) */}
          <Sparkles
            count={isMobile ? 40 : 90}
            scale={[16, 8, 16]}
            size={isMobile ? 1.4 : 1.8}
            speed={0.25}
            noise={0.2}
            color={settings.headlightColor}
          />
        </Suspense>

        {/* 3. Screen-Size Aware Camera Tour Controller */}
        <CameraInspectionController
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          sensitivity={settings.cameraSensitivity}
        />
      </Canvas>
    </div>
  );
};
