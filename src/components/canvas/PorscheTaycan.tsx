import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { CarSettings } from '../../types';

interface PorscheTaycanProps {
  settings: CarSettings;
  scrollProgress: number;
  scrollVelocity: number;
}

export const PorscheTaycan: React.FC<PorscheTaycanProps> = ({
  settings,
  scrollProgress,
  scrollVelocity,
}) => {
  const modelRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);

  // Load the uploaded Porsche Taycan GLB with local Draco decoder
  const { scene } = useGLTF('/porsche_taycan.glb', '/draco/');

  // Clone scene so materials can be uniquely manipulated per instance
  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  const isXray = !!settings.xrayMode;

  // Compute bounding box and normalization offsets
  const { normalizedScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Target real-world supercar scale: ~4.75m length
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetLength = 4.75;
    const scale = maxDim > 0 ? targetLength / maxDim : 1.0;

    // Height offset so tires sit right at y = 0.02
    return {
      normalizedScale: scale,
      centerOffset: new THREE.Vector3(
        -center.x * scale,
        -box.min.y * scale + 0.02,
        -center.z * scale
      ),
    };
  }, [clonedScene]);

  // Update materials dynamically when settings or X-Ray mode changes
  useEffect(() => {
    const wheels: THREE.Mesh[] = [];

    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const mat = child.material as THREE.Material;
      if (!mat) return;
      const matName = mat.name || '';

      // Track wheel meshes for rotational animation
      if (
        child.name.includes('1534') ||
        child.name.includes('1597') ||
        matName.includes('Rubber1') ||
        matName.includes('Whel_color') ||
        matName.includes('whell_metal')
      ) {
        wheels.push(child);
      }

      // 1. CAR BODY PANELS ("corpus1") -> Upgraded PBR Car Paint or X-Ray Wireframe
      if (matName.includes('corpus1')) {
        if (isXray) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: '#06b6d4',
            wireframe: true,
            transparent: true,
            opacity: 0.28,
            roughness: 0.1,
            metalness: 0.9,
            emissive: new THREE.Color('#0891b2'),
            emissiveIntensity: 0.45,
            side: THREE.DoubleSide,
          });
        } else {
          child.material = new THREE.MeshPhysicalMaterial({
            name: 'Taycan_PBR_Paint',
            color: new THREE.Color(settings.bodyColor),
            roughness: settings.roughness,
            metalness: settings.metalness,
            clearcoat: settings.clearcoat,
            clearcoatRoughness: 0.06,
            reflectivity: 1.0,
            envMapIntensity: 2.4,
            wireframe: false,
            transparent: false,
            opacity: 1.0,
            side: THREE.DoubleSide,
          });
        }
        child.castShadow = !isXray;
        child.receiveShadow = true;
      }

      // 2. CARBON FIBER & PLASTIC BODY TRIM ("Carbon_black1", "Black_plastick1")
      else if (matName.includes('Carbon_black1') || matName.includes('Black_plastick1')) {
        if (isXray) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#0284c7',
            wireframe: true,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide,
          });
        } else {
          child.material = new THREE.MeshStandardMaterial({
            name: matName + '_PBR',
            color: matName.includes('Carbon') ? new THREE.Color('#101216') : new THREE.Color('#15171c'),
            roughness: matName.includes('Carbon') ? 0.35 : 0.65,
            metalness: matName.includes('Carbon') ? 0.5 : 0.2,
            side: THREE.DoubleSide,
          });
        }
        child.castShadow = !isXray;
        child.receiveShadow = true;
      }

      // 3. CABIN & HEADLIGHT GLASS ("glass2", "Glass_headlight")
      else if (matName.includes('glass2') || matName.includes('Glass_headlight')) {
        if (isXray) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: '#38bdf8',
            wireframe: true,
            transparent: true,
            opacity: 0.16,
            side: THREE.DoubleSide,
          });
        } else {
          child.material = new THREE.MeshPhysicalMaterial({
            name: matName + '_PhysicalGlass',
            color: matName.includes('glass2') ? new THREE.Color('#0a1018') : new THREE.Color('#e0f2fe'),
            transmission: 0.9,
            opacity: 0.85,
            transparent: true,
            roughness: 0.04,
            metalness: 0.1,
            ior: 1.52,
            reflectivity: 0.9,
            side: THREE.DoubleSide,
          });
        }
        child.castShadow = false;
        child.receiveShadow = true;
      }

      // 4. MATRIX LED 4-POINT HEADLIGHTS ("headlight_white_color")
      else if (matName.includes('headlight_white_color')) {
        child.material = new THREE.MeshStandardMaterial({
          name: 'Taycan_Matrix_LED',
          color: '#ffffff',
          emissive: new THREE.Color(settings.headlightColor),
          emissiveIntensity: settings.headlightIntensity * 3.5,
          roughness: 0.1,
          side: THREE.DoubleSide,
        });
        child.castShadow = false;
        child.receiveShadow = false;
      }

      // 5. CONTINUOUS REAR TAILLIGHT LIGHT STRIP ("red_headlight")
      else if (matName.includes('red_headlight')) {
        child.material = new THREE.MeshStandardMaterial({
          name: 'Taycan_Taillight_Laser',
          color: '#ff0033',
          emissive: new THREE.Color(settings.taillightColor),
          emissiveIntensity: 4.2,
          roughness: 0.15,
          side: THREE.DoubleSide,
        });
        child.castShadow = false;
        child.receiveShadow = false;
      }

      // 6. TIRES ("Rubber1")
      else if (matName.includes('Rubber1')) {
        if (isXray) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#0f172a',
            wireframe: true,
            transparent: true,
            opacity: 0.25,
          });
        } else {
          child.material = new THREE.MeshStandardMaterial({
            name: 'Pirelli_PZero_Rubber',
            color: new THREE.Color('#141418'),
            roughness: 0.82,
            metalness: 0.08,
          });
        }
        child.castShadow = !isXray;
        child.receiveShadow = true;
      }

      // 7. ALLOY RIMS & METAL ("Whel_color_black", "whell_metal", "Whel_color_white")
      else if (
        matName.includes('Whel_color') ||
        matName.includes('whell_metal') ||
        matName.includes('Headlight_metal1')
      ) {
        if (isXray) {
          child.material = new THREE.MeshStandardMaterial({
            color: '#38bdf8',
            wireframe: true,
            transparent: true,
            opacity: 0.35,
          });
        } else {
          const isLip = matName.includes('white');
          child.material = new THREE.MeshStandardMaterial({
            name: matName + '_Alloy',
            color: isLip ? new THREE.Color('#dcdde1') : new THREE.Color('#22242a'),
            metalness: 0.95,
            roughness: isLip ? 0.15 : 0.3,
            envMapIntensity: 2.2,
          });
        }
        child.castShadow = !isXray;
        child.receiveShadow = true;
      }

      // 8. PERFORMANCE BRAKE CALIPERS ("brake")
      else if (matName.includes('brake')) {
        child.material = new THREE.MeshStandardMaterial({
          name: 'Taycan_Brake_Caliper',
          color: new THREE.Color(settings.headlightColor === '#00f0ff' ? '#00f0ff' : '#dc2626'),
          roughness: 0.25,
          metalness: 0.75,
          envMapIntensity: 1.8,
        });
        child.castShadow = !isXray;
        child.receiveShadow = true;
      }

      // 9. MIRRORS ("MIRROR")
      else if (matName.includes('MIRROR')) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#e2e8f0'),
          metalness: 1.0,
          roughness: 0.05,
          envMapIntensity: 3.0,
        });
      }

      // Default fallback
      else {
        child.castShadow = !isXray;
        child.receiveShadow = true;
      }
    });

    wheelsRef.current = wheels;
  }, [clonedScene, isXray, settings]);

  // Frame animations: spin wheels with scroll velocity
  useFrame((_, delta) => {
    if (wheelsRef.current.length > 0 && Math.abs(scrollVelocity) > 0.1) {
      const rot = scrollVelocity * delta * 0.015;
      wheelsRef.current.forEach((wheel) => {
        wheel.rotation.x += rot;
      });
    }
  });

  return (
    <group ref={modelRef}>
      {/* Centered and scaled container for the Porsche Taycan */}
      <group position={[centerOffset.x, centerOffset.y, centerOffset.z]} scale={normalizedScale}>
        <primitive object={clonedScene} />
      </group>

      {/* Internal 800V Performance Battery & Dual Motor Architecture (World scale, visible in X-Ray Mode) */}
      {isXray && (
        <group position={[0, 0.28, 0]}>
          {/* 93.4 kWh Performance Battery Plus Sub-Floor Pack */}
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[1.42, 0.14, 2.2]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00e5ff"
              emissiveIntensity={1.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Cell Module Columns */}
          {[-0.45, 0, 0.45].map((xOff, cIdx) => (
            <group key={cIdx} position={[xOff, 0.02, 0]}>
              {[-0.8, -0.4, 0, 0.4, 0.8].map((zOff, rIdx) => (
                <mesh key={rIdx} position={[0, 0, zOff]}>
                  <boxGeometry args={[0.32, 0.06, 0.32]} />
                  <meshStandardMaterial
                    color="#fbbf24"
                    emissive="#f59e0b"
                    emissiveIntensity={1.5}
                    metalness={0.9}
                  />
                </mesh>
              ))}
            </group>
          ))}

          {/* Front Permanent Magnet Synchronous Motor & Pulse Inverter */}
          <group position={[0, 0.08, 1.45]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.18, 0.18, 0.36, 16]} />
              <meshStandardMaterial
                color="#ec4899"
                emissive="#db2777"
                emissiveIntensity={1.8}
                metalness={0.85}
              />
            </mesh>
            <mesh position={[0, 0.16, 0]}>
              <boxGeometry args={[0.6, 0.12, 0.38]} />
              <meshStandardMaterial
                color="#8b5cf6"
                emissive="#7c3aed"
                emissiveIntensity={1.6}
                metalness={0.8}
              />
            </mesh>
          </group>

          {/* Rear High-Torque Motor & Two-Speed Transmission */}
          <group position={[0, 0.1, -1.45]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.22, 0.44, 16]} />
              <meshStandardMaterial
                color="#ec4899"
                emissive="#db2777"
                emissiveIntensity={1.8}
                metalness={0.85}
              />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[0.75, 0.16, 0.48]} />
              <meshStandardMaterial
                color="#8b5cf6"
                emissive="#7c3aed"
                emissiveIntensity={1.6}
                metalness={0.8}
              />
            </mesh>
          </group>

          {/* 800V High-Voltage Copper Busbar Backbone */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 2.7, 12]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={1.6}
              metalness={0.9}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

// Preload model asset and draco decoder
useGLTF.preload('/porsche_taycan.glb', '/draco/');
