export type PaintFinish = 'stealthBlack' | 'metallicViolet' | 'liquidTitanium' | 'hyperCyan';

export interface CarSettings {
  paintFinish: PaintFinish;
  bodyColor: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  headlightIntensity: number;
  headlightColor: string;
  taillightColor: string;
  floorReflectionOpacity: number;
  activeAero: boolean;
  cameraSensitivity: number;
  xrayMode: boolean;
  vehicleModel: 'taycan' | 'concept';
}

export interface SpecItem {
  id: string;
  label: string;
  value: string;
  unit?: string;
  detail: string;
  category: 'powertrain' | 'battery' | 'aero' | 'chassis';
}

export interface Hotspot {
  id: string;
  scrollRange: [number, number]; // [minScroll, maxScroll]
  title: string;
  headline: string;
  specs: string[];
  position: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right' | 'center-bottom';
}

// Backward compatibility interfaces
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  category: string;
  year: string;
  image: string;
  overview: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  awards?: string[];
  highlight: string;
}

export interface TweakpaneSettings {
  meshType: 'torusKnot' | 'sphere' | 'rings';
  wireframe: boolean;
  wobbleFactor: number;
  wobbleSpeed: number;
  distortionScale: number;
  particleCount: number;
  lightColor: string;
  secondaryLightColor: string;
  cameraSpeed: number;
  rotationSpeed: number;
  bloomEffect: boolean;
}
