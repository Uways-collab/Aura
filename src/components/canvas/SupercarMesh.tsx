import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CarSettings } from '../../types';

interface SupercarMeshProps {
  settings: CarSettings;
  scrollProgress: number;
  scrollVelocity: number;
}

export const SupercarMesh: React.FC<SupercarMeshProps> = ({
  settings,
  scrollProgress,
  scrollVelocity,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const rearWingRef = useRef<THREE.Mesh>(null);
  const frontLeftWheel = useRef<THREE.Group>(null);
  const frontRightWheel = useRef<THREE.Group>(null);
  const rearLeftWheel = useRef<THREE.Group>(null);
  const rearRightWheel = useRef<THREE.Group>(null);
  const driveshaftRef = useRef<THREE.Mesh>(null);

  const isXray = !!settings.xrayMode;

  // 1. External Bodywork Materials setup (switches to semi-transparent cyan wireframe in X-Ray mode)
  const bodyMaterial = useMemo(() => {
    if (isXray) {
      return new THREE.MeshPhysicalMaterial({
        color: '#06b6d4',
        wireframe: true,
        transparent: true,
        opacity: 0.28,
        roughness: 0.1,
        metalness: 0.9,
        emissive: '#0891b2',
        emissiveIntensity: 0.45,
      });
    }

    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(settings.bodyColor),
      roughness: settings.roughness,
      metalness: settings.metalness,
      clearcoat: settings.clearcoat,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      envMapIntensity: 2.2,
      wireframe: false,
      transparent: false,
      opacity: 1.0,
    });
  }, [isXray, settings.bodyColor, settings.roughness, settings.metalness, settings.clearcoat]);

  const carbonMaterial = useMemo(() => {
    if (isXray) {
      return new THREE.MeshStandardMaterial({
        color: '#0284c7',
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
    }
    return new THREE.MeshStandardMaterial({
      color: '#121217',
      roughness: 0.35,
      metalness: 0.6,
      wireframe: false,
      transparent: false,
      opacity: 1.0,
    });
  }, [isXray]);

  const glassMaterial = useMemo(() => {
    if (isXray) {
      return new THREE.MeshPhysicalMaterial({
        color: '#38bdf8',
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
    }
    return new THREE.MeshPhysicalMaterial({
      color: '#081018',
      roughness: 0.05,
      metalness: 0.2,
      transmission: 0.75,
      transparent: true,
      opacity: 0.88,
      ior: 1.52,
    });
  }, [isXray]);

  const wheelRimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isXray ? '#0ea5e9' : '#282b34',
      wireframe: isXray,
      roughness: 0.2,
      metalness: 0.95,
      transparent: isXray,
      opacity: isXray ? 0.45 : 1.0,
    });
  }, [isXray]);

  const brakeCaliperMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: settings.headlightColor,
      roughness: 0.2,
      metalness: 0.8,
    });
  }, [settings.headlightColor]);

  const tireMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isXray ? '#0f172a' : '#101012',
      wireframe: isXray,
      roughness: 0.85,
      metalness: 0.1,
      transparent: isXray,
      opacity: isXray ? 0.35 : 1.0,
    });
  }, [isXray]);

  // 2. Internal Drivetrain & Battery Materials (Illuminated in X-Ray mode)
  const batteryCellMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#00f0ff',
      emissive: '#00e5ff',
      emissiveIntensity: isXray ? 1.6 : 0.4,
      roughness: 0.2,
      metalness: 0.8,
    });
  }, [isXray]);

  const inverterMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#8b5cf6',
      emissive: '#7c3aed',
      emissiveIntensity: isXray ? 1.8 : 0.3,
      roughness: 0.2,
      metalness: 0.85,
    });
  }, [isXray]);

  const motorHousingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ec4899',
      emissive: '#db2777',
      emissiveIntensity: isXray ? 1.5 : 0.25,
      roughness: 0.25,
      metalness: 0.9,
    });
  }, [isXray]);

  const copperBusbarMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#fbbf24',
      emissive: '#f59e0b',
      emissiveIntensity: isXray ? 1.4 : 0.2,
      roughness: 0.15,
      metalness: 0.95,
    });
  }, [isXray]);

  const internalChassisTrussMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#38bdf8',
      wireframe: true,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.75,
    });
  }, []);

  // Frame animations: wheel rotation, driveshaft spin & active rear wing
  useFrame((_, delta) => {
    const wheelSpin = delta * 1.5 + scrollVelocity * 0.008;
    if (frontLeftWheel.current) frontLeftWheel.current.rotation.x += wheelSpin;
    if (frontRightWheel.current) frontRightWheel.current.rotation.x += wheelSpin;
    if (rearLeftWheel.current) rearLeftWheel.current.rotation.x += wheelSpin;
    if (rearRightWheel.current) rearRightWheel.current.rotation.x += wheelSpin;

    if (driveshaftRef.current) {
      driveshaftRef.current.rotation.z += wheelSpin * 2.2;
    }

    if (rearWingRef.current) {
      const targetWingAngle = scrollProgress > 0.45 && scrollProgress < 0.85 ? 0.35 : 0.08;
      rearWingRef.current.rotation.x = THREE.MathUtils.lerp(
        rearWingRef.current.rotation.x,
        targetWingAngle,
        delta * 3
      );
    }
  });

  const renderWheel = (ref: React.RefObject<THREE.Group | null>) => (
    <group ref={ref}>
      {/* Tire Rubber */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.42, 0.42, 0.32, 32]} />
        <primitive object={tireMaterial} />
      </mesh>
      {/* Forged Magnesium Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.34, 0.34, 0.33, 24]} />
        <primitive object={wheelRimMaterial} />
      </mesh>
      {/* Brake Caliper */}
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.15, 0.18, 0.12]} />
        <primitive object={brakeCaliperMaterial} />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef} position={[0, 0.45, 0]}>
      {/* ============================================================== */}
      {/* SECTION A: EXTERNAL MONOCOQUE & AERO BODYWORK                   */}
      {/* ============================================================== */}

      {/* 1. Main Monocoque Lower Chassis */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1.9, 0.28, 4.4]} />
        <primitive object={bodyMaterial} />
      </mesh>

      {/* 2. Sleek Aerodynamic Cabin / Greenhouse Glass Canopy */}
      <mesh position={[0, 0.52, -0.15]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[1.42, 0.48, 2.3]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* 3. Sculpted Front Hood & Sharp Nosecone */}
      <mesh position={[0, 0.25, 1.45]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[1.75, 0.24, 1.6]} />
        <primitive object={bodyMaterial} />
      </mesh>
      {/* Lower aerodynamic front splitter lip */}
      <mesh position={[0, 0.02, 2.15]}>
        <boxGeometry args={[1.92, 0.05, 0.42]} />
        <primitive object={carbonMaterial} />
      </mesh>
      {/* Front splitter canards */}
      <mesh position={[-0.96, 0.08, 2.12]} rotation={[0, 0.2, 0.2]}>
        <boxGeometry args={[0.15, 0.02, 0.3]} />
        <primitive object={carbonMaterial} />
      </mesh>
      <mesh position={[0.96, 0.08, 2.12]} rotation={[0, -0.2, -0.2]}>
        <boxGeometry args={[0.15, 0.02, 0.3]} />
        <primitive object={carbonMaterial} />
      </mesh>

      {/* 4. Muscular Front Left & Right Wheel Arches */}
      <mesh position={[-0.92, 0.28, 1.45]}>
        <boxGeometry args={[0.26, 0.36, 1.05]} />
        <primitive object={bodyMaterial} />
      </mesh>
      <mesh position={[0.92, 0.28, 1.45]}>
        <boxGeometry args={[0.26, 0.36, 1.05]} />
        <primitive object={bodyMaterial} />
      </mesh>

      {/* 5. Sculpted Side Skirts with Venturi Ground Effect Channels */}
      <mesh position={[-0.95, 0.05, 0]}>
        <boxGeometry args={[0.18, 0.1, 2.1]} />
        <primitive object={carbonMaterial} />
      </mesh>
      <mesh position={[0.95, 0.05, 0]}>
        <boxGeometry args={[0.18, 0.1, 2.1]} />
        <primitive object={carbonMaterial} />
      </mesh>

      {/* 6. Muscular Rear Haunches / Wide Quarter Panels */}
      <mesh position={[-0.94, 0.32, -1.35]}>
        <boxGeometry args={[0.28, 0.44, 1.25]} />
        <primitive object={bodyMaterial} />
      </mesh>
      <mesh position={[0.94, 0.32, -1.35]}>
        <boxGeometry args={[0.28, 0.44, 1.25]} />
        <primitive object={bodyMaterial} />
      </mesh>

      {/* 7. Rear Engine/Inverter Deck Lid with cooling heat extractors */}
      <mesh position={[0, 0.42, -1.45]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[1.5, 0.18, 1.4]} />
        <primitive object={bodyMaterial} />
      </mesh>

      {/* 8. Front Matrix LED Headlight Blades (Horizontal Hyper Cyan) */}
      <mesh position={[-0.68, 0.26, 2.18]} rotation={[0, 0.12, 0]}>
        <boxGeometry args={[0.42, 0.035, 0.08]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={settings.headlightColor}
          emissiveIntensity={settings.headlightIntensity * 2.8}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.68, 0.26, 2.18]} rotation={[0, -0.12, 0]}>
        <boxGeometry args={[0.42, 0.035, 0.08]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={settings.headlightColor}
          emissiveIntensity={settings.headlightIntensity * 2.8}
          roughness={0.1}
        />
      </mesh>

      {/* Vertical DRL Accent Light strips */}
      <mesh position={[-0.88, 0.16, 2.22]}>
        <boxGeometry args={[0.04, 0.18, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={settings.headlightColor}
          emissiveIntensity={settings.headlightIntensity * 2.5}
        />
      </mesh>
      <mesh position={[0.88, 0.16, 2.22]}>
        <boxGeometry args={[0.04, 0.18, 0.05]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={settings.headlightColor}
          emissiveIntensity={settings.headlightIntensity * 2.5}
        />
      </mesh>

      {/* 9. Full-Width Cyber Taillight Lightbar */}
      <mesh position={[0, 0.38, -2.18]}>
        <boxGeometry args={[1.75, 0.045, 0.06]} />
        <meshStandardMaterial
          color="#ff0044"
          emissive={settings.taillightColor}
          emissiveIntensity={3.2}
          roughness={0.1}
        />
      </mesh>

      {/* 10. Aggressive Rear Carbon Diffuser with Strakes */}
      <mesh position={[0, 0.02, -2.22]}>
        <boxGeometry args={[1.86, 0.14, 0.35]} />
        <primitive object={carbonMaterial} />
      </mesh>
      {[-0.6, -0.2, 0.2, 0.6].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, 0.01, -2.3]}>
          <boxGeometry args={[0.03, 0.16, 0.35]} />
          <primitive object={carbonMaterial} />
        </mesh>
      ))}

      {/* 11. Active Carbon Fiber Rear Wing with Endplates */}
      <group position={[0, 0.68, -1.9]}>
        <mesh position={[-0.45, -0.15, 0]}>
          <boxGeometry args={[0.04, 0.3, 0.1]} />
          <primitive object={carbonMaterial} />
        </mesh>
        <mesh position={[0.45, -0.15, 0]}>
          <boxGeometry args={[0.04, 0.3, 0.1]} />
          <primitive object={carbonMaterial} />
        </mesh>
        <mesh ref={rearWingRef} position={[0, 0, 0]}>
          <boxGeometry args={[1.95, 0.04, 0.38]} />
          <primitive object={carbonMaterial} />
        </mesh>
        <mesh position={[-0.98, 0.04, 0]}>
          <boxGeometry args={[0.03, 0.18, 0.42]} />
          <primitive object={carbonMaterial} />
        </mesh>
        <mesh position={[0.98, 0.04, 0]}>
          <boxGeometry args={[0.03, 0.18, 0.42]} />
          <primitive object={carbonMaterial} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* SECTION B: INTERNAL DRIVETRAIN & BATTERY ARCHITECTURE          */}
      {/* (Revealed through wireframe X-Ray mode or visible underfloor)  */}
      {/* ============================================================== */}

      {/* 1. 120 kWh Solid-State Structural Battery Pack Matrix */}
      <group position={[0, 0.08, 0]}>
        {/* Core Battery Housing Enclosure */}
        <mesh>
          <boxGeometry args={[1.42, 0.14, 2.2]} />
          <primitive object={batteryCellMaterial} />
        </mesh>
        {/* Modular Cell Columns */}
        {[-0.45, 0, 0.45].map((xOffset, cIdx) => (
          <group key={cIdx} position={[xOffset, 0.08, 0]}>
            {[-0.8, -0.4, 0, 0.4, 0.8].map((zOffset, rIdx) => (
              <mesh key={rIdx} position={[0, 0, zOffset]}>
                <boxGeometry args={[0.32, 0.06, 0.32]} />
                <primitive object={copperBusbarMaterial} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 2. Front Dual Motors & Differential Gearbox Assembly */}
      <group position={[0, 0.05, 1.45]}>
        {/* Left Front Electric Motor */}
        <mesh position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.34, 16]} />
          <primitive object={motorHousingMaterial} />
        </mesh>
        {/* Right Front Electric Motor */}
        <mesh position={[0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.34, 16]} />
          <primitive object={motorHousingMaterial} />
        </mesh>
        {/* Front Inverter Module (Silicon Carbide) */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.62, 0.12, 0.42]} />
          <primitive object={inverterMaterial} />
        </mesh>
        {/* Front Axle Half-Shafts to Wheels */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 1.65, 12]} />
          <primitive object={copperBusbarMaterial} />
        </mesh>
      </group>

      {/* 3. Rear Dual Motors & Planetary Transmission */}
      <group position={[0, 0.08, -1.35]}>
        {/* Left Rear High-Torque Motor */}
        <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.42, 16]} />
          <primitive object={motorHousingMaterial} />
        </mesh>
        {/* Right Rear High-Torque Motor */}
        <mesh position={[0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.42, 16]} />
          <primitive object={motorHousingMaterial} />
        </mesh>
        {/* Rear Dual Inverter Stacks */}
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.75, 0.16, 0.48]} />
          <primitive object={inverterMaterial} />
        </mesh>
        {/* Rear Axle Shafts */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.042, 0.042, 1.7, 12]} />
          <primitive object={copperBusbarMaterial} />
        </mesh>
      </group>

      {/* 4. Central High-Voltage Fiber-Optic Backbone & Wiring Conduit */}
      <mesh ref={driveshaftRef} position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 2.7, 16]} />
        <primitive object={copperBusbarMaterial} />
      </mesh>

      {/* 5. Internal Tubular Spaceframe Safety Cage (Visible in X-Ray) */}
      {isXray && (
        <group position={[0, 0.38, -0.15]}>
          {/* Roll hoop bars */}
          <mesh position={[-0.55, 0.05, -0.45]}>
            <cylinderGeometry args={[0.03, 0.03, 0.65, 8]} />
            <primitive object={internalChassisTrussMaterial} />
          </mesh>
          <mesh position={[0.55, 0.05, -0.45]}>
            <cylinderGeometry args={[0.03, 0.03, 0.65, 8]} />
            <primitive object={internalChassisTrussMaterial} />
          </mesh>
          <mesh position={[0, 0.36, -0.45]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 1.1, 8]} />
            <primitive object={internalChassisTrussMaterial} />
          </mesh>
          {/* Diagonal cockpit brace */}
          <mesh position={[0, 0.05, -0.45]} rotation={[0, 0, 0.65]}>
            <cylinderGeometry args={[0.025, 0.025, 1.25, 8]} />
            <primitive object={internalChassisTrussMaterial} />
          </mesh>
        </group>
      )}

      {/* 6. Sub-floor aerodynamic floor plate */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[1.5, 0.03, 2.5]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={isXray ? 1.0 : 0.4}
          roughness={0.4}
        />
      </mesh>

      {/* ============================================================== */}
      {/* SECTION C: WHEELS AND BRAKE ASSEMBLIES                         */}
      {/* ============================================================== */}
      <group position={[-1.02, 0, 1.45]}>{renderWheel(frontLeftWheel)}</group>
      <group position={[1.02, 0, 1.45]} rotation={[0, Math.PI, 0]}>
        {renderWheel(frontRightWheel)}
      </group>
      <group position={[-1.04, 0, -1.35]}>{renderWheel(rearLeftWheel)}</group>
      <group position={[1.04, 0, -1.35]} rotation={[0, Math.PI, 0]}>
        {renderWheel(rearRightWheel)}
      </group>
    </group>
  );
};
